-- USE DATABASE
USE Practica1;

-- SP LLENAR MODELOS
DELIMITER $$
CREATE PROCEDURE SP_LlenarModelo()
BEGIN	
    -- INGRESAR REGIONES
    INSERT INTO Region(region) 
    SELECT region FROM CargaMasiva GROUP BY region;

    -- INGRESAR CIUDADES
    INSERT INTO Ciudad(ciudad, region)
    SELECT DISTINCT ciudad, Region.id FROM CargaMasiva 
    INNER JOIN Region ON CargaMasiva.region = Region.region;

    -- INGRESAR COMPANIA
    INSERT INTO Compania(nombre_compania, contacto_compania, correo_compania, telefono_compania)
    SELECT DISTINCT nombre_compania, contacto_compania, correo_compania, telefono_compania FROM CargaMasiva;

    -- INGRESAR CATEGORIAS
    INSERT INTO Categoria(categoria_producto)
    SELECT categoria_producto FROM CargaMasiva GROUP BY categoria_producto;

    -- INGRESAR PRODUCTOS
    INSERT INTO Producto(producto, precio_unitario, categoria)
    SELECT DISTINCT producto, precio_unitario, Categoria.id  FROM CargaMasiva 
    JOIN Categoria ON CargaMasiva.categoria_producto = Categoria.categoria_producto;

    -- INGRESAR CLIENTES
    INSERT INTO Cliente(nombre, correo, telefono, fecha_registro, tipo)
    SELECT DISTINCT nombre, correo, telefono, fecha_registro, tipo FROM CargaMasiva 
    WHERE tipo = "C";

    -- INGRESAR PROVEEDORES
    INSERT INTO Proveedor(nombre, correo, telefono, fecha_registro, tipo)
    SELECT DISTINCT nombre, correo, telefono, fecha_registro, tipo FROM CargaMasiva 
    WHERE tipo = "P";

    -- INGRESAR DIRECCIONES CLIENTE
    INSERT INTO Direccion(direccion, codigo_postal, ciudad, cliente)
    SELECT DISTINCT direccion, codigo_postal, Ciudad.id as 'idCiudad', Cliente.id as 'idCliente' FROM CargaMasiva 
    JOIN Ciudad ON CargaMasiva.ciudad = Ciudad.ciudad
    JOIN Cliente ON CargaMasiva.correo = Cliente.correo
    WHERE CargaMasiva.tipo = "C";

    -- INGRESAR DIRECCIONES PROVEEDORES
    INSERT INTO Direccion(direccion, codigo_postal, ciudad, proveedor)
    SELECT DISTINCT direccion, codigo_postal, Ciudad.id as 'idCiudad', Proveedor.id as 'idProveedor' FROM CargaMasiva 
    JOIN Ciudad ON CargaMasiva.ciudad = Ciudad.ciudad
    JOIN Proveedor ON CargaMasiva.correo = Proveedor.correo
    WHERE CargaMasiva.tipo = "P";

    -- INGRESAR ORDEN
    INSERT INTO Orden(compania, direccion, cliente)
    SELECT DISTINCT Compania.id as 'idCompania',  Direccion.id as 'idDireccion', Cliente.id as 'idCliente' FROM CargaMasiva 
    JOIN Cliente ON CargaMasiva.correo = Cliente.correo
    JOIN Compania ON CargaMasiva.nombre_compania = Compania.nombre_compania
    JOIN Direccion ON Cliente.id = Direccion.cliente
    WHERE CargaMasiva.tipo = "C";

    -- INGRESAR COMPRA
    INSERT INTO Compra(compania, direccion, proveedor)
    SELECT DISTINCT Compania.id as 'idCompania', Direccion.id as 'idDireccion', Proveedor.id as 'idProveedor' FROM CargaMasiva 
    JOIN Proveedor ON CargaMasiva.correo = Proveedor.correo
    JOIN Compania ON CargaMasiva.nombre_compania = Compania.nombre_compania
    JOIN Direccion ON Proveedor.id = Direccion.proveedor
    WHERE CargaMasiva.tipo = "P";

    -- INGRESAR DETALLE ORDEN
    INSERT INTO DetalleOrden(cantidad, producto, subtotal, orden)
    SELECT CargaMasiva.cantidad, Producto.id as 'idProducto',
    CargaMasiva.cantidad * CargaMasiva.precio_unitario AS 'subtotal', Orden.id as 'idOrden' FROM CargaMasiva 
    JOIN Cliente ON CargaMasiva.correo = Cliente.correo
    JOIN Producto ON CargaMasiva.producto = Producto.producto
    JOIN Compania ON CargaMasiva.nombre_compania = Compania.nombre_compania
    JOIN Direccion ON Cliente.id = Direccion.cliente
    JOIN Orden ON Orden.cliente = Cliente.id AND Orden.compania = Compania.id AND Orden.direccion = Direccion.id 
    WHERE CargaMasiva.tipo = "C";

    -- INGRESAR DETALLE ORDEN
    INSERT INTO DetalleCompra(cantidad, producto, subtotal, compra)
    SELECT CargaMasiva.cantidad, Producto.id as 'idProducto',
    CargaMasiva.cantidad * CargaMasiva.precio_unitario AS 'subtotal', Compra.id as 'idCompra' FROM CargaMasiva 
    JOIN Proveedor ON CargaMasiva.correo = Proveedor.correo
    JOIN Producto ON CargaMasiva.producto = Producto.producto
    JOIN Compania ON CargaMasiva.nombre_compania = Compania.nombre_compania
    JOIN Direccion ON Proveedor.id = Direccion.proveedor
    JOIN Compra ON Compra.proveedor = Proveedor.id AND Compra.compania = Compania.id AND Compra.direccion = Direccion.id 
    WHERE CargaMasiva.tipo = "P";

END;
$$

-- SP ELIMINAR MODELOS
DELIMITER $$
CREATE PROCEDURE SP_EliminarDatos()
BEGIN	
    -- INGRESAR REGIONES
    DELETE FROM Region;

    -- INGRESAR REGIONES
    DELETE FROM Ciudad;

    -- INGRESAR REGIONES
    DELETE FROM Direccion;

    -- INGRESAR REGIONES
    DELETE FROM Cliente;

    -- INGRESAR REGIONES
    DELETE FROM Proveedor;

    -- INGRESAR REGIONES
    DELETE FROM Compania;

    -- INGRESAR REGIONES
    DELETE FROM Categoria;

    -- INGRESAR REGIONES
    DELETE FROM Producto;

    -- INGRESAR REGIONES
    DELETE FROM Orden;

    -- INGRESAR REGIONES
    DELETE FROM Compra;

    -- INGRESAR REGIONES
    DELETE FROM DetalleCompra;

    -- INGRESAR REGIONES
    DELETE FROM DetalleOrden;

END;
$$

-- EJECUTAR SP LLENAR MODELO
CALL SP_LlenarModelo();

-- EJECUTAR SP LLENAR MODELO
CALL SP_EliminarDatos();