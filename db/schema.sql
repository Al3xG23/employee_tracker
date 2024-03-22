-- Active: 1710296068509@@127.0.0.1@3306@employees1_db
DROP DATABASE IF EXISTS employees1_db;

CREATE DATABASE employees1_db;

USE employees1_db;

CREATE TABLE departments (
  id INT PRIMARY KEY NOT NULL,
  name Varchar(30) NOT NULL
);

CREATE TABLE roles (
  id INT PRIMARY KEY NOT NULL,
  title Varchar(30) NOT NULL,
  salary DECIMAL,
  department_id INT,  
  FOREIGN KEY (department_id)
  REFERENCES departments(id)
  ON DELETE SET NULL
);

CREATE TABLE employees (
  id INT PRIMARY KEY NOT NULL,
  first_name VARCHAR(30) NOT NULL,
  last_name VARCHAR(30) NOT NULL,
  role_id INT,
  FOREIGN KEY (role_id)
  REFERENCES roles(id),
  manager_id INT  
);
