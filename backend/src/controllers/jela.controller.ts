import Jelo from "../models/jelo";
import express, { Request, Response } from 'express';

export class JelaKontroler {

// Dodavanje novog jela
async dodajJelo(req: Request, res: Response): Promise<void> {
    try {
      const novoJelo = new Jelo({
        naziv: req.body.naziv,
        slika: req.body.slika,
        cena: req.body.cena,
        sastojci: req.body.sastojci
      }); // Kreiranje novog objekta Jelo
      await novoJelo.save(); // Čekanje dok se jelo ne sačuva u bazi
      res.status(201).send(novoJelo); // Slanje odgovora sa statusom 201 (Created) i podacima novog jela
    } catch (error) {
      console.error('Greška prilikom dodavanja jela:', error);
      res.status(400).send(error); // Slanje greške ako se desi problem pri čuvanju jela
    }
  }

// Dohvatanje svih jela
svaJela = async (req: Request, res: Response) => {
  try {
    const jela = await Jelo.find();
    res.status(200).send(jela);
  } catch (error) {
    res.status(500).send(error);
  }
};

}
