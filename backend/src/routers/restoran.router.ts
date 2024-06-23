import express from 'express';
import { RestoranController } from '../controllers/restoran.controller';

const restoranRouter = express.Router();
const restoranController = new RestoranController();

// Definicija ruta za REST API operacije nad restoranima
restoranRouter.get('/', restoranController.getAllRestorani);
restoranRouter.post('/add', restoranController.addRestoran);
restoranRouter.post('/:ime/save-layout', restoranController.saveLayoutForRestoran);
restoranRouter.get('/name/:ime', restoranController.getRestoranByName);


// Dodajte ostale rute za dodavanje, brisanje, izmenu restorana ako je potrebno

export default restoranRouter;
