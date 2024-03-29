-- DROP IF EXIST DATABASE
DROP DATABASE IF EXISTS Practica1;

-- CREATE DATABASE
CREATE DATABASE Practica1;

-- USE DATABASE
USE Practica1;

-- TABLA TEMPORAL
CREATE TABLE CargaMasiva(
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    nombre_compania VARCHAR(500) NOT NULL,
    contacto_compania VARCHAR(500) NOT NULL,
    correo_compania VARCHAR(500) NOT NULL,
    telefono_compania VARCHAR(500) NOT NULL,
    telefono VARCHAR(500) NOT NULL,
    tipo VARCHAR(500) NOT NULL,
    nombre VARCHAR(500) NOT NULL,
    correo VARCHAR(500) NOT NULL,
    fecha_registro DATE,
    direccion VARCHAR(500) NOT NULL,
    ciudad VARCHAR(500) NOT NULL,
    codigo_postal INT NOT NULL,
    region VARCHAR(500) NOT NULL,
    producto VARCHAR(500) NOT NULL,
    categoria_producto VARCHAR(500) NOT NULL,
    cantidad INT NOT NULL,
    precio_unitario DECIMAL(9,2) NOT NULL
);

-- TABLA COMPANIA
CREATE TABLE Compania(
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    nombre_compania VARCHAR(500) NOT NULL,
    contacto_compania VARCHAR(500) NOT NULL,
    correo_compania VARCHAR(500) NOT NULL,
    telefono_compania VARCHAR(500) NOT NULL
);

-- TABLA REGION
CREATE TABLE Region(
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    region VARCHAR(500) NOT NULL
);

-- TABLA CIUDAD
CREATE TABLE Ciudad(
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    ciudad VARCHAR(500) NOT NULL,
    region INT NOT NULL,
    FOREIGN KEY (region) REFERENCES Region(id)
	ON UPDATE CASCADE
    ON DELETE CASCADE
);

-- TABLA USUARIO
CREATE TABLE Cliente(
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(500) NOT NULL,
    correo VARCHAR(500) NOT NULL,
    telefono VARCHAR(500) NOT NULL,
    tipo VARCHAR(1) NOT NULL,
    fecha_registro DATE
);

-- TABLA USUARIO
CREATE TABLE Proveedor(
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(500) NOT NULL,
    correo VARCHAR(500) NOT NULL,
    telefono VARCHAR(500) NOT NULL,
    tipo VARCHAR(1) NOT NULL,
    fecha_registro DATE
);

-- DIRECCION
CREATE TABLE Direccion(
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    direccion VARCHAR(500) NOT NULL,
    codigo_postal INT NOT NULL,
    ciudad INT NOT NULL,
    cliente INT NULL,
    proveedor INT NULL,
    FOREIGN KEY (ciudad) REFERENCES Ciudad(id)
	ON UPDATE CASCADE
    ON DELETE CASCADE,
    FOREIGN KEY (cliente) REFERENCES Cliente(id)
	ON UPDATE CASCADE
    ON DELETE CASCADE,
    FOREIGN KEY (proveedor) REFERENCES Proveedor(id)
	ON UPDATE CASCADE
    ON DELETE CASCADE
);

-- TABLA CATEGORIA
CREATE TABLE Categoria(
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    categoria_producto VARCHAR(500) NOT NULL
);

-- TABLA PRODUCTO
CREATE TABLE Producto(
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    producto VARCHAR(500) NOT NULL,
    precio_unitario DECIMAL(9,2) NOT NULL,
    categoria INT NOT NULL,
    FOREIGN KEY (categoria) REFERENCES Categoria(id)
	ON UPDATE CASCADE
    ON DELETE CASCADE
);

-- TABLA ORDEN
CREATE TABLE Orden(
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    cliente INT NOT NULL,
    compania INT NOT NULL,
    direccion INT NOT NULL,
    FOREIGN KEY (cliente) REFERENCES Cliente(id)
	ON UPDATE CASCADE
    ON DELETE CASCADE,
    FOREIGN KEY (compania) REFERENCES Compania(id)
	ON UPDATE CASCADE
    ON DELETE CASCADE,
    FOREIGN KEY (direccion) REFERENCES Direccion(id)
	ON UPDATE CASCADE
    ON DELETE CASCADE
);

-- TABLA ORDEN
CREATE TABLE DetalleOrden(
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    cantidad INT NOT NULL,
    producto INT NOT NULL,
    subtotal DECIMAL(9,2) NOT NULL,
    orden INT NOT NULL,
    FOREIGN KEY (producto) REFERENCES Producto(id)
	ON UPDATE CASCADE
    ON DELETE CASCADE,
    FOREIGN KEY (orden) REFERENCES Orden(id)
	ON UPDATE CASCADE
    ON DELETE CASCADE
);

-- TABLA ORDEN
CREATE TABLE Compra(
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    proveedor INT NOT NULL,
    compania INT NOT NULL,
    direccion INT NOT NULL,
    FOREIGN KEY (proveedor) REFERENCES Proveedor(id)
	ON UPDATE CASCADE
    ON DELETE CASCADE,
    FOREIGN KEY (compania) REFERENCES Compania(id)
	ON UPDATE CASCADE
    ON DELETE CASCADE,
    FOREIGN KEY (direccion) REFERENCES Direccion(id)
	ON UPDATE CASCADE
    ON DELETE CASCADE
);

-- TABLA ORDEN
CREATE TABLE DetalleCompra(
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    cantidad INT NOT NULL,
    producto INT NOT NULL,
    subtotal DECIMAL(9,2) NOT NULL,
    compra INT NOT NULL,
    FOREIGN KEY (producto) REFERENCES Producto(id)
	ON UPDATE CASCADE
    ON DELETE CASCADE,
    FOREIGN KEY (compra) REFERENCES Compra(id)
	ON UPDATE CASCADE
    ON DELETE CASCADE
);