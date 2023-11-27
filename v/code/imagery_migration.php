<?php
namespace mutall\capture;
//
//Resolve references to the schema library
include '../../../schema/v/code/schema.php';
//
//Resolve reference to the questionnaire class using teh schema library
include '../../../schema/v/code/questionnaire.php';
//
//Define a new questionnaire for uploading data to the oritech database
$q = new \mutall\questionnaire('mutall_imagery2');

$sql_string = file_get_contents("imagery_migration.sql");

//Create the csv table that matches the Excel spreadsheet
$sql = new query(
    "image", //string $tname,
    $sql_string, //string $sql,
    "mutall_imagery" //string $dbname,
);

$layouts = [
    //
    //sql table layout that is the source of data
    $sql,
    //
    //spreadsheet/database mapping
    [new lookup('image', "url"), "image", "url"],
     [new lookup('image', "url"), "image", "name"],
    [new lookup('image', "source"), "source", "name"], 
    [new lookup('image', "keyword"), "word", "name"],
    [new lookup('image', "name"), "user", "name"],
   ['1234567890' , 'user', 'password'],
[null,'image_key','image_key'],
   [null,'source_key','source_key']
   
    
];

echo $q->load_common($layouts);

