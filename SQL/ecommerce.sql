DROP SCHEMA IF EXISTS ecommerce CASCADE;
-- DROP TABLE IF EXISTS ecommerce.users;
-- DROP TABLE IF EXISTS ecommerce.addresses;
-- DROP TABLE IF EXISTS ecommerce.categories;
-- DROP TABLE IF EXISTS ecommerce.products;
-- DROP TABLE IF EXISTS ecommerce.orders;
-- DROP TABLE IF EXISTS ecommerce.order_items;
-- DROP TABLE IF EXISTS ecommerce.payments;
-- DROP TABLE IF EXISTS ecommerce.cart;
-- DROP TYPE IF EXISTS ecommerce.order_status;

CREATE SCHEMA ecommerce;

CREATE TYPE ecommerce.order_status AS ENUM(
'pending',
'processing',
'cancelled',
'delivered'
);

CREATE TYPE ecommerce.payment_status AS ENUM(
'pending',
'cancelled',
'approved'
);

CREATE TYPE ecommerce.payment_method AS ENUM(
'credit_card',
'paypal'
);

CREATE TYPE ecommerce.user_role AS ENUM(
'user',
'admin'
);

CREATE TABLE ecommerce.users(
	userId SERIAL PRIMARY KEY,
	first_name TEXT NOT NULL,
	last_name TEXT NOT NULL,
	birthdate DATE NOT NULL,
	email TEXT UNIQUE NOT NULL CHECK (email ~*  '^[^@]+@[^@]+\.[^@]+$'),
	password TEXT NOT NULL,
	role ecommerce.USER_ROLE NOT NULL DEFAULT 'user',
	phone_number TEXT,
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
);

CREATE TABLE ecommerce.categories (
    categoryId SERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    description TEXT
);

CREATE TABLE ecommerce.brands (
	brandId SERIAL PRIMARY KEY,
	name TEXt NOT NULL,
	description TEXT
);

CREATE TABLE ecommerce.products (
    productId SERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    description TEXT,
	brandId INTEGER REFERENCES ecommerce.brands(brandId) ON DELETE CASCADE,
    price NUMERIC(10, 2) NOT NULL,
	image_url TEXT,
    stock_quantity INTEGER NOT NULL,
    category_id INTEGER REFERENCES ecommerce.categories(categoryId)
);

