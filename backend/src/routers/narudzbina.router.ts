import express from 'express';
import { NarudzbinaController } from '../controllers/narudzbina.controller';

const narudzbinaRouter = express.Router();
const narudzbinaController = new NarudzbinaController();

narudzbinaRouter.get('/confirmed/:restoran', narudzbinaController.getConfirmedOrders);
narudzbinaRouter.get('/rejected/:restoran', narudzbinaController.getRejectedOrders);
narudzbinaRouter.get('/:restoran', narudzbinaController.getOrders);
narudzbinaRouter.put('/confirm/:customerKorIme', narudzbinaController.confirmOrder);
narudzbinaRouter.put('/reject/:customerKorIme', narudzbinaController.rejectOrder);
narudzbinaRouter.get('/svePorudzbine', narudzbinaController.svePorudzbine);
narudzbinaRouter.post('/kreiraj', narudzbinaController.kreirajPorudzbinu);
export default narudzbinaRouter;
