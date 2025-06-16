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

CREATE TYPE ecommerce.gender as ENUM(
'male',
'female',
'unisex'
);

CREATE TABLE ecommerce.addresses(
	address_id SERIAL PRIMARY KEY,
	street TEXT NOT NULL,
	city TEXT NOT NULL,
	country text NOT NULL,
	postal_code TEXT NOT NULL
);

CREATE TABLE ecommerce.users(
	user_id SERIAL PRIMARY KEY,
	first_name TEXT NOT NULL,
	last_name TEXT NOT NULL,
	birthdate DATE ,
	address_id INTEGER REFERENCES ecommerce.addresses(address_id),
	email TEXT UNIQUE CHECK (email ~*  '^[^@]+@[^@]+\.[^@]+$'),
	google_id TEXT UNIQUE,
	password TEXT,
	role ecommerce.USER_ROLE NOT NULL DEFAULT 'user',
	phone_number TEXT,
	created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);



CREATE TABLE ecommerce.categories (
    category_id SERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    description TEXT
);

CREATE TABLE ecommerce.brands (
	brand_id SERIAL PRIMARY KEY,
	name TEXT NOT NULL UNIQUE,
	description TEXT,
	image_url TEXT
);

CREATE TABLE ecommerce.products (
    product_id SERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    description TEXT,
	brand_id INTEGER REFERENCES ecommerce.brands(brand_id) ON DELETE CASCADE,
    price NUMERIC(10, 2) NOT NULL,
	gender ecommerce.gender NOT NULL DEFAULT 'unisex',
	image_url TEXT,
    stock_quantity INTEGER NOT NULL,
    category_id INTEGER REFERENCES ecommerce.categories(category_id)
);

