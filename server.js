const express = require('express');
const inquirer = require('inquirer');
const mysql = require('mysql2');

const PORT = process.env.PORT || 3001;
const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

const connection = mysql.createConnection(
  {
    host: 'localhost',
    user: 'root',
    password: 'Help00$12',
    database: 'employees1_db'
  });

connection.connect(function (err) {
  if (err) throw err;
  console.log(`Connected to the employees1_db database.`);
  promptUser();
});

// Prompt to get user choice

const promptUser = () => {
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
      // console.log(choices)
      if (choices.options === 'View all departments') {
        getDepartments();
      }
      if (choices.options === 'View all roles') {
        getAllRoles();
      }
      if (choices.options === 'View all employees') {
        getAllEmployees();
      }
      if (choices.options === 'Add a department') {
        addDepartment();
      }
      if (choices.options === 'Add a role') {
        addRole();
      }
      if (choices.options === 'Add an employee') {
        addEmployee();
      }
      if (choices.options === 'Update an employee role') {
        updateEmployee();
      }
    });
};

// Functions to show user choices

const getDepartments = () => {
  let sql = 'Select * FROM departments';
  connection.query(sql, (err, result) => {
    if (err) throw err;
    console.log(result);    
    promptUser();
  });
}

const getAllRoles = () => {
  let sql = 'Select * FROM roles';
  connection.query(sql, (err, result) => {
    if (err) throw err;
    console.log(result);
    promptUser();
  });
}

const getAllEmployees = () => {
  let sql = 'Select * FROM employees';
  connection.query(sql, (err, result) => {
    if (err) throw err;
    console.log(result);
    promptUser();
  });
}

const addDepartment = () => {
  inquirer
    .prompt([
      {
        name: 'newDepartment',
        type: 'input',
        message: 'Enter new department: ',
      }
    ])
    .then((answer) => {
      let sql = 'Insert Into departments (name) Values (?)';
      connection.query(sql, answer.newDepartment, (err, res) => {
        if (err) throw err;
        console.log(answer.newDepartment + ' department created.');
        getDepartments();
      });
    });
};

const addRole = () => {
  inquirer
  .prompt([
    {
      name: 'newRole',
      type: 'input',
      message: 'Enter new role: ',
    },
    {
      name: 'salary',
      type: 'input',
      message: 'Enter salary for new role: '
    }
  ])
  .then((answer) => {
    let sql = 'Insert Into roles (title, salary) Values (?, ?)';
    let addRole = [answer.newRole, answer.salary];
    connection.query(sql, addRole, (err, res) => {
      if (err) throw err;
      console.log(answer.newRole + ' role created with a salary of $' + answer.salary);
      getAllRoles();
    });
  });
};

const addEmployee = () => {
  inquirer
  .prompt([
    {
      name: 'newEmployeeFirst',
      type: 'input',
      message: 'Enter new employee first name: ',
    },
    {
      name: 'newEmployeeLast',
      type: 'input',
      message: 'Enter new employee last name : '
    }
  ])
  .then((answer) => {
    let sql = 'Insert Into employees (first_name, last_name) Values (?, ?)';
    let addNewEmployee = [answer.newEmployeeFirst, answer.newEmployeeLast];
    connection.query(sql, addNewEmployee, (err, res) => {
      if (err) throw err;
      console.log(answer.newEmployeeFirst + ' ' + answer.newEmployeeLast + ' added as new employee.');
      getAllEmployees();
    });
  });
};

const updateEmployee = () => {
  let sql = 'Select';
  connection.query(sql, (err, res) => {
    if (err) throw err;
    getAllEmployees();
  });
};


