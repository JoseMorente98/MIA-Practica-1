"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var server_1 = __importDefault(require("./server/server"));
var mysq_1 = __importDefault(require("./mysql/mysq"));
var bodyParser = require("body-parser");
var PORT = parseInt(process.env.PORT, 10) || 3000;
var fileUpload = require('express-fileupload');
var server = server_1.default.init(PORT);
mysq_1.default.getInstance();
var api = "/api/";
/**
 * FILE UPLOAD
 */
server.app.use(fileUpload());
/**
 * IMPORTACIONES
 */
var archivo_router_1 = __importDefault(require("./router/archivo.router"));
/**
 * HTTP CORS
 */
server.app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type, Authorization');
    if (req.methods == "OPTIONS") {
        res.sendStatus(200);
    }
    else {
        next();
    }
});
server.app.use(bodyParser.json());
server.app.use(bodyParser.urlencoded({ extended: false }));
/**
 * RUTAS
 */
server.app.use(api, archivo_router_1.default);
server.app.post('/upload', function (req, res) {
    console.log(req.files); // the uploaded
    res.json({
        res: "exito",
        status: 200
    });
});
/**
 * INICIA SERVIDOR
 */
server.start(function () {
    console.log("Servidor corriendo en el puerto " + PORT + " :D");
});
