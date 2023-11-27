--   select
--         image.image,
--         image.url,
--         word.name as keyword_name,
--         source.name as source_name
--         FROM image
--     JOIN image_key ON image.image = image_key.image
--     JOIN word ON image_key.word = word.word
--     JOIN source_key ON word.word = source_key.word
--     JOIN source ON source_key.source = source.source

  SELECT 
           image.image,
           image.url,
           word.name,
           source.name as source_name 
        FROM 
            image