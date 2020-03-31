var mysql = require("mysql");
var inquirer = require("inquirer");

var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "12345678",
  database: "employees_db"
});

connection.connect(function(err) {
  if (err) throw err;
  readRoles()
  runManagement();
});

function readRoles(){
  const roles = []
  connection.query("Select * FROM roles", (err, res) => {
    for (var i = 0; i < res.length; i++) {
      roles.push({
        id: res[i].id,
        title: res[i].title,
        salary: res[i].salary,
        department_id: res[i].department_id
      })
      
    }
    return roles;
  })
}

const addEmployeeQuestions = [

]

function runManagement() {
  inquirer
    .prompt({
      name: "action",
      type: "rawlist",
      message: "What would you like to do?",
      choices: [
        "View Departments",
        "View Roles",
        "View Employees",
        "Add Department",
        "Add Role",
        "Add Employee",
        "Update Employee"
      ]
    })
    .then(function(answer) {
      switch (answer.action) {
      case "View Departments":
        viewDepartments();
        break;

      case "View Roles":
        viewRoles();
        break;

      case "View Employees":
        viewEmployees();
        break;

      case "Add Department":
        addDepartment();
        break;

      case "Add Role":
        addRole();
        break;

      case "Add Employee":
        addEmployee();
        break;

      case "Update Employee":
        updateEmployee();
        break
      }
    });
}

function viewDepartments() {
  // inquirer
  //   .prompt({
  //     name: "department",
  //     type: "input",
  //     message: "Which department would you like to view?"
  //   })
  //   .then(function(answer) {
      var query = "SELECT * FROM departments";
      connection.query(query, function(err, res) {
        for (var i = 0; i < res.length; i++) {
          console.log("id: " + res[i].id + " || Department: " + res[i].department_name);
        }
        runManagement();
      });
    ;
}


function viewRoles() {
      var query = "SELECT title, salary, department_name FROM roles JOIN departments ON department_id = departments.id";
      connection.query(query, function(err, res) {
        for (var i = 0; i < res.length; i++) {
          console.log(`Title: ${res[i].title} || Salary: ${res[i].salary} || Department: ${res[i].department_name}`);
        }
        runManagement();
      });
    ;
}

function viewEmployees() {
  var query = 
  `SELECT first_name, last_name, title, salary
  FROM employees
  JOIN roles ON roles.id = employees.role_id`
  connection.query(query, function(err, res) {
    for (var i = 0; i < res.length; i++) {
      console.log(`id: ${res[i].id} || Name: ${res[i].first_name} ${res[i].last_name} || Role: ${res[i].title} || Salary: ${res[i].salary}`)
    }
    runManagement();
  });
}
//look at great bay basic..
function addEmployee(){
  connection.query("SELECT * FROM roles", (err, results) => {
    if (err) throw err;
  
  inquirer
    .prompt([
    {
      name: "first_name",
      type: "input",
      message: "What is the employee's first name?"
    },
    {
      name: "last_name",
      type: "input",
      message: "What is the employee's last name?"
    },
    {
      type: "list",
      name: "role",
      message: "What is the employee's job title?",
      choices: () => {
        const choiceArray = [];
        for(let i = 0; i < results.length; i++) {
          choiceArray.push(results[i].title)
        }
        return choiceArray
      },
    },
    {
      name: "manager",
      type: "input",
      choices: () => {
        const choiceArray = [];
        for (let i = 0; i < results.length; i++) {
          choiceArray.push(results[i].manager_id)
        }
      },
      message: "What is the employee's manager?"
    }])
    .then(function(data){
      
      let chosenRole;
      for (let i =0; i < results.length; i++) {
        if (results[i].title === data.role){
          chosenRole = results[i]
        }
      }

      const query = connection.query(
        "INSERT INTO employees SET ?",
        {
          first_name: data.first_name,
          last_name: data.last_name,
          role_id: chosenRole.id,
          manager_id: data.manager
        },
        (err, res) => {
          if (err) throw err;
          console.log("success!")
        }
      )
    })
  })
  }

function addDepartment(){
  inquirer
    .prompt([
    {
      name: "department_name",
      type: "input",
      message: "What is the name of the department?"
    }])
    .then(function(data) {
      const query = connection.query(
        "INSERT INTO departments SET ?",
        {
          department_name: data.department_name
        },
        (err, res) => {
          if (err) throw err;
          console.log('success!')
          runManagement();
        }
      )
    })
}

function addRole() {
  connection.query("SELECT * FROM departments", (err, results) => {
    if (err) throw err;

    inquirer
      .prompt([
        {
          name: "title",
          type: "input",
          message: "What is the job title?"
        },{
          name: "salary",
          type: "number",
          message: "What is the salary?"
        },
        {
          name: "department",
          type: "list",
          message: "Which department is it in?",
          choices: () => {
            const choiceArray = [];
            for(let i = 0; i < results.length; i++){
              choiceArray.push(results[i].department_name)
            }
            return choiceArray
          },
        },
        

      ]).then(function(data){
        let chosenDepartment;
        for (let i = 0; i < results.length; i++){
          if (results[i].department_name === data.department){
            chosenDepartment = results[i]
          }
        }

        const query = connection.query(
          "INSERT INTO roles SET ?",
          {
            title: data.title,
            salary: data.salary,
            department_id : chosenDepartment.id
          },
          (err, res) => {
            if (err) throw err;
            console.log("success!")
          }
        )
      })
  })
}

function updateEmployee() {
  connection.query("SELECT * FROM employees", (err, results) => {
  inquirer
    .prompt([
      {
        name: "employee",
        type: "list",
        message:"Which employee would you like to update?",
        choices: () => {
          const choiceArray = [];
          for(let i = 0; i < results.length; i++){
            choiceArray.push(`${results[i].first_name} ${results[i].last_name}`)
          }
          return choiceArray
        }
      }
    ])
    .then(function(data){
      let chosenEmployee;
      for (let i = 0; i < results.length; i++){
        if (`${results[i].first_name} ${results[i].last_name}` === data.employee){
          chosenEmployee = results[i]
        }
      }
      connection.query("SELECT * FROM roles",
      (err, results) => {
        if (err) throw err;
      
      inquirer
        .prompt([
          {
            name: "role",
            type: "list",
            message: "What is the employee's new role?",
            choices: () => {
              const choiceArray = [];
              for(let i = 0; i < results.length; i++){
                choiceArray.push(results[i].title)
              }
            return choiceArray
            }
          },

        ]).then(function(data){
          let chosenRole;
          for (let i = 0; i < results.length; i++){
            if (results[i].title === data.role){
              chosenRole = results[i]
            }
          }
        
      const query = connection.query("UPDATE employees SET ? WHERE ?",
      [
        {
          role_id: chosenRole.id
        },
        {
          id: chosenEmployee.id
        }
      ], (err) => {
        if (err) throw err;
        console.log("Update Successful!")
        runManagement()
      })
    })
  })
  })
  })
}

  
