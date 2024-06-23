import express from "express";
import { RezervacijaController } from "../controllers/rezervacija.controller";

const rezervacijaRouter = express.Router();
const controller = new RezervacijaController();

rezervacijaRouter.get('/neobradjene', controller.getAllNeobradjeneRezervacije);
rezervacijaRouter.post('/potvrdi/:imeGosta', controller.confirmReservation);
rezervacijaRouter.post('/odbij/:imeGosta', controller.rejectReservation);
rezervacijaRouter.get('/brojGostijuPoDanima/:korisnickoIme', controller.getBrojGostijuPoDanima);
rezervacijaRouter.post('/otkazi', controller.otkaziRezervaciju);
rezervacijaRouter.post('/kreiraj', controller.kreirajRezervaciju);

export default rezervacijaRouter;
