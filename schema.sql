DROP DATABASE IF EXISTS employees_db;
CREATE DATABASE employees_db;
USE employees_db;

CREATE TABLE employees(
  id INTEGER AUTO_INCREMENT NOT NULL,
  first_name VARCHAR(30) NOT NULL,
  last_name VARCHAR(30) NOT NULL,
  role_id INTEGER NOT NULL,
  manager_id INTEGER,
  PRIMARY KEY (id)
)

CREATE TABLE roles(
  id INTEGER AUTO_INCREMENT NOT NULL,
  title VARCHAR(100) NOT NULL,
  salary DECIMAL(10,2) NOT NULL,
  department_id INTEGER NOT NULL
  PRIMARY KEY (id)
)

CREATE TABLE departments(
  id INTEGER AUTO_INCREMENT NOT NULL,
  name VARCHAR(100) NOT NULL,
  PRIMARY KEY (id)
)

INSERT INTO departments(name) values('HR');
INSERT INTO departments(name) values('IT');

INSERT INTO role(title, salary, department_id) values ('Software Engineer, 60000, 2');
INSERT INTO role(title, salary, department_id) values ('Senior Software Engineer, 80000, 2');

INSERT INTO employees (first_name, last_name, role_id, manager_id) values ('Katie', 'Bobbe', 2);
INSERT INTO employees (first_name, last_name, role_id, manager_id) values ('Mark', 'Bobbe', 1, 1);

SELECT * FROM employees;
SELECT * FROM roles;
SELECT * FROM departments;


-- show ALL books with authors
-- INNER JOIN will only return all matching values from both tables
SELECT title, firstName, lastName
FROM books
INNER JOIN authors ON books.authorId = authors.id;

-- show ALL books, even if we don't know the author
-- LEFT JOIN returns all of the values from the left table, and the matching ones from the right table
SELECT title, firstName, lastName
FROM books
LEFT JOIN authors ON books.authorId = authors.id;

-- show ALL books, even if we don't know the author
-- RIGHT JOIN returns all of the values from the right table, and the matching ones from the left table
SELECT title, firstName, lastName
FROM books
LEFT JOIN authors ON books.authorId = authors.id;