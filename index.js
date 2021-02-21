const inquirer = require( 'inquirer' );
// module to connect to database
const db = require( './app/connection' )('content_management_systems','skotkalb')

 async function main(){
    // get new song info
    const firstQuestion =  inquirer.prompt([
        { name: "firstChoice",    message: "What would you like to do", type: "list", choices:["View All Employees","Update Employees",] },
    ])

    const response = await promptUser();  
    if (response.firstChoice === "View All Employees"){
        const myResult = await db.query( "SELECT * FROM Employees",);
        console.log( `insert result:`, myResult )
    }
    else{
        const updateEmployees =  inquirer.prompt([
            { name: "firstChoice",    message: "In Which department?", type: "list", choices:["Sales","Engineering","Finance","Legal",] },
        ])
    }

 }
    // const myResult = await db.query( 
    //     "INSERT INTO favourite_songs (title,artist,genre,rating) VALUES(?,?,?,?) ",
    //     [newSong.title, newSong.artist, newSong.genre, newSong.rating] );
    // console.log( `insert result:`, myResult )
    
    // const mySongs = await db.query( "SELECT * FROM favourite_songs" );
    // for( let i=0; i<mySongs.length; i++ ){
    //     const song = mySongs[i];
    //     console.log( `${i}: ${song.title}/${song.artist}  [*${song.genre}*] ${song.rating}/10 `)
    // }
    // console.log( mySongs );

    await db.close();


main();