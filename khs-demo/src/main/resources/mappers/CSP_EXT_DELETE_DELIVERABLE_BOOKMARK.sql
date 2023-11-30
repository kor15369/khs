/******************************************************************************************************************  
Procedure 명 : dbo.CSP_EXT_DELETE_DELIVERABLE_BOOKMARK
생   성   자 : 강훈성  
생   성   일 : 2022.11.16
비        고 : 내 즐겨찾기(Activity) 정보 Delete 처리 

/EXECUTE 권한
GRANT EXECUTE ON VCP_MAIN.dbo.CSP_EXT_DELETE_DELIVERABLE_BOOKMARK TO [SGM_Write]   
GO
----------------------------------------------------------------------------------------------------------
수정 : 
 
---------------------------------------------------------------------------------------------------------
예제 :
EXEC VCP_MAIN.dbo.CSP_EXT_DELETE_DELIVERABLE_BOOKMARK N'LGPPS\Axxxxx', xxxxxx

******************************************************************************************************************/  

CREATE PROCEDURE [dbo].[CSP_EXT_DELETE_DELIVERABLE_BOOKMARK]
@CallerLogin NVARCHAR(85),
@DeliverableID INT

AS

SET NOCOUNT ON

DELETE TDB
  FROM VCP_CUSTOM01.dbo.TBP_DELIVERABLE_BOOKMARKS AS TDB
 INNER JOIN VCP_MAIN.dbo.SGM_Users AS SU WITH (NOLOCK)
	ON TDB.DeliverableID = @DeliverableID
   AND SU.UserLogin = @CallerLogin 
   AND TDB.UserID = SU.UserID

RETURN