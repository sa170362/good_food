import express from "express";
import { JelaKontroler } from "../controllers/jela.controller";

const jelaRouter = express.Router();
const jelaKontroler = new JelaKontroler();

jelaRouter.post('/', jelaKontroler.dodajJelo);
jelaRouter.get('/', jelaKontroler.svaJela);

export default jelaRouter;