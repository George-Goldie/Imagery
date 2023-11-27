-- WITH count AS (
--     SELECT COUNT(*) AS num FROM image
-- ),
-- pic AS (
--     SELECT
--         CEILING(RAND() * count.num) AS pic
--     FROM count
-- )
-- 
-- , debug_pic AS (
--     SELECT * FROM pic
-- ),
-- images AS (
--     SELECT
--         i.image,
--         i.url,
--         w.name AS keyword_name,
--         s.name AS source_name
--     FROM image AS i
--     JOIN image_key AS ik ON i.image = ik.image
--     JOIN word AS w ON ik.word = w.word
--     JOIN source_key AS sk ON w.word = sk.word
--     JOIN source AS s ON sk.source = s.source
--     JOIN pic ON i.image = pic.pic
-- )
-- 
-- , debug_images AS (
--     SELECT * FROM images
-- )
-- SELECT * FROM debug_images LIMIT 10;

-- select
-- 
--     image.image,
--     image.url,
--     word.name as keyword_name,
--     source.name as source_name
--         FROM image
-- 
--      JOIN image_key ON image.image = image_key.image
--      JOIN word ON image_key.word = word.word
--      JOIN source_key ON word.word = source_key.word
--      JOIN source ON source_key.source = source.source

WITH
    image_count AS (
        SELECT COUNT(*) AS num FROM image
    ),
    pic AS (
        SELECT 
            CEIL(RAND() * image_count.num) AS pic
        FROM    
            image,
            image_count
    ),
    images AS (
        SELECT 
           image.image,
           image.url,
           word.name as keyword_name,
           source.name as source_name 
        FROM 
            image
            INNER JOIN pic ON image = pic
    )
SELECT * FROM images;
