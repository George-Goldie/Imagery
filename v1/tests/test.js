//
//Import the server library
import * as server from "../../../schema/v/code/server.js";
export class Imagery {
    async showRandomPictures() {
        //Get the query  for random pictures from sql source file
        const searchsql = await server.exec('path', ['/imagery/v0/code/search.sql', true], 'get_file_contents', []);
        //Execute the SQL against the imagery database
        const pictures = await server.exec('database', ['mutall_imagery2', false], 'get_sql_data', [searchsql]);
        //
        //For each image row, show the picture in the image area
        for (const picture of pictures)
            show_picture(picture);
    }
    imagePop(event) {
    }
    showPicture(pic) {
    }
    async searchPictures(input) {
    }
}
export async function showRandomPictures() {
    const imagery = new Imagery();
    await imagery.showRandomPictures();
}
