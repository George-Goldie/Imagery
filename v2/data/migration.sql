-- Connect to the source database --


-- USE mutall_imagery;

-- Transfer data to the destination database --


-- INSERT INTO mutall_imagery2.image (url)
--SELECT url FROM mutall_imagery.image;

-- Connect to the source database
USE mutall_imagery;

-- Transfer data to the destination database
INSERT INTO mutall_imagery2.image (url, source,user,name)
SELECT url, NULL, NULL, NULL FROM image;
