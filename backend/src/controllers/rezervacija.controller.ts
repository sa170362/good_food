// controllers/rezervacija.controller.ts

import { Request, Response } from "express";
import Rezervacija from "../models/rezervacija";

export class RezervacijaController {
  // Metoda za dobavljanje svih neobradjenih rezervacija, sortiranih po datumu
  getNeobradjeneRezervacije = async (req: Request, res: Response): Promise<void> => {
    try {
      const neobradjeneRezervacije = await Rezervacija.find({ potvrdjenaRezervacija: false })
        .sort({ datumVremeRezervacije: 1 }); // 1 za rastući redosled

      res.json(neobradjeneRezervacije);
    } catch (err) {
      console.error("Greška pri dohvatanju neobrađenih rezervacija:", err);
      res.status(500).json({ message: "Greška pri dohvatanju neobrađenih rezervacija" });
    }
  };

  // Metoda za potvrdu ili odbijanje rezervacije
  potvrdiRezervaciju = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;
    const { potvrdjena, razlogOdbijanja } = req.body;

    try {
      const rezervacija = await Rezervacija.findById(id);

      if (!rezervacija) {
        res.status(404).json({ message: "Rezervacija nije pronađena" });
        return;
      }

      if (potvrdjena) {
        rezervacija.potvrdjenaRezervacija = true;
        rezervacija.brojStola = 123; // Primer: Postavljamo broj stola na osnovu nekog algoritma
      } else {
        rezervacija.potvrdjenaRezervacija = false;
        rezervacija.razlogOdbijanja = razlogOdbijanja;
        rezervacija.brojStola = undefined; // Ako se odbija, stol je ponovo slobodan
      }

      await rezervacija.save();

      res.json(rezervacija);
    } catch (err) {
      console.error("Greška pri potvrđivanju/odbijanju rezervacije:", err);
      res.status(500).json({ message: "Greška pri potvrđivanju/odbijanju rezervacije" });
    }
  };
}
