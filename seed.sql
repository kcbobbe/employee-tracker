
INSERT INTO departments(name) values('HR');
INSERT INTO departments(name) values('IT');

INSERT INTO roles(title, salary, department_id) values ('Software Engineer', 60000, 2);
INSERT INTO roles(title, salary, department_id) values ('Senior Software Engineer', 80000, 2);

INSERT INTO employees (first_name, last_name, role_id) values ('Katie', 'Bobbe', 2);
INSERT INTO employees (first_name, last_name, role_id, manager_id) values ('Mark', 'Bobbe', 1, 1);

SELECT * FROM employees;
SELECT * FROM roles;
SELECT * FROM departments;
