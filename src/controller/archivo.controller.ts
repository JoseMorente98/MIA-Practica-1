import { Response } from 'express';
import MySQL from '../mysql/mysq';
const fs = require("fs");
const path = require("path");
const csv = require("csvtojson");

export default class ArchivoController {
    private static _instance: ArchivoController;

    constructor() {
    }

    public static getInstance() {
        return this._instance || ( this._instance = new this() );
    }

    read = async (req: any, res: Response) => {
        if (!req.files || Object.keys(req.files).length === 0) {
            return res.send({
                status: false,
                message: 'No file uploaded'
            });
        }
        let archivo = req.files.archivo;

        archivo = req.files.archivo.data.toString('utf8');


        return csv({
            trim:true,
            delimiter: ";"
        })
        .fromString(archivo)
        .then((jsonObj:any)=>{
            console.log(jsonObj);
            return res.status(201).json(jsonObj)
        })

    }

    cargarTemporal = async (req: any, res: Response) => {
        const query = `
            LOAD DATA INFILE '/var/lib/mysql-files/DataCenterData.csv'
            into table CargaMasiva
            character set latin1
            fields terminated by ';'
            lines terminated by '\r\n'
            ignore 1 lines
            (nombre_compania, contacto_compania, correo_compania,
            telefono_compania, tipo, nombre, correo, telefono, 
            @var1, direccion, ciudad, codigo_postal, region, 
            producto, categoria_producto, cantidad, precio_unitario)
            set fecha_registro = str_to_date(@var1, '%d/%m/%Y');
        `;

        MySQL.getQuery(query, (err:any, data:Object[]) => {
            if(err) {
                res.status(400).json({
                    ok: false,
                    status: 400,
                    error: err
                });
            } else {
                res.json({
                    ok: true,
                    status: 200,
                    data: "Tabla Temporal cargado exitosamente :D"
                });
            }
        })
    }

    eliminarTemporal = async (req: any, res: Response) => {
        const query = `
            DELETE FROM CargaMasiva;
        `;

        MySQL.getQuery(query, (err:any, data:Object[]) => {
            if(err) {
                res.status(400).json({
                    ok: false,
                    status: 400,
                    error: err
                });
            } else {
                res.json({
                    ok: true,
                    status: 200,
                    data: "Datos eliminados exitosamente :D"
                });
            }
        })
    }

    cargarModelo = async (req: any, res: Response) => {
        const query = `
            CALL SP_LlenarModelo();
        `;

        MySQL.getQuery(query, (err:any, data:Object[]) => {
            if(err) {
                res.status(400).json({
                    ok: false,
                    status: 400,
                    error: err
                });
            } else {
                res.json({
                    ok: true,
                    status: 200,
                    data: "Modelos cargados exitosamente :D"
                });
            }
        })
    }

    eliminarModelo = async (req: any, res: Response) => {
        const query = `
            CALL SP_EliminarDatos();
        `;

        MySQL.getQuery(query, (err:any, data:Object[]) => {
            if(err) {
                res.status(400).json({
                    ok: false,
                    status: 400,
                    error: err
                });
            } else {
                res.json({
                    ok: true,
                    status: 200,
                    data: "Datos eliminados exitosamente :D"
                });
            }
        })
    }

    getAll = async (req: any, res: Response) => {
        const query = `
            SELECT * FROM CargaMasiva;
        `;

        let body = {
            idForo : req.params.id
        }

        MySQL.getQuery(query, (err:any, data:Object[]) => {
            if(err) {
                res.status(400).json({
                    ok: false,
                    status: 400,
                    error: err
                });
            } else {
                res.json(data)
            }
        })

    }

    getReporte1 = async (req: any, res: Response) => {
        const query = `
            SELECT compra AS 'idCompra', Proveedor.nombre, Proveedor.telefono, SUM(subtotal) as 'total' FROM DetalleCompra
            INNER JOIN Compra ON DetalleCompra.compra = Compra.id
            INNER JOIN Proveedor ON Compra.proveedor = Proveedor.id
            GROUP BY compra
            ORDER BY total DESC
            LIMIT 1;
        `;

        let body = {
            idForo : req.params.id
        }

        MySQL.getQuery(query, (err:any, data:Object[]) => {
            if(err) {
                res.status(400).json({
                    ok: false,
                    status: 400,
                    error: err
                });
            } else {
                res.json(data)
            }
        })

    }

    getReporte2 = async (req: any, res: Response) => {
        const query = `
            SELECT TablaTemporal.idCliente, TablaTemporal.cliente, SUM(TablaTemporal.cantidad) AS 'cantidad', SUM(TablaTemporal.total) as 'total'
            FROM (SELECT SUM(cantidad) AS cantidad, SUM(subtotal) AS total, Cliente.nombre AS cliente, Cliente.id AS 'idCliente' FROM DetalleOrden
            INNER JOIN Orden ON DetalleOrden.orden = Orden.id
            INNER JOIN Cliente ON Orden.cliente = Cliente.id
            GROUP BY orden
            ORDER BY total DESC) AS TablaTemporal
            GROUP BY cliente, idCliente
            ORDER BY cantidad DESC
            LIMIT 1;
        `;

        let body = {
            idForo : req.params.id
        }

        MySQL.getQuery(query, (err:any, data:Object[]) => {
            if(err) {
                res.status(400).json({
                    ok: false,
                    status: 400,
                    error: err
                });
            } else {
                res.json(data)
            }
        })

    }

