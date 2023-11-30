DECLARE @company NVARCHAR(50)
DECLARE @sort_no INT
DECLARE @TEMP_IDENTITY_LEVEL1 INT
DECLARE @TEMP_IDENTITY_LEVEL2 INT
DECLARE @TEMP_IDENTITY_LEVEL2_SORTNO INT
DECLARE @OUT_RETURN INT -- 오류:0, 성공:1

SET NOCOUNT ON

-------------------- 1. CODE_MASTER 데이터 생성(MASTER정보) --------------------
DELETE VCP_MAIN.dbo.TBP_CODE_MASTER WHERE MasterCode LIKE 'EXTERNAL_SITE_ITEM_LV%';
BEGIN
	INSERT INTO VCP_MAIN.dbo.TBP_CODE_MASTER
	SELECT company AS CompanyCode, MasterCode, MasterName, UseYN, Description, UserID, CreateDate, NULL, NULL
	  FROM CRV_Company AS CC
	 CROSS JOIN (SELECT 'EXTERNAL_SITE_ITEM_LV1' AS MasterCode, N'외부 사이트 항목' AS MasterName, 'Y' AS UseYN, CONCAT(N'비지니스 어드민 / 외부 사이트 관리 / ', CONVERT(CHAR(10), GETDATE(), 102)) AS Description, -1 AS UserID, GETDATE() AS CreateDate
			      UNION ALL
				 SELECT 'EXTERNAL_SITE_ITEM_LV2' AS MasterCode, N'외부 사이트 유형' AS MasterName, 'Y' AS UseYN, CONCAT(N'비지니스 어드민 / 외부 사이트 관리 / ', CONVERT(CHAR(10), GETDATE(), 102)) AS Description, -1 AS UserID, GETDATE() AS CreateDate) TMEP_CODE_MASTER
END

