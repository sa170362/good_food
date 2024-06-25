import narudzbina from "../models/narudzbina";
import express, { Request, Response } from 'express';

export class DostavaKontroler {

async aktuelneDostave(req: Request, res: Response): Promise<void> {
    try {
      const dostave = await narudzbina.find({ customerKorIme: req.params.korisnik, status: { $in: ['pending', 'confirmed'] } });
      res.json(dostave);
    } catch (err) {
      res.status(500).send(err);
    }
  };

}