CREATE TABLE ecommerce.orders (
    orderId SERIAL PRIMARY KEY,
    userId INTEGER REFERENCES ecommerce.users(userId) ON DELETE SET NULL,
    addressId INTEGER REFERENCES ecommerce.addresses(addressId),
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

CREATE TABLE ecommerce.cart(
userId INTEGER REFERENCES ecommerce.users(userId) ON DELETE CASCADE,
productId INTEGER REFERENCES ecommerce.products(productId) ON DELETE CASCADE,
quantity INTEGER NOT NULL DEFAULT 1,
CONSTRAINT PK_Cart PRIMARY KEY (userId,productId)
);

CREATE TABLE ecommerce.reviews (
reviewId SERIAL PRIMARY KEY,
userId INTEGER REFERENCES ecommerce.users(userId) ON DELETE SET NULL,
productId INTEGER REFERENCES ecommerce.products(productId) ON DELETE CASCADE,
rating SMALLINT CHECK (rating BETWEEN 1 AND 5),
comment TEXT,
created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);


-- USERS
INSERT INTO ecommerce.users (userId, first_name, last_name, birthdate, email, password, role, phone_number, created_at) VALUES
(1, 'Alice', 'Johnson', '1990-05-12', 'alice.johnson@example.com', 'hashed_password1', 'user', '1234567890', '2023-06-01'),
(2, 'Bob', 'Smith', '1985-03-23', 'bob.smith@example.com', 'hashed_password2', 'user', '0987654321', '2023-06-02');

-- ADDRESSES
INSERT INTO ecommerce.addresses (addressId, userId, name, street, city, country, postal_code) VALUES
(1, 1, 'Alice Home', '123 Main St', 'New York', 'USA', '10001'),
(2, 2, 'Bob Office', '456 Elm St', 'Los Angeles', 'USA', '90001');

-- CATEGORIES
INSERT INTO ecommerce.categories (categoryId, name, description) VALUES
(1, 'Men''s Fragrances', 'Perfumes and colognes for men'),
(2, 'Women''s Fragrances', 'Perfumes and colognes for women'),
(3, 'Unisex Fragrances', 'Fragrances suitable for all genders');

-- BRANDS
INSERT INTO ecommerce.brands (brandId, name, description) VALUES
(1, 'Dior', 'Christian Dior is a luxury fashion house known for iconic fragrances.'),
(2, 'Chanel', 'Chanel is a French luxury brand with legendary perfumes.'),
(3, 'Creed', 'Creed is a niche perfume house with historic roots.'),
(4, 'Yves Saint Laurent', 'YSL creates fashion-forward fragrances.'),
(5, 'Tom Ford', 'Tom Ford designs luxurious, bold scents.');

-- PRODUCTS
INSERT INTO ecommerce.products (productId, name, description, brandId, price, image_url, stock_quantity, category_id) VALUES
(1, 'Dior Sauvage', 'Fresh, spicy and woody fragrance for men.', 1, 110.00, 'https://parisgallery.ae/cdn/shop/products/214733926_IN.jpg', 50, 1),
(2, 'Chanel No. 5', 'Classic floral fragrance for women.', 2, 130.00, 'https://www.chanel.com/images//t_one//w_0.51,h_0.51,c_crop/q_auto:good,f_autoplus,fl_lossy,dpr_1.1/w_1020/n-5-eau-de-parfum-spray-3-4fl-oz--packshot-default-125530-9564912943134.jpg', 40, 2),
(3, 'Creed Aventus', 'Fruity, smoky fragrance for men.', 3, 345.00, 'https://glam42.co.il/cdn/shop/products/creed-aventus-edp-100ml-21435502526618.jpg', 20, 1),
(4, 'YSL Black Opium', 'Sweet, coffee-flavored women’s perfume.', 4, 125.00, 'https://img.ksp.co.il/item/41848/b_5.jpg', 35, 2),
(5, 'Tom Ford Oud Wood', 'Rich, woody unisex fragrance.', 5, 250.00, 'https://kolboyehuda.co.il/wp-content/uploads/2021/11/1229-bwsm-ywnysqs-twm-pwrd-wd-wwd-dp-50-ml-Tom-Ford-Oud-Wood-Eau-De-Parfum-50-Ml.jpg', 30, 3);

-- ORDERS
INSERT INTO ecommerce.orders (orderId, userId, addressId, status, total_amount, created_at) VALUES
(1, 1, 1, 'delivered', 110.00, '2023-06-03'),
(2, 2, 2, 'processing', 375.00, '2023-06-04');

-- ORDER ITEMS
INSERT INTO ecommerce.order_items (id, orderId, productId, quantity, unit_price) VALUES
(1, 1, 1, 1, 110.00),
(2, 2, 3, 1, 345.00),
(3, 2, 4, 1, 125.00);

-- PAYMENTS
INSERT INTO ecommerce.payments (paymentId, orderId, payment_method, payment_status, amount, paid_at) VALUES
(1, 1, 'credit_card', 'approved', 110.00, '2023-06-03'),
(2, 2, 'paypal', 'pending', 375.00, NULL);

-- CART
INSERT INTO ecommerce.cart (userId, productId, quantity) VALUES
(1, 2, 1),
(2, 5, 2);

-- REVIEWS
INSERT INTO ecommerce.reviews (reviewId, userId, productId, rating, comment, created_at) VALUES
(1, 1, 1, 5, 'Amazing fragrance, long-lasting!', '2023-06-05'),
(2, 2, 3, 4, 'Smells great but a bit pricey.', '2023-06-06');