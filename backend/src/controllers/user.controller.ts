import * as express from "express";
import Korisnik from "../models/user";
import path from "path";
import multer from "multer";
import * as bcrypt from 'bcryptjs';
import fs from 'fs';

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
        if (!user) {
          return res.status(404).json({ message: "Korisnik nije pronađen" });
        }
        
        if (user.status !== 'aktivan') {
          return res.status(403).json({ message: "Vaš nalog je deaktiviran" });
        }
  
        res.json(user);
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json({ message: "Greška prilikom prijave korisnika", error: err });
      });
  };
  register = async (req: express.Request, res: express.Response)=>{
    // console.log(req)
    let korisnickoIme = req.body.korisnickoIme;
    const hashedPassword = await bcrypt.hash(req.body.lozinka, 10);
    let lozinka = hashedPassword;
    let ime = req.body.ime;
    let prezime = req.body.prezime;
    let mejl = req.body.mejl;
    let sigurnosnoPitanje = req.body.sigurnosnoPitanje;
    let sigurnosniOdgovor = req.body.sigurnosniOdgovor;
    let adresa = req.body.adresa;
    let pol = req.body.pol;
    let kontaktTelefon = req.body.kontaktTelefon;
    let brojKreditneKartice = req.body.brojKreditneKartice;
    let profilnaSlika = req.body.profilnaSlika ? req.body.profilnaSlika : 'frontend\src\assets\default_profile.jpg'
    let tip = "gost";
    let status = "pending"
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
      brojKreditneKartice:brojKreditneKartice,
      tip:tip,
      status:status
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

    Korisnik.findOneAndUpdate({ korisnickoIme: req.body.korisnickoIme }, { profilnaSlika: filePath }, { new: true })
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

  getUsersByType = (req: express.Request, res: express.Response) => {
    const userType = req.params.type;
    
    Korisnik.find({ tip: userType, status:'aktivan' })
      .then((users) => {
        // console.log(users.length)
        res.status(200).json(users);
      })
      .catch((err) => {
        console.error('Error fetching users by type:', err);
        res.status(500).json({ message: 'Error fetching users by type' });
      });
  }; 
  getUsersBlocked = (req: express.Request, res: express.Response) => {
 
    
    Korisnik.find({  status:'deaktiviran' })
      .then((users) => {
        // console.log(users.length)
        res.status(200).json(users);
      })
      .catch((err) => {
        console.error('Error fetching users blocked:', err);
        res.status(500).json({ message: 'Error fetching users blocked' });
      });
  }; 
  

  deactivateUserGuest = (req: express.Request, res: express.Response) => {
    let korisnickoIme = req.params.korisnickoIme;
    console.log('Received request to deactivate user:', korisnickoIme); // Provjera parametara
    let status = "deaktiviran";
    Korisnik.findOneAndUpdate(
      { korisnickoIme: korisnickoIme },
      { status: status },
      { new: true }
    )
      .then((user) => {
        if (!user) {
          console.log('User not found:', korisnickoIme); // Dodajte provjeru da li je korisnik pronađen
          return res.status(404).json({ message: 'User not found' });
        }
  
        console.log('Updated user:', user); // Pregledajte ažurirani korisnički objekat
        res.json({ message: 'ok', user });
      })
      .catch((err) => {
        console.error('Error deactivating user', err);
        res.status(500).json({ message: 'Error deactivating user' });
      });
  };
  deactivateUserKonobar = (req: express.Request, res: express.Response) => {
    let korisnickoIme = req.params.korisnickoIme;
    console.log('Received request to deactivate user:', korisnickoIme); // Provjera parametara
    let status = "deaktiviran";
    Korisnik.findOneAndUpdate(
      { korisnickoIme: korisnickoIme },
      { status: status },
      { new: true }
    )
      .then((user) => {
        if (!user) {
          console.log('User not found:', korisnickoIme); // Dodajte provjeru da li je korisnik pronađen
          return res.status(404).json({ message: 'User not found' });
        }
  
        console.log('Updated user:', user); // Pregledajte ažurirani korisnički objekat
        res.json({ message: 'ok', user });
      })
      .catch((err) => {
        console.error('Error deactivating user', err);
        res.status(500).json({ message: 'Error deactivating user' });
      });
  };
  getRequests = (req: express.Request, res: express.Response) => {
    
    
    Korisnik.find({ tip: 'gost' }, {status: "pending"})
      .then((users) => {
        // console.log('Updated user:', users[0]);
        res.status(200).json(users);
      })
      .catch((err) => {
        console.error('Error fetching users by type:', err);
        res.status(500).json({ message: 'Error fetching users by type' });
      });
  };
  getPendingGuests = (req: express.Request, res: express.Response) => {
    Korisnik.find({ tip: 'gost', status: 'pending' })
      .then((users) => {
        res.status(200).json(users);
      })
      .catch((err) => {
        console.error('Error fetching pending guests:', err);
        res.status(500).json({ message: 'Error fetching pending guests' });
      });
  };
  activateUser = (req: express.Request, res: express.Response) => {
    let korisnickoIme = req.params.korisnickoIme;

    let status = "aktivan";
    Korisnik.findOneAndUpdate(
      { korisnickoIme: korisnickoIme },
      { status: status },
      { new: true }
    )
      .then((user) => {
        if (!user) {
          console.log('User not found:', korisnickoIme); // Dodajte provjeru da li je korisnik pronađen
          return res.status(404).json({ message: 'User not found' });
        }
  
        console.log('Updated user:', user); // Pregledajte ažurirani korisnički objekat
        res.json({ message: 'ok', user });
      })
      .catch((err) => {
        console.error('Error deactivating user', err);
        res.status(500).json({ message: 'Error deactivating user' });
      });
  }; 
  rejectUser = (req: express.Request, res: express.Response) => {
    let korisnickoIme = req.params.korisnickoIme;

    let status = "odbijen";
    Korisnik.findOneAndUpdate(
      { korisnickoIme: korisnickoIme },
      { status: status },
      { new: true }
    )
      .then((user) => {
        if (!user) {
          console.log('User not found:', korisnickoIme); // Dodajte provjeru da li je korisnik pronađen
          return res.status(404).json({ message: 'User not found' });
        }
  
        console.log('Updated user:', user); // Pregledajte ažurirani korisnički objekat
        res.json({ message: 'ok', user });
      })
      .catch((err) => {
        console.error('Error deactivating user', err);
        res.status(500).json({ message: 'Error deactivating user' });
      });
  }; 
  async updateUserByAdmin(req: express.Request, res: express.Response) {
    const korisnickoIme = req.params.korisnickoIme;
    const updatedData = req.body;

    try {
      const user = await Korisnik.findOneAndUpdate( { korisnickoIme: korisnickoIme }, updatedData, { new: true });

      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      res.status(200).json(user);
    } catch (error) {
      res.status(500).json({ message: "Error updating user", error });
    }
  }

  getUserByUsername = async (req: express.Request, res: express.Response) => {
    try {
      const korisnickoIme = req.params.korisnickoIme;
      // console.log(korisnickoIme)
      const user = await Korisnik.findOne({ korisnickoIme: korisnickoIme });
      if (user) {
        res.status(200).json(user);
      } else {
        res.status(404).json({ message: 'User not found' });
      }
    } catch (error) {
      console.error('Error fetching user by username:', error);
      res.status(500).json({ message: 'Error fetching user by username' });
    }
  };
  registerKonobar = async (req: express.Request, res: express.Response)=>{
    // console.log(req)
    let korisnickoIme = req.body.korisnickoIme;
    const hashedPassword = await bcrypt.hash(req.body.lozinka, 10);
    let lozinka = hashedPassword;
    let ime = req.body.ime;
    let prezime = req.body.prezime;
    let mejl = req.body.mejl;
    let adresa = req.body.adresa;
    let pol = req.body.pol;
    let kontaktTelefon = req.body.kontaktTelefon;
    let profilnaSlika = req.body.profilnaSlika ? req.body.profilnaSlika : 'frontend\src\assets\default_profile.jpg'
    let tip = "konobar";
    let status = "aktivan";
    let restoran = req.body.restoran;
    // console.log(profilnaSlika)

    let user = {
      korisnickoIme: korisnickoIme,
      lozinka: lozinka,
      ime: ime,
      prezime: prezime,
      profilna_slika: profilnaSlika,
      mejl:mejl,
      adresa:adresa,
      pol:pol,
      kontaktTelefon:kontaktTelefon,
      tip:tip,
      status:status,
      restoran:restoran
    }

    new Korisnik(user).save().then(ok=>{
        res.json({message: "ok"})
    }).catch(err=>{
        console.log(err)
    })
    clearMulterUploads();
}
unblockUser = (req: express.Request, res: express.Response) => {
  let korisnickoIme = req.params.korisnickoIme;
 
  let status = "aktivan";
  Korisnik.findOneAndUpdate(
    { korisnickoIme: korisnickoIme },
    { status: status },
    { new: true }
  )
    .then((user) => {
      if (!user) {
        console.log('User not found:', korisnickoIme); // Dodajte provjeru da li je korisnik pronađen
        return res.status(404).json({ message: 'User not found' });
      }

      console.log('Updated user:', user); // Pregledajte ažurirani korisnički objekat
      res.json({ message: 'ok', user });
    })
    .catch((err) => {
      console.error('Error deactivating user', err);
      res.status(500).json({ message: 'Error unblocking user' });
    });
};

ukupanBrojRegistrovanihGostijui = (req: express.Request, res: express.Response) => {
  Korisnik.countDocuments({ tip: 'gost' })
    .then((count: number) => {
      res.status(200).json({ totalGuests: count });
    })
    .catch((err) => {
      console.error('Error counting guests:', err);
      res.status(500).json({ message: 'Error counting guests' });
    });
};
}
