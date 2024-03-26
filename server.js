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
  let sql = 'SELECT * FROM departments';
  connection.query(sql, (err, result) => {
    if (err) throw err;
    console.log(result);
    promptUser();
  });
}

const getAllRoles = () => {
  let sql = 'SELECT * FROM roles';
  connection.query(sql, (err, result) => {
    if (err) throw err;
    console.log(result);
    promptUser();
  });
}

const getAllEmployees = () => {
  let sql = 'SELECT * FROM employees';
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
      let sql = 'INSERT INTO departments (name) VALUES (?)';
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
      let sql = 'INSERT INTO roles (title, salary) VALUES (?, ?)';
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
      let sql = 'INSERT INTO employees (first_name, last_name) VALUES (?, ?)';
      let addNewEmployee = [answer.newEmployeeFirst, answer.newEmployeeLast];
      connection.query(sql, addNewEmployee, (err, res) => {
        if (err) throw err;
        console.log(answer.newEmployeeFirst + ' ' + answer.newEmployeeLast + ' added as new employee.');
        getAllEmployees();
      });
    });
};

// TODO fix this code to update employee
const updateEmployee = () => {
  let sql = 'SELECT employees.id, employees.first_name, employees.last_name, roles.id AS "role_id" FROM employees, roles WHERE roles.id = employees.role_id';
  connection.query(sql, (err, res) => {
    if (err) throw err;
    let employeesNames = [];
    res.forEach((employees) => {employeesNames.push(`${employees.first_name} ${employees.last_name}`);});

    let sql = 'SELECT roles.id, roles.title FROM roles';
    connection.query(sql, (err, res) => {
      if (err) throw err;
      let chooseRoles = [];
      res.forEach((roles) => {chooseRoles.push(roles.title);});

      inquirer
        .prompt([
          {
            name: 'chosenName',
            type: 'list',
            message: 'Which employee would you like to update?',
            choices: 'employeeNames'
          },
          {
            name: 'chosenRole',
            type: 'list',
            message: 'Choose employees new role:',
            choices: 'chooseRoles'
          }
        ])
        .then((answer) => {
          let newRoleId, employeesId;

          res.forEach((employees) => {
            if (answer.chosenName.options === `${employees.first_name}${employees.last_name}`) { employeesId = employees.id; }
          });
          res.forEach((roles) => {
            if (answer.chosenRole.options === roles.title) { newRoleId = roles.id; }
          });

          let sql = 'UPDATE employees SET employees.role_id = ? WHERE employees.id = ?';
          connection.query(sql, [newRoleId, employeesId], (err, res) => {
            if (err) throw err;
            console.log("'s role updated");
            getAllEmployees();
            promptUser();
          });
        });
    });
  });
};


