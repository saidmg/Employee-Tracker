const inquirer = require('inquirer');
// module to connect to database
const db = require('./app/connection')('content_management_systems', 'skotkalb')

function askQuestion() {
    // ask question about view/add/update/delete info
    return inquirer.prompt([
        { name: "firstChoice", message: "What would you like to do", type: "list", choices: ["View Details", "Update/Add/Delete",] },
    ])
}


async function viewDetails() {

    return await inquirer.prompt([
        {
            name: "viewDetails", message: "What would you like to view", type: "list",
            choices: ["Employees", "Departments", "Roles", "total utilized budget of a department"]
        },
    ])
    // const myResult = await db.query( "SELECT * FROM Employees",);
    // console.log( `insert result:`, myResult )
}
// view all employees 
async function viewEmployee() {
    return await inquirer.prompt([
        { name: "viewEmployee1", message: "What would you like to view", type: "list", choices: ['BY department', 'BY manager'] }
    ])
}

// select  department choise
async function depChoice() {
    const value = await db.query('select * from department')
    console.log(value)
    let departmentArray = []
 
    value.forEach(({ department_name }) => {
        departmentArray.push(`${department_name}`)
    })


    return await inquirer.prompt([
        { name: "depChoice1", message: "Which department?", type: "list", choices: departmentArray }
    ])
}

// View employee BY Departments
async function viewEmployeeByDepartments() {
    let result = await depChoice()
 
    let array1=[]
    let x = await db.query(`select employee.first_name,last_name from employee left join role on (employee.role_id=role.id) inner join department on 
    (role.department_id=department.id) where department_name='${result.depChoice1}'`);
    x.forEach(({first_name,last_name}) =>{
        array1.push(`${first_name} ${last_name}`)
    }    )
   
    console.log(array1)


}

// manager choice
async function managerChoice() {
    const value = await db.query('select first_name from employee where manager_id is not null ')
    let managerArray = []
    value.forEach(({ first_name }) => {
        managerArray.push(first_name)
    })
   

    let result = await inquirer.prompt([
        { name: "managerChoice1", message: "Which manager ?", type: "list", choices: managerArray }
    ])
    let result1 = await db.query(`select role_id from employee where first_name = '${result.managerChoice1}'`)
    let array1 = ''
    result1.forEach(({ role_id }) => {
        array1 += role_id
    })
  
    let result2 = await db.query(`select manager_id from employee where role_id= '${array1}' `)
    return result2

}
// select employee BY manager choice 


async function viewEmployeeByManager() {
    let result = await managerChoice()
    let array1 = ''
    result.forEach(({ manager_id }) => {
        array1 += manager_id
    })
  
    // console.log(result)
    const x = await db.query(`select employee.first_name,last_name from employee where role_id = '${array1}'`);
  
}


// View Department


async function viewDepartment() {
    let result = await db.query(`select department_name from department`)

}

//View Role
async function viewRole() {
    let result = await db.query(`select title from role`)

    console.log(result)
}

//sum of Department salary

async function salaryDepartment() {
    let result = await db.query(`SELECT SUM(salary) FROM role left join department on (role.department_id=department.id)`)
 
}
// Update/Add/Delete question

function addQuestion() {
    return inquirer.prompt([
        { name: "addQuestion1", message: "What would you like to add", type: "list", choices: ["Employee", "Role", "Department"] },
    ])
}

// Add  employee
async function addEmployeeTable() {

    const roleValue = await db.query('select title from role')
    let role = []
    role.push("None")
    roleValue.forEach(({ title }) => {
        role.push(title)
    })

    const questions = await inquirer.prompt([
        {
            message: "What is the employee's first name?",
            name: 'firstName'
        },
        {
            message: "What is the employee's last name?",
            name: 'lastName'
        },
        {
            message: "What is the employee's role?",
            name: 'role',
            type: 'list',
            choices: role
        },
        {
            message: "What role is he manager of ?",
            type: 'list',
            choices: role,
            name: 'managerConfirm'
        },

    ])
    let result
    let manager = []
    if (questions.managerConfirm === "None") {
        result = null

    }

    else {
        result = await db.query(`Select id from role where title ='${questions.managerConfirm}'`)


        managerId = await db.query(`Select id from role where title ='${questions.role}'`)

        managerId.forEach(({ id }) => {
            manager.push(id)

        })
        manager = Number(manager)
        console.log(manager)

    }

    let roll = []
  
    rolId = await db.query(`Select id from role where title ='${questions.role}'`)
 
    rolId.forEach(({ id }) => {
        roll.push(id)

    })
    roll = Number(roll)
   
    await db.query('INSERT INTO employee VALUES(?,?,?,?,?)', [0, questions.firstName, questions.lastName, roll, manager])

    let viewEmployee = await db.query(`select * from employee`);
}
// Add  Role

async function addRole() {
    let departments = await db.query(`select department_name from department`);
    let depArray = []
    departments.forEach(({ department_name }) => {
        depArray.push(department_name)
    })
  
    const answer = await inquirer.prompt([
        {
            message: 'What is the title of the role?',
            name: 'title'
        },
        {
            message: 'What is the salary of the role?',
            name: 'salary'
        },
        {
            message: 'Add it in which department?',
            type: "list",
            name: "departmentName",
            choices: depArray
        }
    ])
    // console.log(answer.departmentName)
    let departmentId = await db.query(`select department.id from department left join role on department.id=role.department_id where department.department_name = '${answer.departmentName}' `)
    let depId = []
    departmentId.forEach(({ id }) => {
        depId.push(id)
    })
    depId = Number(depId[0])
    let finalResult = await db.query('INSERT INTO role VALUES     (?,?,?,?)', [0, answer.title, answer.salary, depId])
    return console.log(`${finalResult} has been added to the Roles`)
}

// Add Department

async function addDepartment() {
    const answer = await inquirer.prompt([
        {
            message: 'What is the name of the department?',
            name: 'name',
            type: 'input'
        }
    ])
    finalResult = await db.query('INSERT INTO department VALUES(?,?)', [0, answer.name])

    return console.log(`${finalResult} has been added to the Department`)

}

 