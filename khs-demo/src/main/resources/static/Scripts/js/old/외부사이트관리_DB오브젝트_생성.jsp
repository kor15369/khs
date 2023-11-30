/******************************************************************************************************************
INSERT DATA : TBP_CODE_MASTER
******************************************************************************************************************/
INSERT INTO VCP_MAIN.dbo.TBP_CODE_MASTER
SELECT company AS CompanyCode
     , MasterCode
     , MasterName
     , UseYN
     , Description
     , UserID
     , CreateDate
     , NULL
     , NULL
  FROM CRV_Company AS CC
 CROSS JOIN (
		 	 SELECT 'EXTERNAL_SITE_ITEM_LV1' AS MasterCode
				  , N'외부 사이트 항목' AS MasterName
				  , 'Y' AS UseYN
				  , CONCAT(N'비지니스 어드민 / 외부 사이트 관리 / ', CONVERT(CHAR(10), GETDATE(), 102)) AS Description
				  , -1 AS UserID
				  , GETDATE() AS CreateDate
		      UNION ALL
			 SELECT 'EXTERNAL_SITE_ITEM_LV2' AS MasterCode
				  , N'외부 사이트 유형' AS MasterName
				  , 'Y' AS UseYN
				  , CONCAT(N'비지니스 어드민 / 외부 사이트 관리 / ', CONVERT(CHAR(10), GETDATE(), 102)) AS Description
				  , -1 AS UserID
				  , GETDATE() AS CreateDate
		 	) TMEP_CODE_MASTER
		 	
		 	
		 	


/******************************************************************************************************************
CREATE TABLE : TBP_EXTERNAL_URL_ACCESS
******************************************************************************************************************/
-- VCP_MAIN.dbo.TBP_EXTERNAL_URL_ACCESS definition

-- Drop table

-- DROP TABLE VCP_MAIN.dbo.TBP_EXTERNAL_URL_ACCESS;

CREATE TABLE VCP_MAIN.dbo.TBP_EXTERNAL_URL_ACCESS (
	Code int NOT NULL,
	Dept_Id varchar(16) COLLATE SQL_Latin1_General_CP1_CI_AS NOT NULL,
	CONSTRAINT TBP_EXTERNAL_URL_ACCESS_PK PRIMARY KEY (Code,Dept_Id)
);

-- Extended properties

EXEC VCP_MAIN.sys.sp_addextendedproperty @name=N'MS_Description', @value=N'코드', @level0type=N'Schema', @level0name=N'dbo', @level1type=N'Table', @level1name=N'TBP_EXTERNAL_URL_ACCESS', @level2type=N'Column', @level2name=N'Code';
EXEC VCP_MAIN.sys.sp_addextendedproperty @name=N'MS_Description', @value=N'부서ID', @level0type=N'Schema', @level0name=N'dbo', @level1type=N'Table', @level1name=N'TBP_EXTERNAL_URL_ACCESS', @level2type=N'Column', @level2name=N'Dept_Id';





/******************************************************************************************************************
CREATE TABLE : TBP_EXTERNAL_URL_MASTER
******************************************************************************************************************/
-- VCP_CUSTOM01.dbo.TBP_EXTERNAL_URL_MASTER definition

-- Drop table

-- DROP TABLE VCP_CUSTOM01.dbo.TBP_EXTERNAL_URL_MASTER;

CREATE TABLE VCP_CUSTOM01.dbo.TBP_EXTERNAL_URL_MASTER (
	Code int IDENTITY(1,1) NOT NULL,
	
	CompanyCode nvarchar(50) COLLATE SQL_Latin1_General_CP1_CI_AS NOT NULL,	
	MasterName nvarchar(50) COLLATE SQL_Latin1_General_CP1_CI_AS NOT NULL,
	ParentCode int NULL,
	SortOrder int NOT NULL,
	UseYN char(1) COLLATE SQL_Latin1_General_CP1_CI_AS DEFAULT 'Y' NOT NULL,
	Description nvarchar(500) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
	
	SiteUrl nvarchar(1000) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
	CategoryName nvarchar(50) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
	MainAgentName nvarchar(50) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
	ChargeName nvarchar(50) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
	LanguageName nvarchar(50) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
	
	CreateUserID int NOT NULL,
	CreateDate datetime DEFAULT getdate() NULL,
	UpdateUserID int NULL,
	UpdateDate datetime NULL,
	
	CONSTRAINT PK_TBP_EDITOR_TEMPLATE_MASTER PRIMARY KEY (Code)
);

EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'코드(PK)' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'TBP_EXTERNAL_URL_MASTER', @level2type=N'COLUMN',@level2name=N'Code'
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'회사코드' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'TBP_EXTERNAL_URL_MASTER', @level2type=N'COLUMN',@level2name=N'CompanyCode'
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'코드명' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'TBP_EXTERNAL_URL_MASTER', @level2type=N'COLUMN',@level2name=N'MasterName'
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'부모코드' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'TBP_EXTERNAL_URL_MASTER', @level2type=N'COLUMN',@level2name=N'ParentCode'
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'순서' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'TBP_EXTERNAL_URL_MASTER', @level2type=N'COLUMN',@level2name=N'SortOrder'
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'사용여부' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'TBP_EXTERNAL_URL_MASTER', @level2type=N'COLUMN',@level2name=N'UseYN'
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'설명' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'TBP_EXTERNAL_URL_MASTER', @level2type=N'COLUMN',@level2name=N'Description'
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'사이트 주소' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'TBP_EXTERNAL_URL_MASTER', @level2type=N'COLUMN',@level2name=N'SiteUrl'
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'카테고리명' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'TBP_EXTERNAL_URL_MASTER', @level2type=N'COLUMN',@level2name=N'CategoryName'
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'주체명' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'TBP_EXTERNAL_URL_MASTER', @level2type=N'COLUMN',@level2name=N'MainAgentName'
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'요금명' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'TBP_EXTERNAL_URL_MASTER', @level2type=N'COLUMN',@level2name=N'ChargeName'
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'언어명' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'TBP_EXTERNAL_URL_MASTER', @level2type=N'COLUMN',@level2name=N'LanguageName'
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'생성자 ID' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'TBP_EXTERNAL_URL_MASTER', @level2type=N'COLUMN',@level2name=N'CreateUserID'
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'생성일자' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'TBP_EXTERNAL_URL_MASTER', @level2type=N'COLUMN',@level2name=N'CreateDate'
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'수정자 ID' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'TBP_EXTERNAL_URL_MASTER', @level2type=N'COLUMN',@level2name=N'UpdateUserID'
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'수정일자' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'TBP_EXTERNAL_URL_MASTER', @level2type=N'COLUMN',@level2name=N'UpdateDate'





