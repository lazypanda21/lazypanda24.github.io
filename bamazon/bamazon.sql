DROP DATABASE IF EXISTS bamazon;

CREATE DATABASE bamazon;

USE bamazon;

CREATE TABLE products (
    item_id INT NOT NULL AUTO_INCREMENT,
    product_name VARCHAR(45) NULL,
    department_name VARCHAR (45) NULL,
    price DECIMAL (10,2) NULL,
    stock_quantity INT NULL,
    PRIMARY KEY (item_id)
);

INSERT INTO products (product_name, department_name, price, stock_quantity )
VALUES 
("Samsung TV", "Electronics",1000.00, 100),
("Huawei phone", "Electronics", 750.00, 100),
("Vitamix Power Blender", "Kitchen", 350.00, 100),
("Knife", "Kitchen", 10, 100),
("Facial Mask", "Beauty", 10.00, 100),
("Beauty Blender", "Beauty", 7.00, 100),
("Chair", "Office", 150, 100),
("Desk", "Office", 150, 100),
("Pants", "Clothing", 50, 100),
("Tank Top", "Clothing", 20, 100);

select * from products;
