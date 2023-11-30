/******************************************************************************************************************
CREATE TABLE : TBP_EXTERNAL_URL_ACCESS
******************************************************************************************************************/
-- VCP_CUSTOM01.dbo.TBP_EXTERNAL_URL_ACCESS definition

-- Drop table

-- DROP TABLE VCP_CUSTOM01.dbo.TBP_EXTERNAL_URL_ACCESS;

CREATE TABLE VCP_CUSTOM01.dbo.TBP_EXTERNAL_URL_ACCESS (
	Code int NOT NULL,
	Dept_Id varchar(16) COLLATE SQL_Latin1_General_CP1_CI_AS NOT NULL,
	CONSTRAINT TBP_EXTERNAL_URL_ACCESS_PK PRIMARY KEY (Code,Dept_Id)
);

EXEC VCP_CUSTOM01.sys.sp_addextendedproperty @name=N'MS_Description', @value=N'코드', @level0type=N'Schema', @level0name=N'dbo', @level1type=N'Table', @level1name=N'TBP_EXTERNAL_URL_ACCESS', @level2type=N'Column', @level2name=N'Code';
EXEC VCP_CUSTOM01.sys.sp_addextendedproperty @name=N'MS_Description', @value=N'부서ID', @level0type=N'Schema', @level0name=N'dbo', @level1type=N'Table', @level1name=N'TBP_EXTERNAL_URL_ACCESS', @level2type=N'Column', @level2name=N'Dept_Id';





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
ALTER TABLE : TBP_DELIVERABLE_BOOKMARKS
******************************************************************************************************************/
ALTER TABLE VCP_CUSTOM01.DBO.TBP_DELIVERABLE_BOOKMARKS ADD BookmarkType int

EXEC VCP_CUSTOM01.sys.sp_addextendedproperty @name=N'MS_Description', @value=N'북마크타입(1:Deliverable, 2:External Url)', @level0type=N'Schema', @level0name=N'dbo', @level1type=N'Table', @level1name=N'TBP_DELIVERABLE_BOOKMARKS', @level2type=N'Column', @level2name=N'BookmarkType';





/******************************************************************************************************************  
Procedure 명 : CSP_EXT_TBP_EXTERNAL_URL_INFO_BASE
생   성   자 : 강훈성  
생   성   일 : 2023.01.05
비        고 : 외부 사이트 정보 기본입력
권        한 : GRANT EXECUTE ON VCP_MAIN.dbo.CSP_EXT_TBP_EXTERNAL_URL_INFO_BASE TO [SGM_Write]   
****************************************************************************************************************** 
수정 : 
2023.01.05 : 최초작성
2023.00.00 강훈성 : SXCSS000-000 [내부SSR] 서비스 업그레이드#1 반영
******************************************************************************************************************/
CREATE PROCEDURE dbo.CSP_EXT_TBP_EXTERNAL_URL_INFO_BASE
(
	 @CallerLogin NVARCHAR(85)
)
AS

SET NOCOUNT ON

BEGIN
	IF EXISTS (SELECT TOP 1 1 FROM CRV_Company WHERE company NOT IN (SELECT CompanyCode FROM VCP_CUSTOM01.DBO.TBP_EXTERNAL_URL_MASTER WITH(NOLOCK) WHERE ParentCode = 0))
	BEGIN 
		INSERT INTO VCP_CUSTOM01.DBO.TBP_EXTERNAL_URL_MASTER (CompanyCode, MasterName, ParentCode, SortOrder, UseYN, [Description], CreateUserID, CreateDate)
		SELECT company, company, 0, sort_no, 'Y', 'ROOT', -1, Getdate()
		  FROM CRV_Company
		 WHERE company NOT IN (SELECT CompanyCode FROM VCP_CUSTOM01.DBO.TBP_EXTERNAL_URL_MASTER WITH(NOLOCK) WHERE ParentCode = 0)
	END
END