/******************************************************************************************************************  
    Procedure 명 : CSP_EXT_TBP_EXTERNAL_URL_INFO_BASE
    생   성   자 : 강훈성  
    생   성   일 : 2023.01.05
    비        고 : 외부 사이트 기본입력
	GRANT EXECUTE ON VCP_MAIN.dbo.CSP_EXT_TBP_EXTERNAL_URL_INFO_BASE TO [SGM_Write]   
****************************************************************************************************************** 
수정 : 
2023.01.05 : 최초작성
2023.00.00 강훈성 : SXCSS000-000 [내부SSR] 서비스 업그레이드#1 반영
******************************************************************************************************************/
CREATE PROCEDURE dbo.CSP_EXT_TBP_EXTERNAL_URL_INFO_BASE
(
	 @CallerLogin	NVARCHAR(85)
)
AS
BEGIN
SET NOCOUNT ON

	IF EXISTS ( SELECT TOP 1 1 FROM CRV_Company WHERE company NOT IN (SELECT CompanyCode FROM VCP_CUSTOM01.DBO.TBP_EXTERNAL_URL_MASTER WITH(NOLOCK) WHERE ParentCode = 0) )
	BEGIN 
		INSERT INTO VCP_CUSTOM01.DBO.TBP_EXTERNAL_URL_MASTER ( CompanyCode, MasterName, ParentCode, SortOrder, UseYN, [Description], CreateUserID, CreateDate )
		SELECT 
			company, company, 0, sort_no, 'Y', 'ROOT', -1, Getdate()
		FROM CRV_Company
		WHERE company NOT IN (SELECT CompanyCode FROM VCP_CUSTOM01.DBO.TBP_EXTERNAL_URL_MASTER WITH(NOLOCK) WHERE ParentCode = 0)
	END
END





/******************************************************************************************************************  
INSERT TBP_QUERY_TEMPLATE : QT_COM_GetCodeInfoByItem
******************************************************************************************************************/
WITH CODE_INFO AS (
	SELECT lev, Code, DisplayName, MasterCode, ParentCode, Dept_Id, Dept_Name, CompanyCode, SortOrder
	  FROM CRV_CodeInfoByTree WITH (NOLOCK)
	 WHERE CompanyCode = N'{#1}'
  	   AND MasterCode = N'{#2}'
	   AND (CHARINDEX(N'{#3}', Dept_Name) > 0 OR Dept_Name IS NULL)
       AND UseYN = 'Y'
)

SELECT CompanyCode
     , (SELECT TCD.DisplayName FROM TBP_CODE_DETAIL AS TCD WHERE TCD.Code = TMP.ParentCode) AS parentDisplayName
     , DisplayName
     , Dept_Id
     , Dept_Name
     , SortOrder
  FROM CODE_INFO TMP
 ORDER BY parentDisplayName, SortOrder;




 
/******************************************************************************************************************  
INSERT TBP_QUERY_TEMPLATE : QT_COM_GetExternalUrlList
******************************************************************************************************************/
WITH EXTERNAL_URL_INFO AS (
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
	  FROM TBP_EXTERNAL_URL_ACCESS A WITH(NOLOCK)
	 INNER JOIN TBP_DEPT B WITH(NOLOCK)
		ON A.Dept_Id = B.dept_id 
	   AND B.tenant_id IN ('L1100', 'L1200', 'L1300', 'L2101', 'L4200') AND B.use_yn = 'Y'
)

SELECT EXTERNAL_URL_INFO.Code AS [key]
	 , EXTERNAL_URL_INFO.Code AS code
     , CompanyCode AS companyCode
     , MasterName As displayName
	 , MasterName AS [title]
	 , Case When UseYN = 'N' then 'treeNodeStrike' Else '' End AS [addClass]     
     , UseYN AS useYN
     , ParentCode AS parentCode
     , SortOrder AS sortOrder
     , Description AS description
     , Lev AS lev
	 , ISNULL(SiteUrl, '') AS siteUrl
	 , ISNULL(CategoryName, '') AS categoryName 
	 , ISNULL(MainAgentName, '') AS mainAgentName
	 , ISNULL(ChargeName, '') AS chargeName 
	 , ISNULL(LanguageName, '') AS languageName
     , ISNULL(Dept_Id, '') AS dept_Id
     , ISNULL(Dept_Name, '') AS dept_Name
  FROM EXTERNAL_URL_INFO
  LEFT OUTER JOIN ( 
				   SELECT Code
					    , STUFF((SELECT N',' + CONVERT(NVARCHAR(255), Dept_Id) FROM EXTERNAL_URL_ACCESS WITH(NOLOCK) WHERE Code = TCA.Code FOR XML PATH('')), 1, 1, '') AS Dept_Id
					    , STUFF((SELECT N',' + Dept_Name FROM EXTERNAL_URL_ACCESS WITH(NOLOCK) WHERE Code = TCA.Code FOR XML PATH('')), 1, 1, '') AS Dept_Name
					 FROM TBP_EXTERNAL_URL_ACCESS TCA
				  ) DEPT_INFO
	ON DEPT_INFO.Code = EXTERNAL_URL_INFO.Code
 WHERE CompanyCode = N'{#1}'
   AND (ISNULL(N'{#2}', '') = '' OR (CHARINDEX(N'{#2}', Dept_Name) > 0 OR Dept_Name IS NULL))
   AND (ISNULL(N'{#3}', '') = '' OR UseYN = N'{#3}')
 ORDER BY Lev, SortOrder





