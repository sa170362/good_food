import express from 'express';
import { KomentarController } from '../controllers/komentar.controller';

const komentarRouter = express.Router();
const controller = new KomentarController();

komentarRouter.get('/komentari/:ime', controller.getKomentarByIme);

export default komentarRouter;