CREATE TABLE ecommerce.orders (
    order_id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES ecommerce.users(user_id) ON DELETE SET NULL,
    address_id INTEGER REFERENCES ecommerce.addresses(address_id),
    status ecommerce.ORDER_STATUS  DEFAULT 'pending', -- todo::: a enum
    total_amount NUMERIC(10, 2) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE ecommerce.order_items (
    id SERIAL PRIMARY KEY,
    order_id INTEGER REFERENCES ecommerce.orders(order_id) ON DELETE CASCADE,
    product_id INTEGER REFERENCES ecommerce.products(product_id),
    quantity INTEGER NOT NULL,
    unit_price NUMERIC(10, 2) NOT NULL -- snapshot of price at time of purchase
);


CREATE TABLE ecommerce.payments (
    payment_id SERIAL PRIMARY KEY,
    order_id INTEGER REFERENCES ecommerce.orders(order_id) ON DELETE CASCADE,
    payment_method ecommerce.PAYMENT_METHOD NOT NULL, -- todo::: enum
    payment_status ecommerce.PAYMENT_STATUS DEFAULT 'pending', -- enum
    amount NUMERIC(10, 2) NOT NULL,
    paid_at TIMESTAMP
);

CREATE TABLE ecommerce.cart(
user_id INTEGER REFERENCES ecommerce.users(user_id) ON DELETE CASCADE,
product_id INTEGER REFERENCES ecommerce.products(product_id) ON DELETE CASCADE,
quantity INTEGER NOT NULL DEFAULT 1,
CONSTRAINT PK_Cart PRIMARY KEY (user_id,product_id)
);

CREATE TABLE ecommerce.reviews (
review_id SERIAL PRIMARY KEY,
user_id INTEGER REFERENCES ecommerce.users(user_id) ON DELETE SET NULL,
product_id INTEGER REFERENCES ecommerce.products(product_id) ON DELETE CASCADE,
rating SMALLINT CHECK (rating BETWEEN 1 AND 5),
comment TEXT,
created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);



-- CATEGORIES
INSERT INTO ecommerce.categories (category_id, name, description) VALUES
(default, 'Fruity', 'Apple, peach, berries, tropical fruits Often blended with florals for sweetness'),
(default, 'Citrus', 'Lemon, bergamot, orange, mandarin, Fresh, zesty, light — often unisex'),
(default, 'Woody', 'Sandalwood, cedarwood, vetiver, patchouli'),
(default, 'Spicy', 'Cinnamon, cardamom, pepper, clove. Can be warm or sharp; often in fall/winter scents');

-- BRANDS
INSERT INTO ecommerce.brands (brand_id, name, description, image_url) VALUES
(default, 'Dior', 'Christian Dior is a luxury fashion house known for iconic fragrances.', 'https://assets-us-01.kc-usercontent.com/9e9a95c0-1d15-00d5-e878-50f070203f13/0ea56f82-5538-4ede-bb6a-f03edb8f5f6a/dior-couture-logo-2.jpg'),
(default, 'Chanel', 'Chanel is a French luxury brand with legendary perfumes.', 'https://upload.wikimedia.org/wikipedia/en/thumb/9/92/Chanel_logo_interlocking_cs.svg/1200px-Chanel_logo_interlocking_cs.svg.png'),
(default, 'Creed', 'Creed is a niche perfume house with historic roots.', 'https://m.media-amazon.com/images/I/61BybqC2fUL._UF894,1000_QL80_.jpg'),
(default, 'Yves Saint Laurent', 'YSL creates fashion-forward fragrances.', 'https://yslculc.wordpress.com/wp-content/uploads/2015/07/yves-saint-laurent-logo-vector.png'),
(default, 'Tom Ford', 'Tom Ford designs luxurious, bold scents.', 'https://www.degruchys.com/media/6147/tom-ford-logo.png');

-- PRODUCTS
INSERT INTO ecommerce.products (product_id, name, description, brand_id, price, image_url, stock_quantity, category_id) VALUES
(default, 'Dior Sauvage', 'Fresh, spicy and woody fragrance for men.', 1, 110.00, 'https://parisgallery.ae/cdn/shop/products/214733926_IN.jpg', 50, 1),
(default, 'Chanel No. 5', 'Classic floral fragrance for women.', 2, 130.00, 'https://www.chanel.com/images//t_one//w_0.51,h_0.51,c_crop/q_auto:good,f_autoplus,fl_lossy,dpr_1.1/w_1020/n-5-eau-de-parfum-spray-3-4fl-oz--packshot-default-125530-9564912943134.jpg', 40, 2),
(default, 'Creed Aventus', 'Fruity, smoky fragrance for men.', 3, 345.00, 'https://glam42.co.il/cdn/shop/products/creed-aventus-edp-100ml-21435502526618.jpg', 20, 1),
(default, 'YSL Black Opium', 'Sweet, coffee-flavored women’s perfume.', 4, 125.00, 'https://img.ksp.co.il/item/41848/b_5.jpg', 35, 2),
(default, 'Tom Ford Oud Wood', 'Rich, woody unisex fragrance.', 5, 250.00, 'https://kolboyehuda.co.il/wp-content/uploads/2021/11/1229-bwsm-ywnysqs-twm-pwrd-wd-wwd-dp-50-ml-Tom-Ford-Oud-Wood-Eau-De-Parfum-50-Ml.jpg', 30, 3);


-- CART
-- INSERT INTO ecommerce.cart (user_id, product_id, quantity) VALUES
-- (2, 2, 1),
-- (2, 5, 2);

-- select * from ecommerce.orders
-- -- REVIEWS
-- INSERT INTO ecommerce.reviews (review_id, user_id, product_id, rating, comment, created_at) VALUES
-- (default, 1, 1, 5, 'Amazing fragrance, long-lasting!', '2023-06-05'),
-- (default, 2, 3, 4, 'Smells great but a bit pricey.', '2023-06-06');

-- -- SELECT setval('ecommerce.users_user_id_seq', (SELECT MAX(user_id) FROM ecommerce.users));

select * from ecommerce.users;