-- USE DATABASE
USE Practica1;

-- REPORTE 1
SELECT compra AS 'noCompra', Proveedor.nombre, Proveedor.telefono, SUM(subtotal) as 'total' FROM DetalleCompra
INNER JOIN Compra ON DetalleCompra.compra = Compra.id
INNER JOIN Proveedor ON Compra.proveedor = Proveedor.id
GROUP BY compra
ORDER BY total DESC
LIMIT 1;

-- REPORTE 2
SELECT TablaTemporal.idCliente, TablaTemporal.cliente, SUM(TablaTemporal.cantidad) AS 'cantidad', SUM(TablaTemporal.total) as 'total'
FROM (SELECT SUM(cantidad) AS cantidad, SUM(subtotal) AS total, Cliente.nombre AS cliente, Cliente.id AS 'idCliente' FROM DetalleOrden
INNER JOIN Orden ON DetalleOrden.orden = Orden.id
INNER JOIN Cliente ON Orden.cliente = Cliente.id
GROUP BY orden
ORDER BY total DESC) AS TablaTemporal
GROUP BY cliente, idCliente
ORDER BY cantidad DESC
LIMIT 1;

-- REPORTE 3
SELECT COUNT(*) AS cantidad, TablaTemporal.region, 
TablaTemporal.ciudad, TablaTemporal.codigo_postal, TablaTemporal.direccion FROM
(SELECT Direccion.direccion, Direccion.codigo_postal, Ciudad.ciudad, Region.region FROM DetalleOrden
INNER JOIN Orden ON DetalleOrden.orden = Orden.id
INNER JOIN Cliente ON Orden.cliente = Cliente.id
INNER JOIN Direccion ON Orden.direccion = Direccion.id
INNER JOIN Ciudad ON Direccion.ciudad = Ciudad.id
INNER JOIN Region ON Ciudad.region = Region.id
GROUP BY orden
ORDER BY total DESC) AS TablaTemporal
GROUP BY TablaTemporal.region, TablaTemporal.ciudad, TablaTemporal.codigo_postal, TablaTemporal.direccion
ORDER BY cantidad DESC;

-- REPORTE 4
SELECT TablaTemporal.idCliente, cliente, COUNT(*) AS cantidad, SUM(subtotal) AS total
 FROM (SELECT Producto.producto, Categoria.categoria_producto,DetalleOrden.id,
DetalleOrden.subtotal, Cliente.nombre AS cliente, Cliente.id AS idCliente FROM DetalleOrden
INNER JOIN Orden ON DetalleOrden.orden = Orden.id
INNER JOIN Cliente ON Orden.cliente = Cliente.id
INNER JOIN Producto ON DetalleOrden.producto = Producto.id
INNER JOIN Categoria ON Producto.categoria = Categoria.id
WHERE Categoria.categoria_producto = "Cheese") AS TablaTemporal
GROUP BY TablaTemporal.idCliente
ORDER BY cantidad DESC
LIMIT 5;

-- REPORTE 5
SELECT TablaTemporal.cliente, TablaTemporal.fecha_registro, SUM(TablaTemporal.cantidad) AS 'cantidad', SUM(TablaTemporal.total) as 'total'
FROM (SELECT SUM(cantidad) AS cantidad, SUM(subtotal) as total, Cliente.nombre as cliente, Cliente.fecha_registro  FROM DetalleOrden
INNER JOIN Orden ON DetalleOrden.orden = Orden.id
INNER JOIN Cliente ON Orden.cliente = Cliente.id
GROUP BY orden
ORDER BY total DESC) AS TablaTemporal
GROUP BY cliente, fecha_registro
ORDER BY total DESC;

-- REPORTE 6
SELECT categoria_producto, SUM(cantidad) AS cantidad, SUM(subtotal) AS total FROM 
(SELECT DetalleOrden.subtotal, Producto.producto, Categoria.categoria_producto,
DetalleOrden.cantidad FROM DetalleOrden
INNER JOIN Orden ON DetalleOrden.orden = Orden.id
INNER JOIN Producto ON DetalleOrden.producto = Producto.id
INNER JOIN Categoria ON Producto.categoria = Categoria.id) AS TablaTemporal
GROUP BY categoria_producto
ORDER BY total DESC;

