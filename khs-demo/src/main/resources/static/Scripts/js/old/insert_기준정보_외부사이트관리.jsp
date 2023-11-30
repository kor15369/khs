DECLARE @company NVARCHAR(50),
	    @sort_no INT,
		@TEMP_IDENTITY_LEVEL1 INT,
		@TEMP_IDENTITY_LEVEL2 INT,
		@TEMP_IDENTITY_LEVEL2_SORTNO INT,
		@OUT_RETURN INT -- 오류:0, 성공:1

SET NOCOUNT ON
        
DECLARE CUR CURSOR FOR

	SELECT company, sort_no FROM CRV_Company
	
	OPEN CUR
	FETCH NEXT FROM CUR INTO @company,@sort_no
	
	WHILE @@FETCH_STATUS = 0
	BEGIN
		
	    IF NOT EXISTS (SELECT * 
	                     FROM VCP_MAIN.dbo.TBP_CODE_DETAIL WITH(NOLOCK)
	                    WHERE CompanyCode = @company
	                      AND DisplayName = N'외부 사이트 항목 > 유형')
			BEGIN
				BEGIN TRAN
				
				-------------------- 외부 사이트 항목 > 유형 생성 --------------------
				INSERT INTO TBP_CODE_DETAIL (CompanyCode, MasterCode, DisplayName, ParentCode, SortOrder, UseYN, Description, UserID, CreateDate)
				VALUES (@company, N'', N'외부 사이트 항목 > 유형', (SELECT TOP(1) Code FROM TBP_CODE_DETAIL WHERE CompanyCode = @company AND ParentCode = 0), 999, 'Y', N'외부 사이트 관리 화면에서 사용되는 항목', 1895, GETDATE())
				
				SET @TEMP_IDENTITY_LEVEL1 = SCOPE_IDENTITY();
				
				-------------------- 카테고리 생성 --------------------
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
				
				
				-------------------- 주체 생성 --------------------
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
				
				-------------------- 요금 생성 --------------------
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
				
				-------------------- 언어 생성 --------------------
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
						PRINT CONCAT(@company, N' 데이터를 정상 등록하였습니다.');
				        COMMIT TRAN
				        SET @OUT_RETURN = 1
				    END
				ELSE
					BEGIN
						PRINT CONCAT(@company, N' 데이터 등록을 실패하였습니다.');
				        ROLLBACK TRAN
				        SET @OUT_RETURN = 0
				    END
			END
		ELSE
			BEGIN
				PRINT CONCAT(@company, N' 데이터가 이미 존재합니다.');
			END
	
		FETCH NEXT FROM CUR INTO @company,@sort_no
	END
	
	CLOSE CUR
DEALLOCATE CUR