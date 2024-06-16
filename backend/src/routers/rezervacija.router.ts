// routes/rezervacija.router.ts

import express from "express";
import { RezervacijaController } from "../controllers/rezervacija.controller";

const rezervacijaRouter = express.Router();
const controller = new RezervacijaController();

// GET ruta za dohvatanje svih neobrađenih rezervacija
rezervacijaRouter.get("/neobradjene", controller.getNeobradjeneRezervacije);

// PUT ruta za potvrdu ili odbijanje rezervacije
rezervacijaRouter.put("/:imeGosta", controller.potvrdiRezervaciju);

export default rezervacijaRouter;
