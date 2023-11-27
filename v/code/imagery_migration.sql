--         select
--             # identifiers that define an invoice
-- image.image,
--            image.url,
--             image.source,
--             image.keyword
-- 
--         from
--             image;
WITH numbered_rows AS (
    SELECT
        image.url,
        image.source,
        image.keyword,
        CONCAT('george', ROW_NUMBER() OVER (ORDER BY image.image)) AS name
    FROM
        image
)
SELECT *
FROM numbered_rows;


          