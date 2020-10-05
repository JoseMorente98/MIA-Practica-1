"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var mysq_1 = __importDefault(require("../mysql/mysq"));
var fs = require("fs");
var path = require("path");
var csv = require("csvtojson");
var ArchivoController = /** @class */ (function () {
    function ArchivoController() {
        var _this = this;
        this.read = function (req, res) { return __awaiter(_this, void 0, void 0, function () {
            var archivo;
            return __generator(this, function (_a) {
                if (!req.files || Object.keys(req.files).length === 0) {
                    return [2 /*return*/, res.send({
                            status: false,
                            message: 'No file uploaded'
                        })];
                }
                archivo = req.files.archivo;
                archivo = req.files.archivo.data.toString('utf8');
                return [2 /*return*/, csv({
                        trim: true,
                        delimiter: ";"
                    })
                        .fromString(archivo)
                        .then(function (jsonObj) {
                        console.log(jsonObj);
                        return res.status(201).json(jsonObj);
                    })];
            });
        }); };
        this.cargarTemporal = function (req, res) { return __awaiter(_this, void 0, void 0, function () {
            var query;
            return __generator(this, function (_a) {
                query = "\n            LOAD DATA INFILE '/var/lib/mysql-files/DataCenterData.csv'\n            into table CargaMasiva\n            character set latin1\n            fields terminated by ';'\n            lines terminated by '\r\n'\n            ignore 1 lines\n            (nombre_compania, contacto_compania, correo_compania,\n            telefono_compania, tipo, nombre, correo, telefono, \n            @var1, direccion, ciudad, codigo_postal, region, \n            producto, categoria_producto, cantidad, precio_unitario)\n            set fecha_registro = str_to_date(@var1, '%d/%m/%Y');\n        ";
                mysq_1.default.getQuery(query, function (err, data) {
                    if (err) {
                        res.status(400).json({
                            ok: false,
                            status: 400,
                            error: err
                        });
                    }
                    else {
                        res.json({
                            ok: true,
                            status: 200,
                            data: "Tabla Temporal cargado exitosamente :D"
                        });
                    }
                });
                return [2 /*return*/];
            });
        }); };
        this.eliminarTemporal = function (req, res) { return __awaiter(_this, void 0, void 0, function () {
            var query;
            return __generator(this, function (_a) {
                query = "\n            DELETE FROM CargaMasiva;\n        ";
                mysq_1.default.getQuery(query, function (err, data) {
                    if (err) {
                        res.status(400).json({
                            ok: false,
                            status: 400,
                            error: err
                        });
                    }
                    else {
                        res.json({
                            ok: true,
                            status: 200,
                            data: "Datos eliminados exitosamente :D"
                        });
                    }
                });
                return [2 /*return*/];
            });
        }); };
        this.cargarModelo = function (req, res) { return __awaiter(_this, void 0, void 0, function () {
            var query;
            return __generator(this, function (_a) {
                query = "\n            CALL SP_LlenarModelo();\n        ";
                mysq_1.default.getQuery(query, function (err, data) {
                    if (err) {
                        res.status(400).json({
                            ok: false,
                            status: 400,
                            error: err
                        });
                    }
                    else {
                        res.json({
                            ok: true,
                            status: 200,
                            data: "Modelos cargados exitosamente :D"
                        });
                    }
                });
                return [2 /*return*/];
            });
        }); };
        this.eliminarModelo = function (req, res) { return __awaiter(_this, void 0, void 0, function () {
            var query;
            return __generator(this, function (_a) {
                query = "\n            CALL SP_EliminarDatos();\n        ";
                mysq_1.default.getQuery(query, function (err, data) {
                    if (err) {
                        res.status(400).json({
                            ok: false,
                            status: 400,
                            error: err
                        });
                    }
                    else {
                        res.json({
                            ok: true,
                            status: 200,
                            data: "Datos eliminados exitosamente :D"
                        });
                    }
                });
                return [2 /*return*/];
            });
        }); };
        this.getAll = function (req, res) { return __awaiter(_this, void 0, void 0, function () {
            var query, body;
            return __generator(this, function (_a) {
                query = "\n            SELECT * FROM CargaMasiva;\n        ";
                body = {
                    idForo: req.params.id
                };
                mysq_1.default.getQuery(query, function (err, data) {
                    if (err) {
                        res.status(400).json({
                            ok: false,
                            status: 400,
                            error: err
                        });
                    }
                    else {
                        res.json(data);
                    }
                });
                return [2 /*return*/];
            });
        }); };
        this.getReporte1 = function (req, res) { return __awaiter(_this, void 0, void 0, function () {
            var query, body;
            return __generator(this, function (_a) {
                query = "\n            SELECT compra AS 'idCompra', Proveedor.nombre, Proveedor.telefono, SUM(subtotal) as 'total' FROM DetalleCompra\n            INNER JOIN Compra ON DetalleCompra.compra = Compra.id\n            INNER JOIN Proveedor ON Compra.proveedor = Proveedor.id\n            GROUP BY compra\n            ORDER BY total DESC\n            LIMIT 1;\n        ";
                body = {
                    idForo: req.params.id
                };
                mysq_1.default.getQuery(query, function (err, data) {
                    if (err) {
                        res.status(400).json({
                            ok: false,
                            status: 400,
                            error: err
                        });
                    }
                    else {
                        res.json(data);
                    }
                });
                return [2 /*return*/];
            });
        }); };
        this.getReporte2 = function (req, res) { return __awaiter(_this, void 0, void 0, function () {
            var query, body;
            return __generator(this, function (_a) {
                query = "\n            SELECT TablaTemporal.idCliente, TablaTemporal.cliente, SUM(TablaTemporal.cantidad) AS 'cantidad', SUM(TablaTemporal.total) as 'total'\n            FROM (SELECT SUM(cantidad) AS cantidad, SUM(subtotal) AS total, Cliente.nombre AS cliente, Cliente.id AS 'idCliente' FROM DetalleOrden\n            INNER JOIN Orden ON DetalleOrden.orden = Orden.id\n            INNER JOIN Cliente ON Orden.cliente = Cliente.id\n            GROUP BY orden\n            ORDER BY total DESC) AS TablaTemporal\n            GROUP BY cliente, idCliente\n            ORDER BY cantidad DESC\n            LIMIT 1;\n        ";
                body = {
                    idForo: req.params.id
                };
                mysq_1.default.getQuery(query, function (err, data) {
                    if (err) {
                        res.status(400).json({
                            ok: false,
                            status: 400,
                            error: err
                        });
                    }
                    else {
                        res.json(data);
                    }
                });
                return [2 /*return*/];
            });
        }); };
        this.getReporte3 = function (req, res) { return __awaiter(_this, void 0, void 0, function () {
            var query, body;
            return __generator(this, function (_a) {
                query = "\n            SELECT COUNT(*) AS cantidad, TablaTemporal.region, \n            TablaTemporal.ciudad, TablaTemporal.codigo_postal, TablaTemporal.direccion FROM\n            (SELECT Direccion.direccion, Direccion.codigo_postal, Ciudad.ciudad, Region.region FROM DetalleOrden\n            INNER JOIN Orden ON DetalleOrden.orden = Orden.id\n            INNER JOIN Cliente ON Orden.cliente = Cliente.id\n            INNER JOIN Direccion ON Orden.direccion = Direccion.id\n            INNER JOIN Ciudad ON Direccion.ciudad = Ciudad.id\n            INNER JOIN Region ON Ciudad.region = Region.id\n            GROUP BY orden\n            ORDER BY total DESC) AS TablaTemporal\n            GROUP BY TablaTemporal.region, TablaTemporal.ciudad, TablaTemporal.codigo_postal, TablaTemporal.direccion\n            ORDER BY cantidad DESC;\n        ";
                body = {
                    idForo: req.params.id
                };
                mysq_1.default.getQuery(query, function (err, data) {
                    if (err) {
                        res.status(400).json({
                            ok: false,
                            status: 400,
                            error: err
                        });
                    }
                    else {
                        res.json(data);
                    }
                });
                return [2 /*return*/];
            });
        }); };
        this.getReporte4 = function (req, res) { return __awaiter(_this, void 0, void 0, function () {
            var query, body;
            return __generator(this, function (_a) {
                query = "\n            SELECT TablaTemporal.idCliente, cliente, COUNT(*) AS cantidad, SUM(subtotal) AS total\n            FROM (SELECT Producto.producto, Categoria.categoria_producto,DetalleOrden.id,\n            DetalleOrden.subtotal, Cliente.nombre AS cliente, Cliente.id AS idCliente FROM DetalleOrden\n            INNER JOIN Orden ON DetalleOrden.orden = Orden.id\n            INNER JOIN Cliente ON Orden.cliente = Cliente.id\n            INNER JOIN Producto ON DetalleOrden.producto = Producto.id\n            INNER JOIN Categoria ON Producto.categoria = Categoria.id\n            WHERE Categoria.categoria_producto = \"Cheese\") AS TablaTemporal\n            GROUP BY TablaTemporal.idCliente\n            ORDER BY cantidad DESC\n            LIMIT 5;\n        ";
                body = {
                    idForo: req.params.id
                };
                mysq_1.default.getQuery(query, function (err, data) {
                    if (err) {
                        res.status(400).json({
                            ok: false,
                            status: 400,
                            error: err
                        });
                    }
                    else {
                        res.json(data);
                    }
                });
                return [2 /*return*/];
            });
        }); };
        this.getReporte5 = function (req, res) { return __awaiter(_this, void 0, void 0, function () {
            var query, body;
            return __generator(this, function (_a) {
                query = "\n            SELECT TablaTemporal.cliente, TablaTemporal.fecha_registro, SUM(TablaTemporal.cantidad) AS 'cantidad', SUM(TablaTemporal.total) as 'total'\n            FROM (SELECT SUM(cantidad) AS cantidad, SUM(subtotal) as total, Cliente.nombre as cliente, Cliente.fecha_registro  FROM DetalleOrden\n            INNER JOIN Orden ON DetalleOrden.orden = Orden.id\n            INNER JOIN Cliente ON Orden.cliente = Cliente.id\n            GROUP BY orden\n            ORDER BY total DESC) AS TablaTemporal\n            GROUP BY cliente, fecha_registro\n            ORDER BY total DESC;\n        ";
                body = {
                    idForo: req.params.id
                };
                mysq_1.default.getQuery(query, function (err, data) {
                    if (err) {
                        res.status(400).json({
                            ok: false,
                            status: 400,
                            error: err
                        });
                    }
                    else {
                        res.json(data);
                    }
                });
                return [2 /*return*/];
            });
        }); };
        this.getReporte6 = function (req, res) { return __awaiter(_this, void 0, void 0, function () {
            var query, body;
            return __generator(this, function (_a) {
                query = "\n            SELECT categoria_producto, SUM(cantidad) AS cantidad, SUM(subtotal) AS total FROM \n            (SELECT DetalleOrden.subtotal, Producto.producto, Categoria.categoria_producto,\n            DetalleOrden.cantidad FROM DetalleOrden\n            INNER JOIN Orden ON DetalleOrden.orden = Orden.id\n            INNER JOIN Producto ON DetalleOrden.producto = Producto.id\n            INNER JOIN Categoria ON Producto.categoria = Categoria.id) AS TablaTemporal\n            GROUP BY categoria_producto\n            ORDER BY total DESC;\n        ";
                body = {
                    idForo: req.params.id
                };
                mysq_1.default.getQuery(query, function (err, data) {
                    if (err) {
                        res.status(400).json({
                            ok: false,
                            status: 400,
                            error: err
                        });
                    }
                    else {
                        res.json(data);
                    }
                });
                return [2 /*return*/];
            });
        }); };
        this.getReporte7 = function (req, res) { return __awaiter(_this, void 0, void 0, function () {
            var query, body;
            return __generator(this, function (_a) {
                query = "\n            SELECT TablaTemporal.idProveedor, proveedor, SUM(subtotal) AS total FROM(SELECT Producto.producto, Categoria.categoria_producto,\n            DetalleCompra.subtotal, Proveedor.nombre AS proveedor, Proveedor.id AS idProveedor FROM DetalleCompra\n            INNER JOIN Compra ON DetalleCompra.compra = Compra.id\n            INNER JOIN Proveedor ON Compra.proveedor = Proveedor.id\n            INNER JOIN Producto ON DetalleCompra.producto = Producto.id\n            INNER JOIN Categoria ON Producto.categoria = Categoria.id\n            WHERE Categoria.categoria_producto = \"Fresh Vegetables\") AS TablaTemporal\n            GROUP BY TablaTemporal.idProveedor\n            ORDER BY total DESC\n            LIMIT 5;\n        ";
                body = {
                    idForo: req.params.id
                };
                mysq_1.default.getQuery(query, function (err, data) {
                    if (err) {
                        res.status(400).json({
                            ok: false,
                            status: 400,
                            error: err
                        });
                    }
                    else {
                        res.json(data);
                    }
                });
                return [2 /*return*/];
            });
        }); };
        this.getReporte8 = function (req, res) { return __awaiter(_this, void 0, void 0, function () {
            var query, body;
            return __generator(this, function (_a) {
                query = "\n            SELECT TablaTemporal.cliente, TablaTemporal.direccion, TablaTemporal.codigo_postal, \n            TablaTemporal.ciudad, TablaTemporal.region,\n            SUM(TablaTemporal.cantidad) AS 'cantidad', SUM(TablaTemporal.total) as 'total'\n            FROM (SELECT SUM(cantidad) AS cantidad, SUM(subtotal) as total, \n            Cliente.nombre as cliente, Cliente.fecha_registro, Direccion.direccion, Direccion.codigo_postal, Ciudad.ciudad, Region.region FROM DetalleOrden\n            INNER JOIN Orden ON DetalleOrden.orden = Orden.id\n            INNER JOIN Cliente ON Orden.cliente = Cliente.id\n            INNER JOIN Direccion ON Orden.direccion = Direccion.id\n            INNER JOIN Ciudad ON Direccion.ciudad = Ciudad.id\n            INNER JOIN Region ON Ciudad.region = Region.id\n            GROUP BY orden\n            ORDER BY total DESC) AS TablaTemporal\n            GROUP BY cliente, TablaTemporal.region, TablaTemporal.ciudad, \n            TablaTemporal.codigo_postal, TablaTemporal.direccion\n            ORDER BY total DESC;\n        ";
                body = {
                    idForo: req.params.id
                };
                mysq_1.default.getQuery(query, function (err, data) {
                    if (err) {
                        res.status(400).json({
                            ok: false,
                            status: 400,
                            error: err
                        });
                    }
                    else {
                        res.json(data);
                    }
                });
                return [2 /*return*/];
            });
        }); };
        this.getReporte9 = function (req, res) { return __awaiter(_this, void 0, void 0, function () {
            var query, body;
            return __generator(this, function (_a) {
                query = "\n            SELECT * FROM (SELECT DetalleCompra.compra AS idCompra, SUM(DetalleCompra.cantidad) AS cantidad, \n            SUM(DetalleCompra.subtotal) AS total, Proveedor.nombre,\n            Proveedor.telefono FROM DetalleCompra\n            INNER JOIN Compra ON DetalleCompra.compra = Compra.id\n            INNER JOIN Proveedor ON Compra.proveedor = Proveedor.id\n            GROUP BY compra\n            ORDER BY cantidad, idCompra ASC\n            ) AS TablaTemporal\n            WHERE cantidad IN (SELECT MIN(cantidad) FROM DetalleCompra);\n        ";
                body = {
                    idForo: req.params.id
                };
                mysq_1.default.getQuery(query, function (err, data) {
                    if (err) {
                        res.status(400).json({
                            ok: false,
                            status: 400,
                            error: err
                        });
                    }
                    else {
                        res.json(data);
                    }
                });
                return [2 /*return*/];
            });
        }); };
        this.getReporte10 = function (req, res) { return __awaiter(_this, void 0, void 0, function () {
            var query, body;
            return __generator(this, function (_a) {
                query = "\n            SELECT TablaTemporal.idCliente, cliente, COUNT(*) AS cantidad \n            FROM (SELECT Producto.producto, Categoria.categoria_producto,\n            DetalleOrden.subtotal, Cliente.nombre AS cliente, Cliente.id AS idCliente FROM DetalleOrden\n            INNER JOIN Orden ON DetalleOrden.orden = Orden.id\n            INNER JOIN Cliente ON Orden.cliente = Cliente.id\n            INNER JOIN Producto ON DetalleOrden.producto = Producto.id\n            INNER JOIN Categoria ON Producto.categoria = Categoria.id\n            WHERE Categoria.categoria_producto = \"Seafood\") AS TablaTemporal\n            GROUP BY TablaTemporal.idCliente\n            ORDER BY cantidad DESC, idCliente ASC\n            LIMIT 10;\n        ";
                body = {
                    idForo: req.params.id
                };
                mysq_1.default.getQuery(query, function (err, data) {
                    if (err) {
                        res.status(400).json({
                            ok: false,
                            status: 400,
                            error: err
                        });
                    }
                    else {
                        res.json(data);
                    }
                });
                return [2 /*return*/];
            });
        }); };
    }
    ArchivoController.getInstance = function () {
        return this._instance || (this._instance = new this());
    };
    return ArchivoController;
}());
exports.default = ArchivoController;
