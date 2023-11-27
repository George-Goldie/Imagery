with
        
    count as (
        select count(image) as num from image
    ),

    pic as (
        select 
            ceiling(rand()*count.num) as pic
        from    
            image,
            count
    ),
    images as (
        SELECT 
            image,
            url, 
            keyword, 
            source 
        FROM 
            image
            inner join pic on image=pic
    )

select * from pic;

--images limit 20
select * from image;