-- REPORTE 7
SELECT TablaTemporal.idProveedor, proveedor, SUM(subtotal) AS total FROM(SELECT Producto.producto, Categoria.categoria_producto,
DetalleCompra.subtotal, Proveedor.nombre AS proveedor, Proveedor.id AS idProveedor FROM DetalleCompra
INNER JOIN Compra ON DetalleCompra.compra = Compra.id
INNER JOIN Proveedor ON Compra.proveedor = Proveedor.id
INNER JOIN Producto ON DetalleCompra.producto = Producto.id
INNER JOIN Categoria ON Producto.categoria = Categoria.id
WHERE Categoria.categoria_producto = "Fresh Vegetables") AS TablaTemporal
GROUP BY TablaTemporal.idProveedor
ORDER BY total DESC
LIMIT 5;

-- REPORTE 8
SELECT SUM(TablaTemporal.cantidad) AS cantidad, TablaTemporal.region, 
TablaTemporal.ciudad, TablaTemporal.codigo_postal, TablaTemporal.direccion FROM 
(SELECT SUM(subtotal) AS cantidad,
Direccion.direccion, Direccion.codigo_postal, Ciudad.ciudad, Region.region FROM DetalleOrden
INNER JOIN Orden ON DetalleOrden.orden = Orden.id
INNER JOIN Cliente ON Orden.cliente = Cliente.id
INNER JOIN Direccion ON Orden.direccion = Direccion.id
INNER JOIN Ciudad ON Direccion.ciudad = Ciudad.id
INNER JOIN Region ON Ciudad.region = Region.id
GROUP BY orden
ORDER BY total DESC) AS TablaTemporal
GROUP BY TablaTemporal.region, TablaTemporal.ciudad, TablaTemporal.codigo_postal, TablaTemporal.direccion
ORDER BY cantidad DESC;

-- REPORTE 8.1
SELECT TablaTemporal.cliente, TablaTemporal.direccion, TablaTemporal.codigo_postal, 
TablaTemporal.ciudad, TablaTemporal.region,
SUM(TablaTemporal.cantidad) AS 'cantidad', SUM(TablaTemporal.total) as 'total'
FROM (SELECT SUM(cantidad) AS cantidad, SUM(subtotal) as total, 
Cliente.nombre as cliente, Cliente.fecha_registro, Direccion.direccion, Direccion.codigo_postal, Ciudad.ciudad, Region.region FROM DetalleOrden
INNER JOIN Orden ON DetalleOrden.orden = Orden.id
INNER JOIN Cliente ON Orden.cliente = Cliente.id
INNER JOIN Direccion ON Orden.direccion = Direccion.id
INNER JOIN Ciudad ON Direccion.ciudad = Ciudad.id
INNER JOIN Region ON Ciudad.region = Region.id
GROUP BY orden
ORDER BY total DESC) AS TablaTemporal
GROUP BY cliente, TablaTemporal.region, TablaTemporal.ciudad, 
TablaTemporal.codigo_postal, TablaTemporal.direccion
ORDER BY total DESC;

-- REPORTE 9
SELECT * FROM (SELECT DetalleCompra.compra AS idCompra, SUM(DetalleCompra.cantidad) AS cantidad, 
SUM(DetalleCompra.subtotal) AS total, Proveedor.nombre,
Proveedor.telefono FROM DetalleCompra
INNER JOIN Compra ON DetalleCompra.compra = Compra.id
INNER JOIN Proveedor ON Compra.proveedor = Proveedor.id
GROUP BY compra
ORDER BY cantidad, idCompra ASC
) AS TablaTemporal
WHERE cantidad IN (SELECT MIN(cantidad) FROM DetalleCompra);

-- REPORTE 10
SELECT TablaTemporal.idCliente, cliente, COUNT(*) AS cantidad 
FROM (SELECT Producto.producto, Categoria.categoria_producto,
DetalleOrden.subtotal, Cliente.nombre AS cliente, Cliente.id AS idCliente FROM DetalleOrden
INNER JOIN Orden ON DetalleOrden.orden = Orden.id
INNER JOIN Cliente ON Orden.cliente = Cliente.id
INNER JOIN Producto ON DetalleOrden.producto = Producto.id
INNER JOIN Categoria ON Producto.categoria = Categoria.id
WHERE Categoria.categoria_producto = "Seafood") AS TablaTemporal
GROUP BY TablaTemporal.idCliente
ORDER BY cantidad DESC, idCliente ASC
LIMIT 10;