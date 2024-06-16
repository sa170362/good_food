import * as express from "express";
import Korisnik from "../models/user";
import path from "path";
import multer from "multer";

// Konfiguracija za multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({ storage: storage });

export class UserController {
  login = (req: express.Request, res: express.Response) => {
    let korisnickoIme = req.body.korisnickoIme;
    let lozinka = req.body.lozinka;

    Korisnik.findOne({ korisnickoIme: korisnickoIme, lozinka: lozinka })
      .then((user) => {
        res.json(user);
      })
      .catch((err) => console.log(err));
  };

  getUser = (req: express.Request, res: express.Response) => {
    let korisnickoIme = req.body.korisnickoIme;

    Korisnik.findOne({ korisnickoIme: korisnickoIme })
      .then((user) => {
        res.json(user);
      })
      .catch((err) => console.log(err));
  };

  updateUser = (req: express.Request, res: express.Response) => {
    let korisnickoIme = req.body.korisnickoIme;
    let updatedData = req.body;

    Korisnik.findOneAndUpdate({ korisnickoIme: korisnickoIme }, updatedData, { new: true })
      .then((user) => {
        res.json(user);
      })
      .catch((err) => {
        console.error('Error updating user', err);
        res.status(500).json({ message: err });
      });
  };

  uploadProfilePicture = (req: express.Request, res: express.Response) => {
    const filePath = req.file?.path;

    Korisnik.findOneAndUpdate({ korisnickoIme: req.body.korisnickoIme }, { profilna_slika: filePath }, { new: true })
      .then((user) => {
        res.json(user);
      })
      .catch((err) => {
        console.error('Error updating profile picture', err);
        res.status(500).json({ message: err });
      });
  };

  getProfile = (req: express.Request, res: express.Response) => {
    let korisnickoIme = req.query.korisnickoIme;  // Pretpostavka da je korisničko ime prosleđeno kao query parametar

    Korisnik.findOne({ korisnickoIme: korisnickoIme })
      .then((user) => {
        res.json(user);
      })
      .catch((err) => {
        console.error('Error fetching user', err);
        res.status(500).json({ message: err });
      });
  };
  
}
