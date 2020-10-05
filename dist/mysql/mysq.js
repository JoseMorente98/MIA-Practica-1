"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mysql = require("mysql");
var MySQL = /** @class */ (function () {
    function MySQL() {
        this.state = false;
        console.log("MYSQL Inicializada");
        this.connection = mysql.createConnection({
            host: 'localhost',
            user: 'root',
            password: '12345',
            database: 'Practica1'
        });
        this.conectarDB();
    }
    MySQL.getInstance = function () {
        return this._instance || (this._instance = new this());
    };
    MySQL.getQuery = function (query, callback) {
        this.getInstance().connection.query(query, function (err, results, fields) {
            if (err) {
                console.log("Error en Query D:");
                console.log(err);
                return callback(err);
            }
            if (results.length === 0) {
                callback("El registro solicitado no existe");
            }
            else {
                callback(null, results);
            }
        });
    };
    MySQL.sendQuery = function (query, data, callback) {
        console.log(data);
        this.getInstance().connection.query(query, data, function (err, results, fields) {
            if (err)
                throw err;
            if (results.length === 0) {
                callback("El registro solicitado no existe");
            }
            else {
                callback(null, results);
            }
        });
    };
    MySQL.prototype.conectarDB = function () {
        var _this = this;
        this.connection.connect(function (err) {
            if (err) {
                console.log(err.message);
                return;
            }
            _this.state = true;
            console.log("Conectado DB :D");
        });
    };
    return MySQL;
}());
exports.default = MySQL;
