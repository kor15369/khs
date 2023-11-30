USE [VCP_MAIN]
GO

/****** Object:  StoredProcedure [dbo].[CSP_EXT_TBP_EXTERNAL_URL_INFO]    Script Date: 2023-02-06 오후 2:44:48 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

/******************************************************************************************************************  
Procedure 명 : CSP_EXT_TBP_EXTERNAL_URL_INFO
생   성   자 : 강훈성  
생   성   일 : 2023.02.09
비        고 : 외부 사이트 정보 등록, 수정
권        한 : GRANT EXECUTE ON VCP_MAIN.dbo.CSP_EXT_TBP_EXTERNAL_URL_INFO TO [SGM_Write]      
****************************************************************************************************************** 
수정 : 
2023.02.09 강훈성 : [IT200061-49064] 최초생성
******************************************************************************************************************/
CREATE PROCEDURE [dbo].[CSP_EXT_TBP_EXTERNAL_URL_INFO]
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
GO


