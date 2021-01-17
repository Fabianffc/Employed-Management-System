var inquirer = require("inquirer");
//we are requiring mysql so we can use it
var mysql = require("mysql");
//this way we can print our table in the terminal
const { printTable } = require('console-table-printer');
//making the connection with our mysql workbench db
var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "Pasword1",
    database: "MANAGEMENT_SYSTEM"
});
connection.connect(function (err) {
    console.log("connection id", connection.threadId);
    start()
})
//using inquirer.prompt we asked the user to pick an item from the "choices" below
function start() {
    inquirer.prompt([{
        type: "list",
        message: "Pick a selection",
        choices: ["add department", "add roles", "add employees", "view department", "view roles",
            "view employees", "update employees roles"],
        name: "choices"
    }])
        .then(function (input) {
            switch (input.choices) {
                case "add department":
                    addDepartment()
                    break
                case "add roles":
                    addRoles()
                    break
                case "add employees":
                    addEmployees()
                    break
                case "view department":
                    viewDepartment()
                    break
                case "view roles":
                    viewRoles()
                    break
                case "view employees":
                    viewEmployees()
                    break
                case "update employees roles":
                    updateEmployeesRoles()
                    break
            }
        })
}
//add an department using an inquirer prompt where we ask for the user inputs(name of department)
function addDepartment() {
    inquirer.prompt([{
        type: "input",
        message: "Department name?",
        name: "department"
    }])
        .then(function (data) {
            connection.query("INSERT INTO department(name)VALUES(?)", data.department, function (err, data) {
                if (err) {
                    console.log(err);
                }
                console.log("Succes!!");
                start()
            })
        })
}
//add a role using an inquirer prompt where we ask for the user inputs(title,salary,department_id)

function addRoles() {
    inquirer.prompt([{
        type: "input",
        message: "New role?",
        name: "title"
    }, {
        type: "input",
        message: "What is the new salary?",
        name: "salary"
    },
    {
        type: "input",
        message: "What is the department id?",
        name: "department_id"
    }])
        .then(function (input) {
            var statement = connection.query("INSERT INTO role(title, salary, department_id) VALUES (?,?,?)", [input.title, parseFloat(input.salary), parseInt(input.department_id)],
                function (err, data) {
                    printTable(data)
                    console.log("Succes!!")
                    //   start()
                })
            console.log(statement.sql)
        })

}
//add employee using an inquirer prompt where we ask for the user inputs(name,position,department_id)
function addEmployees() {
    inquirer.prompt([{
        type: "input",
        message: "New employee name?",
        name: "name"
    }, {
        type: "input",
        message: "What is the position?",
        name: "position"
    },
    {
        type: "input",
        message: "What is the department id?",
        name: "department_id"
    }])
        .then(function (input) {
            var statement = connection.query("INSERT INTO role(name, position, department_id) VALUES (?,?,?)", [input.name, parseFloat(input.position), parseInt(input.department_id)],
                function (err, data) {
                    printTable(data)
                    console.log("Succes!!")

                })
            console.log(statement.sql)
        })

}
// view the departments in our terminal using printTable selecting the info from our table "department"
function viewDepartment() {
    connection.query("select * FROM department", function (err, data) {
        printTable(data)
        start()
    })
}
// view the roles in our terminal using printTable selecting the info FROM our table role

function viewRoles() {
    connection.query("select * FROM role", function (err, data) {
        printTable(data)
        start()
    })
}
// view employees in our terminal using printTable selecting the info from our table "employee"

function viewEmployees() {
    connection.query("select * FROM employee", function (err, data) {
        printTable(data)
        start()
    })

}
//Update employee roles
function updateEmployeesRoles() {
    inquirer.prompt([{
        type: "input",
        message: "What is the new employee role?",
        name:"title"

        
    },
    {
        type: "input",
        message: "What is your employee id?",
        name: "id"

    }
]).then(function(userInput){
   var statement =     connection.query("UPDATE employee SET role_id = ? WHERE id = ?",[userInput.title, userInput.id],
        function (err, data) {
          console.log("your role has been updated!!");

            start()



        })
    })
    
   
    }