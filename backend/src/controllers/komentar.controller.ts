import { Request, Response } from 'express';
import Komentar from '../models/komentar';
import RestoranModel from '../models/restoran';

export class KomentarController {
  // Kreiranje komentara
  kreirajKomentar = async (req: Request, res: Response) => {
    const { autor, tekst, ocena, restoranId } = req.body;

    const noviKomentar = new Komentar({ autor, tekst, ocena });

    try {
      const savedComment = await noviKomentar.save();
      await RestoranModel.findByIdAndUpdate(restoranId, { $push: { komentari: savedComment._id } });
      res.status(201).json(savedComment);
    } catch (err) {
      console.error(err);
      res.status(400).json({ message: 'Failed to save comment' });
    }
  };

  getKomentarByIme = (req: Request, res: Response) => {
    const ime = req.params.ime;

    RestoranModel.findOne({ ime: ime })
      .populate('komentari') // Ovo će popuniti komentare na osnovu ID-jeva koji su u polju komentari u Restoran modelu
      .exec()
      .then((restoran) => {
        if (!restoran) {
          return res.status(404).json({ message: 'Restoran nije pronađen' });
        }

        const komentari = restoran.komentari as any[]; // Mongoose će vratiti komentare kao niz ID-jeva, pa ih treba konvertovati
        res.json(komentari);
      })
      .catch((err) => {
        console.error('Greška pri dohvatanju komentara:', err);
        res.status(500).json({ message: 'Greška pri dohvatanju komentara', error: err });
      });
  };
}
