import express from "express";
import { RezervacijaController } from "../controllers/rezervacija.controller";

const rezervacijaRouter = express.Router();
const controller = new RezervacijaController();

rezervacijaRouter.get('/neobradjene', controller.getAllNeobradjeneRezervacije);
rezervacijaRouter.post('/potvrdi/:imeGosta', controller.confirmReservation);
rezervacijaRouter.post('/odbij/:imeGosta', controller.rejectReservation);
rezervacijaRouter.get('/brojGostijuPoDanima/:korisnickoIme', controller.getBrojGostijuPoDanima);
rezervacijaRouter.post('/rezervacije', controller.kreirajRezervaciju);
rezervacijaRouter.post('/otkazi', controller.otkaziRezervaciju);

export default rezervacijaRouter;
