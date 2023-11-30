USE [VCP_MAIN]
GO

/****** Object:  StoredProcedure [dbo].[CSP_EXT_TBP_EXTERNAL_URL_INFO_BASE]    Script Date: 2023-02-06 오후 2:47:51 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

/******************************************************************************************************************  
Procedure 명 : CSP_EXT_TBP_EXTERNAL_URL_INFO_BASE
생   성   자 : 강훈성  
생   성   일 : 2023.02.09
비        고 : 외부 사이트 정보 기본입력
권        한 : GRANT EXECUTE ON VCP_MAIN.dbo.CSP_EXT_TBP_EXTERNAL_URL_INFO_BASE TO [SGM_Write]   
****************************************************************************************************************** 
수정 : 
2023.02.09 강훈성 : [IT200061-49064] 최초생성
******************************************************************************************************************/
CREATE PROCEDURE [dbo].[CSP_EXT_TBP_EXTERNAL_URL_INFO_BASE]
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
GO


