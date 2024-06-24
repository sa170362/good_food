import express from 'express';
import { NarudzbinaController } from '../controllers/narudzbina.controller';

const narudzbinaRouter = express.Router();
const narudzbinaController = new NarudzbinaController();

narudzbinaRouter.get('/', narudzbinaController.getOrders);
narudzbinaRouter.put('/confirm/:customer', narudzbinaController.confirmOrder);
narudzbinaRouter.put('/reject/:customer', narudzbinaController.rejectOrder);
narudzbinaRouter.get('/svePorudzbine', narudzbinaController.svePorudzbine);
narudzbinaRouter.post('/kreiraj', narudzbinaController.kreirajPorudzbinu);


export default narudzbinaRouter;
