const inquirer = require( 'inquirer' );
// module to connect to database
const db = require( './app/connection' )('favourites','r00tr00t')

async function main(){
    // get new song info
    const newSong = await inquirer.prompt([
        { name: "title",    message: "What is the title of the song?" },
        { name: "artist",   message: "What is the artist?" },
        { name: "genre",    message: "What is the genre?" },
        { name: "rating",   message: "What is the rating (1-10)?" },
    ]);

    const myResult = await db.query( 
        "INSERT INTO favourite_songs (title,artist,genre,rating) VALUES(?,?,?,?) ",
        [newSong.title, newSong.artist, newSong.genre, newSong.rating] );
    console.log( `insert result:`, myResult )
    
    const mySongs = await db.query( "SELECT * FROM favourite_songs" );
    for( let i=0; i<mySongs.length; i++ ){
        const song = mySongs[i];
        console.log( `${i}: ${song.title}/${song.artist}  [*${song.genre}*] ${song.rating}/10 `)
    }
    // console.log( mySongs );

    await db.close();

}
main();