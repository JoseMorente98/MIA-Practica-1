import { Router } from "express";
import ArchivoController from "./../controller/archivo.controller"
const archivo = Router();

archivo.post('/cargarTemporal', ArchivoController.getInstance().cargarTemporal);
archivo.post('/cargarModelo', ArchivoController.getInstance().cargarModelo);
archivo.delete('/eliminarTemporal', ArchivoController.getInstance().eliminarTemporal);
archivo.delete('/eliminarModelo', ArchivoController.getInstance().eliminarModelo);
archivo.get('/showTemporal', ArchivoController.getInstance().getAll);
archivo.get('/consulta1', ArchivoController.getInstance().getReporte1);
archivo.get('/consulta2', ArchivoController.getInstance().getReporte2);
archivo.get('/consulta3', ArchivoController.getInstance().getReporte3);
archivo.get('/consulta4', ArchivoController.getInstance().getReporte4);
archivo.get('/consulta5', ArchivoController.getInstance().getReporte5);
archivo.get('/consulta6', ArchivoController.getInstance().getReporte6);
archivo.get('/consulta7', ArchivoController.getInstance().getReporte7);
archivo.get('/consulta8', ArchivoController.getInstance().getReporte8);
archivo.get('/consulta9', ArchivoController.getInstance().getReporte9);
archivo.get('/consulta10', ArchivoController.getInstance().getReporte10);

export default archivo;