/******************************************************************************************************************  
INSERT : TBP_CODE_MASTER
******************************************************************************************************************/
INSERT INTO VCP_MAIN.dbo.TBP_CODE_MASTER
(CompanyCode, MasterCode, MasterName, UseYN, Description, UserID, CreateDate, UserID_Update, UpdateDate)
VALUES(N'LG 디스플레이', N'EXTERNAL_SITE_ITEM_LV1', N'외부 사이트 항목', N'Y', N'비지니스 어드민 / 외부 사이트 관리 / 2023.01.04', -1, '2023-01-04 14:27:59.437', NULL, NULL);
INSERT INTO VCP_MAIN.dbo.TBP_CODE_MASTER
(CompanyCode, MasterCode, MasterName, UseYN, Description, UserID, CreateDate, UserID_Update, UpdateDate)
VALUES(N'LG 디스플레이', N'EXTERNAL_SITE_ITEM_LV2', N'외부 사이트 유형', N'Y', N'비지니스 어드민 / 외부 사이트 관리 / 2023.01.04', -1, '2023-01-04 14:27:59.437', NULL, NULL);
INSERT INTO VCP_MAIN.dbo.TBP_CODE_MASTER
(CompanyCode, MasterCode, MasterName, UseYN, Description, UserID, CreateDate, UserID_Update, UpdateDate)
VALUES(N'LG 에너지솔루션', N'EXTERNAL_SITE_ITEM_LV1', N'외부 사이트 항목', N'Y', N'비지니스 어드민 / 외부 사이트 관리 / 2023.01.04', -1, '2023-01-04 14:27:59.437', NULL, NULL);
INSERT INTO VCP_MAIN.dbo.TBP_CODE_MASTER
(CompanyCode, MasterCode, MasterName, UseYN, Description, UserID, CreateDate, UserID_Update, UpdateDate)
VALUES(N'LG 에너지솔루션', N'EXTERNAL_SITE_ITEM_LV2', N'외부 사이트 유형', N'Y', N'비지니스 어드민 / 외부 사이트 관리 / 2023.01.04', -1, '2023-01-04 14:27:59.437', NULL, NULL);
INSERT INTO VCP_MAIN.dbo.TBP_CODE_MASTER
(CompanyCode, MasterCode, MasterName, UseYN, Description, UserID, CreateDate, UserID_Update, UpdateDate)
VALUES(N'LG 이노텍', N'EXTERNAL_SITE_ITEM_LV1', N'외부 사이트 항목', N'Y', N'비지니스 어드민 / 외부 사이트 관리 / 2023.01.04', -1, '2023-01-04 14:27:59.437', NULL, NULL);
INSERT INTO VCP_MAIN.dbo.TBP_CODE_MASTER
(CompanyCode, MasterCode, MasterName, UseYN, Description, UserID, CreateDate, UserID_Update, UpdateDate)
VALUES(N'LG 이노텍', N'EXTERNAL_SITE_ITEM_LV2', N'외부 사이트 유형', N'Y', N'비지니스 어드민 / 외부 사이트 관리 / 2023.01.04', -1, '2023-01-04 14:27:59.437', NULL, NULL);
INSERT INTO VCP_MAIN.dbo.TBP_CODE_MASTER
(CompanyCode, MasterCode, MasterName, UseYN, Description, UserID, CreateDate, UserID_Update, UpdateDate)
VALUES(N'LG 전자', N'EXTERNAL_SITE_ITEM_LV1', N'외부 사이트 항목', N'Y', N'비지니스 어드민 / 외부 사이트 관리 / 2023.01.04', -1, '2023-01-04 14:27:59.437', NULL, NULL);
INSERT INTO VCP_MAIN.dbo.TBP_CODE_MASTER
(CompanyCode, MasterCode, MasterName, UseYN, Description, UserID, CreateDate, UserID_Update, UpdateDate)
VALUES(N'LG 전자', N'EXTERNAL_SITE_ITEM_LV2', N'외부 사이트 유형', N'Y', N'비지니스 어드민 / 외부 사이트 관리 / 2023.01.04', -1, '2023-01-04 14:27:59.437', NULL, NULL);






