import * as express from "express";
import Korisnik from "../models/user";
import path from "path";
import multer from "multer";
import * as bcrypt from 'bcryptjs';
import fs from 'fs';
// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, 'uploads/');
//   },
//   filename: (req, file, cb) => {
//     cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
//   }
// });

// const upload = multer({ storage: storage,
//   limits: { fileSize: 2 * 1024 * 1024 } , fileFilter: (req, file, cb) => {
//     if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
//       cb(null, true); // Accept only JPEG and PNG files
//     } else {
//       cb(new Error('Only JPEG and PNG images are allowed'));
//     }
//   }});
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({
  storage: storage,
  limits: { fileSize: 2 * 1024 * 1024 },
  fileFilter: (req, file, cb) => {
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
      cb(null, true); // Accept only JPEG and PNG files
    } else {
      cb(new Error('Only JPEG and PNG images are allowed'));
    }
  }
});

const clearMulterUploads = () => {
  const directory = 'uploads/';
  fs.readdir(directory, (err, files) => {
    if (err) throw err;

    for (const file of files) {
      fs.unlink(path.join(directory, file), err => {
        if (err) throw err;
      });
    }
  });
};
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
  register = async (req: express.Request, res: express.Response)=>{
    // console.log(req)
    let korisnickoIme = req.body.korisnickoIme;
    const hashedPassword = await bcrypt.hash(req.body.lozinka, 10);
    let lozinka = hashedPassword;
    let ime = req.body.ime;
    let prezime = req.body.prezime;
    let mejl = req.body.email;
    let sigurnosnoPitanje = req.body.sigurnosnoPitanje;
    let sigurnosniOdgovor = req.body.sigurnosniOdgovor;
    let adresa = req.body.adresa;
    let pol = req.body.pol;
    let kontaktTelefon = req.body.kontaktTelefon;
    let brojKreditneKartice = req.body.brojKreditneKartice;
    let profilnaSlika = req.body.profilnaSlika ? req.body.profilnaSlika : 'frontend\src\assets\default_profile.jpg'
    console.log(profilnaSlika)

    let user = {
      korisnickoIme: korisnickoIme,
      lozinka: lozinka,
      ime: ime,
      prezime: prezime,
      profilna_slika: profilnaSlika,
      mejl:mejl,
      sigurnosnoPitanje:sigurnosnoPitanje,
      sigurnosniOdgovor:sigurnosniOdgovor,
      adresa:adresa,
      pol:pol,
      kontaktTelefon:kontaktTelefon,
      brojKreditneKartice:brojKreditneKartice
    }

    new Korisnik(user).save().then(ok=>{
        res.json({message: "ok"})
    }).catch(err=>{
        console.log(err)
    })
    clearMulterUploads();
}
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
    let korisnickoIme = req.query.korisnickoIme;

    Korisnik.findOne({ korisnickoIme: korisnickoIme })
      .then((user) => {
        res.json(user);
      })
      .catch((err) => {
        console.error('Error fetching user', err);
        res.status(500).json({ message: err });
      });
  };

  checkUsername = (req: express.Request, res: express.Response) => {
    let korisnickoIme = req.params.korisnickoIme;

    Korisnik.findOne({ korisnickoIme: korisnickoIme })
      .then((user) => {
        if (user) {
          res.json(true);
        } else {
          res.json(false);
        }
      })
      .catch((err) => {
        console.error('Error checking username:', err);
        res.status(500).json({ message: err });
      });
  };

  checkEmail = (req: express.Request, res: express.Response) => {
    let mejl = req.params.mejl;

    Korisnik.findOne({ mejl: mejl })
      .then((user) => {
        if (user) {
          res.json(true);
        } else {
          res.json(false);
        }
      })
      .catch((err) => {
        console.error('Error checking email:', err);
        res.status(500).json({ message: err });
      });
  };

  
}
