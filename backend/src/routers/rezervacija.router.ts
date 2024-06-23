import express from "express";
import { RezervacijaController } from "../controllers/rezervacija.controller";

const rezervacijaRouter = express.Router();
const controller = new RezervacijaController();

rezervacijaRouter.get('/neobradjene/:restoran', controller.getAllNeobradjeneRezervacije);
rezervacijaRouter.post('/potvrdi/:imeGosta/:korisnickoImeKonobara', controller.confirmReservation);
rezervacijaRouter.post('/odbij/:imeGosta', controller.rejectReservation);
rezervacijaRouter.get('/brojGostijuPoDanima/:korisnickoIme', controller.getBrojGostijuPoDanima);
rezervacijaRouter.get('/rezervacije24', controller.getRez24h);
rezervacijaRouter.get('/rezervacije1m', controller.getRez1m);
rezervacijaRouter.get('/all', controller.getAll);
export default rezervacijaRouter;
