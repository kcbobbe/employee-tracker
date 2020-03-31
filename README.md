# employee-tracker
View and store employee and department information using a CLI

## Table Of Contents
1. Description
2. Technologies Used
3. Installation
4. Usage
5. Contibutors
6. Future Improvements

## Description
This is an interactive CLI that can be used to manage employees, departments, and roles. A user can view the employees, departments, and roles at the company. A user can add new employees, departments and roles to the company. A user can update an employee's role at the company.

## Technologies Used\
* Node.js
* MySQL
* Inquirer.js
* Console.table

## Installation
1. Clone the repository from GitHub
2. Navigate to the project directory, then run "npm install" to install the dependencies for the project.

## Usage
1. Create the employees_db database in MySQL Workbench. Copy and paste the contents into the workbench and run.
2. Run the data in the seed.sql file in the workbench, or create your own seed data.
3. Check the app.js config at the top of the file and make sure that the host, port, user and password are correct for your environment.
3. In the terminal, navigate to the project directory, then type 'node app.js'
4. Answer the questions in the CLI. The options are: View Departments, View Roles, View Employees, Add Department, Add Role, Add Employee, Update Employee, and Exit.
5. Follow the guidance in the CLI to manage the database.

## Contributors
1. Katie Bobbe

## Future Improvements
1. Add/ Edit Employee managers
2. View Employees by manager
3. Delete departments, roles, and employees
4. View the total budget of a department used