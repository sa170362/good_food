import * as express from "express";
import Restoran from "../models/restoran";

export class RestoranController {
  getAllRestorani = (req: express.Request, res: express.Response) => {
    Restoran.find()
      .then((restorani) => {
        res.json(restorani);
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json({ message: "Eror pri dovlacenju restorana" });
      });
  };
  getRestoran = (req: express.Request, res: express.Response) => {
    const ime = req.params.restoran;
    console.log(ime)
    Restoran.findOne({ime:ime})
      .then((restorani) => {
        res.json(restorani);
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json({ message: "Eror pri dovlacenju restorana" });
      });
  };

  getRestoranById = (req: express.Request, res: express.Response) => {
    const id = req.params.id;

    Restoran.findById(id)
      .then((restoran) => {
        if (!restoran) {
          res.status(404).json({ message: "Restoran nije nadjen" });
        } else {
          res.json(restoran);
        }
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json({ message: "Error" });
      });
  };
  addRestoran = (req: express.Request, res: express.Response) => {
    const { ime, adresa, tip,kratakOpis, kontaktOsoba, workingHoursFrom, workingHoursTo  } = req.body;

    const newRestoran = new Restoran({
      ime,
      adresa,
      tip,
      kratakOpis,
      kontaktOsoba,
      workingHoursFrom,
      workingHoursTo
    });

    newRestoran.save()
      .then((restoran) => {
        res.status(201).json(restoran);
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json({ message: "Error adding restaurant", error: err });
      });
  };
  saveLayoutForRestoran = (req: express.Request, res: express.Response) => {
    const { ime } = req.params;
    const { layout } = req.body;


    Restoran.findOne({ ime: ime })
    .then((restoran) => {
      if (!restoran) {
        res.status(404).json({ message: "Restoran nije nadjen" });
        return Promise.reject(new Error("Restoran nije nadjen"));
      }
      restoran.layout = layout;
      return restoran.save();
    })
    .then((updatedRestoran) => {
      res.status(200).json(updatedRestoran);
    })
    .catch((err) => {
      console.log(err);
      if (!res.headersSent) {
        res.status(500).json({ message: "Error saving layout", error: err });
      }
    });
  };
  // Dodajte ostale metode za dodavanje, izmenu i brisanje restorana ako je potrebno
}
