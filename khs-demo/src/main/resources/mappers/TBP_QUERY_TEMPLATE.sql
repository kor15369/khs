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
