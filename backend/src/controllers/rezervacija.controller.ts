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

  public async getBrojGostijuPoDanima(req: Request, res: Response): Promise<void> {
    const { korisnickoIme } = req.params;
    
    try {
        const data = await Rezervacija.aggregate([
            { 
                $match: { korisnickoIme, statusRezervacije: 'obradjena' }
            },
            {
                $group: {
                    _id: { $dateToString: { format: '%Y-%m-%d', date: '$datumVremeRezervacije' } },
                    brojGostiju: { $sum: '$brojGostiju' }
                }
            },
            { 
                $sort: { _id: 1 }
            }
        ]);
        res.json(data);
        console.log(data);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Greška prilikom dobijanja statističkih podataka.' });
    }
}

 // Metod za kreiranje nove rezervacije
 kreirajRezervaciju = async (req: Request, res: Response): Promise<void> => {
  console.log(req.body);
  
  const { korisnickoIme, imeGosta, datumVremeRezervacije, brojGostiju, komentarGosta, brojStola, imeRestorana } = req.body;

  const novaRezervacija = new Rezervacija({
    korisnickoIme,
    imeGosta,
    datumVremeRezervacije: new Date(datumVremeRezervacije),
    brojGostiju,
    komentarGosta,
    brojStola,
    statusRezervacije: 'pending',
    imeRestorana
  });

  try {
  
    const savedReservation = await novaRezervacija.save();
    res.status(201).json(savedReservation);
    
  } catch (err) {
    console.error(err);
    res.status(400).json({ message: 'Greška prilikom čuvanja rezervacije' });
  }
};

// Otkazivanje rezervacije
otkaziRezervaciju = async (req: Request, res: Response) => {
  const { imeGosta, datumVremeRezervacije } = req.body;

  try {
    const datum = new Date(datumVremeRezervacije);
    const rezervacija = await Rezervacija.findOneAndDelete({ imeGosta, datumVremeRezervacije: datum });

    if (!rezervacija) {
      return res.status(404).json({ message: 'Rezervacija nije pronađena' });
    }

    res.json({ message: 'Rezervacija otkazana' });
  } catch (err) {
    res.status(500).json();
  }
};

};

