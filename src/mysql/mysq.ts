import mysql = require('mysql');

export default class MySQL {
    private static _instance: MySQL;

    connection: mysql.Connection;
    state: boolean = false;

    constructor() {
        console.log("MYSQL Inicializada");
        this.connection = mysql.createConnection({
            host     : 'localhost',
            user     : 'root',
            password : '12345',
            database : 'Practica1'
        });
        this.conectarDB();
    }

    public static getInstance() {
        return this._instance || ( this._instance = new this() );
    }

    static getQuery(query:string, callback:any) {
        this.getInstance().connection.query(query, (err, results: Object[], fields) => {
            if(err) {
                console.log("Error en Query D:");
                console.log(err);
                return callback(err); 
            }

            if(results.length === 0) {
                callback("El registro solicitado no existe")
            } else {
                callback(null, results);
            }
        })
    }

    static sendQuery(query:string, data:any, callback:any) {
        console.log(data)
        this.getInstance().connection.query(query, data, (err, results: Object[], fields) => {
            if (err) throw err;

            if(results.length === 0) {
                callback("El registro solicitado no existe")
            } else {
                callback(null, results);
            }
        })
    }

    private conectarDB() {
        this.connection.connect((err: mysql.MysqlError) => {
            if(err) {
                console.log(err.message);
                return;
            }
            this.state = true;
            console.log("Conectado DB :D");
        });        
    }
    
}