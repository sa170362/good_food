import express from 'express';
import { RestoranController } from '../controllers/restoran.controller';

const restoranRouter = express.Router();
const restoranController = new RestoranController();

// Definicija ruta za REST API operacije nad restoranima
restoranRouter.get('/restorani', restoranController.getAllRestorani);

// Dodajte ostale rute za dodavanje, brisanje, izmenu restorana ako je potrebno

export default restoranRouter;
