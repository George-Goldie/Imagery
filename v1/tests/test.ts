//
//Import the server library
import * as server from "../../../schema/v/code/server.js";

export type Picture = {
  url: string;
  word: string;
  source: string;
  user: string;
  date: number;
  size: bigint;
};

export class Imagery {
  async showRandomPictures() {
   
    //Get the query  for random pictures from sql source file
    const searchsql = await server.exec(
        'path',
        ['/imagery/v0/code/search.sql',true],
        'get_file_contents',
        []
    );

    //Execute the SQL against the imagery database
    const pictures: Array<picture> = await server.exec(
        'database',
        ['mutall_imagery2', false],
        'get_sql_data',
        [searchsql]
    );
    //
    //For each image row, show the picture in the image area
    for(const picture of pictures) show_picture(picture);
  }

  imagePop(event: MouseEvent) {
    
  }

  showPicture(pic: Picture) {
   
  }

  async searchPictures(input: HTMLInputElement) {
    
  }
}

export async function showRandomPictures() {
  const imagery = new Imagery();
  await imagery.showRandomPictures();
}

