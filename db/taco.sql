-- Steps to create database (may use 'sqlite' OR 'sqlite3' depending on installed version)
-- sqlite taco.db
-- sqlite > .read taco.sql

-- Create Users table
DROP TABLE IF EXISTS Users;
CREATE TABLE Users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    first_name TEXT NOT NULL,
    last_name TEXT NOT NULL,
    password TEXT NOT NULL,
    email TEXT NOT NULL
);

-- Create Taco_Shell table
DROP TABLE IF EXISTS Taco_Shell;
CREATE TABLE Taco_Shell (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    shell TEXT NOT NULL
);

-- Create Taco_Ingredient table
DROP TABLE IF EXISTS Taco_Ingredient;
CREATE TABLE Taco_Ingredient (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    order_id INTEGER NOT NULL,
    ingredient_id INTEGER NOT NULL,
    FOREIGN KEY (order_id) REFERENCES TacoOrder(id)
    FOREIGN KEY (ingredient_id) REFERENCES Ingredients(id)
);

-- Create Ingredients table
DROP TABLE IF EXISTS Ingredients;
CREATE TABLE Ingredients (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    description TEXT NULL,
    price DECIMAL(5,2) NOT NULL
);

-- Create Taco_Order table
DROP TABLE IF EXISTS Taco_Order;
CREATE TABLE Taco_Order (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    order_id INTEGER NOT NULL,
    shell_id INTEGER NOT NULL,
    FOREIGN KEY (order_id) REFERENCES Orders(id)
    FOREIGN KEY (shell_id) REFERENCES Taco_Shell(id)
);

-- Create Locations table
DROP TABLE IF EXISTS Locations;
CREATE TABLE Locations (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    street_address TEXT NOT NULL,
    city TEXT NOT NULL,
    state TEXT NOT NULL,
    zip TEXT NOT NULL,
    phone_number INTEGER NOT NULL,
    hours TEXT NOT NULL
);

-- Create Orders table
DROP TABLE IF EXISTS Orders;
CREATE TABLE Orders (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER NOT NULL,
    event_id INTEGER NOT NULL,
    payment_amount DECIMAL(10,2) NOT NULL,
    order_amount DECIMAL(10,2) NOT NULL,
    FOREIGN KEY (user_id) REFERENCES Users(id),
    FOREIGN KEY (event_id) REFERENCES Events(id)
);

-- Create Events table
DROP TABLE IF EXISTS Events;
CREATE TABLE Events (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER NOT NULL,
    location_id INTEGER NOT NULL,
    event_date TEXT NOT NULL,
    FOREIGN KEY (user_id) REFERENCES Users(id),
    FOREIGN KEY (location_id) REFERENCES Locations(id)
);