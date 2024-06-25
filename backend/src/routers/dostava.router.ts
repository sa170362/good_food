import express from "express";
import { DostavaKontroler } from "../controllers/dostava.controller";

const dostavaRouter = express.Router();
const dostavaKontroler = new DostavaKontroler();

dostavaRouter.get('/aktuelne/:korisnik', dostavaKontroler.aktuelneDostave);

export default dostavaRouter;