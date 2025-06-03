DROP SCHEMA IF EXISTS ecommerce;
DROP TABLE IF EXISTS ecommerce.users;

CREATE SCHEMA ecommerce;

CREATE TABLE ecommerce.users(
	userId SERIAL PRIMARY KEY,
	first_name TEXT NOT NULL,
	last_name TEXT NOT NULL,
	birthdate DATE NOT NULL,
	email TEXT UNIQUE NOT NULL CHECK (email ~  '^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$')
	password TEXT NOT NULL,
	phone_number INT,
	created_at CURRENT_TIME
);

CREATE TABLE ecommerce.addresses(
	addressId SERIAL PRIMARY KEY,
	name TEXT NOT NULL,
	street TEXT NOT NULL,
	city TEXT NOT NULL,
	country text NOT NULL,
	postal_code TEXT NOT NULL
)