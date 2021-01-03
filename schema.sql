DROP DATABASE IF EXISTS MANAGEMENT_SYSTEM;
CREATE DATABASE MANAGEMENT_SYSTEM;
USE MANAGEMENT_SYSTEM;

CREATE TABLE department(
id  INTEGER NOT NULL  AUTO_INCREMENT PRIMARY KEY,
name VARCHAR(30)
);

CREATE TABLE role (
id INTEGER NOT NULL  AUTO_INCREMENT PRIMARY KEY,
title VARCHAR(30),
salary DECIMAL(10,2),
department_id INTEGER,
foreign key(department_id) references department(id)
);

CREATE TABLE employee(
id INTEGER NOT NULL AUTO_INCREMENT PRIMARY KEY,
first_name VARCHAR(30),
last_name VARCHAR(30),
role_id INTEGER,
foreign key (role_id) references role(id),
manager_id INTEGER,
foreign key (manager_id) references employee(id)

);