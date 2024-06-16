import express, { Request, Response } from "express";
import Rezervacija from "../models/rezervacija";

export class RezervacijaController {

  getAllNeobradjeneRezervacije = (req: express.Request, res: express.Response) => {
    Rezervacija.find({ statusRezervacije: 'neobradjena' })
      .sort({ datumVremeRezervacije: 1 }) 
      .then(rezervacije => res.json(rezervacije))
      .catch(err => {
        console.error(err);
        res.status(500).json({ message: "Greška pri dohvatanju rezervacija" });
      });
  };

   confirmReservation = async (req: Request, res: Response): Promise<void> => {
    const imeGosta = decodeURIComponent(req.params.imeGosta);
    const { brojStola } = req.body;

    try {
      const rezervacija = await Rezervacija.findOneAndUpdate(
        { imeGosta, statusRezervacije: 'neobradjena' },
        { statusRezervacije: 'obradjena', brojStola },
        { new: true }
      );

      if (rezervacija) {
        res.json(rezervacija);
      } else {
        res.status(404).json({ message: 'Rezervacija nije pronađena ili već obrađena.' });
      }
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Greška pri potvrđivanju rezervacije' });
    }
  };

  rejectReservation = async (req: Request, res: Response): Promise<void> => {
    const imeGosta = decodeURIComponent(req.params.imeGosta);
    const { brojStola, razlogOdbijanja } = req.body;

    try {
      const rezervacija = await Rezervacija.findOneAndUpdate(
        { imeGosta, statusRezervacije: 'neobradjena' },
        { statusRezervacije: 'obradjena', razlogOdbijanja, brojStola },
        { new: true }
      );

      if (rezervacija) {
        res.json(rezervacija);
      } else {
        res.status(404).json({ message: 'Rezervacija nije pronađena ili već obrađena.' });
      }
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Greška pri odbijanju rezervacije' });
    }
  };

};

