-- VCP_CUSTOM01.dbo.TBP_DELIVERABLE_BOOKMARKS definition

-- Drop table

-- DROP TABLE VCP_CUSTOM01.dbo.TBP_DELIVERABLE_BOOKMARKS;

CREATE TABLE VCP_CUSTOM01.dbo.TBP_DELIVERABLE_BOOKMARKS (
	BookmarkID int IDENTITY(1,1) NOT NULL,
	DeliverableID int NOT NULL,
	UserID int NOT NULL,
	CONSTRAINT PK_TBP_DELIVERABLE_BOOKMARKS PRIMARY KEY (BookmarkID),
	CONSTRAINT UK_TBP_DELIVERABLE_BOOKMARKS UNIQUE (DeliverableID,UserID)
);




INSERT INTO VCP_MAIN.dbo.TBP_QUERY_TEMPLATE
(ID, Syntax, Remark)
VALUES(N'QT_COM_GetChargeProjectList', N'SELECT TOP {#1} rpd.ProjectName AS ProjectName
     , rpd.DeliverableName AS DeliverableName
     , ISNULL(CONVERT(varchar(16), (SELECT spd.OwnerUpdatedDate FROM SGM_ProjectDeliverables AS spd WITH (NOLOCK) WHERE spd.DeliverableID = rpd.DeliverableID) , 120), '''') AS OwnerUpdatedDate
     , CONCAT(''documenttypeid=1&documentid='', rpd.DeliverableID) AS QueryString
     , rpd.DeliverableID AS DeliverableID 
  FROM dbo.RVP_ProjectDeliverables AS rpd
 WHERE rpd.DeliverableOwner = {#CallerUserID}
 ORDER BY OwnerUpdatedDate DESC', N'랜딩페이지 - 나의 할 일(담당 액티비티 Tab)');


INSERT INTO VCP_MAIN.dbo.TBP_QUERY_TEMPLATE
(ID, Syntax, Remark)
VALUES(N'QT_COM_GetMyBookmarkList', N'SELECT TOP {#1} rpd.ProjectName AS ProjectName
     , rpd.DeliverableName AS DeliverableName
     , CONCAT(''documenttypeid=1&documentid='', rpd.DeliverableID) AS QueryString
     , rpd.DeliverableID AS DeliverableID 
  FROM VCP_MAIN.dbo.RVP_ProjectDeliverables AS rpd
 INNER JOIN VCP_CUSTOM01.dbo.TBP_DELIVERABLE_BOOKMARKS AS tdb WITH (NOLOCK)
    ON rpd.DeliverableID = tdb.DeliverableID
   AND tdb.UserID = {#CallerUserID}
 ORDER BY BookmarkID DESC', N'랜딩페이지 - 나의 할 일(내 즐겨찾기 Tab)');


INSERT INTO VCP_MAIN.dbo.TBP_QUERY_TEMPLATE
(ID, Syntax, Remark)
VALUES(N'QT_COM_GetRecentOperationDetailList', N'SELECT recent_history.ProjectName AS ProjectName 
     , recent_history.DeliverableID AS DeliverableID
     , recent_history.DeliverableName AS DeliverableName
     , recent_history.QueryString AS QueryString
     , recent_history.UpdatedDate AS UpdatedDate
     , (CASE WHEN deliverable_bookmarks.BookmarkID IS NULL
             THEN ''notbooked''
             ELSE ''booked''
        END) AS RegistrationStatus
  FROM (
  		SELECT rpd.ProjectName AS ProjectName
		     , rpd.DeliverableID AS DeliverableID
		     , rpd.DeliverableName AS DeliverableName
		     , suph.QueryString AS QueryString
		     , suph.UserID AS UserID
		     , (SELECT CONVERT(varchar(16), MAX(temp_suph.DateVisited), 120) 
			      FROM VCP_MAIN.dbo.SGM_UserPageHistory AS temp_suph WITH (NOLOCK)
				 WHERE temp_suph.ItemID = rpd.DeliverableID
				   AND temp_suph.ItemTypeID = 2) AS UpdatedDate
		  FROM (SELECT TOP {#1} *
		          FROM VCP_MAIN.dbo.SGM_UserPageHistory WITH (NOLOCK)
		         WHERE UserID = {#CallerUserID}
		           AND ItemTypeID = 2
		         ORDER BY DateVisited DESC) suph
		 INNER JOIN VCP_MAIN.dbo.RVP_ProjectDeliverables AS rpd
		    ON suph.ItemID = rpd.DeliverableID  
  		) AS recent_history 
  LEFT JOIN VCP_CUSTOM01.dbo.TBP_DELIVERABLE_BOOKMARKS AS deliverable_bookmarks WITH (NOLOCK)
    ON recent_history.DeliverableID = deliverable_bookmarks.DeliverableID
   AND recent_history.UserID = deliverable_bookmarks.UserID
 ORDER BY UpdatedDate DESC', N'랜딩페이지 - 나의 할 일(최근작업이력 Tab)');
 
 
 
 
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
---------------------------------------------------------------------------------------------------------
예제 :
EXEC VCP_MAIN.dbo.CSP_EXT_CREATE_DELIVERABLE_BOOKMARK N'LGPPS\Axxxxx', xxxxxx

******************************************************************************************************************/

CREATE PROCEDURE [dbo].[CSP_EXT_CREATE_DELIVERABLE_BOOKMARK]
@CallerLogin NVARCHAR(85),
@DeliverableID INT

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
	INSERT INTO VCP_CUSTOM01.dbo.TBP_DELIVERABLE_BOOKMARKS (DeliverableID, UserID)
	VALUES (@DeliverableID, @RequestorID)
END

RETURN;




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

RETURN;




 5G Communication Automotive Research and innovation
 
 자동차 업계 tier1 으로서의 자사 정보 제공.
 
 
 