/******************************************************************************************************************  
Procedure 명 : CSP_EXT_TBP_EXTERNAL_URL_INFO
생   성   자 : 강훈성  
생   성   일 : 2023.01.05
비        고 : 외부 사이트 정보 등록, 수정
권        한 : GRANT EXECUTE ON VCP_MAIN.dbo.CSP_EXT_TBP_EXTERNAL_URL_INFO TO [SGM_Write]      
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

SET NOCOUNT ON

BEGIN
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
			DELETE FROM VCP_CUSTOM01.DBO.TBP_EXTERNAL_URL_ACCESS WHERE Code = @CODE;
		
			IF @DEPT_ID <> ''
			BEGIN	
				INSERT INTO VCP_CUSTOM01.DBO.TBP_EXTERNAL_URL_ACCESS (Code, Dept_Id)
				SELECT @CODE, * FROM STRING_SPLIT(@DEPT_ID, ',');
			END
		END
END





/******************************************************************************************************************  
Procedure 명 : dbo.CSP_EXT_CREATE_DELIVERABLE_BOOKMARK
생   성   자 : 강훈성  
생   성   일 : 2022.12.13
비        고 : 내 즐겨찾기(Activity) 정보 INSERT 처리 

/EXECUTE 권한
GRANT EXECUTE ON VCP_MAIN.dbo.CSP_EXT_CREATE_DELIVERABLE_BOOKMARK TO [SGM_Write]   
GO
----------------------------------------------------------------------------------------------------------
수정 : 
2022.12.13 서비스업그레이드팀 : [SXCSS034-307] [내부SSR] 최초작성
2023.01.20 서비스업그레이드팀 : 즐겨찾기 타입 컬럼 추가
---------------------------------------------------------------------------------------------------------
예제 :
EXEC VCP_MAIN.dbo.CSP_EXT_CREATE_DELIVERABLE_BOOKMARK N'LGPPS\Axxxxx', xxxxxx

******************************************************************************************************************/

ALTER PROCEDURE [dbo].[CSP_EXT_CREATE_DELIVERABLE_BOOKMARK]
@CallerLogin NVARCHAR(85),
@DeliverableID INT,
@BookmarkType INT

AS

SET NOCOUNT ON

DECLARE @RequestorID INT;

SELECT @RequestorID = SU.UserID
  FROM VCP_MAIN.dbo.SGM_Users SU WITH (NOLOCK)
 WHERE SU.UserLogin = @CallerLogin

IF NOT EXISTS (SELECT 1 
		         FROM VCP_CUSTOM01.dbo.TBP_DELIVERABLE_BOOKMARKS AS TDB WITH (NOLOCK)
		        WHERE TDB.DeliverableID = @DeliverableID AND TDB.UserID = @RequestorID)
BEGIN
	INSERT INTO VCP_CUSTOM01.dbo.TBP_DELIVERABLE_BOOKMARKS (DeliverableID, UserID, BookmarkType)
	VALUES (@DeliverableID, @RequestorID, @BookmarkType)
END

RETURN





/******************************************************************************************************************  
Procedure 명 : dbo.CSP_EXT_DELETE_DELIVERABLE_BOOKMARK
생   성   자 : 강훈성  
생   성   일 : 2022.12.13
비        고 : 내 즐겨찾기(Activity) 정보 Delete 처리 

/EXECUTE 권한
GRANT EXECUTE ON VCP_MAIN.dbo.CSP_EXT_DELETE_DELIVERABLE_BOOKMARK TO [SGM_Write]   
GO
----------------------------------------------------------------------------------------------------------
수정 : 
2022.12.13 서비스업그레이드팀 : [SXCSS034-307] [내부SSR] 최초작성
2023.01.20 서비스업그레이드팀 : 즐겨찾기 타입 컬럼 추가
---------------------------------------------------------------------------------------------------------
예제 :
EXEC VCP_MAIN.dbo.CSP_EXT_DELETE_DELIVERABLE_BOOKMARK N'LGPPS\Axxxxx', xxxxxx

******************************************************************************************************************/  

ALTER PROCEDURE [dbo].[CSP_EXT_DELETE_DELIVERABLE_BOOKMARK]
@CallerLogin NVARCHAR(85),
@DeliverableID INT,
@BookmarkType INT

AS

SET NOCOUNT ON

DELETE TDB
  FROM VCP_CUSTOM01.dbo.TBP_DELIVERABLE_BOOKMARKS AS TDB
 INNER JOIN VCP_MAIN.dbo.SGM_Users AS SU WITH (NOLOCK)
	ON TDB.DeliverableID = @DeliverableID
   AND SU.UserLogin = @CallerLogin 
   AND TDB.UserID = SU.UserID
   AND TDB.BookmarkType = @BookmarkType

RETURN