-------------------- 2. QUERY_TEMPLATE 데이터 생성 --------------------
DELETE VCP_MAIN.dbo.TBP_QUERY_TEMPLATE WHERE ID IN ('QT_COM_GetExternalUrlList', 'QT_COM_GetCodeInfoByItem');
BEGIN
	INSERT INTO VCP_MAIN.dbo.TBP_QUERY_TEMPLATE
	(ID, Syntax, Remark)
	VALUES(N'QT_COM_GetCodeInfoByItem', N'WITH CODE_INFO AS (
		SELECT lev, Code, DisplayName, MasterCode, ParentCode, Dept_Id, Dept_Name, CompanyCode, SortOrder
		  FROM CRV_CodeInfoByTree WITH (NOLOCK)
		 WHERE CompanyCode = N''{#1}''
	  	   AND MasterCode = N''{#2}''
		   AND (CHARINDEX(N''{#3}'', Dept_Name) > 0 OR Dept_Name IS NULL)
	       AND UseYN = ''Y''
	)
	
	SELECT CompanyCode
	     , (SELECT TCD.DisplayName FROM TBP_CODE_DETAIL AS TCD WHERE TCD.Code = TMP.ParentCode) AS parentDisplayName
	     , DisplayName
	     , Dept_Id
	     , Dept_Name
	     , SortOrder
	  FROM CODE_INFO TMP
	 ORDER BY parentDisplayName, SortOrder;', N'외부 사이트 관리 - 기준정보 조회');
	 
	INSERT INTO VCP_MAIN.dbo.TBP_QUERY_TEMPLATE
	(ID, Syntax, Remark)
	VALUES(N'QT_COM_GetExternalUrlList', N'WITH EXTERNAL_URL_INFO AS (
		SELECT Code
			 , CompanyCode
			 , MasterName
			 , UseYN
			 , 0 AS parentCode
			 , ISNULL(SortOrder, 0) SortOrder
			 , [Description]
			 , Lev = 0
			 , SiteUrl
			 , CategoryName
			 , MainAgentName
			 , ChargeName
			 , LanguageName
		  FROM [VCP_CUSTOM01].[DBO].TBP_EXTERNAL_URL_MASTER WITH(NOLOCK) 
	 	 WHERE parentCode = 0
	     UNION ALL
		SELECT Code
			 , CompanyCode
			 , MasterName
			 , UseYN
			 , ParentCode AS parentCode
			 , ISNULL(SortOrder, 0) SortOrder
			 , [Description]
			 , Lev = 1
			 , SiteUrl
			 , CategoryName
			 , MainAgentName
			 , ChargeName
			 , LanguageName
		  FROM [VCP_CUSTOM01].[DBO].TBP_EXTERNAL_URL_MASTER WITH(NOLOCK)
	     WHERE parentCode <> 0
	),
	EXTERNAL_URL_ACCESS AS (
		SELECT A.Code, A.Dept_Id, B.dept_kor_name AS Dept_Name
		  FROM [VCP_CUSTOM01].[DBO].TBP_EXTERNAL_URL_ACCESS A WITH(NOLOCK)
		 INNER JOIN TBP_DEPT B WITH(NOLOCK)
			ON A.Dept_Id = B.dept_id 
		   AND B.tenant_id IN (''L1100'', ''L1200'', ''L1300'', ''L2101'', ''L4200'') AND B.use_yn = ''Y''
	)
	
	SELECT EXTERNAL_URL_INFO.Code AS [key]
		 , EXTERNAL_URL_INFO.Code AS code
	     , CompanyCode AS companyCode
	     , MasterName As displayName
		 , MasterName AS [title]
		 , Case When UseYN = ''N'' then ''treeNodeStrike'' Else '''' End AS [addClass]     
	     , UseYN AS useYN
	     , ParentCode AS parentCode
	     , SortOrder AS sortOrder
	     , Description AS description
	     , Lev AS lev
		 , ISNULL(SiteUrl, '''') AS siteUrl
		 , ISNULL(CategoryName, '''') AS categoryName 
		 , ISNULL(MainAgentName, '''') AS mainAgentName
		 , ISNULL(ChargeName, '''') AS chargeName 
		 , ISNULL(LanguageName, '''') AS languageName
	     , ISNULL(Dept_Id, '''') AS dept_Id
	     , ISNULL(Dept_Name, '''') AS dept_Name
	  FROM EXTERNAL_URL_INFO
	  LEFT OUTER JOIN ( 
					   SELECT Code
						    , STUFF((SELECT N'','' + CONVERT(NVARCHAR(255), Dept_Id) FROM EXTERNAL_URL_ACCESS WITH(NOLOCK) WHERE Code = TCA.Code FOR XML PATH('''')), 1, 1, '''') AS Dept_Id
						    , STUFF((SELECT N'','' + Dept_Name FROM EXTERNAL_URL_ACCESS WITH(NOLOCK) WHERE Code = TCA.Code FOR XML PATH('''')), 1, 1, '''') AS Dept_Name
						 FROM [VCP_CUSTOM01].[DBO].TBP_EXTERNAL_URL_ACCESS TCA
					  ) DEPT_INFO
		ON DEPT_INFO.Code = EXTERNAL_URL_INFO.Code
	 WHERE CompanyCode = N''{#1}''
	   AND (ISNULL(N''{#2}'', '''') = '''' OR (CHARINDEX(N''{#2}'', Dept_Name) > 0 OR Dept_Name IS NULL))
	   AND (ISNULL(N''{#3}'', '''') = '''' OR UseYN = N''{#3}'')
	 ORDER BY Lev, SortOrder', N'외부 사이트 리스트 정보');
END

-------------------- 3. company별 데이터 생성 --------------------
DECLARE CUR CURSOR FOR

	SELECT company, sort_no FROM CRV_Company
	
	OPEN CUR
	FETCH NEXT FROM CUR INTO @company,@sort_no
	
	WHILE @@FETCH_STATUS = 0
	BEGIN
		-------------------- 4. CODE_DETAIL 데이터 생성(기준정보) --------------------
	    IF NOT EXISTS (SELECT * 
	                     FROM VCP_MAIN.dbo.TBP_CODE_DETAIL WITH(NOLOCK)
	                    WHERE CompanyCode = @company
	                      AND DisplayName = N'외부 사이트 항목 > 유형')
			BEGIN
				BEGIN TRAN
				
				-------------------- 4-1. 외부 사이트 항목 > 유형 생성 --------------------
				INSERT INTO TBP_CODE_DETAIL (CompanyCode, MasterCode, DisplayName, ParentCode, SortOrder, UseYN, Description, UserID, CreateDate)
				VALUES (@company, N'', N'외부 사이트 항목 > 유형', (SELECT TOP(1) Code FROM TBP_CODE_DETAIL WHERE CompanyCode = @company AND ParentCode = 0), 999, 'Y', N'외부 사이트 관리 화면에서 사용되는 항목', 1895, GETDATE())
				
				SET @TEMP_IDENTITY_LEVEL1 = SCOPE_IDENTITY();
				
				-------------------- 4-2. 카테고리 생성 --------------------
				SET @TEMP_IDENTITY_LEVEL2_SORTNO = 0
				INSERT INTO TBP_CODE_DETAIL (CompanyCode, MasterCode, DisplayName, ParentCode, SortOrder, UseYN, Description, UserID, CreateDate)
				VALUES (@company, N'EXTERNAL_SITE_ITEM_LV1', N'카테고리', @TEMP_IDENTITY_LEVEL1, @TEMP_IDENTITY_LEVEL2_SORTNO, 'Y', N'외부 사이트 관리 화면에서 사용되는 항목(카테고리)', 1895, GETDATE())
				
				SET @TEMP_IDENTITY_LEVEL2 = SCOPE_IDENTITY();
				
				INSERT INTO VCP_MAIN.dbo.TBP_CODE_DETAIL (CompanyCode, MasterCode, DisplayName, ParentCode, SortOrder, UseYN, Description, UserID, CreateDate)
				VALUES
				(@company, N'EXTERNAL_SITE_ITEM_LV2', N'금융/경제/재무/증권/투자 (Money)', @TEMP_IDENTITY_LEVEL2, 0, N'Y', N'외부 사이트 관리 화면에서 사용되는 항목 : 카테고리 > 금융/경제/재무/증권/투자 (Money)', 1895, GETDATE()),
				(@company, N'EXTERNAL_SITE_ITEM_LV2', N'산업/시장동향/트렌드 (Trend)', @TEMP_IDENTITY_LEVEL2, 1, N'Y', N'외부 사이트 관리 화면에서 사용되는 항목 : 카테고리 > 산업/시장동향/트렌드 (Trend)', 1895, GETDATE()),
				(@company, N'EXTERNAL_SITE_ITEM_LV2', N'에너지/ECO/SOC (Environment)', @TEMP_IDENTITY_LEVEL2, 2, N'Y', N'외부 사이트 관리 화면에서 사용되는 항목 : 카테고리 > 에너지/ECO/SOC (Environment)', 1895, GETDATE()),
				(@company, N'EXTERNAL_SITE_ITEM_LV2', N'기술 (Technology)', @TEMP_IDENTITY_LEVEL2, 3, N'Y', N'외부 사이트 관리 화면에서 사용되는 항목 : 카테고리 > 기술 (Technology)', 1895, GETDATE()),
				(@company, N'EXTERNAL_SITE_ITEM_LV2', N'경쟁사/고객사/제품/스펙/리뷰 (Product)', @TEMP_IDENTITY_LEVEL2, 4, N'Y', N'외부 사이트 관리 화면에서 사용되는 항목 : 카테고리 > 경쟁사/고객사/제품/스펙/리뷰 (Product)', 1895, GETDATE()),
				(@company, N'EXTERNAL_SITE_ITEM_LV2', N'규제/정책/인증/법률 (Regal)', @TEMP_IDENTITY_LEVEL2, 5, N'Y', N'외부 사이트 관리 화면에서 사용되는 항목 : 카테고리 > 규제/정책/인증/법률 (Regal)', 1895, GETDATE());
				
				
				-------------------- 4-3. 주체 생성 --------------------
				SET @TEMP_IDENTITY_LEVEL2_SORTNO += 1
				INSERT INTO TBP_CODE_DETAIL (CompanyCode, MasterCode, DisplayName, ParentCode, SortOrder, UseYN, Description, UserID, CreateDate)
				VALUES (@company, N'EXTERNAL_SITE_ITEM_LV1', N'주체', @TEMP_IDENTITY_LEVEL1, @TEMP_IDENTITY_LEVEL2_SORTNO, 'Y', N'외부 사이트 관리 화면에서 사용되는 항목(주체)', 1895, GETDATE())
				
				SET @TEMP_IDENTITY_LEVEL2 = SCOPE_IDENTITY();
				
				INSERT INTO VCP_MAIN.dbo.TBP_CODE_DETAIL (CompanyCode, MasterCode, DisplayName, ParentCode, SortOrder, UseYN, Description, UserID, CreateDate)
				VALUES
				(@company, N'EXTERNAL_SITE_ITEM_LV2', N'SNS/커뮤니티', @TEMP_IDENTITY_LEVEL2, 0, N'Y', N'외부 사이트 관리 화면에서 사용되는 항목 : 주체 > SNS/커뮤니티', 1895, GETDATE()),
				(@company, N'EXTERNAL_SITE_ITEM_LV2', N'기관/협회', @TEMP_IDENTITY_LEVEL2, 1, N'Y', N'외부 사이트 관리 화면에서 사용되는 항목 : 주체 > 기관/협회', 1895, GETDATE()),
				(@company, N'EXTERNAL_SITE_ITEM_LV2', N'기업 홈페이지', @TEMP_IDENTITY_LEVEL2, 2, N'Y', N'외부 사이트 관리 화면에서 사용되는 항목 : 주체 > 기업 홈페이지', 1895, GETDATE()),
				(@company, N'EXTERNAL_SITE_ITEM_LV2', N'분석/조사업체', @TEMP_IDENTITY_LEVEL2, 3, N'Y', N'외부 사이트 관리 화면에서 사용되는 항목 : 주체 > 분석/조사업체', 1895, GETDATE()),
				(@company, N'EXTERNAL_SITE_ITEM_LV2', N'신문/언론/잡지사', @TEMP_IDENTITY_LEVEL2, 4, N'Y', N'외부 사이트 관리 화면에서 사용되는 항목 : 주체 > 신문/언론/잡지사', 1895, GETDATE()),
				(@company, N'EXTERNAL_SITE_ITEM_LV2', N'유통/판매사', @TEMP_IDENTITY_LEVEL2, 5, N'Y', N'외부 사이트 관리 화면에서 사용되는 항목 : 주체 > 유통/판매사', 1895, GETDATE()),
				(@company, N'EXTERNAL_SITE_ITEM_LV2', N'미분류', @TEMP_IDENTITY_LEVEL2, 6, N'Y', N'외부 사이트 관리 화면에서 사용되는 항목 : 주체 > 미분류', 1895, GETDATE());
				
				-------------------- 4-4. 요금 생성 --------------------
				SET @TEMP_IDENTITY_LEVEL2_SORTNO += 1
				INSERT INTO TBP_CODE_DETAIL (CompanyCode, MasterCode, DisplayName, ParentCode, SortOrder, UseYN, Description, UserID, CreateDate)
				VALUES (@company, N'EXTERNAL_SITE_ITEM_LV1', N'요금', @TEMP_IDENTITY_LEVEL1, @TEMP_IDENTITY_LEVEL2_SORTNO, 'Y', N'외부 사이트 관리 화면에서 사용되는 항목(요금)', 1895, GETDATE())
				
				SET @TEMP_IDENTITY_LEVEL2 = SCOPE_IDENTITY();
				
				INSERT INTO VCP_MAIN.dbo.TBP_CODE_DETAIL (CompanyCode, MasterCode, DisplayName, ParentCode, SortOrder, UseYN, Description, UserID, CreateDate)
				VALUES
				(@company, N'EXTERNAL_SITE_ITEM_LV2', N'무료', @TEMP_IDENTITY_LEVEL2, 0, N'Y', N'외부 사이트 관리 화면에서 사용되는 항목 : 요금 > 무료', 1895, GETDATE()),
				(@company, N'EXTERNAL_SITE_ITEM_LV2', N'유료', @TEMP_IDENTITY_LEVEL2, 1, N'Y', N'외부 사이트 관리 화면에서 사용되는 항목 : 요금 > 유료', 1895, GETDATE()),
				(@company, N'EXTERNAL_SITE_ITEM_LV2', N'부분무료', @TEMP_IDENTITY_LEVEL2, 2, N'Y', N'외부 사이트 관리 화면에서 사용되는 항목 : 요금 > 부분무료', 1895, GETDATE()),
				(@company, N'EXTERNAL_SITE_ITEM_LV2', N'부분유료', @TEMP_IDENTITY_LEVEL2, 3, N'Y', N'외부 사이트 관리 화면에서 사용되는 항목 : 요금 > 부분유료', 1895, GETDATE());
				
				-------------------- 4-5. 언어 생성 --------------------
				SET @TEMP_IDENTITY_LEVEL2_SORTNO += 1
				INSERT INTO TBP_CODE_DETAIL (CompanyCode, MasterCode, DisplayName, ParentCode, SortOrder, UseYN, Description, UserID, CreateDate)
				VALUES (@company, N'EXTERNAL_SITE_ITEM_LV1', N'언어', @TEMP_IDENTITY_LEVEL1, @TEMP_IDENTITY_LEVEL2_SORTNO, 'Y', N'외부 사이트 관리 화면에서 사용되는 항목(언어)', 1895, GETDATE())
				
				SET @TEMP_IDENTITY_LEVEL2 = SCOPE_IDENTITY();
				
				INSERT INTO VCP_MAIN.dbo.TBP_CODE_DETAIL (CompanyCode, MasterCode, DisplayName, ParentCode, SortOrder, UseYN, Description, UserID, CreateDate)
				VALUES
				(@company, N'EXTERNAL_SITE_ITEM_LV2', N'국문', @TEMP_IDENTITY_LEVEL2, 0, N'Y', N'외부 사이트 관리 화면에서 사용되는 항목 : 언어 > 국문', 1895, GETDATE()),
				(@company, N'EXTERNAL_SITE_ITEM_LV2', N'영문', @TEMP_IDENTITY_LEVEL2, 1, N'Y', N'외부 사이트 관리 화면에서 사용되는 항목 : 언어 > 영문', 1895, GETDATE()),
				(@company, N'EXTERNAL_SITE_ITEM_LV2', N'중문', @TEMP_IDENTITY_LEVEL2, 2, N'Y', N'외부 사이트 관리 화면에서 사용되는 항목 : 언어 > 중문', 1895, GETDATE()),
				(@company, N'EXTERNAL_SITE_ITEM_LV2', N'일어', @TEMP_IDENTITY_LEVEL2, 3, N'Y', N'외부 사이트 관리 화면에서 사용되는 항목 : 언어 > 일어', 1895, GETDATE()),
				(@company, N'EXTERNAL_SITE_ITEM_LV2', N'독어', @TEMP_IDENTITY_LEVEL2, 4, N'Y', N'외부 사이트 관리 화면에서 사용되는 항목 : 언어 > 독어', 1895, GETDATE()),
				(@company, N'EXTERNAL_SITE_ITEM_LV2', N'미분류', @TEMP_IDENTITY_LEVEL2, 5, N'Y', N'외부 사이트 관리 화면에서 사용되는 항목 : 언어 > 미분류', 1895, GETDATE());
			
			
				-------------------- ERROR 처리 --------------------
				IF (@@ERROR = 0) -- @@ERROR 는 검출된 에러코드 (0이면 정상 처리, 0이 아니면 비정상 처리된 것으로 오류 번호를 반환)
					BEGIN
						PRINT CONCAT(@company, N'의 기준정보 데이터를 정상 등록하였습니다.');
				        COMMIT TRAN
				        SET @OUT_RETURN = 1
				    END
				ELSE
					BEGIN
						PRINT CONCAT(@company, N'의 기준정보 데이터 등록을 실패하였습니다.');
				        ROLLBACK TRAN
				        SET @OUT_RETURN = 0
				    END
			END
		ELSE
			BEGIN
				PRINT CONCAT(@company, N'의 기준정보 데이터가 이미 존재합니다.');
			END
		
		-------------------- 5. 외부 사이트 정보 데이터 생성 --------------------
		BEGIN TRAN
			IF(@company = N'LG 이노텍')
				BEGIN
					DELETE FROM VCP_CUSTOM01.DBO.TBP_EXTERNAL_URL_MASTER WHERE CompanyCode = @company;
					
					INSERT INTO VCP_CUSTOM01.dbo.TBP_EXTERNAL_URL_MASTER
					(CompanyCode, MasterName, ParentCode, SortOrder, UseYN, Description, SiteUrl, CategoryName, MainAgentName, ChargeName, LanguageName, CreateUserID, CreateDate)
					VALUES(N'LG 이노텍', N'LG 이노텍', 0, @sort_no, N'Y', N'ROOT', NULL, NULL, NULL, NULL, NULL, -1, GETDATE());
					INSERT INTO VCP_CUSTOM01.dbo.TBP_EXTERNAL_URL_MASTER
					(CompanyCode, MasterName, ParentCode, SortOrder, UseYN, Description, SiteUrl, CategoryName, MainAgentName, ChargeName, LanguageName, CreateUserID, CreateDate)
					VALUES(N'LG 이노텍', N'신소재경제(신문)', (SELECT Code FROM VCP_CUSTOM01.dbo.TBP_EXTERNAL_URL_MASTER WHERE CompanyCode=N'LG 이노텍' AND ParentCode=0), 10, N'Y', N'소재산업, 부품사업, 산업가스, 기계, 전기전자, 에너지 등 신 소재 관련 전반의 뉴스 정보 제공.', N'http://amenews.kr/news/', N'산업/시장동향/트렌드 (Trend)', N'신문/언론/잡지사', N'유료', N'국문', -1, Getdate());
					INSERT INTO VCP_CUSTOM01.dbo.TBP_EXTERNAL_URL_MASTER
					(CompanyCode, MasterName, ParentCode, SortOrder, UseYN, Description, SiteUrl, CategoryName, MainAgentName, ChargeName, LanguageName, CreateUserID, CreateDate)
					VALUES(N'LG 이노텍', N'월간수소경제', (SELECT Code FROM VCP_CUSTOM01.dbo.TBP_EXTERNAL_URL_MASTER WHERE CompanyCode=N'LG 이노텍' AND ParentCode=0), 20, N'Y', N'수소 및 자동차 관련 뉴스 제공.', N'http://www.h2news.kr/', N'산업/시장동향/트렌드 (Trend)', N'신문/언론/잡지사', N'무료', N'국문', -1, Getdate());
					INSERT INTO VCP_CUSTOM01.dbo.TBP_EXTERNAL_URL_MASTER
					(CompanyCode, MasterName, ParentCode, SortOrder, UseYN, Description, SiteUrl, CategoryName, MainAgentName, ChargeName, LanguageName, CreateUserID, CreateDate)
					VALUES(N'LG 이노텍', N'유니버셜 로봇 블로그', (SELECT Code FROM VCP_CUSTOM01.dbo.TBP_EXTERNAL_URL_MASTER WHERE CompanyCode=N'LG 이노텍' AND ParentCode=0), 30, N'Y', N'로봇 시장 전반의 뉴스 정보 제공.', N'https://m.blog.naver.com/PostList.nhn?blogId=universalrobots', N'산업/시장동향/트렌드 (Trend)', N'SNS/커뮤니티', N'무료', N'국문', -1, Getdate());
					INSERT INTO VCP_CUSTOM01.dbo.TBP_EXTERNAL_URL_MASTER
					(CompanyCode, MasterName, ParentCode, SortOrder, UseYN, Description, SiteUrl, CategoryName, MainAgentName, ChargeName, LanguageName, CreateUserID, CreateDate)
					VALUES(N'LG 이노텍', N'정보통신기획평가원', (SELECT Code FROM VCP_CUSTOM01.dbo.TBP_EXTERNAL_URL_MASTER WHERE CompanyCode=N'LG 이노텍' AND ParentCode=0), 40, N'Y', N'ICT 기술 및 R&D 전담 기관으로 IT 전반의 정보 제공.', N'https://www.iitp.kr/main.it', N'기술 (Technology)', N'기관/협회', N'무료', N'국문', -1, Getdate());
					INSERT INTO VCP_CUSTOM01.dbo.TBP_EXTERNAL_URL_MASTER
					(CompanyCode, MasterName, ParentCode, SortOrder, UseYN, Description, SiteUrl, CategoryName, MainAgentName, ChargeName, LanguageName, CreateUserID, CreateDate)
					VALUES(N'LG 이노텍', N'한국 IR 협의회', (SELECT Code FROM VCP_CUSTOM01.dbo.TBP_EXTERNAL_URL_MASTER WHERE CompanyCode=N'LG 이노텍' AND ParentCode=0), 50, N'Y', N'기업 기술 분석 정보제공.', N'http://www.kirs.or.kr/main.html', N'기술 (Technology)', N'기관/협회', N'무료', N'국문', -1, Getdate());
					INSERT INTO VCP_CUSTOM01.dbo.TBP_EXTERNAL_URL_MASTER
					(CompanyCode, MasterName, ParentCode, SortOrder, UseYN, Description, SiteUrl, CategoryName, MainAgentName, ChargeName, LanguageName, CreateUserID, CreateDate)
					VALUES(N'LG 이노텍', N'한국교통연구원', (SELECT Code FROM VCP_CUSTOM01.dbo.TBP_EXTERNAL_URL_MASTER WHERE CompanyCode=N'LG 이노텍' AND ParentCode=0), 60, N'Y', N'차량 관련 정보 및 교통정책, 기술, 연구 자료 등 차량과 교통 인프라 및 뉴스 정보 제공.', N'https://www.koti.re.kr/index.do', N'산업/시장동향/트렌드 (Trend)', N'기관/협회', N'무료', N'국문', -1, Getdate());
					INSERT INTO VCP_CUSTOM01.dbo.TBP_EXTERNAL_URL_MASTER
					(CompanyCode, MasterName, ParentCode, SortOrder, UseYN, Description, SiteUrl, CategoryName, MainAgentName, ChargeName, LanguageName, CreateUserID, CreateDate)
					VALUES(N'LG 이노텍', N'한국기계연구원', (SELECT Code FROM VCP_CUSTOM01.dbo.TBP_EXTERNAL_URL_MASTER WHERE CompanyCode=N'LG 이노텍' AND ParentCode=0), 70, N'Y', N'로봇 등 기계 전반의 연구활동, 기술 지원 등의 대한 정보 제공.', N'https://www.kimm.re.kr/', N'기술 (Technology)', N'기관/협회', N'무료', N'국문', -1, Getdate());
					INSERT INTO VCP_CUSTOM01.dbo.TBP_EXTERNAL_URL_MASTER
					(CompanyCode, MasterName, ParentCode, SortOrder, UseYN, Description, SiteUrl, CategoryName, MainAgentName, ChargeName, LanguageName, CreateUserID, CreateDate)
					VALUES(N'LG 이노텍', N'한국디스플레이산업협회', (SELECT Code FROM VCP_CUSTOM01.dbo.TBP_EXTERNAL_URL_MASTER WHERE CompanyCode=N'LG 이노텍' AND ParentCode=0), 80, N'Y', N'디스플레이 산업 관련 정보, 과학기술 통계, 디스플레이 정책, 중국 디스플레이, 전문 용어집, 해외 전문조사 기관 리포트 등의 정보 제공. ', N'http://www.kdia.org/', N'산업/시장동향/트렌드 (Trend)', N'기관/협회', N'유료', N'국문', -1, Getdate());
					INSERT INTO VCP_CUSTOM01.dbo.TBP_EXTERNAL_URL_MASTER
					(CompanyCode, MasterName, ParentCode, SortOrder, UseYN, Description, SiteUrl, CategoryName, MainAgentName, ChargeName, LanguageName, CreateUserID, CreateDate)
					VALUES(N'LG 이노텍', N'한국로봇산업진흥원', (SELECT Code FROM VCP_CUSTOM01.dbo.TBP_EXTERNAL_URL_MASTER WHERE CompanyCode=N'LG 이노텍' AND ParentCode=0), 90, N'Y', N'로봇 관련 전반의 저보 및 교육 정보 제공.', N'https://www.kiria.org/portal/main.do', N'기술 (Technology)', N'기관/협회', N'무료', N'국문', -1, Getdate());
					INSERT INTO VCP_CUSTOM01.dbo.TBP_EXTERNAL_URL_MASTER
					(CompanyCode, MasterName, ParentCode, SortOrder, UseYN, Description, SiteUrl, CategoryName, MainAgentName, ChargeName, LanguageName, CreateUserID, CreateDate)
					VALUES(N'LG 이노텍', N'한국전자회로산업협회', (SELECT Code FROM VCP_CUSTOM01.dbo.TBP_EXTERNAL_URL_MASTER WHERE CompanyCode=N'LG 이노텍' AND ParentCode=0), 100, N'Y', N'전자회로 업계 현황, 기술, 세미나 교육 등 IT 전반의 정보 제공.', N'http://www.kpca.or.kr/kr/main.php', N'기술 (Technology)', N'기관/협회', N'유료', N'국문', -1, Getdate());
					INSERT INTO VCP_CUSTOM01.dbo.TBP_EXTERNAL_URL_MASTER
					(CompanyCode, MasterName, ParentCode, SortOrder, UseYN, Description, SiteUrl, CategoryName, MainAgentName, ChargeName, LanguageName, CreateUserID, CreateDate)
					VALUES(N'LG 이노텍', N'현대자동차 글로벌 경영연구소', (SELECT Code FROM VCP_CUSTOM01.dbo.TBP_EXTERNAL_URL_MASTER WHERE CompanyCode=N'LG 이노텍' AND ParentCode=0), 110, N'Y', N'현대차의 경영/산업 관련 트렌드, 시장 전망 관련 콘텐츠 정보 제공.', N'http://kari.hyundai.com/main.do', N'산업/시장동향/트렌드 (Trend)', N'분석/조사업체', N'무료', N'국문', -1, Getdate());
					INSERT INTO VCP_CUSTOM01.dbo.TBP_EXTERNAL_URL_MASTER
					(CompanyCode, MasterName, ParentCode, SortOrder, UseYN, Description, SiteUrl, CategoryName, MainAgentName, ChargeName, LanguageName, CreateUserID, CreateDate)
					VALUES(N'LG 이노텍', N'Automotive Report - 오토모티브리포트', (SELECT Code FROM VCP_CUSTOM01.dbo.TBP_EXTERNAL_URL_MASTER WHERE CompanyCode=N'LG 이노텍' AND ParentCode=0), 120, N'Y', N'전기자동차, 인공지능, E-모빌리티 등 자동차 산업 동향 정보 제공.', N'http://www.automotivereport.co.kr/', N'산업/시장동향/트렌드 (Trend)', N'신문/언론/잡지사', N'무료', N'국문', -1, Getdate());
					INSERT INTO VCP_CUSTOM01.dbo.TBP_EXTERNAL_URL_MASTER
					(CompanyCode, MasterName, ParentCode, SortOrder, UseYN, Description, SiteUrl, CategoryName, MainAgentName, ChargeName, LanguageName, CreateUserID, CreateDate)
					VALUES(N'LG 이노텍', N'Business Insider - 비즈니스 인사이더', (SELECT Code FROM VCP_CUSTOM01.dbo.TBP_EXTERNAL_URL_MASTER WHERE CompanyCode=N'LG 이노텍' AND ParentCode=0), 130, N'Y', N'미국의 비즈니스 및 기술 뉴스 정보 및 해외 Tech 기업 동향 정보 제공.', N'https://www.businessinsider.com/', N'산업/시장동향/트렌드 (Trend)', N'신문/언론/잡지사', N'유료', N'영문', -1, Getdate());
					INSERT INTO VCP_CUSTOM01.dbo.TBP_EXTERNAL_URL_MASTER
					(CompanyCode, MasterName, ParentCode, SortOrder, UseYN, Description, SiteUrl, CategoryName, MainAgentName, ChargeName, LanguageName, CreateUserID, CreateDate)
					VALUES(N'LG 이노텍', N'CiPA - 카메라 및 이미징 제품 협회', (SELECT Code FROM VCP_CUSTOM01.dbo.TBP_EXTERNAL_URL_MASTER WHERE CompanyCode=N'LG 이노텍' AND ParentCode=0), 140, N'Y', N'디지털 카메라 (DSLR/Mirrorless 등) 및 렌즈 통계 및 정책 정보 제공.', N'http://www.cipa.jp/index_e.html', N'규제/정책/인증/법률 (Legal)', N'기관/협회', N'무료', N'영문', -1, Getdate());
					INSERT INTO VCP_CUSTOM01.dbo.TBP_EXTERNAL_URL_MASTER
					(CompanyCode, MasterName, ParentCode, SortOrder, UseYN, Description, SiteUrl, CategoryName, MainAgentName, ChargeName, LanguageName, CreateUserID, CreateDate)
					VALUES(N'LG 이노텍', N'DRAMExchange', (SELECT Code FROM VCP_CUSTOM01.dbo.TBP_EXTERNAL_URL_MASTER WHERE CompanyCode=N'LG 이노텍' AND ParentCode=0), 150, N'Y', N'메모리 등 반도체 시장 동향 및 연구 보고서, 가격 등의 정보 제공.', N'https://www.dramexchange.com/ ', N'산업/시장동향/트렌드 (Trend)', N'분석/조사업체', N'무료', N'영문', -1, Getdate());
					INSERT INTO VCP_CUSTOM01.dbo.TBP_EXTERNAL_URL_MASTER
					(CompanyCode, MasterName, ParentCode, SortOrder, UseYN, Description, SiteUrl, CategoryName, MainAgentName, ChargeName, LanguageName, CreateUserID, CreateDate)
					VALUES(N'LG 이노텍', N'Drivingvisionnews', (SELECT Code FROM VCP_CUSTOM01.dbo.TBP_EXTERNAL_URL_MASTER WHERE CompanyCode=N'LG 이노텍' AND ParentCode=0), 160, N'Y', N'자동차 Lighting & ADAS, Smart Car Interior 등 자동차 산업 동향 정보 제공.', N'www.drivingvisionnews.com', N'산업/시장동향/트렌드 (Trend)', N'신문/언론/잡지사', N'무료', N'영문', -1, Getdate());
					INSERT INTO VCP_CUSTOM01.dbo.TBP_EXTERNAL_URL_MASTER
					(CompanyCode, MasterName, ParentCode, SortOrder, UseYN, Description, SiteUrl, CategoryName, MainAgentName, ChargeName, LanguageName, CreateUserID, CreateDate)
					VALUES(N'LG 이노텍', N'DXO Mark', (SELECT Code FROM VCP_CUSTOM01.dbo.TBP_EXTERNAL_URL_MASTER WHERE CompanyCode=N'LG 이노텍' AND ParentCode=0), 170, N'Y', N'스마트폰 카메라 성능 및 품질 점수화 (Rankings) 및 스마트폰 별 비교, 리뷰 정보 제공.', N'https://www.dxomark.com', N'경쟁사/고객사/제품/스펙/리뷰 (Product)', N'분석/조사업체', N'무료', N'영문', -1, Getdate());
					INSERT INTO VCP_CUSTOM01.dbo.TBP_EXTERNAL_URL_MASTER
					(CompanyCode, MasterName, ParentCode, SortOrder, UseYN, Description, SiteUrl, CategoryName, MainAgentName, ChargeName, LanguageName, CreateUserID, CreateDate)
					VALUES(N'LG 이노텍', N'EBN', (SELECT Code FROM VCP_CUSTOM01.dbo.TBP_EXTERNAL_URL_MASTER WHERE CompanyCode=N'LG 이노텍' AND ParentCode=0), 180, N'Y', N'전자기기, 글로벌 네트워크, 전자 관련 뉴스 등 IT 전반의 정보 제공.', N'https://www.ebnonline.com/', N'산업/시장동향/트렌드 (Trend)', N'신문/언론/잡지사', N'유료', N'영문', -1, Getdate());
					INSERT INTO VCP_CUSTOM01.dbo.TBP_EXTERNAL_URL_MASTER
					(CompanyCode, MasterName, ParentCode, SortOrder, UseYN, Description, SiteUrl, CategoryName, MainAgentName, ChargeName, LanguageName, CreateUserID, CreateDate)
					VALUES(N'LG 이노텍', N'EETimes', (SELECT Code FROM VCP_CUSTOM01.dbo.TBP_EXTERNAL_URL_MASTER WHERE CompanyCode=N'LG 이노텍' AND ParentCode=0), 190, N'Y', N'전자 관련 뉴스 및 교육 정보등 IT 전반의 정보 제공.', N'https://www.eetimes.com', N'산업/시장동향/트렌드 (Trend)', N'신문/언론/잡지사', N'무료', N'국문', -1, Getdate());
					INSERT INTO VCP_CUSTOM01.dbo.TBP_EXTERNAL_URL_MASTER
					(CompanyCode, MasterName, ParentCode, SortOrder, UseYN, Description, SiteUrl, CategoryName, MainAgentName, ChargeName, LanguageName, CreateUserID, CreateDate)
					VALUES(N'LG 이노텍', N'EETimes Japan', (SELECT Code FROM VCP_CUSTOM01.dbo.TBP_EXTERNAL_URL_MASTER WHERE CompanyCode=N'LG 이노텍' AND ParentCode=0), 200, N'Y', N'전자 관련 뉴스 및  기술 정보 전문 미디어 등  IT 전반의 정보 제공.', N'https://eetimes.jp/', N'산업/시장동향/트렌드 (Trend)', N'신문/언론/잡지사', N'유료', N'영문', -1, Getdate());
					INSERT INTO VCP_CUSTOM01.dbo.TBP_EXTERNAL_URL_MASTER
					(CompanyCode, MasterName, ParentCode, SortOrder, UseYN, Description, SiteUrl, CategoryName, MainAgentName, ChargeName, LanguageName, CreateUserID, CreateDate)
					VALUES(N'LG 이노텍', N'EPNC', (SELECT Code FROM VCP_CUSTOM01.dbo.TBP_EXTERNAL_URL_MASTER WHERE CompanyCode=N'LG 이노텍' AND ParentCode=0), 210, N'Y', N'전자부품 전문 언론사. 전자 부품 소재, 제조 장비, 전자 산업 전반의 뉴스 제공.', N'www.epnc.co.kr', N'산업/시장동향/트렌드 (Trend)', N'신문/언론/잡지사', N'무료', N'국문', -1, Getdate());
					INSERT INTO VCP_CUSTOM01.dbo.TBP_EXTERNAL_URL_MASTER
					(CompanyCode, MasterName, ParentCode, SortOrder, UseYN, Description, SiteUrl, CategoryName, MainAgentName, ChargeName, LanguageName, CreateUserID, CreateDate)
					VALUES(N'LG 이노텍', N'Focus2move', (SELECT Code FROM VCP_CUSTOM01.dbo.TBP_EXTERNAL_URL_MASTER WHERE CompanyCode=N'LG 이노텍' AND ParentCode=0), 220, N'Y', N'글로벌 자동차 데이터 및 아시아, 아프리카, 미국, 중동, 유럽 등 글로벌 자동차 뉴스 정보 제공', N'https://www.focus2move.com/', N'산업/시장동향/트렌드 (Trend)', N'신문/언론/잡지사', N'유료', N'영문', -1, Getdate());
					INSERT INTO VCP_CUSTOM01.dbo.TBP_EXTERNAL_URL_MASTER
					(CompanyCode, MasterName, ParentCode, SortOrder, UseYN, Description, SiteUrl, CategoryName, MainAgentName, ChargeName, LanguageName, CreateUserID, CreateDate)
					VALUES(N'LG 이노텍', N'Gizmochina - 기즈모차이나', (SELECT Code FROM VCP_CUSTOM01.dbo.TBP_EXTERNAL_URL_MASTER WHERE CompanyCode=N'LG 이노텍' AND ParentCode=0), 230, N'Y', N'최신 스마트폰 뉴스, 리뷰 정보 제공.', N'https://www.gizmochina.com/', N'경쟁사/고객사/제품/스펙/리뷰 (Product)', N'분석/조사업체', N'유료', N'영문', -1, Getdate());
					INSERT INTO VCP_CUSTOM01.dbo.TBP_EXTERNAL_URL_MASTER
					(CompanyCode, MasterName, ParentCode, SortOrder, UseYN, Description, SiteUrl, CategoryName, MainAgentName, ChargeName, LanguageName, CreateUserID, CreateDate)
					VALUES(N'LG 이노텍', N'HBR', (SELECT Code FROM VCP_CUSTOM01.dbo.TBP_EXTERNAL_URL_MASTER WHERE CompanyCode=N'LG 이노텍' AND ParentCode=0), 240, N'Y', N'하버드 비즈니스 리뷰. 미국 하버드 경영대학원 소유의 월간 경영학 저널. ', N'https://hbr.org/', N'산업/시장동향/트렌드 (Trend)', N'신문/언론/잡지사', N'유료', N'영문', -1, Getdate());
					INSERT INTO VCP_CUSTOM01.dbo.TBP_EXTERNAL_URL_MASTER
					(CompanyCode, MasterName, ParentCode, SortOrder, UseYN, Description, SiteUrl, CategoryName, MainAgentName, ChargeName, LanguageName, CreateUserID, CreateDate)
					VALUES(N'LG 이노텍', N'Image Sensor Wolrd', (SELECT Code FROM VCP_CUSTOM01.dbo.TBP_EXTERNAL_URL_MASTER WHERE CompanyCode=N'LG 이노텍' AND ParentCode=0), 250, N'Y', N'이미지 센서 관련 최신 정보 및 뉴스 제공.', N'http://image-sensors-world.blogspot.com/', N'산업/시장동향/트렌드 (Trend)', N'SNS/커뮤니티', N'무료', N'영문', -1, Getdate());
					INSERT INTO VCP_CUSTOM01.dbo.TBP_EXTERNAL_URL_MASTER
					(CompanyCode, MasterName, ParentCode, SortOrder, UseYN, Description, SiteUrl, CategoryName, MainAgentName, ChargeName, LanguageName, CreateUserID, CreateDate)
					VALUES(N'LG 이노텍', N'KISTEP - 한국과학기술기획평가원', (SELECT Code FROM VCP_CUSTOM01.dbo.TBP_EXTERNAL_URL_MASTER WHERE CompanyCode=N'LG 이노텍' AND ParentCode=0), 260, N'Y', N'과학 기술 관련 정책, 통계, 트렌드 보고 자료, 간행물 등 IT 전반의  정보 제공.', N'https://www.kistep.re.kr/', N'기술 (Technology)', N'기관/협회', N'무료', N'국문', -1, Getdate());
					INSERT INTO VCP_CUSTOM01.dbo.TBP_EXTERNAL_URL_MASTER
					(CompanyCode, MasterName, ParentCode, SortOrder, UseYN, Description, SiteUrl, CategoryName, MainAgentName, ChargeName, LanguageName, CreateUserID, CreateDate)
					VALUES(N'LG 이노텍', N'Letsgodigital', (SELECT Code FROM VCP_CUSTOM01.dbo.TBP_EXTERNAL_URL_MASTER WHERE CompanyCode=N'LG 이노텍' AND ParentCode=0), 270, N'Y', N'스마트폰, 카메라, 태블릿, TV, 스마트 워치 등 전자기기에 대한 최신 뉴스 브랜드 별 (Apple, Huawei, LG, oppo, Panasonic, Samsung, Sony) 제공.', N'https://en.letsgodigital.org/', N'경쟁사/고객사/제품/스펙/리뷰 (Product)', N'신문/언론/잡지사', N'무료', N'영문', -1, Getdate());
					INSERT INTO VCP_CUSTOM01.dbo.TBP_EXTERNAL_URL_MASTER
					(CompanyCode, MasterName, ParentCode, SortOrder, UseYN, Description, SiteUrl, CategoryName, MainAgentName, ChargeName, LanguageName, CreateUserID, CreateDate)
					VALUES(N'LG 이노텍', N'Marklines Information Platform - 마크라인스', (SELECT Code FROM VCP_CUSTOM01.dbo.TBP_EXTERNAL_URL_MASTER WHERE CompanyCode=N'LG 이노텍' AND ParentCode=0), 280, N'Y', N'차량 판매/생산 데이터, 시장 기술 보고서 등 자동차 산업 전반의 동향 정보 제공.
					자동차 업계 글로벌 정보제공. 국가별 월간 자동차 판매 동향, OEM별 판매, 자동차 시황, 자동차 뉴스 정보 제공.', N'https://www.marklines.com/en/', N'산업/시장동향/트렌드 (Trend)', N'분석/조사업체', N'유료', N'영문', -1, Getdate());
					INSERT INTO VCP_CUSTOM01.dbo.TBP_EXTERNAL_URL_MASTER
					(CompanyCode, MasterName, ParentCode, SortOrder, UseYN, Description, SiteUrl, CategoryName, MainAgentName, ChargeName, LanguageName, CreateUserID, CreateDate)
					VALUES(N'LG 이노텍', N'National Digital Science Library - 국가과학기술정보센터', (SELECT Code FROM VCP_CUSTOM01.dbo.TBP_EXTERNAL_URL_MASTER WHERE CompanyCode=N'LG 이노텍' AND ParentCode=0), 290, N'Y', N'과학 기술 인프라 및 데이터 정보 제공.', N'http://www.ndsl.kr/index.do', N'기술 (Technology)', N'기관/협회', N'무료', N'국문', -1, Getdate());
					INSERT INTO VCP_CUSTOM01.dbo.TBP_EXTERNAL_URL_MASTER
					(CompanyCode, MasterName, ParentCode, SortOrder, UseYN, Description, SiteUrl, CategoryName, MainAgentName, ChargeName, LanguageName, CreateUserID, CreateDate)
					VALUES(N'LG 이노텍', N'Patently Appl e- 페이튼 애플', (SELECT Code FROM VCP_CUSTOM01.dbo.TBP_EXTERNAL_URL_MASTER WHERE CompanyCode=N'LG 이노텍' AND ParentCode=0), 300, N'Y', N'해외 신문기사 및 팟캐스트
					: 전자제품 회사 및 전자제품과 관련 기술 등 산업 트렌드에 대한 각종 뉴스 정보 제공
					(검색시 키워드 : TV, MNT, NBPC, Tablet, SP, Display, Panel, LCD, OLED, LGD, SDC)', N'https://www.patentlyapple.com', N'기술 (Technology)', N'분석/조사업체', N'무료', N'영문', -1, Getdate());
					INSERT INTO VCP_CUSTOM01.dbo.TBP_EXTERNAL_URL_MASTER
					(CompanyCode, MasterName, ParentCode, SortOrder, UseYN, Description, SiteUrl, CategoryName, MainAgentName, ChargeName, LanguageName, CreateUserID, CreateDate)
					VALUES(N'LG 이노텍', N'Patently mobile', (SELECT Code FROM VCP_CUSTOM01.dbo.TBP_EXTERNAL_URL_MASTER WHERE CompanyCode=N'LG 이노텍' AND ParentCode=0), 310, N'Y', N'MS, Google, SEC, Huawei, Facebook 특허 정보 제공.', N'https://www.patentlymobile.com/', N'기술 (Technology)', N'분석/조사업체', N'무료', N'영문', -1, Getdate());
					INSERT INTO VCP_CUSTOM01.dbo.TBP_EXTERNAL_URL_MASTER
					(CompanyCode, MasterName, ParentCode, SortOrder, UseYN, Description, SiteUrl, CategoryName, MainAgentName, ChargeName, LanguageName, CreateUserID, CreateDate)
					VALUES(N'LG 이노텍', N'ROA Daily : 로아데일리', (SELECT Code FROM VCP_CUSTOM01.dbo.TBP_EXTERNAL_URL_MASTER WHERE CompanyCode=N'LG 이노텍' AND ParentCode=0), 320, N'Y', N'주요 디지털 기술 및 플랫폼과 관련된 최신 정보 및 해외 Tech 기업 동향 제공.', N'https://roadaily.co.kr/', N'산업/시장동향/트렌드 (Trend)', N'신문/언론/잡지사', N'유료', N'국문', -1, Getdate());
					INSERT INTO VCP_CUSTOM01.dbo.TBP_EXTERNAL_URL_MASTER
					(CompanyCode, MasterName, ParentCode, SortOrder, UseYN, Description, SiteUrl, CategoryName, MainAgentName, ChargeName, LanguageName, CreateUserID, CreateDate)
					VALUES(N'LG 이노텍', N'ScienceDirect', (SELECT Code FROM VCP_CUSTOM01.dbo.TBP_EXTERNAL_URL_MASTER WHERE CompanyCode=N'LG 이노텍' AND ParentCode=0), 330, N'Y', N'공학, 생명과학, 건강과학, 사회과학, 인문학 등 기술 및 의학 관련 뉴스,논문 자료 제공.', N'https://www.sciencedirect.com/', N'산업/시장동향/트렌드 (Trend)', N'분석/조사업체', N'유료', N'영문', -1, Getdate());
					INSERT INTO VCP_CUSTOM01.dbo.TBP_EXTERNAL_URL_MASTER
					(CompanyCode, MasterName, ParentCode, SortOrder, UseYN, Description, SiteUrl, CategoryName, MainAgentName, ChargeName, LanguageName, CreateUserID, CreateDate)
					VALUES(N'LG 이노텍', N'SMTECH : 중소기업 기술개발사업', (SELECT Code FROM VCP_CUSTOM01.dbo.TBP_EXTERNAL_URL_MASTER WHERE CompanyCode=N'LG 이노텍' AND ParentCode=0), 340, N'Y', N'분야별 기술전략 로드맵, 정부 지원 과제 확인 등 IT 전반의 기술개발 사업 정보 제공. ', N'https://www.smtech.go.kr/front/main/main.do', N'기술 (Technology)', N'기관/협회', N'유료', N'영문', -1, Getdate());
					INSERT INTO VCP_CUSTOM01.dbo.TBP_EXTERNAL_URL_MASTER
					(CompanyCode, MasterName, ParentCode, SortOrder, UseYN, Description, SiteUrl, CategoryName, MainAgentName, ChargeName, LanguageName, CreateUserID, CreateDate)
					VALUES(N'LG 이노텍', N'Tech Insights : 테크인사이트', (SELECT Code FROM VCP_CUSTOM01.dbo.TBP_EXTERNAL_URL_MASTER WHERE CompanyCode=N'LG 이노텍' AND ParentCode=0), 350, N'Y', N'스마트폰, 태블릿, 스마트와치 등 IT 기기의 글로벌 뉴스, 신제품 리뷰, 제품 스펙 정보 제공. (검색 시 키워드 : TV, MNT, NBPC, Tablet, SP, Display, Panel, LCD, OLED, LGD, SDC)', N'https://www.techinsights.com/', N'기술 (Technology)', N'분석/조사업체', N'유료', N'영문', -1, Getdate());
					INSERT INTO VCP_CUSTOM01.dbo.TBP_EXTERNAL_URL_MASTER
					(CompanyCode, MasterName, ParentCode, SortOrder, UseYN, Description, SiteUrl, CategoryName, MainAgentName, ChargeName, LanguageName, CreateUserID, CreateDate)
					VALUES(N'LG 이노텍', N'The Information', (SELECT Code FROM VCP_CUSTOM01.dbo.TBP_EXTERNAL_URL_MASTER WHERE CompanyCode=N'LG 이노텍' AND ParentCode=0), 360, N'Y', N'해외 Tech 기업 동향 정보 제공.', N'https://www.theinformation.com/', N'산업/시장동향/트렌드 (Trend)', N'신문/언론/잡지사', N'유료', N'영문', -1, Getdate());
					INSERT INTO VCP_CUSTOM01.dbo.TBP_EXTERNAL_URL_MASTER
					(CompanyCode, MasterName, ParentCode, SortOrder, UseYN, Description, SiteUrl, CategoryName, MainAgentName, ChargeName, LanguageName, CreateUserID, CreateDate)
					VALUES(N'LG 이노텍', N'Thomson Reuters Eikon', (SELECT Code FROM VCP_CUSTOM01.dbo.TBP_EXTERNAL_URL_MASTER WHERE CompanyCode=N'LG 이노텍' AND ParentCode=0), 370, N'Y', N'해외 기업 IR , 재무정보 모니터링 및 분석 가능 소프트웨어 제공. 실시간 시장 데이터, 뉴스, 분석 거래 등의 자료 정보 제공.', N'https://eikon.thomsonreuters.com/index.html', N'금융/경제/재무/증권/투자 (Money)', N'분석/조사업체', N'유료', N'영문', -1, Getdate());
					INSERT INTO VCP_CUSTOM01.dbo.TBP_EXTERNAL_URL_MASTER
					(CompanyCode, MasterName, ParentCode, SortOrder, UseYN, Description, SiteUrl, CategoryName, MainAgentName, ChargeName, LanguageName, CreateUserID, CreateDate)
					VALUES(N'LG 이노텍', N'VCX 포럼', (SELECT Code FROM VCP_CUSTOM01.dbo.TBP_EXTERNAL_URL_MASTER WHERE CompanyCode=N'LG 이노텍' AND ParentCode=0), 380, N'Y', N'브랜드별 스마트폰 카메라 성능 및 품질 점수화 및 스마트폰 비교 정보 제공.', N'https://vcx-forum.org/ko/', N'경쟁사/고객사/제품/스펙/리뷰 (Product)', N'분석/조사업체', N'무료', N'영문', -1, Getdate());
					INSERT INTO VCP_CUSTOM01.dbo.TBP_EXTERNAL_URL_MASTER
					(CompanyCode, MasterName, ParentCode, SortOrder, UseYN, Description, SiteUrl, CategoryName, MainAgentName, ChargeName, LanguageName, CreateUserID, CreateDate)
					VALUES(N'LG 이노텍', N'VDCM', (SELECT Code FROM VCP_CUSTOM01.dbo.TBP_EXTERNAL_URL_MASTER WHERE CompanyCode=N'LG 이노텍' AND ParentCode=0), 390, N'Y', N'Digital camera (DSLR/Mirrorless 등) 매거진, 신규 출시 정보 및 제품 리뷰 정보 제공.', N'http://www.vdcm.co.kr/', N'경쟁사/고객사/제품/스펙/리뷰 (Product)', N'신문/언론/잡지사', N'무료', N'국문', -1, Getdate());
					INSERT INTO VCP_CUSTOM01.dbo.TBP_EXTERNAL_URL_MASTER
					(CompanyCode, MasterName, ParentCode, SortOrder, UseYN, Description, SiteUrl, CategoryName, MainAgentName, ChargeName, LanguageName, CreateUserID, CreateDate)
					VALUES(N'LG 이노텍', N'Wall Street Journal : 월 스트리트 저널', (SELECT Code FROM VCP_CUSTOM01.dbo.TBP_EXTERNAL_URL_MASTER WHERE CompanyCode=N'LG 이노텍' AND ParentCode=0), 400, N'Y', N'미국 뉴욕에서 발행하는 조간으로 경제, 비즈니스, 뉴스 등 정보 제공.', N'http://www.wsj.com/asia', N'산업/시장동향/트렌드 (Trend)', N'신문/언론/잡지사', N'유료', N'영문', -1, Getdate());
					INSERT INTO VCP_CUSTOM01.dbo.TBP_EXTERNAL_URL_MASTER
					(CompanyCode, MasterName, ParentCode, SortOrder, UseYN, Description, SiteUrl, CategoryName, MainAgentName, ChargeName, LanguageName, CreateUserID, CreateDate)
					VALUES(N'LG 이노텍', N'Yano Data Bank Service (YDB) - 야노경제연구소', (SELECT Code FROM VCP_CUSTOM01.dbo.TBP_EXTERNAL_URL_MASTER WHERE CompanyCode=N'LG 이노텍' AND ParentCode=0), 410, N'Y', N'화학, 전자, 소재, 에너지, 전지, 자동차 등 종합 산업 시장 분석 자료 제공.', N'http://blog.naver.com/PostList.nhn?blogId=yanokorea', N'산업/시장동향/트렌드 (Trend)', N'분석/조사업체', N'유료', N'영문', -1, Getdate());
				END
			ELSE IF(@company = N'LG 디스플레이')
				BEGIN
					DELETE FROM VCP_CUSTOM01.DBO.TBP_EXTERNAL_URL_MASTER WHERE CompanyCode = @company;
				
					INSERT INTO VCP_CUSTOM01.dbo.TBP_EXTERNAL_URL_MASTER
					(CompanyCode, MasterName, ParentCode, SortOrder, UseYN, Description, SiteUrl, CategoryName, MainAgentName, ChargeName, LanguageName, CreateUserID, CreateDate)
					VALUES(N'LG 디스플레이', N'LG 디스플레이', 0, @sort_no, N'Y', N'ROOT', NULL, NULL, NULL, NULL, NULL, -1, GETDATE());
					INSERT INTO VCP_CUSTOM01.dbo.TBP_EXTERNAL_URL_MASTER
					(CompanyCode, MasterName, ParentCode, SortOrder, UseYN, Description, SiteUrl, CategoryName, MainAgentName, ChargeName, LanguageName, CreateUserID, CreateDate)
					VALUES(N'LG 디스플레이', N'경향신문', (SELECT Code FROM VCP_CUSTOM01.dbo.TBP_EXTERNAL_URL_MASTER WHERE CompanyCode=N'LG 디스플레이' AND ParentCode=0), 10, N'Y', N'국내 신문기사
					: 전자제품 회사 및 전자제품과 관련 기술 등 산업 트렌드에 대한 각종 뉴스 정보 제공
					(검색시 키워드 : TV, MNT, NBPC, Tablet, SP, Display, Panel, LCD, OLED, LGD, SDC)', N'www.khan.co.kr', N'산업/시장동향/트렌드 (Trend)', N'신문/언론/잡지사', N'부분유료', N'국문', -1, Getdate());
					INSERT INTO VCP_CUSTOM01.dbo.TBP_EXTERNAL_URL_MASTER
					(CompanyCode, MasterName, ParentCode, SortOrder, UseYN, Description, SiteUrl, CategoryName, MainAgentName, ChargeName, LanguageName, CreateUserID, CreateDate)
					VALUES(N'LG 디스플레이', N'서울신문', (SELECT Code FROM VCP_CUSTOM01.dbo.TBP_EXTERNAL_URL_MASTER WHERE CompanyCode=N'LG 디스플레이' AND ParentCode=0), 20, N'Y', N'국내 신문기사
					: 전자제품 회사 및 전자제품과 관련 기술 등 산업 트렌드에 대한 각종 뉴스 정보 제공
					(검색시 키워드 : TV, MNT, NBPC, Tablet, SP, Display, Panel, LCD, OLED, LGD, SDC)', N'www.seoul.co.kr', N'산업/시장동향/트렌드 (Trend)', N'신문/언론/잡지사', N'부분유료', N'국문', -1, Getdate());
					INSERT INTO VCP_CUSTOM01.dbo.TBP_EXTERNAL_URL_MASTER
					(CompanyCode, MasterName, ParentCode, SortOrder, UseYN, Description, SiteUrl, CategoryName, MainAgentName, ChargeName, LanguageName, CreateUserID, CreateDate)
					VALUES(N'LG 디스플레이', N'통계청', (SELECT Code FROM VCP_CUSTOM01.dbo.TBP_EXTERNAL_URL_MASTER WHERE CompanyCode=N'LG 디스플레이' AND ParentCode=0), 30, N'Y', N'국내/국제 통계 데이터 제공을 통해 산업 / 마켓 / 트렌드 정보 제공.', N'www.kostat.go.kr', N'산업/시장동향/트렌드 (Trend)', N'기관/협회', N'무료', N'국문', -1, Getdate());
					INSERT INTO VCP_CUSTOM01.dbo.TBP_EXTERNAL_URL_MASTER
					(CompanyCode, MasterName, ParentCode, SortOrder, UseYN, Description, SiteUrl, CategoryName, MainAgentName, ChargeName, LanguageName, CreateUserID, CreateDate)
					VALUES(N'LG 디스플레이', N'파이낸셜 뉴스', (SELECT Code FROM VCP_CUSTOM01.dbo.TBP_EXTERNAL_URL_MASTER WHERE CompanyCode=N'LG 디스플레이' AND ParentCode=0), 40, N'Y', N'국내 신문기사
					: 전자제품 회사 및 전자제품과 관련 기술 등 산업 트렌드에 대한 각종 뉴스 정보 제공
					(검색시 키워드 : TV, MNT, NBPC, Tablet, SP, Display, Panel, LCD, OLED, LGD, SDC)', N'www.fnnews.com', N'산업/시장동향/트렌드 (Trend)', N'신문/언론/잡지사', N'부분유료', N'국문', -1, Getdate());
					INSERT INTO VCP_CUSTOM01.dbo.TBP_EXTERNAL_URL_MASTER
					(CompanyCode, MasterName, ParentCode, SortOrder, UseYN, Description, SiteUrl, CategoryName, MainAgentName, ChargeName, LanguageName, CreateUserID, CreateDate)
					VALUES(N'LG 디스플레이', N'Chicago Tribune - 시카고 트리뷴', (SELECT Code FROM VCP_CUSTOM01.dbo.TBP_EXTERNAL_URL_MASTER WHERE CompanyCode=N'LG 디스플레이' AND ParentCode=0), 50, N'Y', N'해외 신문기사 및 팟캐스트
					: 전자제품 회사 및 전자제품과 관련 기술 등 산업 트렌드에 대한 각종 뉴스 정보 제공
					(검색시 키워드 : TV, MNT, NBPC, Tablet, SP, Display, Panel, LCD, OLED, LGD, SDC)', N'www.chicagotribune.com', N'산업/시장동향/트렌드 (Trend)', N'신문/언론/잡지사', N'부분유료', N'영문', -1, Getdate());
					INSERT INTO VCP_CUSTOM01.dbo.TBP_EXTERNAL_URL_MASTER
					(CompanyCode, MasterName, ParentCode, SortOrder, UseYN, Description, SiteUrl, CategoryName, MainAgentName, ChargeName, LanguageName, CreateUserID, CreateDate)
					VALUES(N'LG 디스플레이', N'Degital Trends - 디지털트랜드', (SELECT Code FROM VCP_CUSTOM01.dbo.TBP_EXTERNAL_URL_MASTER WHERE CompanyCode=N'LG 디스플레이' AND ParentCode=0), 60, N'Y', N'해외 신문기사 및 팟캐스트
					: 전자제품 회사 및 전자제품과 관련 기술 등 산업 트렌드에 대한 각종 뉴스 정보 제공
					(검색시 키워드 : TV, MNT, NBPC, Tablet, SP, Display, Panel, LCD, OLED, LGD, SDC)', N'www.digitaltrends.com', N'산업/시장동향/트렌드 (Trend)', N'신문/언론/잡지사', N'무료', N'영문', -1, Getdate());
					INSERT INTO VCP_CUSTOM01.dbo.TBP_EXTERNAL_URL_MASTER
					(CompanyCode, MasterName, ParentCode, SortOrder, UseYN, Description, SiteUrl, CategoryName, MainAgentName, ChargeName, LanguageName, CreateUserID, CreateDate)
					VALUES(N'LG 디스플레이', N'DIGITALTIMES - 디지털 타임스', (SELECT Code FROM VCP_CUSTOM01.dbo.TBP_EXTERNAL_URL_MASTER WHERE CompanyCode=N'LG 디스플레이' AND ParentCode=0), 70, N'Y', N'국내 신문기사
					: 전자제품 회사 및 전자제품과 관련 기술 등 산업 트렌드에 대한 각종 뉴스 정보 제공
					(검색시 키워드 : TV, MNT, NBPC, Tablet, SP, Display, Panel, LCD, OLED, LGD, SDC)', N'www.dt.co.kr', N'산업/시장동향/트렌드 (Trend)', N'신문/언론/잡지사', N'무료', N'국문', -1, Getdate());
					INSERT INTO VCP_CUSTOM01.dbo.TBP_EXTERNAL_URL_MASTER
					(CompanyCode, MasterName, ParentCode, SortOrder, UseYN, Description, SiteUrl, CategoryName, MainAgentName, ChargeName, LanguageName, CreateUserID, CreateDate)
					VALUES(N'LG 디스플레이', N'Display Daily - 디스플레이 데일리', (SELECT Code FROM VCP_CUSTOM01.dbo.TBP_EXTERNAL_URL_MASTER WHERE CompanyCode=N'LG 디스플레이' AND ParentCode=0), 80, N'Y', N'해외 신문기사 및 팟캐스트. 전자제품 회사 및 전자제품 관련 기술 등 산업 트렌드에 대한 각종 뉴스 정보 제공.
					(검색시 키워드 : TV, MNT, NBPC, Tablet, SP, Display, Panel, LCD, OLED, LGD, SDC)', N'www.displaydaily.com', N'산업/시장동향/트렌드 (Trend)', N'신문/언론/잡지사', N'부분유료', N'영문', -1, Getdate());
					INSERT INTO VCP_CUSTOM01.dbo.TBP_EXTERNAL_URL_MASTER
					(CompanyCode, MasterName, ParentCode, SortOrder, UseYN, Description, SiteUrl, CategoryName, MainAgentName, ChargeName, LanguageName, CreateUserID, CreateDate)
					VALUES(N'LG 디스플레이', N'DSCC', (SELECT Code FROM VCP_CUSTOM01.dbo.TBP_EXTERNAL_URL_MASTER WHERE CompanyCode=N'LG 디스플레이' AND ParentCode=0), 90, N'Y', N'전자 제품에 대한 시장 분석 정보제공.
					(검색 시 키워드 : TV, MNT, NBPC, SP, Display, Industry)', N'www.displaysupplychain.com', N'산업/시장동향/트렌드 (Trend)', N'분석/조사업체', N'부분유료', N'영문', -1, Getdate());
					INSERT INTO VCP_CUSTOM01.dbo.TBP_EXTERNAL_URL_MASTER
					(CompanyCode, MasterName, ParentCode, SortOrder, UseYN, Description, SiteUrl, CategoryName, MainAgentName, ChargeName, LanguageName, CreateUserID, CreateDate)
					VALUES(N'LG 디스플레이', N'Expert Reviews - 엑스퍼트 리뷰', (SELECT Code FROM VCP_CUSTOM01.dbo.TBP_EXTERNAL_URL_MASTER WHERE CompanyCode=N'LG 디스플레이' AND ParentCode=0), 100, N'Y', N'해외 신문기사 및 팟캐스트
					: 전자제품 회사 및 전자제품과 관련 기술 등 산업 트렌드에 대한 각종 뉴스 정보 제공
					(검색시 키워드 : TV, MNT, NBPC, Tablet, SP, Display, Panel, LCD, OLED, LGD, SDC)', N'www.expertreviews.co.uk', N'산업/시장동향/트렌드 (Trend)', N'신문/언론/잡지사', N'무료', N'영문', -1, Getdate());
					INSERT INTO VCP_CUSTOM01.dbo.TBP_EXTERNAL_URL_MASTER
					(CompanyCode, MasterName, ParentCode, SortOrder, UseYN, Description, SiteUrl, CategoryName, MainAgentName, ChargeName, LanguageName, CreateUserID, CreateDate)
					VALUES(N'LG 디스플레이', N'Forbes - 포브즈', (SELECT Code FROM VCP_CUSTOM01.dbo.TBP_EXTERNAL_URL_MASTER WHERE CompanyCode=N'LG 디스플레이' AND ParentCode=0), 110, N'Y', N'해외 신문기사 및 팟캐스트
					: 전자제품 회사 및 전자제품과 관련 기술 등 산업 트렌드에 대한 각종 뉴스 정보 제공
					(검색시 키워드 : TV, MNT, NBPC, Tablet, SP, Display, Panel, LCD, OLED, LGD, SDC)', N'www.forbes.com', N'산업/시장동향/트렌드 (Trend)', N'신문/언론/잡지사', N'무료', N'영문', -1, Getdate());
					INSERT INTO VCP_CUSTOM01.dbo.TBP_EXTERNAL_URL_MASTER
					(CompanyCode, MasterName, ParentCode, SortOrder, UseYN, Description, SiteUrl, CategoryName, MainAgentName, ChargeName, LanguageName, CreateUserID, CreateDate)
					VALUES(N'LG 디스플레이', N'Gfk', (SELECT Code FROM VCP_CUSTOM01.dbo.TBP_EXTERNAL_URL_MASTER WHERE CompanyCode=N'LG 디스플레이' AND ParentCode=0), 120, N'Y', N'전 세계 소비자 제품 및 소매 업계를 위한 세계 최고의 AI 기반 데이터 정보제공.', N'www.gfk.com', N'산업/시장동향/트렌드 (Trend)', N'분석/조사업체', N'부분유료', N'영문', -1, Getdate());
					INSERT INTO VCP_CUSTOM01.dbo.TBP_EXTERNAL_URL_MASTER
					(CompanyCode, MasterName, ParentCode, SortOrder, UseYN, Description, SiteUrl, CategoryName, MainAgentName, ChargeName, LanguageName, CreateUserID, CreateDate)
					VALUES(N'LG 디스플레이', N'Global market insights', (SELECT Code FROM VCP_CUSTOM01.dbo.TBP_EXTERNAL_URL_MASTER WHERE CompanyCode=N'LG 디스플레이' AND ParentCode=0), 130, N'Y', N'전자 제품에 대한 시장 분석 정보 제공.
					(검색 시 키워드 : TV, MNT, NBPC, SP, Display, Industry)', N'www.gminsights.com', N'산업/시장동향/트렌드 (Trend)', N'분석/조사업체', N'부분유료', N'영문', -1, Getdate());
					INSERT INTO VCP_CUSTOM01.dbo.TBP_EXTERNAL_URL_MASTER
					(CompanyCode, MasterName, ParentCode, SortOrder, UseYN, Description, SiteUrl, CategoryName, MainAgentName, ChargeName, LanguageName, CreateUserID, CreateDate)
					VALUES(N'LG 디스플레이', N'Hankookilbo - 한국일보', (SELECT Code FROM VCP_CUSTOM01.dbo.TBP_EXTERNAL_URL_MASTER WHERE CompanyCode=N'LG 디스플레이' AND ParentCode=0), 140, N'Y', N'국내 신문기사
					: 전자제품 회사 및 전자제품과 관련 기술 등 산업 트렌드에 대한 각종 뉴스 정보 제공
					(검색시 키워드 : TV, MNT, NBPC, Tablet, SP, Display, Panel, LCD, OLED, LGD, SDC)', N'www.hankookilbo.com', N'산업/시장동향/트렌드 (Trend)', N'신문/언론/잡지사', N'부분유료', N'국문', -1, Getdate());
					INSERT INTO VCP_CUSTOM01.dbo.TBP_EXTERNAL_URL_MASTER
					(CompanyCode, MasterName, ParentCode, SortOrder, UseYN, Description, SiteUrl, CategoryName, MainAgentName, ChargeName, LanguageName, CreateUserID, CreateDate)
					VALUES(N'LG 디스플레이', N'hankyung - 한국경제', (SELECT Code FROM VCP_CUSTOM01.dbo.TBP_EXTERNAL_URL_MASTER WHERE CompanyCode=N'LG 디스플레이' AND ParentCode=0), 150, N'Y', N'국내 신문기사
					: 전자제품 회사 및 전자제품과 관련 기술 등 산업 트렌드에 대한 각종 뉴스 정보 제공
					(검색시 키워드 : TV, MNT, NBPC, Tablet, SP, Display, Panel, LCD, OLED, LGD, SDC)', N'www.hankyung.com', N'산업/시장동향/트렌드 (Trend)', N'신문/언론/잡지사', N'부분유료', N'국문', -1, Getdate());
					INSERT INTO VCP_CUSTOM01.dbo.TBP_EXTERNAL_URL_MASTER
					(CompanyCode, MasterName, ParentCode, SortOrder, UseYN, Description, SiteUrl, CategoryName, MainAgentName, ChargeName, LanguageName, CreateUserID, CreateDate)
					VALUES(N'LG 디스플레이', N'HERALD - 헤럴드 경제', (SELECT Code FROM VCP_CUSTOM01.dbo.TBP_EXTERNAL_URL_MASTER WHERE CompanyCode=N'LG 디스플레이' AND ParentCode=0), 160, N'Y', N'국내 신문기사
					: 전자제품 회사 및 전자제품과 관련 기술 등 산업 트렌드에 대한 각종 뉴스 정보 제공
					(검색시 키워드 : TV, MNT, NBPC, Tablet, SP, Display, Panel, LCD, OLED, LGD, SDC)', N'biz.heraldcorp.com', N'산업/시장동향/트렌드 (Trend)', N'신문/언론/잡지사', N'부분유료', N'국문', -1, Getdate());
					INSERT INTO VCP_CUSTOM01.dbo.TBP_EXTERNAL_URL_MASTER
					(CompanyCode, MasterName, ParentCode, SortOrder, UseYN, Description, SiteUrl, CategoryName, MainAgentName, ChargeName, LanguageName, CreateUserID, CreateDate)
					VALUES(N'LG 디스플레이', N'JoongAng Ilbo - 중앙일보', (SELECT Code FROM VCP_CUSTOM01.dbo.TBP_EXTERNAL_URL_MASTER WHERE CompanyCode=N'LG 디스플레이' AND ParentCode=0), 170, N'Y', N'국내 신문기사
					: 전자제품 회사 및 전자제품과 관련 기술 등 산업 트렌드에 대한 각종 뉴스 정보 제공
					(검색시 키워드 : TV, MNT, NBPC, Tablet, SP, Display, Panel, LCD, OLED, LGD, SDC)', N'joongang.joins.com', N'산업/시장동향/트렌드 (Trend)', N'신문/언론/잡지사', N'부분유료', N'국문', -1, Getdate());
					INSERT INTO VCP_CUSTOM01.dbo.TBP_EXTERNAL_URL_MASTER
					(CompanyCode, MasterName, ParentCode, SortOrder, UseYN, Description, SiteUrl, CategoryName, MainAgentName, ChargeName, LanguageName, CreateUserID, CreateDate)
					VALUES(N'LG 디스플레이', N'koreaherald - 코리아 헤럴드', (SELECT Code FROM VCP_CUSTOM01.dbo.TBP_EXTERNAL_URL_MASTER WHERE CompanyCode=N'LG 디스플레이' AND ParentCode=0), 180, N'Y', N'국내 신문기사
					: 전자제품 회사 및 전자제품과 관련 기술 등 산업 트렌드에 대한 각종 뉴스 정보 제공
					(검색시 키워드 : TV, MNT, NBPC, Tablet, SP, Display, Panel, LCD, OLED, LGD, SDC)', N'www.koreaherald.com', N'산업/시장동향/트렌드 (Trend)', N'신문/언론/잡지사', N'부분유료', N'국문', -1, Getdate());
					INSERT INTO VCP_CUSTOM01.dbo.TBP_EXTERNAL_URL_MASTER
					(CompanyCode, MasterName, ParentCode, SortOrder, UseYN, Description, SiteUrl, CategoryName, MainAgentName, ChargeName, LanguageName, CreateUserID, CreateDate)
					VALUES(N'LG 디스플레이', N'Market Research Future', (SELECT Code FROM VCP_CUSTOM01.dbo.TBP_EXTERNAL_URL_MASTER WHERE CompanyCode=N'LG 디스플레이' AND ParentCode=0), 190, N'Y', N'Global Research 회사로 IT, 서비스, 전자, 산업기계, 화학, 자동차, 의료, 바이오, 에너지 등 정보 제공.', N'www.marketresearchfuture.com', N'산업/시장동향/트렌드 (Trend)', N'분석/조사업체', N'무료', N'영문', -1, Getdate());
					INSERT INTO VCP_CUSTOM01.dbo.TBP_EXTERNAL_URL_MASTER
					(CompanyCode, MasterName, ParentCode, SortOrder, UseYN, Description, SiteUrl, CategoryName, MainAgentName, ChargeName, LanguageName, CreateUserID, CreateDate)
					VALUES(N'LG 디스플레이', N'Markets and Markets', (SELECT Code FROM VCP_CUSTOM01.dbo.TBP_EXTERNAL_URL_MASTER WHERE CompanyCode=N'LG 디스플레이' AND ParentCode=0), 200, N'Y', N'산업시장 동향분석 관련 정보제공.', N'www.marketsandmarkets.com', N'산업/시장동향/트렌드 (Trend)', N'분석/조사업체', N'무료', N'영문', -1, Getdate());
					INSERT INTO VCP_CUSTOM01.dbo.TBP_EXTERNAL_URL_MASTER
					(CompanyCode, MasterName, ParentCode, SortOrder, UseYN, Description, SiteUrl, CategoryName, MainAgentName, ChargeName, LanguageName, CreateUserID, CreateDate)
					VALUES(N'LG 디스플레이', N'MBN - 매일경제', (SELECT Code FROM VCP_CUSTOM01.dbo.TBP_EXTERNAL_URL_MASTER WHERE CompanyCode=N'LG 디스플레이' AND ParentCode=0), 210, N'Y', N'국내 신문기사
					: 전자제품 회사 및 전자제품과 관련 기술 등 산업 트렌드에 대한 각종 뉴스 정보 제공
					(검색시 키워드 : TV, MNT, NBPC, Tablet, SP, Display, Panel, LCD, OLED, LGD, SDC)', N'www.mk.co.kr', N'산업/시장동향/트렌드 (Trend)', N'신문/언론/잡지사', N'부분유료', N'국문', -1, Getdate());
					INSERT INTO VCP_CUSTOM01.dbo.TBP_EXTERNAL_URL_MASTER
					(CompanyCode, MasterName, ParentCode, SortOrder, UseYN, Description, SiteUrl, CategoryName, MainAgentName, ChargeName, LanguageName, CreateUserID, CreateDate)
					VALUES(N'LG 디스플레이', N'MT - 머니투데이', (SELECT Code FROM VCP_CUSTOM01.dbo.TBP_EXTERNAL_URL_MASTER WHERE CompanyCode=N'LG 디스플레이' AND ParentCode=0), 220, N'Y', N'국내 신문기사
					: 전자제품 회사 및 전자제품과 관련 기술 등 산업 트렌드에 대한 각종 뉴스 정보 제공
					(검색시 키워드 : TV, MNT, NBPC, Tablet, SP, Display, Panel, LCD, OLED, LGD, SDC)', N'www.mt.co.kr', N'산업/시장동향/트렌드 (Trend)', N'신문/언론/잡지사', N'부분유료', N'국문', -1, Getdate());
					INSERT INTO VCP_CUSTOM01.dbo.TBP_EXTERNAL_URL_MASTER
					(CompanyCode, MasterName, ParentCode, SortOrder, UseYN, Description, SiteUrl, CategoryName, MainAgentName, ChargeName, LanguageName, CreateUserID, CreateDate)
					VALUES(N'LG 디스플레이', N'munhwa - 문화일보', (SELECT Code FROM VCP_CUSTOM01.dbo.TBP_EXTERNAL_URL_MASTER WHERE CompanyCode=N'LG 디스플레이' AND ParentCode=0), 230, N'Y', N'국내 신문기사
					: 전자제품 회사 및 전자제품과 관련 기술 등 산업 트렌드에 대한 각종 뉴스 정보 제공
					(검색시 키워드 : TV, MNT, NBPC, Tablet, SP, Display, Panel, LCD, OLED, LGD, SDC)', N'www.munhwa.com', N'산업/시장동향/트렌드 (Trend)', N'신문/언론/잡지사', N'부분유료', N'국문', -1, Getdate());
					INSERT INTO VCP_CUSTOM01.dbo.TBP_EXTERNAL_URL_MASTER
					(CompanyCode, MasterName, ParentCode, SortOrder, UseYN, Description, SiteUrl, CategoryName, MainAgentName, ChargeName, LanguageName, CreateUserID, CreateDate)
					VALUES(N'LG 디스플레이', N'Nikkei Asian - 닛케이 아시안', (SELECT Code FROM VCP_CUSTOM01.dbo.TBP_EXTERNAL_URL_MASTER WHERE CompanyCode=N'LG 디스플레이' AND ParentCode=0), 240, N'Y', N'해외 신문기사 및 팟캐스트
					: 전자제품 회사 및 전자제품과 관련 기술 등 산업 트렌드에 대한 각종 뉴스 정보 제공
					(검색시 키워드 : TV, MNT, NBPC, Tablet, SP, Display, Panel, LCD, OLED, LGD, SDC)', N'https://asia.nikkei.com/', N'산업/시장동향/트렌드 (Trend)', N'신문/언론/잡지사', N'무료', N'영문', -1, Getdate());
					INSERT INTO VCP_CUSTOM01.dbo.TBP_EXTERNAL_URL_MASTER
					(CompanyCode, MasterName, ParentCode, SortOrder, UseYN, Description, SiteUrl, CategoryName, MainAgentName, ChargeName, LanguageName, CreateUserID, CreateDate)
					VALUES(N'LG 디스플레이', N'NPD', (SELECT Code FROM VCP_CUSTOM01.dbo.TBP_EXTERNAL_URL_MASTER WHERE CompanyCode=N'LG 디스플레이' AND ParentCode=0), 250, N'Y', N'시장 분석 정보 제공.
					(검색 시 키워드 : SP, Auto, China, Panel, Display)', N'www.npd.com', N'산업/시장동향/트렌드 (Trend)', N'분석/조사업체', N'부분유료', N'영문', -1, Getdate());
					INSERT INTO VCP_CUSTOM01.dbo.TBP_EXTERNAL_URL_MASTER
					(CompanyCode, MasterName, ParentCode, SortOrder, UseYN, Description, SiteUrl, CategoryName, MainAgentName, ChargeName, LanguageName, CreateUserID, CreateDate)
					VALUES(N'LG 디스플레이', N'OECD', (SELECT Code FROM VCP_CUSTOM01.dbo.TBP_EXTERNAL_URL_MASTER WHERE CompanyCode=N'LG 디스플레이' AND ParentCode=0), 260, N'Y', N'경제협력개발기구 홈페이지로, 국제/국가별 경제, 뉴스, 데이터, 교육 등 다양한 분야에 대한 자료 제공.', N'www.oecd.org', N'산업/시장동향/트렌드 (Trend)', N'기관/협회', N'무료', N'영문', -1, Getdate());
					INSERT INTO VCP_CUSTOM01.dbo.TBP_EXTERNAL_URL_MASTER
					(CompanyCode, MasterName, ParentCode, SortOrder, UseYN, Description, SiteUrl, CategoryName, MainAgentName, ChargeName, LanguageName, CreateUserID, CreateDate)
					VALUES(N'LG 디스플레이', N'OLED info', (SELECT Code FROM VCP_CUSTOM01.dbo.TBP_EXTERNAL_URL_MASTER WHERE CompanyCode=N'LG 디스플레이' AND ParentCode=0), 270, N'Y', N'해외 신문기사 및 팟캐스트
					: 전자제품 회사 및 전자제품과 관련 기술 등 산업 트렌드에 대한 각종 뉴스 정보 제공
					(검색시 키워드 : TV, MNT, NBPC, Tablet, SP, Display, Panel, LCD, OLED, LGD, SDC)', N'www.oled-info.com', N'산업/시장동향/트렌드 (Trend)', N'신문/언론/잡지사', N'부분유료', N'영문', -1, Getdate());
					INSERT INTO VCP_CUSTOM01.dbo.TBP_EXTERNAL_URL_MASTER
					(CompanyCode, MasterName, ParentCode, SortOrder, UseYN, Description, SiteUrl, CategoryName, MainAgentName, ChargeName, LanguageName, CreateUserID, CreateDate)
					VALUES(N'LG 디스플레이', N'Phone Mantra-폰 만트라', (SELECT Code FROM VCP_CUSTOM01.dbo.TBP_EXTERNAL_URL_MASTER WHERE CompanyCode=N'LG 디스플레이' AND ParentCode=0), 280, N'Y', N'해외 신문기사 및 팟캐스트
					: 전자제품 회사 및 전자제품과 관련 기술 등 산업 트렌드에 대한 각종 뉴스 정보 제공
					(검색시 키워드 : TV, MNT, NBPC, Tablet, SP, Display, Panel, LCD, OLED, LGD, SDC)', N'www.phonemantra.com', N'산업/시장동향/트렌드 (Trend)', N'신문/언론/잡지사', N'무료', N'영문', -1, Getdate());
					INSERT INTO VCP_CUSTOM01.dbo.TBP_EXTERNAL_URL_MASTER
					(CompanyCode, MasterName, ParentCode, SortOrder, UseYN, Description, SiteUrl, CategoryName, MainAgentName, ChargeName, LanguageName, CreateUserID, CreateDate)
					VALUES(N'LG 디스플레이', N'Research and Markets', (SELECT Code FROM VCP_CUSTOM01.dbo.TBP_EXTERNAL_URL_MASTER WHERE CompanyCode=N'LG 디스플레이' AND ParentCode=0), 290, N'Y', N'lobal Research 회사로 IT, 서비스, 전자, 산업기계, 화학, 자동차, 의료, 바이오, 에너지 등 정보 제공.', N'www.researchandmarkets.com', N'산업/시장동향/트렌드 (Trend)', N'분석/조사업체', N'무료', N'영문', -1, Getdate());
					INSERT INTO VCP_CUSTOM01.dbo.TBP_EXTERNAL_URL_MASTER
					(CompanyCode, MasterName, ParentCode, SortOrder, UseYN, Description, SiteUrl, CategoryName, MainAgentName, ChargeName, LanguageName, CreateUserID, CreateDate)
					VALUES(N'LG 디스플레이', N'Sedaily - 서울경제', (SELECT Code FROM VCP_CUSTOM01.dbo.TBP_EXTERNAL_URL_MASTER WHERE CompanyCode=N'LG 디스플레이' AND ParentCode=0), 300, N'Y', N'국내 신문기사
					: 전자제품 회사 및 전자제품과 관련 기술 등 산업 트렌드에 대한 각종 뉴스 정보 제공
					(검색시 키워드 : TV, MNT, NBPC, Tablet, SP, Display, Panel, LCD, OLED, LGD, SDC)', N'www.sedaily.com', N'산업/시장동향/트렌드 (Trend)', N'신문/언론/잡지사', N'부분유료', N'국문', -1, Getdate());
					INSERT INTO VCP_CUSTOM01.dbo.TBP_EXTERNAL_URL_MASTER
					(CompanyCode, MasterName, ParentCode, SortOrder, UseYN, Description, SiteUrl, CategoryName, MainAgentName, ChargeName, LanguageName, CreateUserID, CreateDate)
					VALUES(N'LG 디스플레이', N'Sigmaintell', (SELECT Code FROM VCP_CUSTOM01.dbo.TBP_EXTERNAL_URL_MASTER WHERE CompanyCode=N'LG 디스플레이' AND ParentCode=0), 310, N'Y', N'시장 분석 정보 제공.
					(검색 시 키워드 : SP, Auto, China, Panel, Display)', N'www.sigmaintell.com', N'산업/시장동향/트렌드 (Trend)', N'분석/조사업체', N'부분유료', N'중문', -1, Getdate());
					INSERT INTO VCP_CUSTOM01.dbo.TBP_EXTERNAL_URL_MASTER
					(CompanyCode, MasterName, ParentCode, SortOrder, UseYN, Description, SiteUrl, CategoryName, MainAgentName, ChargeName, LanguageName, CreateUserID, CreateDate)
					VALUES(N'LG 디스플레이', N'Tech Radar - 테크 레이더', (SELECT Code FROM VCP_CUSTOM01.dbo.TBP_EXTERNAL_URL_MASTER WHERE CompanyCode=N'LG 디스플레이' AND ParentCode=0), 320, N'Y', N'해외 신문기사 및 팟캐스트. PC, TVs, Mobile, Phone, Laptops, Cameras 등 IT 제품 전문 리뷰, 전자제품 회사 및 전자제품 관련 기술 등 산업 트렌드에 대한 각종 뉴스 정보 제공.
					(검색시 키워드 : TV, MNT, NBPC, Tablet, SP, Display, Panel, LCD, OLED, LGD, SDC)', N'www.techradar.com', N'산업/시장동향/트렌드 (Trend)', N'신문/언론/잡지사', N'무료', N'영문', -1, Getdate());
					INSERT INTO VCP_CUSTOM01.dbo.TBP_EXTERNAL_URL_MASTER
					(CompanyCode, MasterName, ParentCode, SortOrder, UseYN, Description, SiteUrl, CategoryName, MainAgentName, ChargeName, LanguageName, CreateUserID, CreateDate)
					VALUES(N'LG 디스플레이', N'TheKoreaTimes - 코리아 타임스', (SELECT Code FROM VCP_CUSTOM01.dbo.TBP_EXTERNAL_URL_MASTER WHERE CompanyCode=N'LG 디스플레이' AND ParentCode=0), 330, N'Y', N'국내 신문기사
					: 전자제품 회사 및 전자제품과 관련 기술 등 산업 트렌드에 대한 각종 뉴스 정보 제공
					(검색시 키워드 : TV, MNT, NBPC, Tablet, SP, Display, Panel, LCD, OLED, LGD, SDC)', N'www.koreatimes.co.kr', N'산업/시장동향/트렌드 (Trend)', N'신문/언론/잡지사', N'부분유료', N'영문', -1, Getdate());
					INSERT INTO VCP_CUSTOM01.dbo.TBP_EXTERNAL_URL_MASTER
					(CompanyCode, MasterName, ParentCode, SortOrder, UseYN, Description, SiteUrl, CategoryName, MainAgentName, ChargeName, LanguageName, CreateUserID, CreateDate)
					VALUES(N'LG 디스플레이', N'Tom''s Guide - 톰스가이드', (SELECT Code FROM VCP_CUSTOM01.dbo.TBP_EXTERNAL_URL_MASTER WHERE CompanyCode=N'LG 디스플레이' AND ParentCode=0), 340, N'Y', N'해외 신문기사 및 팟캐스트
					: 전자제품 회사 및 전자제품과 관련 기술 등 산업 트렌드에 대한 각종 뉴스 정보 제공
					(검색시 키워드 : TV, MNT, NBPC, Tablet, SP, Display, Panel, LCD, OLED, LGD, SDC)', N'www.tomsguide.com', N'산업/시장동향/트렌드 (Trend)', N'신문/언론/잡지사', N'무료', N'영문', -1, Getdate());
					INSERT INTO VCP_CUSTOM01.dbo.TBP_EXTERNAL_URL_MASTER
					(CompanyCode, MasterName, ParentCode, SortOrder, UseYN, Description, SiteUrl, CategoryName, MainAgentName, ChargeName, LanguageName, CreateUserID, CreateDate)
					VALUES(N'LG 디스플레이', N'TRENDBIRD-트렌드 버드', (SELECT Code FROM VCP_CUSTOM01.dbo.TBP_EXTERNAL_URL_MASTER WHERE CompanyCode=N'LG 디스플레이' AND ParentCode=0), 350, N'Y', N'Global 시장 및 기술, 산업에 대한 트렌드 분석 정보제공.(검색 시 키워드 : Trend, Industry)', N'http://www.trendbird.biz', N'산업/시장동향/트렌드 (Trend)', N'분석/조사업체', N'부분유료', N'영문', -1, Getdate());
					INSERT INTO VCP_CUSTOM01.dbo.TBP_EXTERNAL_URL_MASTER
					(CompanyCode, MasterName, ParentCode, SortOrder, UseYN, Description, SiteUrl, CategoryName, MainAgentName, ChargeName, LanguageName, CreateUserID, CreateDate)
					VALUES(N'LG 디스플레이', N'Trendforce', (SELECT Code FROM VCP_CUSTOM01.dbo.TBP_EXTERNAL_URL_MASTER WHERE CompanyCode=N'LG 디스플레이' AND ParentCode=0), 360, N'Y', N'시장 분석 정보 제공.
					(검색 시 키워드 : Display, Panel, TV, MNT, NBPC, SP, LED)', N'www.trendforce.com', N'산업/시장동향/트렌드 (Trend)', N'분석/조사업체', N'부분유료', N'영문', -1, Getdate());
					INSERT INTO VCP_CUSTOM01.dbo.TBP_EXTERNAL_URL_MASTER
					(CompanyCode, MasterName, ParentCode, SortOrder, UseYN, Description, SiteUrl, CategoryName, MainAgentName, ChargeName, LanguageName, CreateUserID, CreateDate)
					VALUES(N'LG 디스플레이', N'What Hi-Fi - 왓 하이 파이', (SELECT Code FROM VCP_CUSTOM01.dbo.TBP_EXTERNAL_URL_MASTER WHERE CompanyCode=N'LG 디스플레이' AND ParentCode=0), 370, N'Y', N'해외 신문기사 및 팟캐스트
					: 전자제품 회사 및 전자제품과 관련 기술 등 산업 트렌드에 대한 각종 뉴스 정보 제공
					(검색시 키워드 : TV, MNT, NBPC, Tablet, SP, Display, Panel, LCD, OLED, LGD, SDC)', N'www.whathifi.com', N'산업/시장동향/트렌드 (Trend)', N'신문/언론/잡지사', N'무료', N'영문', -1, Getdate());
					INSERT INTO VCP_CUSTOM01.dbo.TBP_EXTERNAL_URL_MASTER
					(CompanyCode, MasterName, ParentCode, SortOrder, UseYN, Description, SiteUrl, CategoryName, MainAgentName, ChargeName, LanguageName, CreateUserID, CreateDate)
					VALUES(N'LG 디스플레이', N'ZDNet - 지디넷코리아', (SELECT Code FROM VCP_CUSTOM01.dbo.TBP_EXTERNAL_URL_MASTER WHERE CompanyCode=N'LG 디스플레이' AND ParentCode=0), 380, N'Y', N'전자, 정보통신, 최신 IT 트렌드, 비지니스 기술 정보 등 전자 업계 전반의 기사 제공.', N'http://www.zdnet.co.kr', N'산업/시장동향/트렌드 (Trend)', N'신문/언론/잡지사', N'무료', N'국문', -1, Getdate());
				END
			ELSE IF(@company = N'LG 전자')
				BEGIN
					DELETE FROM VCP_CUSTOM01.DBO.TBP_EXTERNAL_URL_MASTER WHERE CompanyCode = @company;
					DELETE FROM VCP_MAIN.dbo.TBP_EXTERNAL_URL_ACCESS;						
				
					INSERT INTO VCP_CUSTOM01.dbo.TBP_EXTERNAL_URL_MASTER
					(CompanyCode, MasterName, ParentCode, SortOrder, UseYN, Description, SiteUrl, CategoryName, MainAgentName, ChargeName, LanguageName, CreateUserID, CreateDate)
					VALUES(N'LG 전자', N'LG 전자', 0, @sort_no, N'Y', N'ROOT', NULL, NULL, NULL, NULL, NULL, -1, GETDATE());
				
					INSERT INTO VCP_CUSTOM01.DBO.TBP_EXTERNAL_URL_MASTER (CompanyCode, MasterName, ParentCode, SortOrder, UseYN, Description, SiteUrl, CategoryName, MainAgentName, ChargeName, LanguageName, CreateUserID, CreateDate) VALUES (N'LG 전자',N'Ministry of Industry and Information Technology of the People''s Republic of China - 중국공업정보화부',(SELECT Code FROM VCP_CUSTOM01.dbo.TBP_EXTERNAL_URL_MASTER WHERE CompanyCode=N'LG 전자' AND ParentCode=0),930,'Y',N'중국 내 신에너지차에 대한 NEV에 대한 정부 보조금, 지방정부의 보조금, NEV 기준 등 정책 제공.','https://www.miit.gov.cn/',N'규제/정책/인증/법률 (Legal)',N'기관/협회',N'무료',N'중문',-1, Getdate()); 
					INSERT INTO VCP_CUSTOM01.DBO.TBP_EXTERNAL_URL_MASTER (CompanyCode, MasterName, ParentCode, SortOrder, UseYN, Description, SiteUrl, CategoryName, MainAgentName, ChargeName, LanguageName, CreateUserID, CreateDate) VALUES (N'LG 전자',N'블로터',(SELECT Code FROM VCP_CUSTOM01.dbo.TBP_EXTERNAL_URL_MASTER WHERE CompanyCode=N'LG 전자' AND ParentCode=0),90,'Y',N'블로터(BLOTER)는 리포터(Reporter)와 블로거(Blogger)가 결합된 개념으로 블로거의 분석 능력과 리포터의 현장 취재력이 결합된 새로운 저널리스트를 뜻함. 사회/경제 뉴스 트렌드 콘텐츠 제공.','http://www.bloter.net',N'산업/시장동향/트렌드 (Trend)',N'신문/언론/잡지사',N'무료',N'국문',-1, Getdate()); 
					INSERT INTO VCP_CUSTOM01.DBO.TBP_EXTERNAL_URL_MASTER (CompanyCode, MasterName, ParentCode, SortOrder, UseYN, Description, SiteUrl, CategoryName, MainAgentName, ChargeName, LanguageName, CreateUserID, CreateDate) VALUES (N'LG 전자',N'BobaeDream : 자동차뉴스 - 보배드림',(SELECT Code FROM VCP_CUSTOM01.dbo.TBP_EXTERNAL_URL_MASTER WHERE CompanyCode=N'LG 전자' AND ParentCode=0),410,'Y',N'자동차 업계 tier1 으로서의 자사 정보 제공.','http://www.bobaedream.co.kr/list?code=nnews ',N'경쟁사/고객사/제품/스펙/리뷰 (Product)',N'SNS/커뮤니티',N'무료',N'국문',-1, Getdate()); 
					INSERT INTO VCP_CUSTOM01.DBO.TBP_EXTERNAL_URL_MASTER (CompanyCode, MasterName, ParentCode, SortOrder, UseYN, Description, SiteUrl, CategoryName, MainAgentName, ChargeName, LanguageName, CreateUserID, CreateDate) VALUES (N'LG 전자',N'United States Department of Energy -미국 에너지부',(SELECT Code FROM VCP_CUSTOM01.dbo.TBP_EXTERNAL_URL_MASTER WHERE CompanyCode=N'LG 전자' AND ParentCode=0),1340,'Y',N'미국 정부 부서로 에너지 관련 정책 정보 제공.','https://www.energy.gov/',N'규제/정책/인증/법률 (Legal)',N'기관/협회',N'무료',N'영문',-1, Getdate()); 
					INSERT INTO VCP_CUSTOM01.DBO.TBP_EXTERNAL_URL_MASTER (CompanyCode, MasterName, ParentCode, SortOrder, UseYN, Description, SiteUrl, CategoryName, MainAgentName, ChargeName, LanguageName, CreateUserID, CreateDate) VALUES (N'LG 전자',N'다음 자동차',(SELECT Code FROM VCP_CUSTOM01.dbo.TBP_EXTERNAL_URL_MASTER WHERE CompanyCode=N'LG 전자' AND ParentCode=0),40,'Y',N'자동차 업계 전반의 뉴스 기사 및 정보 제공.','https://auto.daum.net',N'산업/시장동향/트렌드 (Trend)',N'신문/언론/잡지사',N'무료',N'국문',-1, Getdate()); 
					INSERT INTO VCP_CUSTOM01.DBO.TBP_EXTERNAL_URL_MASTER (CompanyCode, MasterName, ParentCode, SortOrder, UseYN, Description, SiteUrl, CategoryName, MainAgentName, ChargeName, LanguageName, CreateUserID, CreateDate) VALUES (N'LG 전자',N'닛케이',(SELECT Code FROM VCP_CUSTOM01.dbo.TBP_EXTERNAL_URL_MASTER WHERE CompanyCode=N'LG 전자' AND ParentCode=0),20,'Y',N'일본 자동차 관련 정보 제공.','https://tech.nikkeibp.co.jp',N'산업/시장동향/트렌드 (Trend)',N'신문/언론/잡지사',N'부분유료',N'일문',-1, Getdate()); 
					INSERT INTO VCP_CUSTOM01.DBO.TBP_EXTERNAL_URL_MASTER (CompanyCode, MasterName, ParentCode, SortOrder, UseYN, Description, SiteUrl, CategoryName, MainAgentName, ChargeName, LanguageName, CreateUserID, CreateDate) VALUES (N'LG 전자',N'SAE International - 국제자동차기술자협회',(SELECT Code FROM VCP_CUSTOM01.dbo.TBP_EXTERNAL_URL_MASTER WHERE CompanyCode=N'LG 전자' AND ParentCode=0),1140,'Y',N'미국 자동차 관련 정보 제공.','https://www.sae.org',N'산업/시장동향/트렌드 (Trend)',N'기관/협회',N'부분유료',N'영문',-1, Getdate()); 
					INSERT INTO VCP_CUSTOM01.DBO.TBP_EXTERNAL_URL_MASTER (CompanyCode, MasterName, ParentCode, SortOrder, UseYN, Description, SiteUrl, CategoryName, MainAgentName, ChargeName, LanguageName, CreateUserID, CreateDate) VALUES (N'LG 전자',N'U.S. government fuel economy information',(SELECT Code FROM VCP_CUSTOM01.dbo.TBP_EXTERNAL_URL_MASTER WHERE CompanyCode=N'LG 전자' AND ParentCode=0),1330,'Y',N'차량의 연비 정보 및 연비 관련 정보 제공.','https://www.fueleconomy.gov/',N'경쟁사/고객사/제품/스펙/리뷰 (Product)',N'기관/협회',N'무료',N'영문',-1, Getdate()); 
					INSERT INTO VCP_CUSTOM01.DBO.TBP_EXTERNAL_URL_MASTER (CompanyCode, MasterName, ParentCode, SortOrder, UseYN, Description, SiteUrl, CategoryName, MainAgentName, ChargeName, LanguageName, CreateUserID, CreateDate) VALUES (N'LG 전자',N'United States Environmental Protection Agency - 미국 환경보호청',(SELECT Code FROM VCP_CUSTOM01.dbo.TBP_EXTERNAL_URL_MASTER WHERE CompanyCode=N'LG 전자' AND ParentCode=0),1350,'Y',N'미국 환경에 관련한 모든 입법 제정 정보 제공.','https://www.epa.gov/',N'규제/정책/인증/법률 (Legal)',N'기관/협회',N'무료',N'영문',-1, Getdate()); 
					INSERT INTO VCP_CUSTOM01.DBO.TBP_EXTERNAL_URL_MASTER (CompanyCode, MasterName, ParentCode, SortOrder, UseYN, Description, SiteUrl, CategoryName, MainAgentName, ChargeName, LanguageName, CreateUserID, CreateDate) VALUES (N'LG 전자',N'California Air Resources Board - 캘리포니아 대기자원위원회',(SELECT Code FROM VCP_CUSTOM01.dbo.TBP_EXTERNAL_URL_MASTER WHERE CompanyCode=N'LG 전자' AND ParentCode=0),440,'Y',N'캘리포니아 대기 자원위원회로 자동차 배출가스 기준 및 친환경 자동차 판매 목표 정보 제공.','https://ww2.arb.ca.gov/',N'규제/정책/인증/법률 (Legal)',N'기관/협회',N'무료',N'영문',-1, Getdate()); 
					INSERT INTO VCP_CUSTOM01.DBO.TBP_EXTERNAL_URL_MASTER (CompanyCode, MasterName, ParentCode, SortOrder, UseYN, Description, SiteUrl, CategoryName, MainAgentName, ChargeName, LanguageName, CreateUserID, CreateDate) VALUES (N'LG 전자',N'Roadshow (CNET)',(SELECT Code FROM VCP_CUSTOM01.dbo.TBP_EXTERNAL_URL_MASTER WHERE CompanyCode=N'LG 전자' AND ParentCode=0),1120,'Y',N'자동차 관련 일반 정보 제공.','https://www.cnet.com/roadshow',N'경쟁사/고객사/제품/스펙/리뷰 (Product)',N'신문/언론/잡지사',N'무료',N'영문',-1, Getdate()); 
					INSERT INTO VCP_CUSTOM01.DBO.TBP_EXTERNAL_URL_MASTER (CompanyCode, MasterName, ParentCode, SortOrder, UseYN, Description, SiteUrl, CategoryName, MainAgentName, ChargeName, LanguageName, CreateUserID, CreateDate) VALUES (N'LG 전자',N'National Highway Traffic Safety Administration - 미국 도로교통안전국',(SELECT Code FROM VCP_CUSTOM01.dbo.TBP_EXTERNAL_URL_MASTER WHERE CompanyCode=N'LG 전자' AND ParentCode=0),980,'Y',N'미국 도로교통 안전국으로 미국 내 판매되는 자동차의 에너지 효율 정보 제공.','https://one.nhtsa.gov/',N'경쟁사/고객사/제품/스펙/리뷰 (Product)',N'기관/협회',N'무료',N'영문',-1, Getdate()); 
					INSERT INTO VCP_CUSTOM01.DBO.TBP_EXTERNAL_URL_MASTER (CompanyCode, MasterName, ParentCode, SortOrder, UseYN, Description, SiteUrl, CategoryName, MainAgentName, ChargeName, LanguageName, CreateUserID, CreateDate) VALUES (N'LG 전자',N'MSN Autos : News',(SELECT Code FROM VCP_CUSTOM01.dbo.TBP_EXTERNAL_URL_MASTER WHERE CompanyCode=N'LG 전자' AND ParentCode=0),950,'Y',N'포털 업체로 Automotive 관련 기사 제공.','https://www.msn.com/en-us/autos/news/',N'산업/시장동향/트렌드 (Trend)',N'신문/언론/잡지사',N'무료',N'영문',-1, Getdate()); 
					INSERT INTO VCP_CUSTOM01.DBO.TBP_EXTERNAL_URL_MASTER (CompanyCode, MasterName, ParentCode, SortOrder, UseYN, Description, SiteUrl, CategoryName, MainAgentName, ChargeName, LanguageName, CreateUserID, CreateDate) VALUES (N'LG 전자',N'MotorTrend',(SELECT Code FROM VCP_CUSTOM01.dbo.TBP_EXTERNAL_URL_MASTER WHERE CompanyCode=N'LG 전자' AND ParentCode=0),940,'Y',N'Automotive 관련 잡지사로 자동차 관련 콘텐츠 정보 제공.','https://www.motortrend.com',N'산업/시장동향/트렌드 (Trend)',N'신문/언론/잡지사',N'무료',N'영문',-1, Getdate()); 
					INSERT INTO VCP_CUSTOM01.DBO.TBP_EXTERNAL_URL_MASTER (CompanyCode, MasterName, ParentCode, SortOrder, UseYN, Description, SiteUrl, CategoryName, MainAgentName, ChargeName, LanguageName, CreateUserID, CreateDate) VALUES (N'LG 전자',N'모터트렌드',(SELECT Code FROM VCP_CUSTOM01.dbo.TBP_EXTERNAL_URL_MASTER WHERE CompanyCode=N'LG 전자' AND ParentCode=0),80,'Y',N'Automotive 관련 잡지사로 자동차 관련 콘텐츠 정보 제공.','https://www.motortrendkorea.com',N'산업/시장동향/트렌드 (Trend)',N'신문/언론/잡지사',N'무료',N'국문',-1, Getdate()); 
					INSERT INTO VCP_CUSTOM01.DBO.TBP_EXTERNAL_URL_MASTER (CompanyCode, MasterName, ParentCode, SortOrder, UseYN, Description, SiteUrl, CategoryName, MainAgentName, ChargeName, LanguageName, CreateUserID, CreateDate) VALUES (N'LG 전자',N'EV Driven',(SELECT Code FROM VCP_CUSTOM01.dbo.TBP_EXTERNAL_URL_MASTER WHERE CompanyCode=N'LG 전자' AND ParentCode=0),630,'Y',N'xEV 구동 관련 뉴스 및 업체 정보 제공.','https://www.evdriven.com',N'산업/시장동향/트렌드 (Trend)',N'신문/언론/잡지사',N'무료',N'영문',-1, Getdate()); 
					INSERT INTO VCP_CUSTOM01.DBO.TBP_EXTERNAL_URL_MASTER (CompanyCode, MasterName, ParentCode, SortOrder, UseYN, Description, SiteUrl, CategoryName, MainAgentName, ChargeName, LanguageName, CreateUserID, CreateDate) VALUES (N'LG 전자',N'European Automobile Manufacturers Associations - 유럽자동차제조협회',(SELECT Code FROM VCP_CUSTOM01.dbo.TBP_EXTERNAL_URL_MASTER WHERE CompanyCode=N'LG 전자' AND ParentCode=0),620,'Y',N'유럽 지역 자동차 산업 관련 정보 제공.','http://www.acea.be/',N'산업/시장동향/트렌드 (Trend)',N'기관/협회',N'무료',N'영문',-1, Getdate()); 
					INSERT INTO VCP_CUSTOM01.DBO.TBP_EXTERNAL_URL_MASTER (CompanyCode, MasterName, ParentCode, SortOrder, UseYN, Description, SiteUrl, CategoryName, MainAgentName, ChargeName, LanguageName, CreateUserID, CreateDate) VALUES (N'LG 전자',N'CNET Korea',(SELECT Code FROM VCP_CUSTOM01.dbo.TBP_EXTERNAL_URL_MASTER WHERE CompanyCode=N'LG 전자' AND ParentCode=0),460,'Y',N'자동차 관련 일반 정보 제공.','https://www.cnet.co.kr',N'산업/시장동향/트렌드 (Trend)',N'신문/언론/잡지사',N'무료',N'국문',-1, Getdate()); 
					INSERT INTO VCP_CUSTOM01.DBO.TBP_EXTERNAL_URL_MASTER (CompanyCode, MasterName, ParentCode, SortOrder, UseYN, Description, SiteUrl, CategoryName, MainAgentName, ChargeName, LanguageName, CreateUserID, CreateDate) VALUES (N'LG 전자',N'AVING : 뉴스 - 에이빙',(SELECT Code FROM VCP_CUSTOM01.dbo.TBP_EXTERNAL_URL_MASTER WHERE CompanyCode=N'LG 전자' AND ParentCode=0),380,'Y',N'전자제품 전반의 리뷰, 뉴스 정보 제공.','http://kr.aving.net/news/index.php?mn_name=news&cateId=01',N'경쟁사/고객사/제품/스펙/리뷰 (Product)',N'신문/언론/잡지사',N'무료',N'국문',-1, Getdate()); 
					INSERT INTO VCP_CUSTOM01.DBO.TBP_EXTERNAL_URL_MASTER (CompanyCode, MasterName, ParentCode, SortOrder, UseYN, Description, SiteUrl, CategoryName, MainAgentName, ChargeName, LanguageName, CreateUserID, CreateDate) VALUES (N'LG 전자',N'Automotive world',(SELECT Code FROM VCP_CUSTOM01.dbo.TBP_EXTERNAL_URL_MASTER WHERE CompanyCode=N'LG 전자' AND ParentCode=0),360,'Y',N'전 세계 자동차 관련 뉴스, 리포트, 시장 예측 자료 제공.','http://www.automotiveworld.com',N'산업/시장동향/트렌드 (Trend)',N'신문/언론/잡지사',N'유료',N'영문',-1, Getdate()); 
					INSERT INTO VCP_CUSTOM01.DBO.TBP_EXTERNAL_URL_MASTER (CompanyCode, MasterName, ParentCode, SortOrder, UseYN, Description, SiteUrl, CategoryName, MainAgentName, ChargeName, LanguageName, CreateUserID, CreateDate) VALUES (N'LG 전자',N'Automotive News Europe',(SELECT Code FROM VCP_CUSTOM01.dbo.TBP_EXTERNAL_URL_MASTER WHERE CompanyCode=N'LG 전자' AND ParentCode=0),350,'Y',N'유럽 자동차 관련 뉴스, 리포트, 시장 예측 자료 제공.','https://europe.autonews.com',N'산업/시장동향/트렌드 (Trend)',N'신문/언론/잡지사',N'부분유료',N'영문',-1, Getdate()); 
					INSERT INTO VCP_CUSTOM01.DBO.TBP_EXTERNAL_URL_MASTER (CompanyCode, MasterName, ParentCode, SortOrder, UseYN, Description, SiteUrl, CategoryName, MainAgentName, ChargeName, LanguageName, CreateUserID, CreateDate) VALUES (N'LG 전자',N'Automotive IT',(SELECT Code FROM VCP_CUSTOM01.dbo.TBP_EXTERNAL_URL_MASTER WHERE CompanyCode=N'LG 전자' AND ParentCode=0),330,'Y',N'전 세계 자동차 관련 뉴스, 리포트, 기술 자료 제공.','https://www.automotiveit.com',N'산업/시장동향/트렌드 (Trend)',N'신문/언론/잡지사',N'무료',N'영문',-1, Getdate()); 
					INSERT INTO VCP_CUSTOM01.DBO.TBP_EXTERNAL_URL_MASTER (CompanyCode, MasterName, ParentCode, SortOrder, UseYN, Description, SiteUrl, CategoryName, MainAgentName, ChargeName, LanguageName, CreateUserID, CreateDate) VALUES (N'LG 전자',N'Autocar : Car Reviews',(SELECT Code FROM VCP_CUSTOM01.dbo.TBP_EXTERNAL_URL_MASTER WHERE CompanyCode=N'LG 전자' AND ParentCode=0),300,'Y',N'영국 자동차 잡지로 차량 리뷰, 뉴스 등 자동차 산업계 정보 제공.','https://www.autocar.co.uk/car-reviews',N'산업/시장동향/트렌드 (Trend)',N'신문/언론/잡지사',N'무료',N'영문',-1, Getdate()); 
					INSERT INTO VCP_CUSTOM01.DBO.TBP_EXTERNAL_URL_MASTER (CompanyCode, MasterName, ParentCode, SortOrder, UseYN, Description, SiteUrl, CategoryName, MainAgentName, ChargeName, LanguageName, CreateUserID, CreateDate) VALUES (N'LG 전자',N'Autocar Professional',(SELECT Code FROM VCP_CUSTOM01.dbo.TBP_EXTERNAL_URL_MASTER WHERE CompanyCode=N'LG 전자' AND ParentCode=0),310,'Y',N'인도 시장 관련 자동차 최신 뉴스 및 인사이트 제공.','https://www.autocarpro.in/segments/autocomponents/',N'산업/시장동향/트렌드 (Trend)',N'신문/언론/잡지사',N'무료',N'영문',-1, Getdate()); 
					INSERT INTO VCP_CUSTOM01.DBO.TBP_EXTERNAL_URL_MASTER (CompanyCode, MasterName, ParentCode, SortOrder, UseYN, Description, SiteUrl, CategoryName, MainAgentName, ChargeName, LanguageName, CreateUserID, CreateDate) VALUES (N'LG 전자',N'Autoblog',(SELECT Code FROM VCP_CUSTOM01.dbo.TBP_EXTERNAL_URL_MASTER WHERE CompanyCode=N'LG 전자' AND ParentCode=0),290,'Y',N'자동차, 트럭, 크로스 오버 및 SUV에 대한 전문가 리뷰 및 뉴스 제공.','https://www.autoblog.com/',N'산업/시장동향/트렌드 (Trend)',N'신문/언론/잡지사',N'무료',N'영문',-1, Getdate()); 
					INSERT INTO VCP_CUSTOM01.DBO.TBP_EXTERNAL_URL_MASTER (CompanyCode, MasterName, ParentCode, SortOrder, UseYN, Description, SiteUrl, CategoryName, MainAgentName, ChargeName, LanguageName, CreateUserID, CreateDate) VALUES (N'LG 전자',N'Auto Times Hankyung - 오토타임즈 한경 ',(SELECT Code FROM VCP_CUSTOM01.dbo.TBP_EXTERNAL_URL_MASTER WHERE CompanyCode=N'LG 전자' AND ParentCode=0),280,'Y',N'한국의 자동차 전문매체로 국내외 자동차 관련 제품 및 산업뉴스 정보 제공.','http://autotimes.hankyung.com',N'산업/시장동향/트렌드 (Trend)',N'신문/언론/잡지사',N'무료',N'국문',-1, Getdate()); 
					INSERT INTO VCP_CUSTOM01.DBO.TBP_EXTERNAL_URL_MASTER (CompanyCode, MasterName, ParentCode, SortOrder, UseYN, Description, SiteUrl, CategoryName, MainAgentName, ChargeName, LanguageName, CreateUserID, CreateDate) VALUES (N'LG 전자',N'Auto Express',(SELECT Code FROM VCP_CUSTOM01.dbo.TBP_EXTERNAL_URL_MASTER WHERE CompanyCode=N'LG 전자' AND ParentCode=0),270,'Y',N'영국 자동차 잡지로 차량 리뷰, 뉴스 등 자동차 산업계 정보 제공.','https://www.autoexpress.co.uk',N'산업/시장동향/트렌드 (Trend)',N'신문/언론/잡지사',N'무료',N'영문',-1, Getdate()); 
					INSERT INTO VCP_CUSTOM01.DBO.TBP_EXTERNAL_URL_MASTER (CompanyCode, MasterName, ParentCode, SortOrder, UseYN, Description, SiteUrl, CategoryName, MainAgentName, ChargeName, LanguageName, CreateUserID, CreateDate) VALUES (N'LG 전자',N'5G Communication Automotive Research and innovation',(SELECT Code FROM VCP_CUSTOM01.dbo.TBP_EXTERNAL_URL_MASTER WHERE CompanyCode=N'LG 전자' AND ParentCode=0),1400,'Y',N'텔레매틱스 관련 뉴스 제공.','https://5gcar.eu/',N'산업/시장동향/트렌드 (Trend)',N'기관/협회',N'무료',N'영문',-1, Getdate()); 
					INSERT INTO VCP_CUSTOM01.DBO.TBP_EXTERNAL_URL_MASTER (CompanyCode, MasterName, ParentCode, SortOrder, UseYN, Description, SiteUrl, CategoryName, MainAgentName, ChargeName, LanguageName, CreateUserID, CreateDate) VALUES (N'LG 전자',N'5G Automotivr Association',(SELECT Code FROM VCP_CUSTOM01.dbo.TBP_EXTERNAL_URL_MASTER WHERE CompanyCode=N'LG 전자' AND ParentCode=0),1390,'Y',N'텔레매틱스 관련 뉴스 제공.','https://5gaa.org/',N'산업/시장동향/트렌드 (Trend)',N'기관/협회',N'무료',N'영문',-1, Getdate()); 
					INSERT INTO VCP_CUSTOM01.DBO.TBP_EXTERNAL_URL_MASTER (CompanyCode, MasterName, ParentCode, SortOrder, UseYN, Description, SiteUrl, CategoryName, MainAgentName, ChargeName, LanguageName, CreateUserID, CreateDate) VALUES (N'LG 전자',N'Auto 163',(SELECT Code FROM VCP_CUSTOM01.dbo.TBP_EXTERNAL_URL_MASTER WHERE CompanyCode=N'LG 전자' AND ParentCode=0),260,'Y',N'중국 자동차 관련 정보 제공.','https://auto.163.com',N'산업/시장동향/트렌드 (Trend)',N'신문/언론/잡지사',N'무료',N'중문',-1, Getdate()); 
					INSERT INTO VCP_CUSTOM01.DBO.TBP_EXTERNAL_URL_MASTER (CompanyCode, MasterName, ParentCode, SortOrder, UseYN, Description, SiteUrl, CategoryName, MainAgentName, ChargeName, LanguageName, CreateUserID, CreateDate) VALUES (N'LG 전자',N'KDI : 이슈&분석 - 경제정보센터',(SELECT Code FROM VCP_CUSTOM01.dbo.TBP_EXTERNAL_URL_MASTER WHERE CompanyCode=N'LG 전자' AND ParentCode=0),800,'Y',N'경제 불확실성 지수(Economic Policy Uncertainty, EPU Index) 제공. 실시간으로 생성되는 뉴스 기사의 텍스트 데이터를 분석해 경제 흐름을 파악, 매월 경제 불확실성 지수 및 주요 경제 이슈 키워드 제공.','http://eiec.kdi.re.kr/issue/epuList.do',N'금융/경제/재무/증권/투자 (Money)',N'기관/협회',N'무료',N'국문',-1, Getdate()); 
					INSERT INTO VCP_CUSTOM01.DBO.TBP_EXTERNAL_URL_MASTER (CompanyCode, MasterName, ParentCode, SortOrder, UseYN, Description, SiteUrl, CategoryName, MainAgentName, ChargeName, LanguageName, CreateUserID, CreateDate) VALUES (N'LG 전자',N'Korea Electric Vehicle Association - 한국전기자동차협회',(SELECT Code FROM VCP_CUSTOM01.dbo.TBP_EXTERNAL_URL_MASTER WHERE CompanyCode=N'LG 전자' AND ParentCode=0),840,'Y',N'전기자동차 정책과 기술, 관련 뉴스 등 정보 제공.','http://www.keva.or.kr/index.php',N'규제/정책/인증/법률 (Legal)',N'기관/협회',N'무료',N'국문',-1, Getdate()); 
					INSERT INTO VCP_CUSTOM01.DBO.TBP_EXTERNAL_URL_MASTER (CompanyCode, MasterName, ParentCode, SortOrder, UseYN, Description, SiteUrl, CategoryName, MainAgentName, ChargeName, LanguageName, CreateUserID, CreateDate) VALUES (N'LG 전자',N'Techneedle - 테크니들',(SELECT Code FROM VCP_CUSTOM01.dbo.TBP_EXTERNAL_URL_MASTER WHERE CompanyCode=N'LG 전자' AND ParentCode=0),1220,'Y',N'글로벌 테크 뉴스 및 인사이트 정보 제공.','http://techneedle.com/',N'기술 (Technology)',N'신문/언론/잡지사',N'무료',N'국문',-1, Getdate()); 
					INSERT INTO VCP_CUSTOM01.DBO.TBP_EXTERNAL_URL_MASTER (CompanyCode, MasterName, ParentCode, SortOrder, UseYN, Description, SiteUrl, CategoryName, MainAgentName, ChargeName, LanguageName, CreateUserID, CreateDate) VALUES (N'LG 전자',N'KOTRA : 뉴스 - 해외시장뉴스',(SELECT Code FROM VCP_CUSTOM01.dbo.TBP_EXTERNAL_URL_MASTER WHERE CompanyCode=N'LG 전자' AND ParentCode=0),860,'Y',N'KOTRA의 해외지사로부터 수집되는 무역통계, 산업환경, 시장정보를 제공','http://news.kotra.or.kr/user/globalAllBbs/kotranews/album/2/globalBbsDataAllList.do',N'산업/시장동향/트렌드 (Trend)',N'기관/협회',N'무료',N'국문',-1, Getdate()); 
					INSERT INTO VCP_CUSTOM01.DBO.TBP_EXTERNAL_URL_MASTER (CompanyCode, MasterName, ParentCode, SortOrder, UseYN, Description, SiteUrl, CategoryName, MainAgentName, ChargeName, LanguageName, CreateUserID, CreateDate) VALUES (N'LG 전자',N'AAAI - 전미인공지능학회',(SELECT Code FROM VCP_CUSTOM01.dbo.TBP_EXTERNAL_URL_MASTER WHERE CompanyCode=N'LG 전자' AND ParentCode=0),220,'Y',N'AI, ML관련 업계 소식 및 매거진, 책 소개 정보 제공.','https://aaai.org/',N'기술 (Technology)',N'기관/협회',N'부분유료',N'영문',-1, Getdate()); 
					INSERT INTO VCP_CUSTOM01.DBO.TBP_EXTERNAL_URL_MASTER (CompanyCode, MasterName, ParentCode, SortOrder, UseYN, Description, SiteUrl, CategoryName, MainAgentName, ChargeName, LanguageName, CreateUserID, CreateDate) VALUES (N'LG 전자',N'Amazon',(SELECT Code FROM VCP_CUSTOM01.dbo.TBP_EXTERNAL_URL_MASTER WHERE CompanyCode=N'LG 전자' AND ParentCode=0),250,'Y',N'아마존 인터넷 스토어몰로 가전, IT기기, 생활용품 등 다양한 제품 판매.','https://www.amazon.com',N'경쟁사/고객사/제품/스펙/리뷰 (Product)',N'유통/판매사',N'무료',N'영문',-1, Getdate()); 
					INSERT INTO VCP_CUSTOM01.DBO.TBP_EXTERNAL_URL_MASTER (CompanyCode, MasterName, ParentCode, SortOrder, UseYN, Description, SiteUrl, CategoryName, MainAgentName, ChargeName, LanguageName, CreateUserID, CreateDate) VALUES (N'LG 전자',N'Hargrove & Associates',(SELECT Code FROM VCP_CUSTOM01.dbo.TBP_EXTERNAL_URL_MASTER WHERE CompanyCode=N'LG 전자' AND ParentCode=0),720,'Y',N'가전 제조업 출하 공급량 통계 및 규격/규제 관련 소식 제공.','http://www.haiint.com/',N'규제/정책/인증/법률 (Legal)',N'분석/조사업체',N'유료',N'영문',-1, Getdate()); 
					INSERT INTO VCP_CUSTOM01.DBO.TBP_EXTERNAL_URL_MASTER (CompanyCode, MasterName, ParentCode, SortOrder, UseYN, Description, SiteUrl, CategoryName, MainAgentName, ChargeName, LanguageName, CreateUserID, CreateDate) VALUES (N'LG 전자',N'Sears - 시어스',(SELECT Code FROM VCP_CUSTOM01.dbo.TBP_EXTERNAL_URL_MASTER WHERE CompanyCode=N'LG 전자' AND ParentCode=0),1150,'Y',N'북미(미국, 캐나다) 가전, IT기기, 의류 등 다양한 제품 판매.','https://www.sears.com',N'경쟁사/고객사/제품/스펙/리뷰 (Product)',N'유통/판매사',N'무료',N'영문',-1, Getdate()); 
					INSERT INTO VCP_CUSTOM01.DBO.TBP_EXTERNAL_URL_MASTER (CompanyCode, MasterName, ParentCode, SortOrder, UseYN, Description, SiteUrl, CategoryName, MainAgentName, ChargeName, LanguageName, CreateUserID, CreateDate) VALUES (N'LG 전자',N'BestBuy - 베스트 바이',(SELECT Code FROM VCP_CUSTOM01.dbo.TBP_EXTERNAL_URL_MASTER WHERE CompanyCode=N'LG 전자' AND ParentCode=0),390,'Y',N'북미 (미국, 캐나다) 지역 가전, 전기, IT기기 판매.','https://www.bestbuy.com',N'경쟁사/고객사/제품/스펙/리뷰 (Product)',N'유통/판매사',N'무료',N'영문',-1, Getdate()); 
					INSERT INTO VCP_CUSTOM01.DBO.TBP_EXTERNAL_URL_MASTER (CompanyCode, MasterName, ParentCode, SortOrder, UseYN, Description, SiteUrl, CategoryName, MainAgentName, ChargeName, LanguageName, CreateUserID, CreateDate) VALUES (N'LG 전자',N'The Stevenson Company',(SELECT Code FROM VCP_CUSTOM01.dbo.TBP_EXTERNAL_URL_MASTER WHERE CompanyCode=N'LG 전자' AND ParentCode=0),1260,'Y',N'북미 (미국, 캐나다) 가전, IT 기기, POS 데이터 (제품 판매 통계 데이터) 제공.','www.traqline.com',N'산업/시장동향/트렌드 (Trend)',N'분석/조사업체',N'유료',N'영문',-1, Getdate()); 
					INSERT INTO VCP_CUSTOM01.DBO.TBP_EXTERNAL_URL_MASTER (CompanyCode, MasterName, ParentCode, SortOrder, UseYN, Description, SiteUrl, CategoryName, MainAgentName, ChargeName, LanguageName, CreateUserID, CreateDate) VALUES (N'LG 전자',N'International Monetary Fund - 국제금융펀드',(SELECT Code FROM VCP_CUSTOM01.dbo.TBP_EXTERNAL_URL_MASTER WHERE CompanyCode=N'LG 전자' AND ParentCode=0),750,'Y',N'국제 재정 경제관련 통계 데이터 제공.','https://www.imf.org',N'금융/경제/재무/증권/투자 (Money)',N'기관/협회',N'무료',N'영문',-1, Getdate()); 
					INSERT INTO VCP_CUSTOM01.DBO.TBP_EXTERNAL_URL_MASTER (CompanyCode, MasterName, ParentCode, SortOrder, UseYN, Description, SiteUrl, CategoryName, MainAgentName, ChargeName, LanguageName, CreateUserID, CreateDate) VALUES (N'LG 전자',N'AJ madison',(SELECT Code FROM VCP_CUSTOM01.dbo.TBP_EXTERNAL_URL_MASTER WHERE CompanyCode=N'LG 전자' AND ParentCode=0),240,'Y',N'미국 지역 가전제품 쇼핑몰로 제품 스펙, 가격, 소비자 리뷰 정보 제공.','https://www.ajmadison.com',N'경쟁사/고객사/제품/스펙/리뷰 (Product)',N'유통/판매사',N'무료',N'영문',-1, Getdate()); 
					INSERT INTO VCP_CUSTOM01.DBO.TBP_EXTERNAL_URL_MASTER (CompanyCode, MasterName, ParentCode, SortOrder, UseYN, Description, SiteUrl, CategoryName, MainAgentName, ChargeName, LanguageName, CreateUserID, CreateDate) VALUES (N'LG 전자',N'DOW JONES FACTIVA - 팩티바',(SELECT Code FROM VCP_CUSTOM01.dbo.TBP_EXTERNAL_URL_MASTER WHERE CompanyCode=N'LG 전자' AND ParentCode=0),540,'Y',N'글로벌 뉴스 모니터링 및 검색 엔진, 유럽 전역의 다양한 산업계 뉴스를 영어로 제공.','https://global.factiva.com',N'산업/시장동향/트렌드 (Trend)',N'분석/조사업체',N'유료',N'영문',-1, Getdate()); 
					INSERT INTO VCP_CUSTOM01.DBO.TBP_EXTERNAL_URL_MASTER (CompanyCode, MasterName, ParentCode, SortOrder, UseYN, Description, SiteUrl, CategoryName, MainAgentName, ChargeName, LanguageName, CreateUserID, CreateDate) VALUES (N'LG 전자',N'Thomson ONE',(SELECT Code FROM VCP_CUSTOM01.dbo.TBP_EXTERNAL_URL_MASTER WHERE CompanyCode=N'LG 전자' AND ParentCode=0),1300,'Y',N'글로벌 기업재무, 투자정보 및 산업게 뉴스정보 제공.','https://www.thomsonone.com',N'산업/시장동향/트렌드 (Trend)',N'분석/조사업체',N'유료',N'영문',-1, Getdate()); 
					INSERT INTO VCP_CUSTOM01.DBO.TBP_EXTERNAL_URL_MASTER (CompanyCode, MasterName, ParentCode, SortOrder, UseYN, Description, SiteUrl, CategoryName, MainAgentName, ChargeName, LanguageName, CreateUserID, CreateDate) VALUES (N'LG 전자',N'Project Central : Reviews',(SELECT Code FROM VCP_CUSTOM01.dbo.TBP_EXTERNAL_URL_MASTER WHERE CompanyCode=N'LG 전자' AND ParentCode=0),1040,'Y',N'프로젝터에 대한 제품 스펙 및 리뷰 제공.','https://www.projectorcentral.com/projector-reviews.cfm',N'경쟁사/고객사/제품/스펙/리뷰 (Product)',N'신문/언론/잡지사',N'무료',N'영문',-1, Getdate()); 
					INSERT INTO VCP_CUSTOM01.DBO.TBP_EXTERNAL_URL_MASTER (CompanyCode, MasterName, ParentCode, SortOrder, UseYN, Description, SiteUrl, CategoryName, MainAgentName, ChargeName, LanguageName, CreateUserID, CreateDate) VALUES (N'LG 전자',N'노트기어 : 리뷰리스트',(SELECT Code FROM VCP_CUSTOM01.dbo.TBP_EXTERNAL_URL_MASTER WHERE CompanyCode=N'LG 전자' AND ParentCode=0),10,'Y',N'노트북 및 주변기기 제품 스펙 및 리뷰 제공.','http://www.notegear.com/Content/Content_List.asp?kind=2',N'경쟁사/고객사/제품/스펙/리뷰 (Product)',N'신문/언론/잡지사',N'무료',N'국문',-1, Getdate()); 
					INSERT INTO VCP_CUSTOM01.DBO.TBP_EXTERNAL_URL_MASTER (CompanyCode, MasterName, ParentCode, SortOrder, UseYN, Description, SiteUrl, CategoryName, MainAgentName, ChargeName, LanguageName, CreateUserID, CreateDate) VALUES (N'LG 전자',N'클리앙 : 새로운소식',(SELECT Code FROM VCP_CUSTOM01.dbo.TBP_EXTERNAL_URL_MASTER WHERE CompanyCode=N'LG 전자' AND ParentCode=0),180,'Y',N'IT 시장동향, 신제품 및 고객반응 수집 정보 제공.','https://www.clien.net/service/board/news',N'산업/시장동향/트렌드 (Trend)',N'신문/언론/잡지사',N'무료',N'국문',-1, Getdate()); 
					INSERT INTO VCP_CUSTOM01.DBO.TBP_EXTERNAL_URL_MASTER (CompanyCode, MasterName, ParentCode, SortOrder, UseYN, Description, SiteUrl, CategoryName, MainAgentName, ChargeName, LanguageName, CreateUserID, CreateDate) VALUES (N'LG 전자',N'TFT Central : Reviews',(SELECT Code FROM VCP_CUSTOM01.dbo.TBP_EXTERNAL_URL_MASTER WHERE CompanyCode=N'LG 전자' AND ParentCode=0),1240,'Y',N'모니터 제품 스펙 및 리뷰 제공.','https://www.tftcentral.co.uk/reviews.htm',N'경쟁사/고객사/제품/스펙/리뷰 (Product)',N'신문/언론/잡지사',N'무료',N'영문',-1, Getdate()); 
					INSERT INTO VCP_CUSTOM01.DBO.TBP_EXTERNAL_URL_MASTER (CompanyCode, MasterName, ParentCode, SortOrder, UseYN, Description, SiteUrl, CategoryName, MainAgentName, ChargeName, LanguageName, CreateUserID, CreateDate) VALUES (N'LG 전자',N'Displayninja : News',(SELECT Code FROM VCP_CUSTOM01.dbo.TBP_EXTERNAL_URL_MASTER WHERE CompanyCode=N'LG 전자' AND ParentCode=0),520,'Y',N'모니터 관련 뉴스 및 제품 정보 제공.','https://www.displayninja.com/news/',N'경쟁사/고객사/제품/스펙/리뷰 (Product)',N'신문/언론/잡지사',N'무료',N'영문',-1, Getdate()); 
					INSERT INTO VCP_CUSTOM01.DBO.TBP_EXTERNAL_URL_MASTER (CompanyCode, MasterName, ParentCode, SortOrder, UseYN, Description, SiteUrl, CategoryName, MainAgentName, ChargeName, LanguageName, CreateUserID, CreateDate) VALUES (N'LG 전자',N'PC Monitors : Monitor Reviews',(SELECT Code FROM VCP_CUSTOM01.dbo.TBP_EXTERNAL_URL_MASTER WHERE CompanyCode=N'LG 전자' AND ParentCode=0),1010,'Y',N'모니터 제품 스펙 및 리뷰 제공.','https://pcmonitors.info/reviews/',N'경쟁사/고객사/제품/스펙/리뷰 (Product)',N'신문/언론/잡지사',N'무료',N'영문',-1, Getdate()); 
					INSERT INTO VCP_CUSTOM01.DBO.TBP_EXTERNAL_URL_MASTER (CompanyCode, MasterName, ParentCode, SortOrder, UseYN, Description, SiteUrl, CategoryName, MainAgentName, ChargeName, LanguageName, CreateUserID, CreateDate) VALUES (N'LG 전자',N'쿨앤조이',(SELECT Code FROM VCP_CUSTOM01.dbo.TBP_EXTERNAL_URL_MASTER WHERE CompanyCode=N'LG 전자' AND ParentCode=0),170,'Y',N'IT 시장동향, 신제품 및 고객반응 수집 정보 제공.','http://www.coolenjoy.net/',N'경쟁사/고객사/제품/스펙/리뷰 (Product)',N'신문/언론/잡지사',N'무료',N'국문',-1, Getdate()); 
					INSERT INTO VCP_CUSTOM01.DBO.TBP_EXTERNAL_URL_MASTER (CompanyCode, MasterName, ParentCode, SortOrder, UseYN, Description, SiteUrl, CategoryName, MainAgentName, ChargeName, LanguageName, CreateUserID, CreateDate) VALUES (N'LG 전자',N'애틀러스리서치앤컨설팅',(SELECT Code FROM VCP_CUSTOM01.dbo.TBP_EXTERNAL_URL_MASTER WHERE CompanyCode=N'LG 전자' AND ParentCode=0),110,'Y',N'스마트폰, 텔레콤, IT, 방송분야 리서치, 컨설팅, 서베이, 브리핑, 트렌드 분석, 통계DB 제공.','http://www.arg.co.kr',N'산업/시장동향/트렌드 (Trend)',N'분석/조사업체',N'부분유료',N'국문',-1, Getdate()); 
					INSERT INTO VCP_CUSTOM01.DBO.TBP_EXTERNAL_URL_MASTER (CompanyCode, MasterName, ParentCode, SortOrder, UseYN, Description, SiteUrl, CategoryName, MainAgentName, ChargeName, LanguageName, CreateUserID, CreateDate) VALUES (N'LG 전자',N'Houzz - 하우즈',(SELECT Code FROM VCP_CUSTOM01.dbo.TBP_EXTERNAL_URL_MASTER WHERE CompanyCode=N'LG 전자' AND ParentCode=0),730,'Y',N'해외 홈 건축, 공간별 인테리어 / 리모델링 이미지 제공. 건축, 인테리어, 부동산 전문가들의 아이디어 팁과 포트폴리오 정보 및 메시지 전송 기능 제공.','https://www.houzz.com/',N'산업/시장동향/트렌드 (Trend)',N'유통/판매사',N'무료',N'영문',-1, Getdate()); 
					INSERT INTO VCP_CUSTOM01.DBO.TBP_EXTERNAL_URL_MASTER (CompanyCode, MasterName, ParentCode, SortOrder, UseYN, Description, SiteUrl, CategoryName, MainAgentName, ChargeName, LanguageName, CreateUserID, CreateDate) VALUES (N'LG 전자',N'Pinterest - 핀터레스트',(SELECT Code FROM VCP_CUSTOM01.dbo.TBP_EXTERNAL_URL_MASTER WHERE CompanyCode=N'LG 전자' AND ParentCode=0),1030,'Y',N'이미지나 사진을 공유, 검색, 스크랩하는 이미지 중심의 소셜 네트워크 서비스.','https://www.pinterest.co.kr/',N'산업/시장동향/트렌드 (Trend)',N'SNS/커뮤니티',N'무료',N'국문',-1, Getdate()); 
					INSERT INTO VCP_CUSTOM01.DBO.TBP_EXTERNAL_URL_MASTER (CompanyCode, MasterName, ParentCode, SortOrder, UseYN, Description, SiteUrl, CategoryName, MainAgentName, ChargeName, LanguageName, CreateUserID, CreateDate) VALUES (N'LG 전자',N'Consumer Reports - 컨슈머 리포트',(SELECT Code FROM VCP_CUSTOM01.dbo.TBP_EXTERNAL_URL_MASTER WHERE CompanyCode=N'LG 전자' AND ParentCode=0),470,'Y',N'미국의 비영리단체인 소비자연맹이 발간하는 미국의 최대 소비재 전문 월간지. 매달 자동차, 가전제품, PC, 주방기기 등 거의 전 소비재에 대해 업체별 성능과 가격 등을 비교해 소비자에게 제공.','https://www.consumerreports.org/cro/index.htm',N'경쟁사/고객사/제품/스펙/리뷰 (Product)',N'신문/언론/잡지사',N'부분유료',N'영문',-1, Getdate()); 
					INSERT INTO VCP_CUSTOM01.DBO.TBP_EXTERNAL_URL_MASTER (CompanyCode, MasterName, ParentCode, SortOrder, UseYN, Description, SiteUrl, CategoryName, MainAgentName, ChargeName, LanguageName, CreateUserID, CreateDate) VALUES (N'LG 전자',N'오늘의 집',(SELECT Code FROM VCP_CUSTOM01.dbo.TBP_EXTERNAL_URL_MASTER WHERE CompanyCode=N'LG 전자' AND ParentCode=0),120,'Y',N'국내 홈 인테리어, 인테리어 팁, 가구/ 소품 정보 및 사진 제공.','https://ohou.se/',N'산업/시장동향/트렌드 (Trend)',N'유통/판매사',N'무료',N'국문',-1, Getdate()); 
					INSERT INTO VCP_CUSTOM01.DBO.TBP_EXTERNAL_URL_MASTER (CompanyCode, MasterName, ParentCode, SortOrder, UseYN, Description, SiteUrl, CategoryName, MainAgentName, ChargeName, LanguageName, CreateUserID, CreateDate) VALUES (N'LG 전자',N'MicroLED info',(SELECT Code FROM VCP_CUSTOM01.dbo.TBP_EXTERNAL_URL_MASTER WHERE CompanyCode=N'LG 전자' AND ParentCode=0),910,'Y',N'글로벌 마이크로 LED 디스플레이 정보 제공.','https://www.microled-info.com/',N'산업/시장동향/트렌드 (Trend)',N'신문/언론/잡지사',N'유료',N'영문',-1, Getdate()); 
					INSERT INTO VCP_CUSTOM01.DBO.TBP_EXTERNAL_URL_MASTER (CompanyCode, MasterName, ParentCode, SortOrder, UseYN, Description, SiteUrl, CategoryName, MainAgentName, ChargeName, LanguageName, CreateUserID, CreateDate) VALUES (N'LG 전자',N'다나와',(SELECT Code FROM VCP_CUSTOM01.dbo.TBP_EXTERNAL_URL_MASTER WHERE CompanyCode=N'LG 전자' AND ParentCode=0),30,'Y',N'국내 온라인쇼핑 가격비교 사이트로 상품 후기, 제품 정보, 관련 뉴스 정보 제공.','http://www.danawa.com/',N'경쟁사/고객사/제품/스펙/리뷰 (Product)',N'유통/판매사',N'무료',N'국문',-1, Getdate()); 
					INSERT INTO VCP_CUSTOM01.DBO.TBP_EXTERNAL_URL_MASTER (CompanyCode, MasterName, ParentCode, SortOrder, UseYN, Description, SiteUrl, CategoryName, MainAgentName, ChargeName, LanguageName, CreateUserID, CreateDate) VALUES (N'LG 전자',N'Google Trends - Google 트렌드',(SELECT Code FROM VCP_CUSTOM01.dbo.TBP_EXTERNAL_URL_MASTER WHERE CompanyCode=N'LG 전자' AND ParentCode=0),690,'Y',N'글로벌 검색 트렌드 제공 및 인기 검색어, 검색어 주제별 데이터 경향 제공.','https://trends.google.com/trends/?geo=US',N'산업/시장동향/트렌드 (Trend)',N'분석/조사업체',N'무료',N'국문',-1, Getdate()); 
					INSERT INTO VCP_CUSTOM01.DBO.TBP_EXTERNAL_URL_MASTER (CompanyCode, MasterName, ParentCode, SortOrder, UseYN, Description, SiteUrl, CategoryName, MainAgentName, ChargeName, LanguageName, CreateUserID, CreateDate) VALUES (N'LG 전자',N'Rtings',(SELECT Code FROM VCP_CUSTOM01.dbo.TBP_EXTERNAL_URL_MASTER WHERE CompanyCode=N'LG 전자' AND ParentCode=0),1130,'Y',N'TV, Headphone, Monitor, Soundbar, Mouse, keyboard, printer, vacuume, blender 등의 IT 제품 전문 리뷰 제공. 제품별 성능 등 데이터 기반의 리뷰 결과 공개.','https://www.rtings.com/',N'경쟁사/고객사/제품/스펙/리뷰 (Product)',N'신문/언론/잡지사',N'부분유료',N'영문',-1, Getdate()); 
					INSERT INTO VCP_CUSTOM01.DBO.TBP_EXTERNAL_URL_MASTER (CompanyCode, MasterName, ParentCode, SortOrder, UseYN, Description, SiteUrl, CategoryName, MainAgentName, ChargeName, LanguageName, CreateUserID, CreateDate) VALUES (N'LG 전자',N'DisplaySpecificaions',(SELECT Code FROM VCP_CUSTOM01.dbo.TBP_EXTERNAL_URL_MASTER WHERE CompanyCode=N'LG 전자' AND ParentCode=0),530,'Y',N'디스플레이 관련 뉴스, 제품 스펙, 글로벌 브랜드 제품 정보 (사진, 모델명, 라인업 등)을 제공.','https://www.displayspecifications.com',N'경쟁사/고객사/제품/스펙/리뷰 (Product)',N'신문/언론/잡지사',N'무료',N'영문',-1, Getdate()); 
					INSERT INTO VCP_CUSTOM01.DBO.TBP_EXTERNAL_URL_MASTER (CompanyCode, MasterName, ParentCode, SortOrder, UseYN, Description, SiteUrl, CategoryName, MainAgentName, ChargeName, LanguageName, CreateUserID, CreateDate) VALUES (N'LG 전자',N'displaydb',(SELECT Code FROM VCP_CUSTOM01.dbo.TBP_EXTERNAL_URL_MASTER WHERE CompanyCode=N'LG 전자' AND ParentCode=0),510,'Y',N'글로벌 디스플레이 제품 정보, 뉴스를 제공.','https://www.displaydb.com/',N'산업/시장동향/트렌드 (Trend)',N'신문/언론/잡지사',N'무료',N'영문',-1, Getdate()); 
					INSERT INTO VCP_CUSTOM01.DBO.TBP_EXTERNAL_URL_MASTER (CompanyCode, MasterName, ParentCode, SortOrder, UseYN, Description, SiteUrl, CategoryName, MainAgentName, ChargeName, LanguageName, CreateUserID, CreateDate) VALUES (N'LG 전자',N'Next TV ',(SELECT Code FROM VCP_CUSTOM01.dbo.TBP_EXTERNAL_URL_MASTER WHERE CompanyCode=N'LG 전자' AND ParentCode=0),990,'Y',N'스트리밍 비디오 산업 뉴스, 동향, 최근 제품 기사 등의 정보 제공.','https://www.nexttv.com/broadcasting-cable',N'산업/시장동향/트렌드 (Trend)',N'신문/언론/잡지사',N'부분유료',N'영문',-1, Getdate()); 
					INSERT INTO VCP_CUSTOM01.DBO.TBP_EXTERNAL_URL_MASTER (CompanyCode, MasterName, ParentCode, SortOrder, UseYN, Description, SiteUrl, CategoryName, MainAgentName, ChargeName, LanguageName, CreateUserID, CreateDate) VALUES (N'LG 전자',N'Stuff.tv : NEWS',(SELECT Code FROM VCP_CUSTOM01.dbo.TBP_EXTERNAL_URL_MASTER WHERE CompanyCode=N'LG 전자' AND ParentCode=0),1180,'Y',N'글로벌 IT 제품 정보, 리뷰, 뉴스 관련 정보 제공.','https://www.stuff.tv/news',N'경쟁사/고객사/제품/스펙/리뷰 (Product)',N'신문/언론/잡지사',N'무료',N'영문',-1, Getdate()); 
					INSERT INTO VCP_CUSTOM01.DBO.TBP_EXTERNAL_URL_MASTER (CompanyCode, MasterName, ParentCode, SortOrder, UseYN, Description, SiteUrl, CategoryName, MainAgentName, ChargeName, LanguageName, CreateUserID, CreateDate) VALUES (N'LG 전자',N'Advanced television',(SELECT Code FROM VCP_CUSTOM01.dbo.TBP_EXTERNAL_URL_MASTER WHERE CompanyCode=N'LG 전자' AND ParentCode=0),230,'Y',N'디스플레이 산업 관련 기업동향, 기사, 리포트 등 정보 제공.','https://advanced-television.com/',N'산업/시장동향/트렌드 (Trend)',N'신문/언론/잡지사',N'무료',N'영문',-1, Getdate()); 
					INSERT INTO VCP_CUSTOM01.DBO.TBP_EXTERNAL_URL_MASTER (CompanyCode, MasterName, ParentCode, SortOrder, UseYN, Description, SiteUrl, CategoryName, MainAgentName, ChargeName, LanguageName, CreateUserID, CreateDate) VALUES (N'LG 전자',N'대학내일 20대연구소',(SELECT Code FROM VCP_CUSTOM01.dbo.TBP_EXTERNAL_URL_MASTER WHERE CompanyCode=N'LG 전자' AND ParentCode=0),50,'Y',N'국내 20대 전문 연구 자료 (보고서, 데이터, 인포그래픽, 보도자료) 제공.','https://www.20slab.org/',N'산업/시장동향/트렌드 (Trend)',N'분석/조사업체',N'부분유료',N'국문',-1, Getdate()); 
					INSERT INTO VCP_CUSTOM01.DBO.TBP_EXTERNAL_URL_MASTER (CompanyCode, MasterName, ParentCode, SortOrder, UseYN, Description, SiteUrl, CategoryName, MainAgentName, ChargeName, LanguageName, CreateUserID, CreateDate) VALUES (N'LG 전자',N'Research World',(SELECT Code FROM VCP_CUSTOM01.dbo.TBP_EXTERNAL_URL_MASTER WHERE CompanyCode=N'LG 전자' AND ParentCode=0),1100,'Y',N'Data, research & business intelligence industry관련 전문칼럼, 리포트&분석, 기사, 인사이트 정보 제공.','https://www.researchworld.com/',N'산업/시장동향/트렌드 (Trend)',N'분석/조사업체',N'무료',N'영문',-1, Getdate()); 
					INSERT INTO VCP_CUSTOM01.DBO.TBP_EXTERNAL_URL_MASTER (CompanyCode, MasterName, ParentCode, SortOrder, UseYN, Description, SiteUrl, CategoryName, MainAgentName, ChargeName, LanguageName, CreateUserID, CreateDate) VALUES (N'LG 전자',N'TECH M - 테크엠',(SELECT Code FROM VCP_CUSTOM01.dbo.TBP_EXTERNAL_URL_MASTER WHERE CompanyCode=N'LG 전자' AND ParentCode=0),1210,'Y',N'IT 전문 미디어 사이트로 게임, 블록체인, 통신, 테크 핀, OTT, IoT, 스타트업, 테크 이슈 심층 분석, 보도자료 정보 제공.','https://www.techm.kr/',N'기술 (Technology)',N'신문/언론/잡지사',N'무료',N'국문',-1, Getdate()); 
					INSERT INTO VCP_CUSTOM01.DBO.TBP_EXTERNAL_URL_MASTER (CompanyCode, MasterName, ParentCode, SortOrder, UseYN, Description, SiteUrl, CategoryName, MainAgentName, ChargeName, LanguageName, CreateUserID, CreateDate) VALUES (N'LG 전자',N'Nasmedia - 나스미디어',(SELECT Code FROM VCP_CUSTOM01.dbo.TBP_EXTERNAL_URL_MASTER WHERE CompanyCode=N'LG 전자' AND ParentCode=0),970,'Y',N'디지털중심의 마케팅 트렌드 (글로벌 시장, 타겟시장, 마케팅 성공사례, 산업 등) 정기보고서 제공.','https://www.nasmedia.co.kr/',N'산업/시장동향/트렌드 (Trend)',N'분석/조사업체',N'무료',N'국문',-1, Getdate()); 
					INSERT INTO VCP_CUSTOM01.DBO.TBP_EXTERNAL_URL_MASTER (CompanyCode, MasterName, ParentCode, SortOrder, UseYN, Description, SiteUrl, CategoryName, MainAgentName, ChargeName, LanguageName, CreateUserID, CreateDate) VALUES (N'LG 전자',N'오픈서베이',(SELECT Code FROM VCP_CUSTOM01.dbo.TBP_EXTERNAL_URL_MASTER WHERE CompanyCode=N'LG 전자' AND ParentCode=0),130,'Y',N'Trend report, 산업 소비자 리포트 등 소비자데이터 결과를 제공. 조사회사 오픈서베이에서 자체적으로 기획/진행한 뷰티/헬스 소비 트렌드와 소비자 인식 관련 조사 결과 정보 제공.','https://blog.opensurvey.co.kr/',N'산업/시장동향/트렌드 (Trend)',N'분석/조사업체',N'부분유료',N'국문',-1, Getdate()); INSERT INTO VCP_MAIN.dbo.TBP_EXTERNAL_URL_ACCESS (Code, Dept_Id) VALUES (@@identity, ISNULL((SELECT dept_id FROM VCP_MAIN.dbo.TBP_DEPT WHERE tenant_id = 'L1100' AND dept_kor_name = N'홈뷰티사업담당'),-1))
					INSERT INTO VCP_CUSTOM01.DBO.TBP_EXTERNAL_URL_MASTER (CompanyCode, MasterName, ParentCode, SortOrder, UseYN, Description, SiteUrl, CategoryName, MainAgentName, ChargeName, LanguageName, CreateUserID, CreateDate) VALUES (N'LG 전자',N'Kline & Company',(SELECT Code FROM VCP_CUSTOM01.dbo.TBP_EXTERNAL_URL_MASTER WHERE CompanyCode=N'LG 전자' AND ParentCode=0),820,'Y',N'글로벌/국가별 퍼스널 뷰티 기기 시장 규모 및 전망 데이터 정보 제공.','https://www.klinegroup.com/',N'산업/시장동향/트렌드 (Trend)',N'분석/조사업체',N'유료',N'영문',-1, Getdate()); INSERT INTO VCP_MAIN.dbo.TBP_EXTERNAL_URL_ACCESS (Code, Dept_Id) VALUES (@@identity, ISNULL((SELECT dept_id FROM VCP_MAIN.dbo.TBP_DEPT WHERE tenant_id = 'L1100' AND dept_kor_name = N'홈뷰티사업담당'),-1))
					INSERT INTO VCP_CUSTOM01.DBO.TBP_EXTERNAL_URL_MASTER (CompanyCode, MasterName, ParentCode, SortOrder, UseYN, Description, SiteUrl, CategoryName, MainAgentName, ChargeName, LanguageName, CreateUserID, CreateDate) VALUES (N'LG 전자',N'KB경영연구소 : 연구보고서',(SELECT Code FROM VCP_CUSTOM01.dbo.TBP_EXTERNAL_URL_MASTER WHERE CompanyCode=N'LG 전자' AND ParentCode=0),790,'Y',N'KB 금융지주 경영연구소에서 발행하는 뷰티/화장품 등 산업 일반에 대한 동향 보고서 정보 제공.','https://www.kbfg.com/kbresearch/report/reportList.do',N'산업/시장동향/트렌드 (Trend)',N'분석/조사업체',N'무료',N'국문',-1, Getdate()); INSERT INTO VCP_MAIN.dbo.TBP_EXTERNAL_URL_ACCESS (Code, Dept_Id) VALUES (@@identity, ISNULL((SELECT dept_id FROM VCP_MAIN.dbo.TBP_DEPT WHERE tenant_id = 'L1100' AND dept_kor_name = N'홈뷰티사업담당'),-1))
					INSERT INTO VCP_CUSTOM01.DBO.TBP_EXTERNAL_URL_MASTER (CompanyCode, MasterName, ParentCode, SortOrder, UseYN, Description, SiteUrl, CategoryName, MainAgentName, ChargeName, LanguageName, CreateUserID, CreateDate) VALUES (N'LG 전자',N'The European New Car Assessment Programme - 유로 NCAP',(SELECT Code FROM VCP_CUSTOM01.dbo.TBP_EXTERNAL_URL_MASTER WHERE CompanyCode=N'LG 전자' AND ParentCode=0),1250,'Y',N'자동차 규정, 안전 관련 정책 제공.','www.euroncap.com/en',N'규제/정책/인증/법률 (Legal)',N'기관/협회',N'무료',N'영문',-1, Getdate()); 
					INSERT INTO VCP_CUSTOM01.DBO.TBP_EXTERNAL_URL_MASTER (CompanyCode, MasterName, ParentCode, SortOrder, UseYN, Description, SiteUrl, CategoryName, MainAgentName, ChargeName, LanguageName, CreateUserID, CreateDate) VALUES (N'LG 전자',N'J. D. Power - JD 파워',(SELECT Code FROM VCP_CUSTOM01.dbo.TBP_EXTERNAL_URL_MASTER WHERE CompanyCode=N'LG 전자' AND ParentCode=0),770,'Y',N'미국의 자동차 시장 조사기관. 자동자 등급/수상 내역, 리뷰, 신차 등의 정보 제공.','https://www.jdpower.com',N'산업/시장동향/트렌드 (Trend)',N'분석/조사업체',N'무료',N'영문',-1, Getdate()); 
					INSERT INTO VCP_CUSTOM01.DBO.TBP_EXTERNAL_URL_MASTER (CompanyCode, MasterName, ParentCode, SortOrder, UseYN, Description, SiteUrl, CategoryName, MainAgentName, ChargeName, LanguageName, CreateUserID, CreateDate) VALUES (N'LG 전자',N'Kelley Blue Book -  켈리 블루 북',(SELECT Code FROM VCP_CUSTOM01.dbo.TBP_EXTERNAL_URL_MASTER WHERE CompanyCode=N'LG 전자' AND ParentCode=0),810,'Y',N'미국의 자동차 평가 기관. 차량거래 및 리뷰 등의 정보 제공. ','https://www.kbb.com',N'산업/시장동향/트렌드 (Trend)',N'기관/협회',N'무료',N'영문',-1, Getdate()); 
					INSERT INTO VCP_CUSTOM01.DBO.TBP_EXTERNAL_URL_MASTER (CompanyCode, MasterName, ParentCode, SortOrder, UseYN, Description, SiteUrl, CategoryName, MainAgentName, ChargeName, LanguageName, CreateUserID, CreateDate) VALUES (N'LG 전자',N'Energy Trend',(SELECT Code FROM VCP_CUSTOM01.dbo.TBP_EXTERNAL_URL_MASTER WHERE CompanyCode=N'LG 전자' AND ParentCode=0),580,'Y',N'Solar, 배터리 가격 정보 및 에너지 관련 뉴스 및 분석 자료 제공.','https://www.energytrend.com/solar-price.html',N'산업/시장동향/트렌드 (Trend)',N'신문/언론/잡지사',N'부분유료',N'영문',-1, Getdate()); 
					INSERT INTO VCP_CUSTOM01.DBO.TBP_EXTERNAL_URL_MASTER (CompanyCode, MasterName, ParentCode, SortOrder, UseYN, Description, SiteUrl, CategoryName, MainAgentName, ChargeName, LanguageName, CreateUserID, CreateDate) VALUES (N'LG 전자',N'PV info : SPOT PRICE',(SELECT Code FROM VCP_CUSTOM01.dbo.TBP_EXTERNAL_URL_MASTER WHERE CompanyCode=N'LG 전자' AND ParentCode=0),1050,'Y',N'Solar 가격 정보, PV 정책 및 관련 트렌드, 최신 뉴스 및 분석 자료 제공.','https://www.infolink-group.com/en/solar/spot-price',N'규제/정책/인증/법률 (Legal)',N'분석/조사업체',N'무료',N'영문',-1, Getdate()); 
					INSERT INTO VCP_CUSTOM01.DBO.TBP_EXTERNAL_URL_MASTER (CompanyCode, MasterName, ParentCode, SortOrder, UseYN, Description, SiteUrl, CategoryName, MainAgentName, ChargeName, LanguageName, CreateUserID, CreateDate) VALUES (N'LG 전자',N'Solar Power World : News',(SELECT Code FROM VCP_CUSTOM01.dbo.TBP_EXTERNAL_URL_MASTER WHERE CompanyCode=N'LG 전자' AND ParentCode=0),1170,'Y',N'Solar 시장 관련 최신 동향 뉴스 제공.','https://www.solarpowerworldonline.com/category/industry-news/',N'에너지/ECO/ SOC (Environment)',N'분석/조사업체',N'부분유료',N'영문',-1, Getdate()); 
					INSERT INTO VCP_CUSTOM01.DBO.TBP_EXTERNAL_URL_MASTER (CompanyCode, MasterName, ParentCode, SortOrder, UseYN, Description, SiteUrl, CategoryName, MainAgentName, ChargeName, LanguageName, CreateUserID, CreateDate) VALUES (N'LG 전자',N'BJX Guangfu',(SELECT Code FROM VCP_CUSTOM01.dbo.TBP_EXTERNAL_URL_MASTER WHERE CompanyCode=N'LG 전자' AND ParentCode=0),400,'Y',N'중국 시장 동향 정보 제공.','http://guangfu.bjx.com.cn/',N'산업/시장동향/트렌드 (Trend)',N'분석/조사업체',N'부분유료',N'중문',-1, Getdate()); 
					INSERT INTO VCP_CUSTOM01.DBO.TBP_EXTERNAL_URL_MASTER (CompanyCode, MasterName, ParentCode, SortOrder, UseYN, Description, SiteUrl, CategoryName, MainAgentName, ChargeName, LanguageName, CreateUserID, CreateDate) VALUES (N'LG 전자',N'Sunwiz',(SELECT Code FROM VCP_CUSTOM01.dbo.TBP_EXTERNAL_URL_MASTER WHERE CompanyCode=N'LG 전자' AND ParentCode=0),1190,'Y',N'호주 태양광 시장의 경쟁사, 가격, 시장수요, 정책 등의 정보 제공. ','https://www.sunwiz.com.au/',N'규제/정책/인증/법률 (Legal)',N'분석/조사업체',N'무료',N'영문',-1, Getdate()); 
					INSERT INTO VCP_CUSTOM01.DBO.TBP_EXTERNAL_URL_MASTER (CompanyCode, MasterName, ParentCode, SortOrder, UseYN, Description, SiteUrl, CategoryName, MainAgentName, ChargeName, LanguageName, CreateUserID, CreateDate) VALUES (N'LG 전자',N'EuPD',(SELECT Code FROM VCP_CUSTOM01.dbo.TBP_EXTERNAL_URL_MASTER WHERE CompanyCode=N'LG 전자' AND ParentCode=0),600,'Y',N'유럽 태양광 시장의 국가별 거래선, 경쟁사, 가격, 시장 수요, 정책 등의 정보 제공.','https://www.eupd-research.com/en/',N'규제/정책/인증/법률 (Legal)',N'분석/조사업체',N'무료',N'영문',-1, Getdate()); 
					INSERT INTO VCP_CUSTOM01.DBO.TBP_EXTERNAL_URL_MASTER (CompanyCode, MasterName, ParentCode, SortOrder, UseYN, Description, SiteUrl, CategoryName, MainAgentName, ChargeName, LanguageName, CreateUserID, CreateDate) VALUES (N'LG 전자',N'Bridge to India',(SELECT Code FROM VCP_CUSTOM01.dbo.TBP_EXTERNAL_URL_MASTER WHERE CompanyCode=N'LG 전자' AND ParentCode=0),420,'Y',N'인도 에너지 시장 동향 정보 제공.','https://bridgetoindia.com/',N'산업/시장동향/트렌드 (Trend)',N'분석/조사업체',N'무료',N'영문',-1, Getdate()); 
					INSERT INTO VCP_CUSTOM01.DBO.TBP_EXTERNAL_URL_MASTER (CompanyCode, MasterName, ParentCode, SortOrder, UseYN, Description, SiteUrl, CategoryName, MainAgentName, ChargeName, LanguageName, CreateUserID, CreateDate) VALUES (N'LG 전자',N'Mercom',(SELECT Code FROM VCP_CUSTOM01.dbo.TBP_EXTERNAL_URL_MASTER WHERE CompanyCode=N'LG 전자' AND ParentCode=0),900,'Y',N'인도 에너지 시장 및 글로벌 시장 동향 파악. 설치 실적, 정책, 시장 이슈 등의 정보 제공.','https://mercomindia.com/',N'산업/시장동향/트렌드 (Trend)',N'분석/조사업체',N'부분유료',N'영문',-1, Getdate()); 
					INSERT INTO VCP_CUSTOM01.DBO.TBP_EXTERNAL_URL_MASTER (CompanyCode, MasterName, ParentCode, SortOrder, UseYN, Description, SiteUrl, CategoryName, MainAgentName, ChargeName, LanguageName, CreateUserID, CreateDate) VALUES (N'LG 전자',N'Taiyang News',(SELECT Code FROM VCP_CUSTOM01.dbo.TBP_EXTERNAL_URL_MASTER WHERE CompanyCode=N'LG 전자' AND ParentCode=0),1200,'Y',N'태양광 설치 국가 실적 정보를 월별, 분기별로 제공.','http://taiyangnews.info/',N'에너지/ECO/ SOC (Environment)',N'분석/조사업체',N'무료',N'영문',-1, Getdate()); 
					INSERT INTO VCP_CUSTOM01.DBO.TBP_EXTERNAL_URL_MASTER (CompanyCode, MasterName, ParentCode, SortOrder, UseYN, Description, SiteUrl, CategoryName, MainAgentName, ChargeName, LanguageName, CreateUserID, CreateDate) VALUES (N'LG 전자',N'Res legal : Compare support schemes',(SELECT Code FROM VCP_CUSTOM01.dbo.TBP_EXTERNAL_URL_MASTER WHERE CompanyCode=N'LG 전자' AND ParentCode=0),1090,'Y',N'유럽의 에너지 정책 관련 정보 제공.','http://www.res-legal.eu/compare-support-schemes/',N'규제/정책/인증/법률 (Legal)',N'분석/조사업체',N'부분유료',N'영문',-1, Getdate()); 
					INSERT INTO VCP_CUSTOM01.DBO.TBP_EXTERNAL_URL_MASTER (CompanyCode, MasterName, ParentCode, SortOrder, UseYN, Description, SiteUrl, CategoryName, MainAgentName, ChargeName, LanguageName, CreateUserID, CreateDate) VALUES (N'LG 전자',N'Bundesnet',(SELECT Code FROM VCP_CUSTOM01.dbo.TBP_EXTERNAL_URL_MASTER WHERE CompanyCode=N'LG 전자' AND ParentCode=0),430,'Y',N'독일 size별 설치실적, 보조금 운영 현황 제공.','https://www.bundesnetzagentur.de/',N'산업/시장동향/트렌드 (Trend)',N'기관/협회',N'무료',N'독문',-1, Getdate()); 
					INSERT INTO VCP_CUSTOM01.DBO.TBP_EXTERNAL_URL_MASTER (CompanyCode, MasterName, ParentCode, SortOrder, UseYN, Description, SiteUrl, CategoryName, MainAgentName, ChargeName, LanguageName, CreateUserID, CreateDate) VALUES (N'LG 전자',N'SEIA -미국 태양광산업협회',(SELECT Code FROM VCP_CUSTOM01.dbo.TBP_EXTERNAL_URL_MASTER WHERE CompanyCode=N'LG 전자' AND ParentCode=0),1160,'Y',N'미국 주별 태양광 설치 동향 및 정책 정보 제공.','https://www.seia.org/states-map',N'규제/정책/인증/법률 (Legal)',N'기관/협회',N'무료',N'영문',-1, Getdate()); 
					INSERT INTO VCP_CUSTOM01.DBO.TBP_EXTERNAL_URL_MASTER (CompanyCode, MasterName, ParentCode, SortOrder, UseYN, Description, SiteUrl, CategoryName, MainAgentName, ChargeName, LanguageName, CreateUserID, CreateDate) VALUES (N'LG 전자',N'GIZMODO - 기즈도모',(SELECT Code FROM VCP_CUSTOM01.dbo.TBP_EXTERNAL_URL_MASTER WHERE CompanyCode=N'LG 전자' AND ParentCode=0),670,'Y',N'기즈모도(Gizmodo)는 미국에서 유명한 기즈모도 미디어 그룹(Gizmodo Media Group)의 IT 전문 블로그 사이트이며 스마트폰  제품 리뷰 정보 제공.','https://gizmodo.com/',N'경쟁사/고객사/제품/스펙/리뷰 (Product)',N'신문/언론/잡지사',N'무료',N'영문',-1, Getdate()); 
					INSERT INTO VCP_CUSTOM01.DBO.TBP_EXTERNAL_URL_MASTER (CompanyCode, MasterName, ParentCode, SortOrder, UseYN, Description, SiteUrl, CategoryName, MainAgentName, ChargeName, LanguageName, CreateUserID, CreateDate) VALUES (N'LG 전자',N'Digital Signage Today - 디지털 사이니지',(SELECT Code FROM VCP_CUSTOM01.dbo.TBP_EXTERNAL_URL_MASTER WHERE CompanyCode=N'LG 전자' AND ParentCode=0),500,'Y',N'디지털 광고 관련 신제품 출시 정보 및 디스플레이 기술 등 관련 보도자료 정보 제공.','www.digitalsignagetoday.com',N'기술 (Technology)',N'신문/언론/잡지사',N'부분유료',N'영문',-1, Getdate()); 
					INSERT INTO VCP_CUSTOM01.DBO.TBP_EXTERNAL_URL_MASTER (CompanyCode, MasterName, ParentCode, SortOrder, UseYN, Description, SiteUrl, CategoryName, MainAgentName, ChargeName, LanguageName, CreateUserID, CreateDate) VALUES (N'LG 전자',N'LEDs Magazine - 엘리디즈 매거진',(SELECT Code FROM VCP_CUSTOM01.dbo.TBP_EXTERNAL_URL_MASTER WHERE CompanyCode=N'LG 전자' AND ParentCode=0),880,'Y',N'LED 기반 제품 기술 정보 잡지.','https://www.ledsmagazine.com/ ',N'기술 (Technology)',N'신문/언론/잡지사',N'부분유료',N'영문',-1, Getdate()); 
					INSERT INTO VCP_CUSTOM01.DBO.TBP_EXTERNAL_URL_MASTER (CompanyCode, MasterName, ParentCode, SortOrder, UseYN, Description, SiteUrl, CategoryName, MainAgentName, ChargeName, LanguageName, CreateUserID, CreateDate) VALUES (N'LG 전자',N'AV Network - AV네트워크',(SELECT Code FROM VCP_CUSTOM01.dbo.TBP_EXTERNAL_URL_MASTER WHERE CompanyCode=N'LG 전자' AND ParentCode=0),370,'Y',N'AV 기술, 디지털사이니지 잡지.','https://www.avnetwork.com/digital-signage-magazine ',N'기술 (Technology)',N'신문/언론/잡지사',N'부분유료',N'영문',-1, Getdate()); 
					INSERT INTO VCP_CUSTOM01.DBO.TBP_EXTERNAL_URL_MASTER (CompanyCode, MasterName, ParentCode, SortOrder, UseYN, Description, SiteUrl, CategoryName, MainAgentName, ChargeName, LanguageName, CreateUserID, CreateDate) VALUES (N'LG 전자',N'QSR - 큐에스알매거진',(SELECT Code FROM VCP_CUSTOM01.dbo.TBP_EXTERNAL_URL_MASTER WHERE CompanyCode=N'LG 전자' AND ParentCode=0),1070,'Y',N'QSR 버티컬 동향 및 소비자 동향, 푸드 관련 프랜차이즈 자료, 건강 · 웰빙 정보 등 기술 트렌드 관련 정보 제공.','https://www.qsrmagazine.com',N'산업/시장동향/트렌드 (Trend)',N'신문/언론/잡지사',N'무료',N'영문',-1, Getdate()); 
					INSERT INTO VCP_CUSTOM01.DBO.TBP_EXTERNAL_URL_MASTER (CompanyCode, MasterName, ParentCode, SortOrder, UseYN, Description, SiteUrl, CategoryName, MainAgentName, ChargeName, LanguageName, CreateUserID, CreateDate) VALUES (N'LG 전자',N'Retail Dive - 리테일다이브',(SELECT Code FROM VCP_CUSTOM01.dbo.TBP_EXTERNAL_URL_MASTER WHERE CompanyCode=N'LG 전자' AND ParentCode=0),1110,'Y',N'리테일 버티컬 동향 및 소비자 동향, 마케팅, 기술 트렌트 관련 정보 제공.','https://www.retaildive.com',N'산업/시장동향/트렌드 (Trend)',N'신문/언론/잡지사',N'부분유료',N'영문',-1, Getdate()); 
					INSERT INTO VCP_CUSTOM01.DBO.TBP_EXTERNAL_URL_MASTER (CompanyCode, MasterName, ParentCode, SortOrder, UseYN, Description, SiteUrl, CategoryName, MainAgentName, ChargeName, LanguageName, CreateUserID, CreateDate) VALUES (N'LG 전자',N'TechTarget - 테크타겟',(SELECT Code FROM VCP_CUSTOM01.dbo.TBP_EXTERNAL_URL_MASTER WHERE CompanyCode=N'LG 전자' AND ParentCode=0),1230,'Y',N'ECM, 웹 컨텐츠, 협업 플랫폼, 디지털 마케팅 등 B2B 분야의 기술/ 동향 관련 정보 제공.','https://searchcontentmanagement.techtarget.com/',N'기술 (Technology)',N'신문/언론/잡지사',N'부분유료',N'영문',-1, Getdate()); 
					INSERT INTO VCP_CUSTOM01.DBO.TBP_EXTERNAL_URL_MASTER (CompanyCode, MasterName, ParentCode, SortOrder, UseYN, Description, SiteUrl, CategoryName, MainAgentName, ChargeName, LanguageName, CreateUserID, CreateDate) VALUES (N'LG 전자',N'ZDNet',(SELECT Code FROM VCP_CUSTOM01.dbo.TBP_EXTERNAL_URL_MASTER WHERE CompanyCode=N'LG 전자' AND ParentCode=0),1380,'Y',N'전자, 정보통신, 최신 IT 트렌드, 비지니스 기술 정보 등 전자 업계 전반의 기사 제공.','https://www.zdnet.com/',N'기술 (Technology)',N'신문/언론/잡지사',N'부분유료',N'영문',-1, Getdate()); 
					INSERT INTO VCP_CUSTOM01.DBO.TBP_EXTERNAL_URL_MASTER (CompanyCode, MasterName, ParentCode, SortOrder, UseYN, Description, SiteUrl, CategoryName, MainAgentName, ChargeName, LanguageName, CreateUserID, CreateDate) VALUES (N'LG 전자',N'WIRED - 와이어드',(SELECT Code FROM VCP_CUSTOM01.dbo.TBP_EXTERNAL_URL_MASTER WHERE CompanyCode=N'LG 전자' AND ParentCode=0),1360,'Y',N'IT 관련 트렌드, 디자인, 문화 등에 대한 정보 제공.','http://www.wired.com',N'산업/시장동향/트렌드 (Trend)',N'신문/언론/잡지사',N'부분유료',N'영문',-1, Getdate()); 
					INSERT INTO VCP_CUSTOM01.DBO.TBP_EXTERNAL_URL_MASTER (CompanyCode, MasterName, ParentCode, SortOrder, UseYN, Description, SiteUrl, CategoryName, MainAgentName, ChargeName, LanguageName, CreateUserID, CreateDate) VALUES (N'LG 전자',N'YouTube - 유튜브',(SELECT Code FROM VCP_CUSTOM01.dbo.TBP_EXTERNAL_URL_MASTER WHERE CompanyCode=N'LG 전자' AND ParentCode=0),1370,'Y',N'동영상 기반의 트렌드, 리뷰 정보 검색.','https://www.youtube.com/',N'산업/시장동향/트렌드 (Trend)',N'SNS/커뮤니티',N'무료',N'국문',-1, Getdate()); 
					INSERT INTO VCP_CUSTOM01.DBO.TBP_EXTERNAL_URL_MASTER (CompanyCode, MasterName, ParentCode, SortOrder, UseYN, Description, SiteUrl, CategoryName, MainAgentName, ChargeName, LanguageName, CreateUserID, CreateDate) VALUES (N'LG 전자',N'Jalopnik - 잘롭닉',(SELECT Code FROM VCP_CUSTOM01.dbo.TBP_EXTERNAL_URL_MASTER WHERE CompanyCode=N'LG 전자' AND ParentCode=0),780,'Y',N'미국 자동차 정보 매체, 신차, 자동차 산업 관련 기사, 동영상 정보 제공','https://jalopnik.com/',N'산업/시장동향/트렌드 (Trend)',N'신문/언론/잡지사',N'무료',N'영문',-1, Getdate()); 
					INSERT INTO VCP_CUSTOM01.DBO.TBP_EXTERNAL_URL_MASTER (CompanyCode, MasterName, ParentCode, SortOrder, UseYN, Description, SiteUrl, CategoryName, MainAgentName, ChargeName, LanguageName, CreateUserID, CreateDate) VALUES (N'LG 전자',N'Korea Health Industry Development Institute - 한국보건산업진흥원',(SELECT Code FROM VCP_CUSTOM01.dbo.TBP_EXTERNAL_URL_MASTER WHERE CompanyCode=N'LG 전자' AND ParentCode=0),850,'Y',N'의료기기 시장정보, 산업정보 및 분석, 정책 등의 정보 제공.','www.khidi.or.kr',N'규제/정책/인증/법률 (Legal)',N'기관/협회',N'무료',N'국문',-1, Getdate()); INSERT INTO VCP_MAIN.dbo.TBP_EXTERNAL_URL_ACCESS (Code, Dept_Id) VALUES (@@identity, ISNULL((SELECT dept_id FROM VCP_MAIN.dbo.TBP_DEPT WHERE tenant_id = 'L1100' AND dept_kor_name = N'홈뷰티사업담당'),-1))
					INSERT INTO VCP_CUSTOM01.DBO.TBP_EXTERNAL_URL_MASTER (CompanyCode, MasterName, ParentCode, SortOrder, UseYN, Description, SiteUrl, CategoryName, MainAgentName, ChargeName, LanguageName, CreateUserID, CreateDate) VALUES (N'LG 전자',N'한국의료기기안전정보원',(SELECT Code FROM VCP_CUSTOM01.dbo.TBP_EXTERNAL_URL_MASTER WHERE CompanyCode=N'LG 전자' AND ParentCode=0),210,'Y',N'의료기기 GMP 교육, 국제규격 가이드라인 정보제공, 맞춤형 기술 지원, 임상지원 등 종합적인 정보 및 기술 지원.','http://www.nids.or.kr/',N'규제/정책/인증/법률 (Legal)',N'기관/협회',N'무료',N'국문',-1, Getdate()); INSERT INTO VCP_MAIN.dbo.TBP_EXTERNAL_URL_ACCESS (Code, Dept_Id) VALUES (@@identity, ISNULL((SELECT dept_id FROM VCP_MAIN.dbo.TBP_DEPT WHERE tenant_id = 'L1100' AND dept_kor_name = N'홈뷰티사업담당'),-1))
					INSERT INTO VCP_CUSTOM01.DBO.TBP_EXTERNAL_URL_MASTER (CompanyCode, MasterName, ParentCode, SortOrder, UseYN, Description, SiteUrl, CategoryName, MainAgentName, ChargeName, LanguageName, CreateUserID, CreateDate) VALUES (N'LG 전자',N'Ministry of Food and Drug Safety - 식품의약품안전처',(SELECT Code FROM VCP_CUSTOM01.dbo.TBP_EXTERNAL_URL_MASTER WHERE CompanyCode=N'LG 전자' AND ParentCode=0),920,'Y',N'식품과 건강기능식품 · 의약품 · 마약류·  화장품 · 의약외품 · 의료기기 등의 안전에 관한 사무를 관장하는 중앙행정기관','www.mfds.go.kr',N'규제/정책/인증/법률 (Legal)',N'기관/협회',N'무료',N'국문',-1, Getdate()); INSERT INTO VCP_MAIN.dbo.TBP_EXTERNAL_URL_ACCESS (Code, Dept_Id) VALUES (@@identity, ISNULL((SELECT dept_id FROM VCP_MAIN.dbo.TBP_DEPT WHERE tenant_id = 'L1100' AND dept_kor_name = N'홈뷰티사업담당'),-1))
					INSERT INTO VCP_CUSTOM01.DBO.TBP_EXTERNAL_URL_MASTER (CompanyCode, MasterName, ParentCode, SortOrder, UseYN, Description, SiteUrl, CategoryName, MainAgentName, ChargeName, LanguageName, CreateUserID, CreateDate) VALUES (N'LG 전자',N'의학신문',(SELECT Code FROM VCP_CUSTOM01.dbo.TBP_EXTERNAL_URL_MASTER WHERE CompanyCode=N'LG 전자' AND ParentCode=0),140,'Y',N'제약, 의료기기 등 보건 의료분야 전반의 뉴스정보 제공.','www.bosa.co.kr',N'산업/시장동향/트렌드 (Trend)',N'신문/언론/잡지사',N'무료',N'국문',-1, Getdate()); INSERT INTO VCP_MAIN.dbo.TBP_EXTERNAL_URL_ACCESS (Code, Dept_Id) VALUES (@@identity, ISNULL((SELECT dept_id FROM VCP_MAIN.dbo.TBP_DEPT WHERE tenant_id = 'L1100' AND dept_kor_name = N'홈뷰티사업담당'),-1))
					INSERT INTO VCP_CUSTOM01.DBO.TBP_EXTERNAL_URL_MASTER (CompanyCode, MasterName, ParentCode, SortOrder, UseYN, Description, SiteUrl, CategoryName, MainAgentName, ChargeName, LanguageName, CreateUserID, CreateDate) VALUES (N'LG 전자',N'메디컬투데이',(SELECT Code FROM VCP_CUSTOM01.dbo.TBP_EXTERNAL_URL_MASTER WHERE CompanyCode=N'LG 전자' AND ParentCode=0),70,'Y',N'건강, 의료기기, 제약, 바이오 등 의료산업 전반의 정보 제공','http://www.mdtoday.co.kr/',N'산업/시장동향/트렌드 (Trend)',N'신문/언론/잡지사',N'무료',N'국문',-1, Getdate()); INSERT INTO VCP_MAIN.dbo.TBP_EXTERNAL_URL_ACCESS (Code, Dept_Id) VALUES (@@identity, ISNULL((SELECT dept_id FROM VCP_MAIN.dbo.TBP_DEPT WHERE tenant_id = 'L1100' AND dept_kor_name = N'홈뷰티사업담당'),-1))
					INSERT INTO VCP_CUSTOM01.DBO.TBP_EXTERNAL_URL_MASTER (CompanyCode, MasterName, ParentCode, SortOrder, UseYN, Description, SiteUrl, CategoryName, MainAgentName, ChargeName, LanguageName, CreateUserID, CreateDate) VALUES (N'LG 전자',N'트렌드와칭 (한국)',(SELECT Code FROM VCP_CUSTOM01.dbo.TBP_EXTERNAL_URL_MASTER WHERE CompanyCode=N'LG 전자' AND ParentCode=0),200,'Y',N'펀딩, 블록체인, 비즈니스, 미디어, 모바일, 마케팅 등 트렌드 뉴스와  마케팅 인사이트 제공.','https://trendw.kr/',N'산업/시장동향/트렌드 (Trend)',N'분석/조사업체',N'부분유료',N'국문',-1, Getdate()); INSERT INTO VCP_MAIN.dbo.TBP_EXTERNAL_URL_ACCESS (Code, Dept_Id) VALUES (@@identity, ISNULL((SELECT dept_id FROM VCP_MAIN.dbo.TBP_DEPT WHERE tenant_id = 'L1100' AND dept_kor_name = N'홈뷰티사업담당'),-1))
					INSERT INTO VCP_CUSTOM01.DBO.TBP_EXTERNAL_URL_MASTER (CompanyCode, MasterName, ParentCode, SortOrder, UseYN, Description, SiteUrl, CategoryName, MainAgentName, ChargeName, LanguageName, CreateUserID, CreateDate) VALUES (N'LG 전자',N'Think with Google',(SELECT Code FROM VCP_CUSTOM01.dbo.TBP_EXTERNAL_URL_MASTER WHERE CompanyCode=N'LG 전자' AND ParentCode=0),1290,'Y',N'디지털 마케팅 트렌드 및 통계에 대한 뉴스 및 소비자 인사이트 분석 정보 제공.','https://www.thinkwithgoogle.com/intl/ko-kr/',N'산업/시장동향/트렌드 (Trend)',N'분석/조사업체',N'무료',N'국문',-1, Getdate()); INSERT INTO VCP_MAIN.dbo.TBP_EXTERNAL_URL_ACCESS (Code, Dept_Id) VALUES (@@identity, ISNULL((SELECT dept_id FROM VCP_MAIN.dbo.TBP_DEPT WHERE tenant_id = 'L1100' AND dept_kor_name = N'홈뷰티사업담당'),-1))
					INSERT INTO VCP_CUSTOM01.DBO.TBP_EXTERNAL_URL_MASTER (CompanyCode, MasterName, ParentCode, SortOrder, UseYN, Description, SiteUrl, CategoryName, MainAgentName, ChargeName, LanguageName, CreateUserID, CreateDate) VALUES (N'LG 전자',N'카카쿠닷컴',(SELECT Code FROM VCP_CUSTOM01.dbo.TBP_EXTERNAL_URL_MASTER WHERE CompanyCode=N'LG 전자' AND ParentCode=0),160,'Y',N'노트북, 생활가전, 스마트폰, 자동차, 의약품, 화장품 등 제품 전반에 걸친 일본의 가격 비교 사이트.','https://kakaku.com/',N'경쟁사/고객사/제품/스펙/리뷰 (Product)',N'유통/판매사',N'무료',N'일문',-1, Getdate()); INSERT INTO VCP_MAIN.dbo.TBP_EXTERNAL_URL_ACCESS (Code, Dept_Id) VALUES (@@identity, ISNULL((SELECT dept_id FROM VCP_MAIN.dbo.TBP_DEPT WHERE tenant_id = 'L1100' AND dept_kor_name = N'홈뷰티사업담당'),-1))
					INSERT INTO VCP_CUSTOM01.DBO.TBP_EXTERNAL_URL_MASTER (CompanyCode, MasterName, ParentCode, SortOrder, UseYN, Description, SiteUrl, CategoryName, MainAgentName, ChargeName, LanguageName, CreateUserID, CreateDate) VALUES (N'LG 전자',N'Rakuten - 라쿠텐',(SELECT Code FROM VCP_CUSTOM01.dbo.TBP_EXTERNAL_URL_MASTER WHERE CompanyCode=N'LG 전자' AND ParentCode=0),1080,'Y',N'일본의 가전, PC, 홈 인테리어, 자동차, 화장품, 패션 등 제품 유통 사이트.','https://www.rakuten.co.jp/',N'경쟁사/고객사/제품/스펙/리뷰 (Product)',N'유통/판매사',N'무료',N'일문',-1, Getdate()); INSERT INTO VCP_MAIN.dbo.TBP_EXTERNAL_URL_ACCESS (Code, Dept_Id) VALUES (@@identity, ISNULL((SELECT dept_id FROM VCP_MAIN.dbo.TBP_DEPT WHERE tenant_id = 'L1100' AND dept_kor_name = N'홈뷰티사업담당'),-1))
					INSERT INTO VCP_CUSTOM01.DBO.TBP_EXTERNAL_URL_MASTER (CompanyCode, MasterName, ParentCode, SortOrder, UseYN, Description, SiteUrl, CategoryName, MainAgentName, ChargeName, LanguageName, CreateUserID, CreateDate) VALUES (N'LG 전자',N'더시그니처',(SELECT Code FROM VCP_CUSTOM01.dbo.TBP_EXTERNAL_URL_MASTER WHERE CompanyCode=N'LG 전자' AND ParentCode=0),60,'Y',N'에스테틱, 스파, 화장품 등 뷰티 전반의 뉴스 정보 제공.','http://www.signaturemg.co.kr/shop/index.php',N'산업/시장동향/트렌드 (Trend)',N'신문/언론/잡지사',N'무료',N'국문',-1, Getdate()); INSERT INTO VCP_MAIN.dbo.TBP_EXTERNAL_URL_ACCESS (Code, Dept_Id) VALUES (@@identity, ISNULL((SELECT dept_id FROM VCP_MAIN.dbo.TBP_DEPT WHERE tenant_id = 'L1100' AND dept_kor_name = N'홈뷰티사업담당'),-1))
					INSERT INTO VCP_CUSTOM01.DBO.TBP_EXTERNAL_URL_MASTER (CompanyCode, MasterName, ParentCode, SortOrder, UseYN, Description, SiteUrl, CategoryName, MainAgentName, ChargeName, LanguageName, CreateUserID, CreateDate) VALUES (N'LG 전자',N'ISSUU',(SELECT Code FROM VCP_CUSTOM01.dbo.TBP_EXTERNAL_URL_MASTER WHERE CompanyCode=N'LG 전자' AND ParentCode=0),760,'Y',N'엔터테인먼트, 교육, 건강, 패션, 등 다양한 매거진 콘텐츠 제공.','https://issuu.com/',N'산업/시장동향/트렌드 (Trend)',N'SNS/커뮤니티',N'부분유료',N'영문',-1, Getdate()); INSERT INTO VCP_MAIN.dbo.TBP_EXTERNAL_URL_ACCESS (Code, Dept_Id) VALUES (@@identity, ISNULL((SELECT dept_id FROM VCP_MAIN.dbo.TBP_DEPT WHERE tenant_id = 'L1100' AND dept_kor_name = N'홈뷰티사업담당'),-1))
					INSERT INTO VCP_CUSTOM01.DBO.TBP_EXTERNAL_URL_MASTER (CompanyCode, MasterName, ParentCode, SortOrder, UseYN, Description, SiteUrl, CategoryName, MainAgentName, ChargeName, LanguageName, CreateUserID, CreateDate) VALUES (N'LG 전자',N'THE VC - 더브이씨',(SELECT Code FROM VCP_CUSTOM01.dbo.TBP_EXTERNAL_URL_MASTER WHERE CompanyCode=N'LG 전자' AND ParentCode=0),1270,'Y',N'한국 스타트업 투자 뉴스 및 스타트업, 엑셀러레이터, 벤처캐피털 등의  투자 관련 데이터 제공. ','https://thevc.kr/',N'산업/시장동향/트렌드 (Trend)',N'분석/조사업체',N'부분유료',N'국문',-1, Getdate()); INSERT INTO VCP_MAIN.dbo.TBP_EXTERNAL_URL_ACCESS (Code, Dept_Id) VALUES (@@identity, ISNULL((SELECT dept_id FROM VCP_MAIN.dbo.TBP_DEPT WHERE tenant_id = 'L1100' AND dept_kor_name = N'홈뷰티사업담당'),-1))
					INSERT INTO VCP_CUSTOM01.DBO.TBP_EXTERNAL_URL_MASTER (CompanyCode, MasterName, ParentCode, SortOrder, UseYN, Description, SiteUrl, CategoryName, MainAgentName, ChargeName, LanguageName, CreateUserID, CreateDate) VALUES (N'LG 전자',N'Nox Influencer - 녹스인플루언서',(SELECT Code FROM VCP_CUSTOM01.dbo.TBP_EXTERNAL_URL_MASTER WHERE CompanyCode=N'LG 전자' AND ParentCode=0),1000,'Y',N'유튜브, 인스타그램의 트렌드 및 크리에이터 분석 데이터 제공.','https://kr.noxinfluencer.com/',N'산업/시장동향/트렌드 (Trend)',N'분석/조사업체',N'부분유료',N'국문',-1, Getdate()); INSERT INTO VCP_MAIN.dbo.TBP_EXTERNAL_URL_ACCESS (Code, Dept_Id) VALUES (@@identity, ISNULL((SELECT dept_id FROM VCP_MAIN.dbo.TBP_DEPT WHERE tenant_id = 'L1100' AND dept_kor_name = N'홈뷰티사업담당'),-1))
					INSERT INTO VCP_CUSTOM01.DBO.TBP_EXTERNAL_URL_MASTER (CompanyCode, MasterName, ParentCode, SortOrder, UseYN, Description, SiteUrl, CategoryName, MainAgentName, ChargeName, LanguageName, CreateUserID, CreateDate) VALUES (N'LG 전자',N'최윤섭의 헬스케어 이노베이션',(SELECT Code FROM VCP_CUSTOM01.dbo.TBP_EXTERNAL_URL_MASTER WHERE CompanyCode=N'LG 전자' AND ParentCode=0),150,'Y',N'디지털 헬스케어, 미래 의료, 의료 인공지능, 규제 관련 등 헬스케어 전반의 정보 제공.','http://www.yoonsupchoi.com/',N'산업/시장동향/트렌드 (Trend)',N'SNS/커뮤니티',N'무료',N'국문',-1, Getdate()); INSERT INTO VCP_MAIN.dbo.TBP_EXTERNAL_URL_ACCESS (Code, Dept_Id) VALUES (@@identity, ISNULL((SELECT dept_id FROM VCP_MAIN.dbo.TBP_DEPT WHERE tenant_id = 'L1100' AND dept_kor_name = N'홈뷰티사업담당'),-1))
					INSERT INTO VCP_CUSTOM01.DBO.TBP_EXTERNAL_URL_MASTER (CompanyCode, MasterName, ParentCode, SortOrder, UseYN, Description, SiteUrl, CategoryName, MainAgentName, ChargeName, LanguageName, CreateUserID, CreateDate) VALUES (N'LG 전자',N'GFK KOREA',(SELECT Code FROM VCP_CUSTOM01.dbo.TBP_EXTERNAL_URL_MASTER WHERE CompanyCode=N'LG 전자' AND ParentCode=0),660,'Y',N'GfK는 상시 가동되는 독보적인 AI 기반의 인텔리전스 플랫폼과 컨설팅 서비스를 전 세계 소비재 업계를 위해 제공.','https://www.gfk.com/ko/home',N'산업/시장동향/트렌드 (Trend)',N'분석/조사업체',N'부분유료',N'국문',-1, Getdate()); INSERT INTO VCP_MAIN.dbo.TBP_EXTERNAL_URL_ACCESS (Code, Dept_Id) VALUES (@@identity, ISNULL((SELECT dept_id FROM VCP_MAIN.dbo.TBP_DEPT WHERE tenant_id = 'L1100' AND dept_kor_name = N'TV CX담당'),-1))
					INSERT INTO VCP_CUSTOM01.DBO.TBP_EXTERNAL_URL_MASTER (CompanyCode, MasterName, ParentCode, SortOrder, UseYN, Description, SiteUrl, CategoryName, MainAgentName, ChargeName, LanguageName, CreateUserID, CreateDate) VALUES (N'LG 전자',N'The Verge',(SELECT Code FROM VCP_CUSTOM01.dbo.TBP_EXTERNAL_URL_MASTER WHERE CompanyCode=N'LG 전자' AND ParentCode=0),1280,'Y',N'미국의 뉴스 웹사이트로 Camera, Dtrones, Headphone, Laptop, phones, Smartwatche, Speaker, Tablet 등 기술, 과학, 예술, 문화, 엔터테인먼트 (Film, TV, Games등) 전반에 걸친 정보 제공.','https://www.theverge.com/',N'산업/시장동향/트렌드 (Trend)',N'신문/언론/잡지사',N'무료',N'영문',-1, Getdate()); 
					INSERT INTO VCP_CUSTOM01.DBO.TBP_EXTERNAL_URL_MASTER (CompanyCode, MasterName, ParentCode, SortOrder, UseYN, Description, SiteUrl, CategoryName, MainAgentName, ChargeName, LanguageName, CreateUserID, CreateDate) VALUES (N'LG 전자',N'Korea Automobile Manufacturers Association - 한국자동차산업협회',(SELECT Code FROM VCP_CUSTOM01.dbo.TBP_EXTERNAL_URL_MASTER WHERE CompanyCode=N'LG 전자' AND ParentCode=0),830,'Y',N'한국 자동차 산업 대표 국가 기관. 자동차 산업 분야 산학연 협동 조사/연구, 산업/이슈 및 제품 리뷰, 동영상, 가격 등의 시장 동향 정보 제공.','http://www.kama.or.kr/',N'산업/시장동향/트렌드 (Trend)',N'기관/협회',N'유료',N'국문',-1, Getdate()); 
					INSERT INTO VCP_CUSTOM01.DBO.TBP_EXTERNAL_URL_MASTER (CompanyCode, MasterName, ParentCode, SortOrder, UseYN, Description, SiteUrl, CategoryName, MainAgentName, ChargeName, LanguageName, CreateUserID, CreateDate) VALUES (N'LG 전자',N'GSMArena - GSM아레나',(SELECT Code FROM VCP_CUSTOM01.dbo.TBP_EXTERNAL_URL_MASTER WHERE CompanyCode=N'LG 전자' AND ParentCode=0),710,'Y',N'스마트폰, 태블릿, 스마트와치 등 IT 기기의 글로벌 뉴스, 신제품 리뷰, 동영상, 가격 등의 정보 제공. (검색 시 키워드 : TV, MNT, NBPC, Tablet, SP, Display, Panel, LCD, OLED, LGD, SDC)','http://www.gsmarena.com',N'경쟁사/고객사/제품/스펙/리뷰 (Product)',N'분석/조사업체',N'무료',N'영문',-1, Getdate()); 
					INSERT INTO VCP_CUSTOM01.DBO.TBP_EXTERNAL_URL_MASTER (CompanyCode, MasterName, ParentCode, SortOrder, UseYN, Description, SiteUrl, CategoryName, MainAgentName, ChargeName, LanguageName, CreateUserID, CreateDate) VALUES (N'LG 전자',N'Green Car Congress',(SELECT Code FROM VCP_CUSTOM01.dbo.TBP_EXTERNAL_URL_MASTER WHERE CompanyCode=N'LG 전자' AND ParentCode=0),700,'Y',N'승용/상용 전동화 관련 주요 소식 및 친환경 자동차 관련 기술, 제품, 정책 등에 대한 뉴스, 보고서 제공.','https://www.greencarcongress.com',N'산업/시장동향/트렌드 (Trend)',N'분석/조사업체',N'무료',N'영문',-1, Getdate()); 
					INSERT INTO VCP_CUSTOM01.DBO.TBP_EXTERNAL_URL_MASTER (CompanyCode, MasterName, ParentCode, SortOrder, UseYN, Description, SiteUrl, CategoryName, MainAgentName, ChargeName, LanguageName, CreateUserID, CreateDate) VALUES (N'LG 전자',N'Frost & Sullivan - 프로스트 앤 설리번',(SELECT Code FROM VCP_CUSTOM01.dbo.TBP_EXTERNAL_URL_MASTER WHERE CompanyCode=N'LG 전자' AND ParentCode=0),650,'Y',N'비즈니스 컨설팅 전문 업체로 성장전략 컨설팅, 산업 분야별 기업분석 정보, 산업/솔루션별 전문 보고서, 자동차 시장, 제약·바이오·진단 등 글로벌 산업 동향 및 시장 분석 자료 제공.','http://ww2.frost.com/',N'산업/시장동향/트렌드 (Trend)',N'분석/조사업체',N'부분유료',N'영문',-1, Getdate()); 
					INSERT INTO VCP_CUSTOM01.DBO.TBP_EXTERNAL_URL_MASTER (CompanyCode, MasterName, ParentCode, SortOrder, UseYN, Description, SiteUrl, CategoryName, MainAgentName, ChargeName, LanguageName, CreateUserID, CreateDate) VALUES (N'LG 전자',N'Engadget - 엔가젯',(SELECT Code FROM VCP_CUSTOM01.dbo.TBP_EXTERNAL_URL_MASTER WHERE CompanyCode=N'LG 전자' AND ParentCode=0),590,'Y',N'전자상품에 대한 다국적 기술 웹로그이자 팟캐스트이며, 전자 제품 (스마트폰 등) 뉴스, 리뷰 및 자동차 관련 기사 제공.','https://www.engadget.com/',N'경쟁사/고객사/제품/스펙/리뷰 (Product)',N'신문/언론/잡지사',N'무료',N'영문',-1, Getdate()); 
					INSERT INTO VCP_CUSTOM01.DBO.TBP_EXTERNAL_URL_MASTER (CompanyCode, MasterName, ParentCode, SortOrder, UseYN, Description, SiteUrl, CategoryName, MainAgentName, ChargeName, LanguageName, CreateUserID, CreateDate) VALUES (N'LG 전자',N'Electronic Times - 전자신문',(SELECT Code FROM VCP_CUSTOM01.dbo.TBP_EXTERNAL_URL_MASTER WHERE CompanyCode=N'LG 전자' AND ParentCode=0),560,'Y',N'국내외 IT기술정보와 동향소식을 기사화하여 제공하는 언론사 사이트. 전자제품 회사 및 전자제품과 관련 기술 등 산업 트렌드에 대한 각종 뉴스 정보 제공. (검색시 키워드 : TV, MNT, NBPC, Tablet, SP, Display, Panel, LCD, OLED, LGD, SDC)','http://www.etnews.com',N'산업/시장동향/트렌드 (Trend)',N'신문/언론/잡지사',N'무료',N'국문',-1, Getdate()); 
					INSERT INTO VCP_CUSTOM01.DBO.TBP_EXTERNAL_URL_MASTER (CompanyCode, MasterName, ParentCode, SortOrder, UseYN, Description, SiteUrl, CategoryName, MainAgentName, ChargeName, LanguageName, CreateUserID, CreateDate) VALUES (N'LG 전자',N'Electrek',(SELECT Code FROM VCP_CUSTOM01.dbo.TBP_EXTERNAL_URL_MASTER WHERE CompanyCode=N'LG 전자' AND ParentCode=0),550,'Y',N'EV 및 친환경 에너지를 전담하는 미국 기반 뉴스 웹 사이트.Tesla, 전기차, ESS 관련 최신 정보 동향 제공.','https://electrek.co',N'에너지/ECO/ SOC (Environment)',N'신문/언론/잡지사',N'부분유료',N'영문',-1, Getdate()); 
					INSERT INTO VCP_CUSTOM01.DBO.TBP_EXTERNAL_URL_MASTER (CompanyCode, MasterName, ParentCode, SortOrder, UseYN, Description, SiteUrl, CategoryName, MainAgentName, ChargeName, LanguageName, CreateUserID, CreateDate) VALUES (N'LG 전자',N'Counterpoint Research - 카운터 포인트',(SELECT Code FROM VCP_CUSTOM01.dbo.TBP_EXTERNAL_URL_MASTER WHERE CompanyCode=N'LG 전자' AND ParentCode=0),480,'Y',N'아시아에 본사를 둔 글로벌 산업 분석 회사. 스마트폰 데이터 분석, 인사이트, 뉴스 시장 정보 제공. (검색 시 키워드 : SP, Display, Industry)','https://www.counterpointresearch.com/',N'산업/시장동향/트렌드 (Trend)',N'분석/조사업체',N'부분유료',N'영문',-1, Getdate()); 
					INSERT INTO VCP_CUSTOM01.DBO.TBP_EXTERNAL_URL_MASTER (CompanyCode, MasterName, ParentCode, SortOrder, UseYN, Description, SiteUrl, CategoryName, MainAgentName, ChargeName, LanguageName, CreateUserID, CreateDate) VALUES (N'LG 전자',N'CNET',(SELECT Code FROM VCP_CUSTOM01.dbo.TBP_EXTERNAL_URL_MASTER WHERE CompanyCode=N'LG 전자' AND ParentCode=0),450,'Y',N'글로벌 IT 뉴스, 비즈니스 기술 정보 및 전자제품 리뷰, 신제품 정보,  블로그, 팟캐스트를 출판정보를 제공하는 미국의 기술 미디어 웹사이트. (ex. TV, AV, Smart Home Device, Game Console 등)','https://www.cnet.com/',N'산업/시장동향/트렌드 (Trend)',N'신문/언론/잡지사',N'무료',N'영문',-1, Getdate()); 
					INSERT INTO VCP_CUSTOM01.DBO.TBP_EXTERNAL_URL_MASTER (CompanyCode, MasterName, ParentCode, SortOrder, UseYN, Description, SiteUrl, CategoryName, MainAgentName, ChargeName, LanguageName, CreateUserID, CreateDate) VALUES (N'LG 전자',N'Nasdaq IR insight',(SELECT Code FROM VCP_CUSTOM01.dbo.TBP_EXTERNAL_URL_MASTER WHERE CompanyCode=N'LG 전자' AND ParentCode=0),960,'Y',N'해외 기업 분석 정보, 리포트, 경쟁사 분기별 발표 script 및 증권업 전반의 정보 제공.','https://irinsight.nasdaq.com/Desktop#/index',N'금융/경제/재무/증권/투자 (Money)',N'분석/조사업체',N'유료',N'영문',-1, Getdate()); 
					INSERT INTO VCP_CUSTOM01.DBO.TBP_EXTERNAL_URL_MASTER (CompanyCode, MasterName, ParentCode, SortOrder, UseYN, Description, SiteUrl, CategoryName, MainAgentName, ChargeName, LanguageName, CreateUserID, CreateDate) VALUES (N'LG 전자',N'IHS Markit',(SELECT Code FROM VCP_CUSTOM01.dbo.TBP_EXTERNAL_URL_MASTER WHERE CompanyCode=N'LG 전자' AND ParentCode=0),740,'Y',N'글로벌 화학 Value Chain 분석 사이트. BD, 합성고무/천연고무, 타이어 등 시황 정보 제공.
					Energy Insight>Solar PV>Market data and forecast> PV supplier tracker : Top 20 정보 제공.
					financial data, Display / Panel 시장에 대한 판가, 수요, CAPA, 제품 별 분석, 물동 등 트렌드 분석 및 주요 산업 데이터 제공.','https://connect.ihsmarkit.com/home',N'산업/시장동향/트렌드 (Trend)',N'분석/조사업체',N'부분유료',N'영문',-1, Getdate()); 
					INSERT INTO VCP_CUSTOM01.DBO.TBP_EXTERNAL_URL_MASTER (CompanyCode, MasterName, ParentCode, SortOrder, UseYN, Description, SiteUrl, CategoryName, MainAgentName, ChargeName, LanguageName, CreateUserID, CreateDate) VALUES (N'LG 전자',N'Global Auto news - 글로벌오토뉴스',(SELECT Code FROM VCP_CUSTOM01.dbo.TBP_EXTERNAL_URL_MASTER WHERE CompanyCode=N'LG 전자' AND ParentCode=0),680,'Y',N'자동차 산업 동향 및 제품 리뷰, 동영상, 가격 등의 정보 제공.','http://www.global-autonews.com',N'산업/시장동향/트렌드 (Trend)',N'신문/언론/잡지사',N'무료',N'국문',-1, Getdate()); 
					INSERT INTO VCP_CUSTOM01.DBO.TBP_EXTERNAL_URL_MASTER (CompanyCode, MasterName, ParentCode, SortOrder, UseYN, Description, SiteUrl, CategoryName, MainAgentName, ChargeName, LanguageName, CreateUserID, CreateDate) VALUES (N'LG 전자',N'PhoneArena - 폰아레나',(SELECT Code FROM VCP_CUSTOM01.dbo.TBP_EXTERNAL_URL_MASTER WHERE CompanyCode=N'LG 전자' AND ParentCode=0),1020,'Y',N'모바일 제품(스마트폰, 태블릿, 스마트와치)의 최신 뉴스와 신제품 리뷰, 제품 스펙 제공. 특히, 북미 제품에 대해 상세한 정보를 제공함.','http://www.phonearena.com',N'경쟁사/고객사/제품/스펙/리뷰 (Product)',N'분석/조사업체',N'무료',N'영문',-1, Getdate()); 
					INSERT INTO VCP_CUSTOM01.DBO.TBP_EXTERNAL_URL_MASTER (CompanyCode, MasterName, ParentCode, SortOrder, UseYN, Description, SiteUrl, CategoryName, MainAgentName, ChargeName, LanguageName, CreateUserID, CreateDate) VALUES (N'LG 전자',N'McKinsey & Company - 맥킨지',(SELECT Code FROM VCP_CUSTOM01.dbo.TBP_EXTERNAL_URL_MASTER WHERE CompanyCode=N'LG 전자' AND ParentCode=0),890,'Y',N'미국의 대표적인 컨설팅 기업. 시장 동향 분석, 기술 트렌드, 업체 별 경영 현황 등의 정보 제공.','http://www.mckinsey.com/',N'산업/시장동향/트렌드 (Trend)',N'분석/조사업체',N'무료',N'영문',-1, Getdate()); 
					INSERT INTO VCP_CUSTOM01.DBO.TBP_EXTERNAL_URL_MASTER (CompanyCode, MasterName, ParentCode, SortOrder, UseYN, Description, SiteUrl, CategoryName, MainAgentName, ChargeName, LanguageName, CreateUserID, CreateDate) VALUES (N'LG 전자',N'Trend Watching - 트렌드와칭',(SELECT Code FROM VCP_CUSTOM01.dbo.TBP_EXTERNAL_URL_MASTER WHERE CompanyCode=N'LG 전자' AND ParentCode=0),1320,'Y',N'트렌드 정보 사이트','https://trendwatching.com/',N'산업/시장동향/트렌드 (Trend)',N'분석/조사업체',N'부분유료',N'영문',-1, Getdate()); INSERT INTO VCP_MAIN.dbo.TBP_EXTERNAL_URL_ACCESS (Code, Dept_Id) VALUES (@@identity, ISNULL((SELECT dept_id FROM VCP_MAIN.dbo.TBP_DEPT WHERE tenant_id = 'L1100' AND dept_kor_name = N'홈뷰티사업담당'),-1))
					INSERT INTO VCP_CUSTOM01.DBO.TBP_EXTERNAL_URL_MASTER (CompanyCode, MasterName, ParentCode, SortOrder, UseYN, Description, SiteUrl, CategoryName, MainAgentName, ChargeName, LanguageName, CreateUserID, CreateDate) VALUES (N'LG 전자',N'EUROMONITOR INTERNATIONAL',(SELECT Code FROM VCP_CUSTOM01.dbo.TBP_EXTERNAL_URL_MASTER WHERE CompanyCode=N'LG 전자' AND ParentCode=0),610,'Y',N'국내 및 해외 비즈니스 환경과 산업 현황, 마켓 분석 리포트와 데이터베이스, 컨설팅 프로젝트, 시나리오 등을 통해 새로운 비즈니스 기회 발굴 관련 정보 제공.','https://www.euromonitor.com/ ',N'산업/시장동향/트렌드 (Trend)',N'분석/조사업체',N'유료',N'영문',-1, Getdate()); 
					INSERT INTO VCP_CUSTOM01.DBO.TBP_EXTERNAL_URL_MASTER (CompanyCode, MasterName, ParentCode, SortOrder, UseYN, Description, SiteUrl, CategoryName, MainAgentName, ChargeName, LanguageName, CreateUserID, CreateDate) VALUES (N'LG 전자',N'EV Volumes',(SELECT Code FROM VCP_CUSTOM01.dbo.TBP_EXTERNAL_URL_MASTER WHERE CompanyCode=N'LG 전자' AND ParentCode=0),640,'Y',N'자동차 판매 통계, 차량 인구, 충전 인프라, 플러그인 차량 사양 및 구매 인센티브에 대한 데이터베이스 제공.
					전기 자동차(EV)와 관련된 데이터 수집 분석, 환경에 대한 글로벌 시장 정보 제공.','http://www.ev-volumes.com/',N'산업/시장동향/트렌드 (Trend)',N'분석/조사업체',N'부분유료',N'영문',-1, Getdate()); 
					INSERT INTO VCP_CUSTOM01.DBO.TBP_EXTERNAL_URL_MASTER (CompanyCode, MasterName, ParentCode, SortOrder, UseYN, Description, SiteUrl, CategoryName, MainAgentName, ChargeName, LanguageName, CreateUserID, CreateDate) VALUES (N'LG 전자',N'LEDInside',(SELECT Code FROM VCP_CUSTOM01.dbo.TBP_EXTERNAL_URL_MASTER WHERE CompanyCode=N'LG 전자' AND ParentCode=0),870,'Y',N'글로벌 LED / Mini-LED, 디스플레이 관련 정보, 기술소개 등  LED 시장 조사기관 매체.','www.ledinside.com',N'산업/시장동향/트렌드 (Trend)',N'분석/조사업체',N'부분유료',N'영문',-1, Getdate()); 
					INSERT INTO VCP_CUSTOM01.DBO.TBP_EXTERNAL_URL_MASTER (CompanyCode, MasterName, ParentCode, SortOrder, UseYN, Description, SiteUrl, CategoryName, MainAgentName, ChargeName, LanguageName, CreateUserID, CreateDate) VALUES (N'LG 전자',N'Deloitte - 딜로이트',(SELECT Code FROM VCP_CUSTOM01.dbo.TBP_EXTERNAL_URL_MASTER WHERE CompanyCode=N'LG 전자' AND ParentCode=0),490,'Y',N'회계업무, 주요 산업 트렌드 분석/ 컨설팅 등 비즈니스 전반에 걸친 동향 및 인사이트 정보 제공.','https://www2.deloitte.com/',N'산업/시장동향/트렌드 (Trend)',N'신문/언론/잡지사',N'부분유료',N'국문',-1, Getdate()); 
					INSERT INTO VCP_CUSTOM01.DBO.TBP_EXTERNAL_URL_MASTER (CompanyCode, MasterName, ParentCode, SortOrder, UseYN, Description, SiteUrl, CategoryName, MainAgentName, ChargeName, LanguageName, CreateUserID, CreateDate) VALUES (N'LG 전자',N'Automotive News',(SELECT Code FROM VCP_CUSTOM01.dbo.TBP_EXTERNAL_URL_MASTER WHERE CompanyCode=N'LG 전자' AND ParentCode=0),340,'Y',N'미국 자동차 관련 뉴스, 리포트, 시장 예측 자료 제공.','https://www.autonews.com',N'산업/시장동향/트렌드 (Trend)',N'신문/언론/잡지사',N'부분유료',N'영문',-1, Getdate()); 
					INSERT INTO VCP_CUSTOM01.DBO.TBP_EXTERNAL_URL_MASTER (CompanyCode, MasterName, ParentCode, SortOrder, UseYN, Description, SiteUrl, CategoryName, MainAgentName, ChargeName, LanguageName, CreateUserID, CreateDate) VALUES (N'LG 전자',N'트렌드모니터',(SELECT Code FROM VCP_CUSTOM01.dbo.TBP_EXTERNAL_URL_MASTER WHERE CompanyCode=N'LG 전자' AND ParentCode=0),190,'Y',N'IT/자동차, 미디어, 건강/라이프 스타일, 유통 등 다양한 분야의 컨슈머 리서치 및 최신 트렌드 이슈에 대한 소비자 인식 조사 결과 제공.
					조사 회사 마크로밀 엠브레인에 나서 자체적으로 기획/진행한 뷰티/헬스 관련 트렌드와 소비자 인식 관련 조사 결과 정보 제공.','https://www.trendmonitor.co.kr/tmweb/main.do',N'산업/시장동향/트렌드 (Trend)',N'분석/조사업체',N'무료',N'국문',-1, Getdate()); 
					INSERT INTO VCP_CUSTOM01.DBO.TBP_EXTERNAL_URL_MASTER (CompanyCode, MasterName, ParentCode, SortOrder, UseYN, Description, SiteUrl, CategoryName, MainAgentName, ChargeName, LanguageName, CreateUserID, CreateDate) VALUES (N'LG 전자',N'Electronics and Telecommunications Research Institute - 한국전자통신연구원 : 기술이전검색/신청',(SELECT Code FROM VCP_CUSTOM01.dbo.TBP_EXTERNAL_URL_MASTER WHERE CompanyCode=N'LG 전자' AND ParentCode=0),570,'Y',N'국내 지식공유 플랫폼으로 ETRI 연구성과, 논문, 특허 동향 분석 등 학술지 정보 제공.','https://itec.etri.re.kr/itec/sub02/sub02_01.do',N'기술 (Technology)',N'기관/협회',N'무료',N'국문',-1, Getdate()); 
					INSERT INTO VCP_CUSTOM01.DBO.TBP_EXTERNAL_URL_MASTER (CompanyCode, MasterName, ParentCode, SortOrder, UseYN, Description, SiteUrl, CategoryName, MainAgentName, ChargeName, LanguageName, CreateUserID, CreateDate) VALUES (N'LG 전자',N'Trend DB',(SELECT Code FROM VCP_CUSTOM01.dbo.TBP_EXTERNAL_URL_MASTER WHERE CompanyCode=N'LG 전자' AND ParentCode=0),1310,'Y',N'디지털중심의 마케팅, 라이프스타일, 기술, 디자인 등 최신 상품 트렌드 정보 제공.
					기술 및 그래픽, 색깔, 형태, 소재 등 제품 디자인 영역의 트렌드 사례 정보 제공.','http://www.trenddb.com/',N'산업/시장동향/트렌드 (Trend)',N'신문/언론/잡지사',N'부분유료',N'국문',-1, Getdate()); 
					INSERT INTO VCP_CUSTOM01.DBO.TBP_EXTERNAL_URL_MASTER (CompanyCode, MasterName, ParentCode, SortOrder, UseYN, Description, SiteUrl, CategoryName, MainAgentName, ChargeName, LanguageName, CreateUserID, CreateDate) VALUES (N'LG 전자',N'썸트렌드',(SELECT Code FROM VCP_CUSTOM01.dbo.TBP_EXTERNAL_URL_MASTER WHERE CompanyCode=N'LG 전자' AND ParentCode=0),100,'Y',N'다음소프트 빅데이터 분석서비스. 소셜데이터 기반의 특정 주제어에 대한 관심도, 호감도, 관련 이슈등을 분석해 여론을 파악하는 소셜 빅데이터 분석 서비스 제공.
					매주 브랜드, 장소, 콘텐츠, 라이프스타일, 감성 등 다양한 분야의 관심사에 대한 트렌드 매거진 정보 제공.','https://some.co.kr/',N'산업/시장동향/트렌드 (Trend)',N'분석/조사업체',N'부분유료',N'국문',-1, Getdate()); 
					INSERT INTO VCP_CUSTOM01.DBO.TBP_EXTERNAL_URL_MASTER (CompanyCode, MasterName, ParentCode, SortOrder, UseYN, Description, SiteUrl, CategoryName, MainAgentName, ChargeName, LanguageName, CreateUserID, CreateDate) VALUES (N'LG 전자',N'PV magazine',(SELECT Code FROM VCP_CUSTOM01.dbo.TBP_EXTERNAL_URL_MASTER WHERE CompanyCode=N'LG 전자' AND ParentCode=0),1060,'Y',N'글로벌 태양광 에너지, 신재생에너지(PV 및 Wind) / ESS 산업 및 시장 관련 최신 동향 기사 제공.','https://www.pv-magazine.com/',N'에너지/ECO/ SOC (Environment)',N'신문/언론/잡지사',N'무료',N'영문',-1, Getdate()); 
					INSERT INTO VCP_CUSTOM01.DBO.TBP_EXTERNAL_URL_MASTER (CompanyCode, MasterName, ParentCode, SortOrder, UseYN, Description, SiteUrl, CategoryName, MainAgentName, ChargeName, LanguageName, CreateUserID, CreateDate) VALUES (N'LG 전자',N'Automotive Electronics',(SELECT Code FROM VCP_CUSTOM01.dbo.TBP_EXTERNAL_URL_MASTER WHERE CompanyCode=N'LG 전자' AND ParentCode=0),320,'Y',N'Autonomous, Mobility, connectivity, Electrification, HMI, 자동차 부품 동향 및 Connectivity & Security 정보 등 자동차 전장 관련 뉴스 제공.','http://www.autoelectronics.co.kr/',N'산업/시장동향/트렌드 (Trend)',N'신문/언론/잡지사',N'부분유료',N'국문',-1, Getdate()); 
				END
		
		-------------------- ERROR 처리 --------------------
		IF (@@ERROR = 0) -- @@ERROR 는 검출된 에러코드 (0이면 정상 처리, 0이 아니면 비정상 처리된 것으로 오류 번호를 반환)
			BEGIN
				PRINT CONCAT(@company, N'의 외부 사이트 정보 데이터를 정상 등록하였습니다.');
		        COMMIT TRAN
		        SET @OUT_RETURN = 1
		    END
		ELSE
			BEGIN
				PRINT CONCAT(@company, N'의 외부 사이트 정보 데이터 등록을 실패하였습니다.');
		        ROLLBACK TRAN
		        SET @OUT_RETURN = 0
		    END
	
		FETCH NEXT FROM CUR INTO @company,@sort_no
	END
	
	CLOSE CUR
DEALLOCATE CUR