/******************************************************************************************************************  
Procedure 명 : CSP_EXT_TBP_EXTERNAL_URL_INFO
생   성   자 : 강훈성  
생   성   일 : 2023.01.05
비        고 : GRANT EXECUTE ON VCP_MAIN.dbo.CSP_EXT_TBP_EXTERNAL_URL_INFO TO [SGM_Write]      
****************************************************************************************************************** 
수정 : 
2023.01.05 : 최초작성
2023.00.00 강훈성 : SXCSS000-000 [내부SSR] 서비스 업그레이드#1 반영
******************************************************************************************************************/
CREATE PROCEDURE dbo.CSP_EXT_TBP_EXTERNAL_URL_INFO
(
	@CallerLogin	NVARCHAR(85)
  , @CODE			INT
  , @COMPANYCODE	NVARCHAR(50)
  , @DISPLAYNAME	NVARCHAR(100)
  , @PARENTCODE	    INT
  , @SORTORDER		INT
  , @USEYN			CHAR
  , @DESCRIPTION	NVARCHAR(500)
  , @USERID		    INT
  , @DEPT_ID		NVARCHAR(500)  
  , @SITEURL        NVARCHAR(500)
  , @MAINAGENTNAME  NVARCHAR(50)
  , @CHARGENAME     NVARCHAR(50)
  , @CATEGORYNAME   NVARCHAR(50)
  , @LANGUAGENAME   NVARCHAR(50)
)
AS
BEGIN
SET NOCOUNT ON

IF (@CODE = 0)
	BEGIN
		INSERT INTO VCP_CUSTOM01.DBO.TBP_EXTERNAL_URL_MASTER
				  ( CompanyCode
				  , MasterName
				  , ParentCode
				  , SortOrder
				  , UseYN
				  , [Description]
				  , SiteUrl
				  , CategoryName
				  , MainAgentName
				  , ChargeName
				  , LanguageName
				  , CreateUserID
				  , CreateDate)
			VALUES( @COMPANYCODE 
				  , @DISPLAYNAME
				  , @PARENTCODE
				  , @SORTORDER	
				  , @USEYN		
				  , @DESCRIPTION
				  , @SITEURL
				  , @CATEGORYNAME				  
				  , @MAINAGENTNAME
				  , @CHARGENAME
				  , @LANGUAGENAME
				  , @USERID	
				  , GETDATE())
		
			SET @CODE = (SELECT TOP(1) Code
                           FROM VCP_CUSTOM01.dbo.TBP_EXTERNAL_URL_MASTER WITH(NOLOCK)                  
                          ORDER BY Code DESC)
	END
ELSE
	BEGIN
		UPDATE VCP_CUSTOM01.DBO.TBP_EXTERNAL_URL_MASTER
		   SET MasterName = @DISPLAYNAME
		     , SortOrder = @SORTORDER
			 , UseYN = @USEYN
			 , [Description] = @DESCRIPTION 
			 , SiteUrl = @SITEURL
			 , CategoryName = @CATEGORYNAME
			 , MainAgentName = @MAINAGENTNAME 
			 , ChargeName = @CHARGENAME
			 , LanguageName = @LANGUAGENAME
			 , UpdateUserID = @USERID
			 , UpdateDate = GETDATE()
		 WHERE Code = @CODE
	END
	
IF @@ROWCOUNT > 0
BEGIN
	DELETE FROM TBP_EXTERNAL_URL_ACCESS WHERE Code = @CODE;

	IF @DEPT_ID <> ''
	BEGIN	
		INSERT INTO TBP_EXTERNAL_URL_ACCESS (Code, Dept_Id)
		SELECT @CODE, * FROM STRING_SPLIT(@DEPT_ID, ',');
	END
END

RETURN
END




/******************************************************************************************************************  
Procedure 명 : CSP_EXT_TBP_EXTERNAL_URL_INFO_BASE
생   성   자 : 강훈성  
생   성   일 : 2023.01.05
비        고 : 외부 사이트 기본입력
GRANT EXECUTE ON VCP_MAIN.dbo.CSP_EXT_TBP_EXTERNAL_URL_INFO_BASE TO [SGM_Write]   
****************************************************************************************************************** 
수정 : 
2023.01.05 : 최초작성
2023.00.00 강훈성 : SXCSS000-000 [내부SSR] 서비스 업그레이드#1 반영
******************************************************************************************************************/
CREATE PROCEDURE dbo.CSP_EXT_TBP_EXTERNAL_URL_INFO_BASE
(
	 @CallerLogin	NVARCHAR(85)
)
AS
BEGIN
SET NOCOUNT ON

	IF EXISTS ( SELECT TOP 1 1 FROM CRV_Company WHERE company NOT IN (SELECT CompanyCode FROM VCP_CUSTOM01.DBO.TBP_EXTERNAL_URL_MASTER WITH(NOLOCK) WHERE ParentCode = 0) )
	BEGIN 
		INSERT INTO VCP_CUSTOM01.DBO.TBP_EXTERNAL_URL_MASTER ( CompanyCode, MasterName, ParentCode, SortOrder, UseYN, [Description], CreateUserID, CreateDate )
		SELECT 
			company, company, 0, sort_no, 'Y', 'ROOT', -1, Getdate()
		FROM CRV_Company
		WHERE company NOT IN (SELECT CompanyCode FROM VCP_CUSTOM01.DBO.TBP_EXTERNAL_URL_MASTER WITH(NOLOCK) WHERE ParentCode = 0)
	END
END





