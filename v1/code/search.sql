#
# The strucure of 1 picture
# type picture = {url:string, word:string, source:string, user:string, date:number,size:bigint};

 #  count the total number of rows in the "image" table and stores this count as "num."   
    image_count AS (
        select count(*) as num from image
    ),
#
# a random number between 0 and 1 is generated using the rand() function which returns a random decimal number
# this random number is multiplied by the "num" obtained from the "count" CTE and rounded up using the ceiling() function
  pic as (
        select 
            CEIL(RAND() * image_count.num) as pic
        from    
            image,
            image_count
    ),

# select the columns you want displayed depending on the randomization count
 images as (

    select
        image.image,
        image.url,
        word.name as keyword_name,
        source.name as source_name
        FROM image
    join image_key on image.image = image_key.image
    join word on image_key.word = word.word
    join source_key on word.word = source_key.word
    join source ON source_key.source = source.source

--     JOIN pic ON i.image = pic.pic
)

# select the CTE you want to run
select * from pic;