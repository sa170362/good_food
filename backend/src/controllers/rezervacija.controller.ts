import express, { Request, Response } from "express";
import Rezervacija from "../models/rezervacija";


export class RezervacijaController {

  getAllNeobradjeneRezervacije = (req: express.Request, res: express.Response) => {
    const restoran = decodeURIComponent(req.params.restoran);
    Rezervacija.find({ statusRezervacije: 'neobradjena' , restoran: restoran})
      .sort({ datumVremeRezervacije: -1 }) 
      .then(rezervacije => res.json(rezervacije))
      .catch(err => {
        console.error(err);
        res.status(500).json({ message: "Greška pri dohvatanju rezervacija" });
      });
  };

  //  confirmReservation = async (req: Request, res: Response): Promise<void> => {
  //   const imeGosta = decodeURIComponent(req.params.imeGosta);
  //   const { brojStola } = req.body;

  //   try {
  //     const rezervacija = await Rezervacija.findOneAndUpdate(
  //       { imeGosta, statusRezervacije: 'neobradjena' },
  //       { statusRezervacije: 'obradjena', brojStola },
  //       { new: true }
  //     );

  //     if (rezervacija) {
  //       res.json(rezervacija);
  //     } else {
  //       res.status(404).json({ message: 'Rezervacija nije pronađena ili već obrađena.' });
  //     }
  //   } catch (err) {
  //     console.error(err);
  //     res.status(500).json({ message: 'Greška pri potvrđivanju rezervacije' });
  //   }
  // };
  confirmReservation = async (req: Request, res: Response): Promise<void> => {
    const imeGosta = decodeURIComponent(req.params.imeGosta);
    const { brojStola } = req.body;
    const korisnickoImeKonobara = decodeURIComponent(req.params.korisnickoImeKonobara); // Dodajemo ovde
  
    try {
      const rezervacija = await Rezervacija.findOneAndUpdate(
        { imeGosta, statusRezervacije: 'neobradjena' },
        { statusRezervacije: 'obradjena', brojStola, konobar: korisnickoImeKonobara }, // Dodajemo konobar
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

public async getRez24h(req: express.Request, res: express.Response): Promise<void> {
  try {
    // Prvo izračunavamo vreme pre 24 sata u odnosu na trenutno vreme
    const danas = new Date();
    const pre24h = new Date(danas.getTime() - (24 * 60 * 60 * 1000));
console.log(danas)
console.log(pre24h)
    // Tražimo sve rezervacije kreirane u poslednjih 24 sata
    const rezervacije = await Rezervacija.find({
      datumVremeRezervacije: { $gte: pre24h, $lt: danas } // $gte znači veće ili jednako, $lt znači manje od
    });

    res.json(rezervacije);
  } catch (error) {
    console.error('Greška pri dobijanju rezervacija:', error);
    res.status(500).json({ message: 'Greška pri dobijanju rezervacija', error: error });
  }


}
 getRez1m = async (req: Request, res: Response) => {
  try {
      // Računamo datum pre mesec dana od trenutnog datuma
      const datumPreMesecDana = new Date();
      datumPreMesecDana.setMonth(datumPreMesecDana.getMonth() - 1);

      // Upit za pronalaženje rezervacija koje su napravljene u poslednjih mesec dana
      const rezervacije = await Rezervacija.find({
        datumVremeRezervacije: { $gte: datumPreMesecDana }
      });

      res.status(200).json(rezervacije);
  } catch (error) {
      console.error('Greška pri pronalaženju rezervacija:', error);
      res.status(500).json({ message: 'Greška pri pronalaženju rezervacija', error });
  }
};
getAll = (req: express.Request, res: express.Response) => {
  Rezervacija.find()
    .then(rezervacije => res.json(rezervacije))
    .catch(err => {
      console.error(err);
      res.status(500).json({ message: "Greška pri dohvatanju rezervacija" });
    });
};
getRezervacijeR = (req: express.Request, res: express.Response) => {
  const restoran = decodeURIComponent(req.params.restoran);
  Rezervacija.find({ statusRezervacije: 'obradjena' , restoran: restoran})
    .then(rezervacije => res.json(rezervacije))
    .catch(err => {
      console.error(err);
      res.status(500).json({ message: "Greška pri dohvatanju rezervacija" });
    });
};

addRezervacija = (req: express.Request, res: express.Response) => {
  const { imeGosta, komentarGosta, brojGostiju,datumKreiranja, datumVremeRezervacije, statusRezervacije, korisnickoIme, brojStola , restoran } = req.body;

  const newRez = new Rezervacija({
    imeGosta,
    komentarGosta,
    brojGostiju,
    datumKreiranja,
    datumVremeRezervacije,
    statusRezervacije,
    korisnickoIme, brojStola,
    restoran
  });

  newRez.save()
    .then((rezervacija) => {
      res.status(201).json(rezervacija);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ message: "Error adding reservation", error: err });
    });
};
cancelReservation = async (req: Request, res: Response): Promise<void> => {
  const { imeGosta } = req.params;
  const { datumVremeRezervacije } = req.body;

  try {
    // Find and update the reservation with the given guest name and reservation date
    const canceledReservation = await Rezervacija.findOneAndUpdate(
      { imeGosta, datumVremeRezervacije, statusRezervacije: 'neobradjena' },
      { statusRezervacije: 'otkazana' },
      { new: true }
    );

    if (canceledReservation) {
      res.json(canceledReservation);
    } else {
      res.status(404).json({ message: 'Rezervacija nije pronađena ili već obrađena/otkazana.' });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Greška pri otkazivanju rezervacije' });
  }
};
getGuestReservations = async (req: Request, res: Response): Promise<void> => {
  const korisnickoIme = decodeURIComponent(req.params.korisnickoIme);

  try {
    // Find all reservations for the given guest username
    const reservations = await Rezervacija.find({ korisnickoIme })
      .sort({ datumVremeRezervacije: 1 }); // Sort by date ascending

    res.status(200).json(reservations);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Greška pri dohvatanju rezervacija gosta' });
  }
};
async searchReservations(req: Request, res: Response): Promise<void> {
  const { restoran, datumVremeRezervacije } = req.query;
  const datumVreme = new Date(datumVremeRezervacije as string);

  const startDate = new Date(datumVreme);
  startDate.setHours(startDate.getHours() - 3);
  const endDate = new Date(datumVreme);
  endDate.setHours(endDate.getHours() + 3);

  try {
    const rezervacije = await Rezervacija.find({
      restoran: restoran,
      datumVremeRezervacije: { $gte: startDate, $lte: endDate },
      statusRezervacije: 'obradjena'
    });
    res.json(rezervacije);
  } catch (error) {
    res.status(500).json({ message: 'Greška prilikom dobijanja rezervacija', error });
  }
}

};

