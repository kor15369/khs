DECLARE @company NVARCHAR(50)

SET NOCOUNT ON

-------------------- company별 SortOrder UPDATE --------------------
DECLARE CUR CURSOR FOR

	SELECT company, sort_no FROM CRV_Company
	
	OPEN CUR
	FETCH NEXT FROM CUR INTO @company
	
	WHILE @@FETCH_STATUS = 0
	BEGIN
		WITH ORDER_INFO AS (
			SELECT MasterName 
			     , SortOrder
			     , ROW_NUMBER() OVER(ORDER BY (CASE WHEN LEFT(MasterName, 1) LIKE '[ㄱ-ㅎ가-힣]%' THEN 1
									                WHEN LEFT(MasterName, 1) LIKE '[a-zA-Z]%' THEN 2
									                WHEN LEFT(MasterName, 1) LIKE '[0-9]%' THEN 3
									                ELSE 0
									            END), MasterName) * 10 AS NewSortOrder
			  FROM VCP_CUSTOM01.dbo.TBP_EXTERNAL_URL_MASTER
		     WHERE CompanyCode = @company
		       AND ParentCode <> 0
		)
		
		UPDATE ORDER_INFO
		   SET SortOrder = NewSortOrder;
		
		FETCH NEXT FROM CUR INTO @company
	END
	
	CLOSE CUR
DEALLOCATE CUR




http://www.ehousing.kr/main.php?m1=28&m2=35
https://post.naver.com/my.nhn?memberNo=34352196




Ehousiong : MAGAZINE - 이하우징	주택 및 인테리어 건축자재 시장, 건설 정보 및 리모델링 사례와 함께 인테리어 트렌드 신제품(벽지, 바닥재, 욕조, 패브릭 등 기타 내/외장재) 정보 제공.	http://www.ehousing.kr/main.php?m1=28&m2=35	산업/시장동향/트렌드 (Trend)	분석/조사업체	부분유료	국문	LG 하우시스
Ehousiong : MAGAZINE - 이하우징	주택 및 인테리어 건축자재 시장, 건설 정보 및 리모델링 사례와 함께 인테리어 트렌드 신제품(벽지, 바닥재, 욕조, 패브릭 등 기타 내/외장재) 정보 제공.	https://post.naver.com/my.nhn?memberNo=34352196	산업/시장동향/트렌드 (Trend)	분석/조사업체	부분유료	국문	LG 하우시스
