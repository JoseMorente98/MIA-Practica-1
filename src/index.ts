import Server from "./server/server";
import MySQL from "./mysql/mysq";
import bodyParser = require('body-parser');
const PORT: number = parseInt(process.env.PORT as string, 10) || 3000;
const fileUpload = require('express-fileupload');


const server = Server.init(PORT);
MySQL.getInstance();
const api:string = "/api/"

/**
 * FILE UPLOAD
 */
server.app.use(fileUpload());

/**
 * IMPORTACIONES
 */
import archivo from "./router/archivo.router";

/**
 * HTTP CORS
 */
server.app.use((req:any, res:any, next:any) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');  
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type, Authorization');
  if(req.methods == "OPTIONS") {
    res.sendStatus(200);
  } else {
    next();
  }
});

server.app.use(bodyParser.json())
server.app.use(bodyParser.urlencoded({ extended: false }))

/**
 * RUTAS
 */
server.app.use(api, archivo);

server.app.post('/upload', function(req:any, res) {
  console.log(req.files); // the uploaded
  res.json({
    res: "exito",
    status: 200
  })
});

/**
 * INICIA SERVIDOR
 */
server.start(()=> {
  console.log(`Servidor corriendo en el puerto ${PORT} :D`)
});


