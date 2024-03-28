-- Active: 1710296068509@@127.0.0.1@3306@employees1_db
INSERT INTO employees (id, first_name, last_name)
VALUES (001, "Tyler", "Duke"),
       (002, "Megan", "Stanley"),
       (003, "Vicky", "Dare"),
       (004, "Alan", "Carpenter");

INSERT INTO departments (id, name)
VALUES (001, "Development"),
       (002, "Human Resources"),
       (003, "Marketing"),
       (004, "Production"),
       (005, "Research"),
       (006, "Sales");

INSERT INTO roles (id, title, salary)
VALUES (001, "Manager", 250000.00),
       (002, "Research Assistant", 30000.00),
       (003, "Sales Representative", 50000.00),
       (004, "HR Manager", 100000.00);
       