/******************************************************************************************************************
SOURCE BACKUP
******************************************************************************************************************/
 /*
화면명 : 외부사이트 관리
화면ID : LG_ExternalUrlMgmt
작성일 : 2023.01.04
작성자 : 강훈성
설명   : 외부 사이트 관리 Global Layout
======================================================================
수정 :
2023.01.04 서비스업그레이드팀 : [내부SSR] 최초작성
=======================================================================
*/
bindEvent('podload', function (oEvent) {
   var ƗƑ = [ //DO NOT RENAME OR REMOVE
      [  //ARRAY OF INCLUDE FILES (See Pluto for more details)
            'CS_ExtensionAPI',
            'CS_Widgets',
            'LG_CustomFunction'
      ],
      function() {
            
            // 외부 사이트 - 기준 정보 항목(SelectBox)
            const $SelectBoxCategory = $("#ddl_Category"); // 카테고리 구분 영역
            const $SelectBoxAgent = $("#ddl_Agent"); // 주체 구분 영역
            const $SelectBoxCharge = $("#ddl_Charge"); // 요금 구분 영역
            const $SelectBoxLanguage = $("#ddl_Language"); // 언어 구분 영역
            const $TxtUrl = $("#txtUrl"); // URL 입력 영역
           
            let oMapObject = null;  // 기준정보 트리 Key로 이루어진 Object
            let oSelData = null;    // 기준정보 트리에서 선택된 Ojbect
            let aSelNodeKeys = [];  // 사업부 선택된 키
            let aSelNodeNames = []; // 사업부 선택된 이름
            let nLev = 0;           // 기준정보 트리 Level

            const $treeDivisionDiv = $("div#ddl_Division"); // 기준 정보 선택 영역
            const $treeContainer = $("div#RefInfoTree"); // 사이트 정보 Tree 영역
            const $treeInputContainer = $("div#RefInfoInput"); // 정보 입력 영역
            const $treeButtonContainer = $("div#dvPageOptionButtons");
            const $treeSearchBtn = $("button#btnTreeSearch"); // 사이트명 검색 버튼

            const $userYn = $("div#DivUseYN"); // 사용여부
            const $AddYn = $("div#AddItemYN"); // 신규입력
            const $accessGroupArea = $("div#DivAccessGroup"); // 적용 사업부 영역
            
            let $selBox = $('<select/>').attr({'id' : 'ddl_companyCode', 'style' : 'width:100%;'})
            $treeDivisionDiv.append($selBox);
            
            const $treeCompanyDropDown = $("select#ddl_companyCode");
            
            $("div#divUserName").text(__context.displayName); // 유저 정보 
            
            $.loading('show');
            $(function(){
               // 기준정보 init
               refDataInit();  
            });

            // 회사정보, 기준정보 조회
            let refDataInit = function(){
               CS_ExtensionAPI.CallExtension({
                  debug: true,
                  //storedProcName: 'CSP_EXT_TBP_TEMPLATE_INFO_BASE',
                  storedProcName: 'CSP_EXT_TBP_EXTERNAL_URL_INFO_BASE',
                  storedProcParameters: [],
                  useTransaction: true,
                  returnData: true,
                  dataFormat: CS_ExtensionAPI.dataFormats.ARRAY_2D,
               }, function(aoReturnMessage){
                  
                     CS_ExtensionAPI.CallExtension({
                        storedProcName: 'CSP_EXT_ExecuteCommand',
                        storedProcParameters: _SetExecQueryParam(['QT_01_GetRefCompanyInfo']), /* TBP_QUERY_TEMPLATE(기준정보 관리 회사 정보) : ex) LG 전자.. */
                        returnData: true,
                        headerFormat: CS_ExtensionAPI.nameCases.CAMEL
                     }, function(aoReturnMessage){
                        let oCompanyData = aoReturnMessage;
                        $(oCompanyData).each(function(i, v){  // 회사정보 selectbox option Set
                           $treeCompanyDropDown.append($('<option>', {value: v.companyCode, text : v.companyCode}));
                        });
                        $treeCompanyDropDown.change();     
                     });
                     
                     $treeCompanyDropDown.change(function(){
                        $.loading('show');
                        let sCompanyCode = $(this).val();
                        
                        const setCodeInfoByItem = (sCompanyCd, sMasterCd, aDepartCd, sDisplayNm, ahTargetId) => { 
                           // 기준정보에 등록된 항목 selectbox Set (카테고리 구분, 주체 구분, 요금 구분, 언어 구분)
                           CS_ExtensionAPI.CallExtension({
                               storedProcName: 'CSP_EXT_ExecuteCommand',
                               storedProcParameters: _SetExecQueryParam(['QT_COM_GetCodeInfoByItem', sCompanyCd, sMasterCd, aDepartCd, sDisplayNm]),
                               returnData: true,
                               headerFormat: CS_ExtensionAPI.nameCases.CAMEL
                           }, function(aoRefData){
                              ahTargetId.empty(); // 초기화 
                              if(aoRefData !== undefined && aoRefData.length > 0) {
                                 ahTargetId.append($('<option>', {value: '', text : ''})); // 빈값 push
                                 aoRefData.forEach(function(item){
                                    ahTargetId.append($('<option>', {value: item.displayName, text : item.displayName}));
                                 });
                              }
                           });
                        };
                        
                        setCodeInfoByItem(sCompanyCode, 'EXTERNAL_SITE_ITEM', '', '카테고리 구분', $SelectBoxCategory);
                        setCodeInfoByItem(sCompanyCode, 'EXTERNAL_SITE_ITEM', '', '주체 구분', $SelectBoxAgent);
                        setCodeInfoByItem(sCompanyCode, 'EXTERNAL_SITE_ITEM', '', '요금 구분', $SelectBoxCharge);
                        setCodeInfoByItem(sCompanyCode, 'EXTERNAL_SITE_ITEM', '', '언어 구분', $SelectBoxLanguage);
                        
                        getRefData(sCompanyCode);   
                        
                        $("#chkNewCode").prop('checked', false); // 신규 입력
                        $("#chkMessage").text(''); // 신규 입력 코멘트
                        $("#txtCompanyCode").val(''); // 회사코드
                        $("#txtCodeName").val('');
                        $("#txtCode").val('');
                        $("#txtParentCode").val('');
                        $("#txtSortOrder").val('');
                        $("#txtUseYN").prop('checked', false);
                        $("#txtDescription").val('');
                        $("#txtDivisionCode").val('');
                        $("#ddl_modelList").val('');
                        $("#txtUserID").val('');  
                        $("div#AccessGroupArea").empty();
                        
                        // aSelNodeKeys = [];
                        aSelNodeNames = [];

                        $userYn.hide();
                        $accessGroupArea.hide();                        
 
                        $("#btnCodeSave").text('저장');
                        $("div.RefMainContainer").find('[data-dirty]').removeAttr('data-dirty');
                     });                     
               });      
            }

            // 외부 사이트 트리 조회
            let getRefData = function(sCompanyCode, sParentCode){               
               CS_ExtensionAPI.CallExtension({
                  storedProcName: 'CSP_EXT_ExecuteCommand',
                  // storedProcParameters: _SetExecQueryParam(['QT_COM_GetRteTemplateTree', sCompanyCode]),
                  storedProcParameters: _SetExecQueryParam(['QT_COM_GetExternalUrlMgmtTree', sCompanyCode]), // 2023.01.04 강훈성 : [내부SSR]
                  returnData: true
               }, function(aoTreeData){                  
                     let oTreeData = aoTreeData;
                     //console.log(oTreeData);
                     oMapObject = oTreeData.reduce(function(a, e) {
                        let sKey = (e['key']);
                        (a[sKey] ? a[sKey] : (a[sKey] = null || [])).push(e);
                        return a;
                     }, {});
                     let sTreeData = unflatten(oTreeData);
                     //console.log(oMapObject);      
                     //console.log(JSON.stringify(sTreeData, null, " "));
                     $.loading('hide');
                     $treeContainer.dynatree({
                        title: "외부 사이트 정보",
                        onActivate: function(dtnode) {                                 
                        },   
                        onDblClick : function(dtnode){
                            dtnode.expand(true);
                        },
                        onClick : function(dtnode){    
                            let aKey = dtnode.data.key;
                            nLev = dtnode.data.lev;
                            getCodeDatabind(aKey);

                            $("#btnCodeSave").text('수정');
                        },
                        onPostInit : function(dtnode){
                        },
                        onSelect : function(dtnode){                                    
                        },
                        children : sTreeData,
                        debugLevel:0
                     });
                     $treeContainer.dynatree("getTree").reload(); 
                     if(sParentCode !== undefined){
                        let oCodeTree = $treeContainer.dynatree("getTree");
                        // debugger;
                        oCodeTree.visit(function(dtnode){
                           let aKey = dtnode.data.key;
                           if(aKey === $("#txtParentCode").val()){
                              dtnode.activate();
                              dtnode.expand(true);  
                              nLev = dtnode.data.lev;
                              getCodeDatabind(aKey);
                           }
                        });   
                     }else{
                        let oCodeTree = $treeContainer.dynatree("getTree");
                        oCodeTree.visit(function(dtnode){
                            dtnode.expand(true);
                            return false;
                        });
                     }  
                     $.loading('hide');       
               });
            }

            // Object 트리 형태로 재귀처리 
            let unflatten = function( aArray, oParent, oTree ){
               oTree = typeof oTree !== 'undefined' ? oTree : [];
               oParent = typeof oParent !== 'undefined' ? oParent : { code: 0 };
               var aChildren = _.filter( aArray, function(oChild){ return oChild.parentCode == oParent.code });                           
               if( !_.isEmpty( aChildren )  ){
                  if( oParent.code == 0){
                     aChildren[0]['icon'] = false;   
                     aChildren[0]['hideCheckbox'] = true;
                     oTree = aChildren;   
                  }else{        
                     oParent['children'] = aChildren
                  }
                  _.each( aChildren, function( oChild ){ unflatten( aArray, oChild ) } );                    
               }
                
               return oTree;       
            }     
           
            // 신규입력 Click Event
            $treeInputContainer.on('click', '#chkNewCode', function(){
               if(oSelData == null){
                    $.showAlert('기준정보를 선택 후에 체크해주세요.');
                    return false;
               }
               if($(this).is(":checked")){
                  $("#chkMessage").text("\"" + oSelData.displayName + "\"" + " 하위로 항목이 추가 됩니다.");
                  $("#txtCompanyCode").val(oSelData.companyCode);
                  $("#txtCodeName").val('');
                  $("#txtCode").val(0);
                  $("#txtParentCode").val(oSelData.code);
                  $("#txtSortOrder").val('');
                  $("#txtUseYN").prop('checked', true);
                  $("#txtDescription").val('');
                  $("#txtDivisionCode").val('');
                  $("#ddl_modelList").val('');
                  $("#txtUserID").val(__context.userId);  
                  $("div#AccessGroupArea").empty();
                  
                  // aSelNodeKeys = [];
                  aSelNodeNames = [];
                  
                  $("#btnCodeSave").text('저장');
                  
                  $SelectBoxCategory.closest('div').show(); // 카테고리 구분 영역
                  $SelectBoxAgent.closest('div').show(); // 주체 구분 영역
                  $SelectBoxCharge.closest('div').show(); // 요금 구분 영역
                  $SelectBoxLanguage.closest('div').show();  // 언어 구분 영역
                  $TxtUrl.closest('div').show();  // URL 입력 영역
                  $accessGroupArea.show(); // 적용 사업부 영역
               }else{
                  $("#chkMessage").text("");
                  $("#txtCompanyCode").val(oSelData.companyCode);
                  $("#txtCodeName").val(oSelData.displayName);
                  $("#txtCode").val(oSelData.code);
                  $("#txtParentCode").val(oSelData.parentCode);
                  $("#txtSortOrder").val(oSelData.sortOrder);
                  $("#txtUseYN").prop('checked', true);
                  $("#txtDescription").val(oSelData.description);
                  // $("#txtDivisionCode").val(oSelData.divisionCode);
                  $("#txtUserID").val(__context.userId); 
                  // $("div#AccessGroupArea").html(oSelData.dept_Name);
                  // aSelNodeKeys = oSelData.dept_Id.split(',');
                  // aSelNodeNames = oSelData.dept_Name.split(',');
                  
                  $("#btnCodeSave").text('수정');
                  
                  $SelectBoxCategory.closest('div').hide(); // 카테고리 구분 영역
                  $SelectBoxAgent.closest('div').hide(); // 주체 구분 영역
                  $SelectBoxCharge.closest('div').hide(); // 요금 구분 영역
                  $SelectBoxLanguage.closest('div').hide();  // 언어 구분 영역
                  $TxtUrl.closest('div').hide();  // URL 입력 영역
                  $accessGroupArea.hide(); // 적용 사업부 영역
               }
               // getMasterCode();
            });

            // 사업부 정보 레이어 팝업
            $treeInputContainer.on('click', '#btnAccessGroup', function(){
               if(oSelData == null){
                  $.showAlert('기준정보를 선택 후에 체크해주세요.'); // comment변경 필요
                  return false;
               }
               let $PopupUI = null;
               let code = oSelData.code;
               CS_ExtensionAPI.CallExtension({
                  storedProcName: 'CSP_EXT_ExecuteCommand',
                  storedProcParameters: _SetExecQueryParam(['QT_01_GetRefBusinessUnitTreeInfo']),
                  returnData: true
               }, function(aoTreeData){    
                     //let oTreeData = aoTreeData; 
                     let oTreeData = aoTreeData.map(
                        p => p.hideCheckbox == 'True' ? {...p, hideCheckbox: true} : {...p, hideCheckbox: false}
                     );                                       
                     let sTreeData = unflatten(oTreeData);
                     oDialog = $('<div id="AccessGroupSearch" class="RefTreeContainer" style="padding:7px 7px 7px 7px;"></div>').dialog({
                        autoOpen: true,
                        modal: true,
                        show: {
                            effect: "fade",
                            duration: 300
                        },
                        hide: {
                            effect: "fade",
                            duration: 300
                        },
                        width: 400,
                        height: 400,
                        title: '사업부',
                        open: function( event, ui ) {
                        $PopupUI = $(this);   
                        $PopupUI.dynatree({
                           title: "AccessGroup",
                           children : sTreeData,
                           checkbox : true,
                           onSelect : function(select, dtnode){                         
                           },
                           debugLevel:0
                        });
                        let nIdx = 0;
                        $PopupUI.dynatree("getTree").reload();   
                        $PopupUI.dynatree("getTree").visit(function(dtnode){ 
                           //console.log(dtnode)                         
                           dtnode.expand(true);
                           if(aSelNodeKeys.length > 0){
                              for(let i = 0; i < aSelNodeKeys.length; i++){
                                 if(dtnode.data.key == aSelNodeKeys[i]){
                                    dtnode.select();
                                 }
                              }
                           }                             
                           nIdx++;
                        });                                                                         
                        },
                        buttons: [
                           {
                              text: "선택",
                              'class': 'float-right-only',
                              click: function () {
                                 aSelNodeKeys = $.map($PopupUI.dynatree("getTree").getSelectedNodes(), function(node){
                                    return node.data.key;
                                 });
                                 aSelNodeNames = $.map($PopupUI.dynatree("getTree").getSelectedNodes(), function(node){
                                    return node.data.title;
                                 });
                                 $("div#AccessGroupArea").html(aSelNodeNames.join(','));
                                 $(this).dialog('close');
                              }
                           }
                        ]
                     });
               });
            });
            
             $("#txtTreeSearch").on('keypress', function(e){
                if(e.keyCode === 13){
                    $treeSearchBtn.click();
                }
            });

            // 템플릿명 검색
            $treeSearchBtn.on('click', function(){
               let sSearchWord = $("#txtTreeSearch").val();
               if(sSearchWord === ''){
                  $.showAlert('검색할 단어를 입력해주세요.');
                  return false;
               }
               let oCodeTree = $treeContainer.dynatree("getTree");
               let bSearch = false;
               oCodeTree.visit(function(dtnode){
                  let aKey = dtnode.data.key;
                  if(dtnode.data.title.toLowerCase().indexOf(sSearchWord.toLowerCase()) != -1){
                     dtnode.activate();
                     dtnode.expand(true);  
                     getCodeDatabind(aKey);
                     bSearch = true;
                  
                     nLev = dtnode.data.lev;
                     // getMasterCode();
                  
                     return false;
                  }                   
               });  
               if(!bSearch) {
                  $.showAlert('검색된 정보가 없습니다.');
               }          
            });

            // 기준정보 저장 및 수정
            $treeButtonContainer.on('click', '#btnCodeSave', function(){
               if($("#txtCode").val() == ""){
                  $.showAlert('코드 정보가 없습니다.');
                  return false;
               }  
               if($("#txtCompanyCode").val() == ""){
                  $.showAlert('구분 코드 정보가 없습니다.');
                  return false;
               }  
               if($("#txtCodeName").val() == ""){
                  $.showAlert('코드명을 입력해주세요.');
                  return false;
               }  
               if($("#txtParentCode").val() == ""){
                  $.showAlert('부모 코드 정보가 없습니다.');
                  return false;
               }   
               if($("#txtSortOrder").val() == ""){
                  $.showAlert('순서를 입력해주세요.(숫자만)');
                  return false;
               }

               $.loading('show'); 
               CS_ExtensionAPI.CallExtension({
                  debug: true,
                  // storedProcName: 'CSP_EXT_TBP_TEMPLATE_INFO',
                  storedProcName: 'CSP_EXT_TBP_EXTERNAL_URL_INFO',
                  storedProcParameters: [
                     $("#txtCode").val(),
                     $("#txtCompanyCode").val(),
                     $("#txtCodeName").val(), 
                     $("#txtParentCode").val(), 
                     $("#txtSortOrder").val(), 
                     $("#txtUseYN").is(':checked') ? 'Y' : 'N', 
                     $("#txtDescription").val(), 
                     __context.userId,
                     
                     /*
                     $("input:checkbox[id='chkNewCode']").is(":checked") === true) {
                        $("#txtUrl").val(),
                        $("#ddl_Agent option:selected").val(),
                        $("#ddl_Charge option:selected").val(),
                        $("#ddl_Category option:selected").val(),
                        $("#ddl_Language option:selected").val(),   
                     } else {
                        '', '', '', '', '',
                     }
                     */
                  ],
                  useTransaction: true,
                  returnData: true,
                  dataFormat: CS_ExtensionAPI.dataFormats.ARRAY_2D,
               }, function(aoReturnMessage){
                  //console.log(aoReturnMessage); 
                  getRefData($treeCompanyDropDown.val(), $("#txtParentCode").val());
               });
            });


            let getCodeDatabind = function(aKey){
               let oData = $.grep(oMapObject[aKey], function (ofilterData) {  
                  return ofilterData.key == aKey;
               });

               oSelData = oData[0];     
               $("#chkMessage").text("");
               $("#chkNewCode").prop('checked', false);                   
               $("#txtCompanyCode").val(oSelData.companyCode);
               $("#txtCodeName").val(oSelData.displayName);
               $("#txtCode").val(oSelData.code);
               $("#txtParentCode").val(oSelData.parentCode);
               $("#txtSortOrder").val(oSelData.sortOrder);
               $("#txtUseYN").prop('checked', oSelData.useYN === 'Y');
               $("#txtDescription").val(oSelData.description);
               // $("#txtDivisionCode").val(oSelData.divisionCode);
               // $("#txtUserID").val(__context.userId);  
               // $("div#AccessGroupArea").html(oSelData.dept_Name);
               if(nLev > 1 || (nLev == 1 && $("#chkNewCode").is(":checked"))){
                  $userYn.show();
               }else{
                  $userYn.hide();
               }

               if(oSelData.lev === "1"){
                  $AddYn.hide();
                  $accessGroupArea.show();
                  
                  $SelectBoxCategory.closest('div').show(); // 카테고리 구분 영역
                  $SelectBoxAgent.closest('div').show(); // 주체 구분 영역
                  $SelectBoxCharge.closest('div').show(); // 요금 구분 영역
                  $SelectBoxLanguage.closest('div').show();  // 언어 구분 영역
                  $TxtUrl.closest('div').show();  // URL 입력 영역
               } else{
                  $AddYn.show();
                  $accessGroupArea.hide();
                  
                  $SelectBoxCategory.closest('div').hide(); // 카테고리 구분 영역
                  $SelectBoxAgent.closest('div').hide(); // 주체 구분 영역
                  $SelectBoxCharge.closest('div').hide(); // 요금 구분 영역
                  $SelectBoxLanguage.closest('div').hide();  // 언어 구분 영역
                  $TxtUrl.closest('div').hide();  // URL 입력 영역
               }
            } 

            //test start
            let escapeText = function(text) { 
               return text.replace(/[\"&<>]/g, function (a) { 
                  return { 
                     '"': '&quot;', 
                     '&': '&amp;', 
                     '<': '&lt;', 
                     '>': '&gt;' 
                  }[a]; 
               });
            }
    }]; window.ö ? ƪƑ(ƗƑ) : ((!window.ฅ ? window.ฅ = [ƗƑ] : window.ฅ.push(ƗƑ))); //DO NOT RENAME OR REMOVE    
});

