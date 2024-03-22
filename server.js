const express = require('express');
const mysql = require('mysql2');
const inquirer = require('inquirer');

const PORT = process.env.PORT || 3001;
const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

const db = mysql.createConnection(
    {
      host: 'localhost',
      user: 'root',      
      password: 'Help00$12',
      database: 'employees1_db'
    },
    console.log(`Connected to the employees1_db database.`)
  );

  app.use((req, res) => {
    res.status(404).end();
  });

  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });

  inquirer
  .prompt([
    {
      type: 'list',
      message: 'Options:',
      name: 'options',
      choices: ['view all departments', 'view all roles', 'view all employees', 'add a department', 'add a role', 'add an employee', 'update an employee role']
    },
  ])

  .then((choices) => {
    // TODO: add function to run SELECT DATABASE command and show table
    db.query('SELECT', function (err, results) {
        console.log(results);
    });
});
