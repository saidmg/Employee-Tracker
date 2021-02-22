const inquirer = require( 'inquirer' );
// module to connect to database
const db = require( './app/connection' )('content_management_systems','skotkalb')

 async function InitialQuestion(){
    // get new song info
     await inquirer.prompt([
        { name: "firstChoice",    message: "What would you like to do", type: "list", choices:["View Details","Update/Add/Delete",] },
    ])
 }
 
    const response = await InitialQuestion();  {
    if (response.firstChoice === "View Details"){
        viewDetails()
    }
    else{
        const updateEmployees = await inquirer.prompt([
            { name: "firstName",    message: "What is the employee's first name",type: "input"},
            { name: "lasttName",    message: "What is the employee's last name", type: "input" },
            { name: "role",    message: "What is the employee's role", type: "list", choices:["Sales Lead","Salesperson","Lead Engineer",
            "Software Engineer", "Account Manager", "Accountant",  "Legal Team Lead",] },
            { name: "managerName",    message: "In Which department?", type: "list", choices:["Sales","Engineering","Finance","Legal",]},
        ])
    }
    }
    async function viewDetails (){

        await inquirer.prompt([
            { name: "viewDetails",    message: "What would you like to view", type: "list", 
            choices:["Employees","Departments","Roles","total utilized budget of a department"] },
        ])
        // const myResult = await db.query( "SELECT * FROM Employees",);
        // console.log( `insert result:`, myResult )
    }
    const response2 = await viewDetails();  
    if (response2.viewDetails === "Employees"){
        //  viewEmployees()
        const myResult = await db.query("SELECT * FROM employees")
        console.log(myResult)
    }
    else if(response2.viewDetails === "Departments"){
        const myResult = await db.query("SELECT * FROM department")
        console.log(myResult)
    }
     else if(response2.viewDetails === "Roles"){
        const myResult = await db.query("SELECT * FROM role")
        console.log(myResult)
    }
    else if(response2.viewDetails === "total utilized budget of a department"){
        const myResult = await db.query("SELECT SUM(salary) FROM role;")
        console.log(myResult)
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