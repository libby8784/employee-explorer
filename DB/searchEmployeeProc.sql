--TODO CHANGE SO SEARCH ALSO IF THERE IS 'D' AND 'O' AND NOT ONLY 'DO' 
--SORT BY MOST RELEVANT RESULTS
ALTER PROCEDURE [dbo].[SearchEmployees]
(
@searchText VARCHAR(255),
@maxResults INT,
@page INT
)
AS
BEGIN

-- Calculate the offset for the page
DECLARE @offset INT
SET @offset = @page * @maxResults

-- Get the employees
SELECT
  E.[Guid],
  E.FirstName,
  E.LastName,
  E.[Role],
  E.ImageUrl
FROM Employees E
WHERE e.FirstName + ' ' + e.LastName LIKE '%' + @searchText + '%'
OR e.Role LIKE '%' + @searchText + '%'
ORDER BY e.FirstName, e.LastName
OFFSET @offset ROWS
FETCH NEXT @maxResults
ROWS ONLY

END