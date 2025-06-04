DROP SCHEMA IF EXISTS ecommerce;
DROP TABLE IF EXISTS ecommerce.users;
DROP TABLE IF EXISTS ecommerce.addresses;
DROP TABLE IF EXISTS ecommerce.categories;
DROP TABLE IF EXISTS ecommerce.products;
DROP TABLE IF EXISTS ecommerce.orders;
DROP TABLE IF EXISTS ecommerce.order_items;
DROP TABLE IF EXISTS ecommerce.payments;
DROP TABLE IF EXISTS ecommerce.cart;
DROP TYPE IF EXISTS ecommerce.order_status;

CREATE SCHEMA ecommerce;

CREATE TYPE ecommerce.order_status AS ENUM(
'pending',
'processing',
'cancelled',
'deliverd'
);

CREATE TYPE ecommerce.payment_status(
'pending',
'cancelled',
'approved'
);

CREATE TYPE ecommerce.payment_method(
'credit',
'paypal'
)

CREATE TABLE ecommerce.users(
	userId SERIAL PRIMARY KEY,
	first_name TEXT NOT NULL,
	last_name TEXT NOT NULL,
	birthdate DATE NOT NULL,
	email TEXT UNIQUE NOT NULL CHECK (email ~  '^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$')
	password TEXT NOT NULL,
	phone_number INT,
	created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE ecommerce.addresses(
	addressId SERIAL PRIMARY KEY,
	userId INTEGER REFERENCES ecommerce.users(userId) ON DELETE CASCADE,
	name TEXT NOT NULL,
	street TEXT NOT NULL,
	city TEXT NOT NULL,
	country text NOT NULL,
	postal_code TEXT NOT NULL
)

CREATE TABLE ecommerce.categories (
    categoryId SERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    description TEXT
);

CREATE TABLE ecommerce.products (
    productId SERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    description TEXT,
    price NUMERIC(10, 2) NOT NULL,
    stock_quantity INTEGER NOT NULL,
    category_id INTEGER REFERENCES ecommerce.categories(categoryId),
);

CREATE TABLE ecommerce.orders (
    orderId SERIAL PRIMARY KEY,
    userId INTEGER REFERENCES ecommerce.users(userId) ON DELETE SET NULL,
    addressId INTEGER REFERENCES addresses(addressId),
    status ecommerce.ORDER_STATUS  DEFAULT 'pending', -- todo::: a enum
    total_amount NUMERIC(10, 2) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE ecommerce.order_items (
    id SERIAL PRIMARY KEY,
    orderId INTEGER REFERENCES ecommerce.orders(orderId) ON DELETE CASCADE,
    productId INTEGER REFERENCES ecommerce.products(productId),
    quantity INTEGER NOT NULL,
    unit_price NUMERIC(10, 2) NOT NULL -- snapshot of price at time of purchase
);

CREATE TABLE ecommerce.payments (
    paymentId SERIAL PRIMARY KEY,
    orderId INTEGER REFERENCES ecommerce.orders(orderId) ON DELETE CASCADE,
    payment_method ecommerce.PAYMENT_METHOD NOT NULL, -- todo::: enum
    payment_status ecommerce.PAYMENT_STATUS DEFAULT 'pending', -- enum
    amount NUMERIC(10, 2) NOT NULL,
    paid_at TIMESTAMP
);

CREATE TABLE eommerce.cart(
userId INTEGER REFERENCES ecommerce.users(userId) ON DELETE CASCADE,
productId INTEGER REFERENCES ecommerce.products(productId) ON DELETE CASCADE,
CONSTRAINT PK_Cart PRIMARY KEY (userID,productId)
)