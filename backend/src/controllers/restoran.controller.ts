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

  // Dodajte ostale metode za dodavanje, izmenu i brisanje restorana ako je potrebno
}
