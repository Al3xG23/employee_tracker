const express = require('express');
const inquirer = require('inquirer');

const PORT = process.env.PORT || 3001;
const app = express();

const mysql = require('mysql2');
const connection = mysql.createConnection(
    {
        host: 'localhost',
        user: 'root',
        password: 'Help00$12',
        database: 'employees1_db'
    },
    console.log(`Connected to the employees1_db database.`)
);

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use((req, res) => {
  res.status(404).end();
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

function promptUser() {
  inquirer
    .prompt([
      {
        type: 'list',
        message: 'Options:',
        name: 'options',
        choices: ['View all departments', 'View all roles', 'View all employees', 'Add a department', 'Add a role', 'Add an employee', 'Update an employee role']
      },
    ])

    .then((choices) => {      
      if (choices === 'View all departments') {
        viewAllDepartments();
      }
      if (choices === 'View all roles') {
        viewAllRoles();
      }
      if (choices === 'View all employees') {
        viewAllEmployees();
      }
      if (choices === 'Add a department') {
        addDepartment();
      }
      if (choices === 'Add a role') {
        addRole();
      }
      if (choices === 'Add an employee') {
        addEmployee();
      }
      if (choices === 'Update an employee role') {
        updateEmployee();
      }
    });
};

promptUser();

function viewAllDepartments() {  
  connection.query('Select * FROM departments', (err, result) => {
      if (err) throw err;
      promptUser();
  });
};

module.exports.viewAllDepartments = viewAllDepartments;

app.get('api/departments', function (req, res) {
  connection.viewAllDepartments((err, result) => {
    if (err) throw err;
    console.log(result);    
  })
});