    getReporte3 = async (req: any, res: Response) => {
        const query = `
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
        `;

        let body = {
            idForo : req.params.id
        }

        MySQL.getQuery(query, (err:any, data:Object[]) => {
            if(err) {
                res.status(400).json({
                    ok: false,
                    status: 400,
                    error: err
                });
            } else {
                res.json(data)
            }
        })

    }

    getReporte4 = async (req: any, res: Response) => {
        const query = `
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
        `;

        let body = {
            idForo : req.params.id
        }

        MySQL.getQuery(query, (err:any, data:Object[]) => {
            if(err) {
                res.status(400).json({
                    ok: false,
                    status: 400,
                    error: err
                });
            } else {
                res.json(data)
            }
        })

    }

    getReporte5 = async (req: any, res: Response) => {
        const query = `
            SELECT TablaTemporal.cliente, TablaTemporal.fecha_registro, SUM(TablaTemporal.cantidad) AS 'cantidad', SUM(TablaTemporal.total) as 'total'
            FROM (SELECT SUM(cantidad) AS cantidad, SUM(subtotal) as total, Cliente.nombre as cliente, Cliente.fecha_registro  FROM DetalleOrden
            INNER JOIN Orden ON DetalleOrden.orden = Orden.id
            INNER JOIN Cliente ON Orden.cliente = Cliente.id
            GROUP BY orden
            ORDER BY total DESC) AS TablaTemporal
            GROUP BY cliente, fecha_registro
            ORDER BY total DESC;
        `;

        let body = {
            idForo : req.params.id
        }

        MySQL.getQuery(query, (err:any, data:Object[]) => {
            if(err) {
                res.status(400).json({
                    ok: false,
                    status: 400,
                    error: err
                });
            } else {
                res.json(data)
            }
        })

    }

    getReporte6 = async (req: any, res: Response) => {
        const query = `
            SELECT categoria_producto, SUM(cantidad) AS cantidad, SUM(subtotal) AS total FROM 
            (SELECT DetalleOrden.subtotal, Producto.producto, Categoria.categoria_producto,
            DetalleOrden.cantidad FROM DetalleOrden
            INNER JOIN Orden ON DetalleOrden.orden = Orden.id
            INNER JOIN Producto ON DetalleOrden.producto = Producto.id
            INNER JOIN Categoria ON Producto.categoria = Categoria.id) AS TablaTemporal
            GROUP BY categoria_producto
            ORDER BY total DESC;
        `;

        let body = {
            idForo : req.params.id
        }

        MySQL.getQuery(query, (err:any, data:Object[]) => {
            if(err) {
                res.status(400).json({
                    ok: false,
                    status: 400,
                    error: err
                });
            } else {
                res.json(data)
            }
        })

    }

    getReporte7 = async (req: any, res: Response) => {
        const query = `
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
        `;

        let body = {
            idForo : req.params.id
        }

        MySQL.getQuery(query, (err:any, data:Object[]) => {
            if(err) {
                res.status(400).json({
                    ok: false,
                    status: 400,
                    error: err
                });
            } else {
                res.json(data)
            }
        })

    }

    getReporte8 = async (req: any, res: Response) => {
        const query = `
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
        `;

        let body = {
            idForo : req.params.id
        }

        MySQL.getQuery(query, (err:any, data:Object[]) => {
            if(err) {
                res.status(400).json({
                    ok: false,
                    status: 400,
                    error: err
                });
            } else {
                res.json(data)
            }
        })

    }

    getReporte9 = async (req: any, res: Response) => {
        const query = `
            SELECT * FROM (SELECT DetalleCompra.compra AS idCompra, SUM(DetalleCompra.cantidad) AS cantidad, 
            SUM(DetalleCompra.subtotal) AS total, Proveedor.nombre,
            Proveedor.telefono FROM DetalleCompra
            INNER JOIN Compra ON DetalleCompra.compra = Compra.id
            INNER JOIN Proveedor ON Compra.proveedor = Proveedor.id
            GROUP BY compra
            ORDER BY cantidad, idCompra ASC
            ) AS TablaTemporal
            WHERE cantidad IN (SELECT MIN(cantidad) FROM DetalleCompra);
        `;

        let body = {
            idForo : req.params.id
        }

        MySQL.getQuery(query, (err:any, data:Object[]) => {
            if(err) {
                res.status(400).json({
                    ok: false,
                    status: 400,
                    error: err
                });
            } else {
                res.json(data)
            }
        })

    }

    getReporte10 = async (req: any, res: Response) => {
        const query = `
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
        `;

        let body = {
            idForo : req.params.id
        }

        MySQL.getQuery(query, (err:any, data:Object[]) => {
            if(err) {
                res.status(400).json({
                    ok: false,
                    status: 400,
                    error: err
                });
            } else {
                res.json(data)
            }
        })

    }

}