  import * as express from "express";
  import Restoran from "../models/restoran";
import RestoranModel from "../models/restoran";

  export class RestoranController {
    // dohvatanje svih restorana sa ocenama
    getAllRestorani = async (req: express.Request, res: express.Response) => {
      try {
        const restorani = await RestoranModel.find();
        res.json(restorani);
      } catch (error) {
        res.status(500).json({});
      }
    };

    getRestoranByName = async (req: express.Request, res: express.Response) => {
      try {
        const restoran = await RestoranModel.findOne({ ime: req.params.ime });
        if (!restoran) return res.status(404).json({ message: 'Restoran not found' });
        res.json(restoran);
      } catch (error) {
        res.status(500).json();
      }
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
    
  }
