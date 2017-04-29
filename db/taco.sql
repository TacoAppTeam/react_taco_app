-- Steps to create database
-- sqlite taco.db
-- sqlite> .read taco.sql

-- Create test table
DROP TABLE IF EXISTS test;
CREATE TABLE test (
 id INTEGER PRIMARY KEY AUTOINCREMENT,
   name VARCHAR(255) NOT NULL,
   type VARCHAR(255) NOT NULL
);