$(document).ajaxError(function(e, jqxhr, settings, exception) {
   $.showAlert('서버와 통신 중 에러가 발생했습니다.');
   $.loading('hide');
});






            // URL 유효성 검사
            const isValidUrl = sUrl => {
               // const res = sUrl.match(/(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g);
               // return (res !== null);
               console.log(123);
               const urlPattern = /(?:https?):\/\/(\w+:?\w*)?(\S+)(:\d+)?(\/|\/([\w#!:.?+=&%!\-\/]))?/;
               return !!urlPattern.test(sUrl);
            };
            
            const isValidUrl2 = sUrl => {
                var strRegex = "^((https|http|ftp|rtsp|mms)?://)"
                    + "?(([0-9a-z_!~*'().&=+$%-]+: )?[0-9a-z_!~*'().&=+$%-]+@)?"
                    + "(([0-9]{1,3}\.){3}[0-9]{1,3}"
                    + "|"
                    + "([0-9a-z_!~*'()-]+\.)*"
                    + "([0-9a-z][0-9a-z-]{0,61})?[0-9a-z]\."
                    + "[a-z]{2,6})"
                    + "(:[0-9]{1,4})?"
                    + "((/?)|"
                    + "(/[0-9a-z_!~*'().;?:@&=+$,%#-]+)+/?)$";
               var re = new RegExp(strRegex);
               return re.test(sUrl);
            }
            
            const isValidUrl3 = sUrl => {
               var urltest = /(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/;
               return !!urltest.test(sUrl);
            }
            