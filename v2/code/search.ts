//
//Import the server library
import * as server from "../../../schema/v/code/server";
//
//The structure of 1 picture
type picture = {url:string, keyword:string, source:string};

await show_random_pictures();

//
async function show_random_pictures(){

    //Get the query  for random pictures from sql source file
    const searchsql = await server.exec(
        'path',
        ['/imagery/v1/code/search.sql',true],
        'get_file_contents',
        []
    );

    //Execute the SQL against the imagery database
    const pictures: Array<picture> = await server.exec(
        'database',
        ['mutall_imagery', false],
        'get_sql_data',
        [searchsql]
    );
    //
    //For each image row, show the picture in the image area
    for(const picture of pictures) show_picture(picture);
}
function imagePop(event: MouseEvent) {
  // Get the clicked image element
  const clickedImage = event.target as HTMLImageElement;
  //
  // Check if popup already exists
  const popup = document.querySelector('.popup');
  if (popup) {
    // Delete the popup if it already exists
    document.body.removeChild(popup);
    //
    // Exit the function
    return;
  }
  //
  // Create a new popup element
  const newPopup = document.createElement('div');
  newPopup.className = 'popup';
  //
  const imagediv = document.createElement('div');
  imagediv.className = 'imagediv';
  newPopup.appendChild(imagediv);
  //
  // Add the image to the imagediv
  const imageNode = document.createElement('img') as HTMLImageElement;
  imageNode.className = 'imageNode';
  imageNode.src = clickedImage.src;
  imagediv.appendChild(imageNode);
  //  
  // Add options to the popup
  const options = ['Open in browser'];
  options.forEach(option => {
    const button = document.createElement('button');
    button.className = 'openButton';
    button.textContent = option;
      //
      // Display the image in the browser when the image is clicked
    button.addEventListener('click', () => {
      //
      // Get the clicked image
      const imageUrl = clickedImage.src;
      //
      //Open the image in a blank page in the browser
      window.open(imageUrl, "_blank");
      //
      // Close the popup
      document.body.removeChild(newPopup);
    });
    // Append the buttons to the popup
    newPopup.appendChild(button);
  });
  //
  // Add the popup to the document
  document.body.appendChild(newPopup);
}

function show_picture(pic:picture){
    //
    //1 Create a picture element to house image and details
    const pictureElement = document.createElement('div');
    pictureElement.className = 'pic';
    pictureElement.addEventListener('click',imagePop); 
    //
    //2 Create an image element to house the image
    const imageElement = document.createElement('div');
    imageElement.className = 'image';
    //
    //3 Create a details div element to house details of the image
    const detailsDiv = document.createElement('div');
    detailsDiv.className = 'details';
    //
    //4 Create an image element
    const img:HTMLImageElement = document.createElement('img');
    //
    //5 Append the image to the image element
    imageElement.appendChild(img);
    //
    //6 Append the image element to the picture element
    pictureElement.appendChild(imageElement);
    //
    //7 Append the details element to the picture element
    pictureElement.appendChild(detailsDiv);
    //
    //8 Create the source paragraph
    const sourceParagraph = document.createElement('p');
    sourceParagraph.textContent = `Source: ${pic.source}`;
    //
    //9 Create the keyword paragraph
    const keywordParagraph = document.createElement('p');
    keywordParagraph.textContent = `Keyword: ${pic.keyword}`;
    //
    //10 Append the image and details to the picture element
    detailsDiv.appendChild(sourceParagraph);
    detailsDiv.appendChild(keywordParagraph);
    //
    //11 Get the text area element
    const images:HTMLDivElement = document.getElementById('images') as HTMLDivElement;
    
    //
    //12 Append the picture element to the text area
    images.appendChild(pictureElement);
    //
    //13 Set the image source to the picture's url
    img.src= pic.url;
}

//Search for the requested pictures and display them in the images
export async function search_pictures(input:HTMLInputElement){
    //Get the search criteria from the search bar
    const searchCriteria = input.value;
    //
    //Formulate an sql that has the search criteria set to what the user specified
    const SqlSearch = `SELECT url, source, keyword FROM image WHERE concat(keyword, url, source) LIKE '%${searchCriteria}%' limit 100`;
    // 
    //Execute the sql to retrieve the pictures
    const pictures: Array<picture> = await server.exec(
        'database',
        ['mutall_imagery', false],
        'get_sql_data',
        [SqlSearch]
    );
    // 
    //Clear the current images
    const images:HTMLDivElement = document.getElementById('images') as HTMLDivElement;
    images.innerHTML = '';
    // 
    //Put the new images in their place
    for(const picture of pictures) show_picture(picture);  
    // 
    // Formulate sql query to get total number of results returned from search query
    const sqlresults = `SELECT COUNT(*) as count FROM (SELECT url, source, keyword FROM image WHERE concat(keyword, url ,source) LIKE '%${searchCriteria}%') AS subquery;`;
    // 
    // Get the paragraph element by id
    const results:HTMLParagraphElement = document.getElementById('results') as HTMLParagraphElement;
    // 
    //Run the query against the database
    const results1:Array<{count:string, len:string}> = await server.exec(
        'database',
        ['mutall_imagery', false],
        'get_sql_data',
        [sqlresults]
    );
    // 
    // Show the results of the query in the paragraph element
    results1.forEach(row => {results.innerText = row.count + ' results found'});
}
//
