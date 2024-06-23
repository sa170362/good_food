import * as express from "express";
import Korisnik from "../models/user";
import path from "path";
import multer from "multer";
import * as bcrypt from 'bcryptjs';
import fs from 'fs';

const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, 'uploads/') // Your uploads directory
  },
  filename: function(req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
  }
});

const fileFilter = (req: any, file: any, cb: any) => {
  if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 300 * 1024 // 300KB
  },
  fileFilter: fileFilter
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

  Korisnik.findOne({ korisnickoIme: korisnickoIme })
    .then(async (user) => {
      if (!user) {
        return res.status(404).json({ status: 'not_found', message: "Korisnik nije pronađen. Proverite svoje kredencijale." });
      }

      const match = await bcrypt.compare(lozinka, user.lozinka || '');

      if (!match) {
        return res.status(403).json({ status: 'incorrect_credentials', message: "Pogrešna lozinka." });
      }

      if (user.status === 'pending') {
        return res.status(403).json({ status: 'pending', message: "Korisnik čeka odobrenje administratora." });
      }

      if (user.status === 'blocked') {
        return res.status(403).json({ status: 'blocked', message: "Nalog je blokiran." });
      }

      if (user.status !== 'aktivan') {
        return res.status(403).json({ status: 'inactive', message: "Vaš nalog više nije aktivan." });
      }

      res.json({ status: 'success', user });
    })
    .catch((err) => {
      console.error('Greška pri prijavi:', err);
      res.status(500).json({ status: 'error', message: "Greška prilikom prijave korisnika.", error: err });
    });
};
  
 getBrojRegistrovanihGostiju = async (req: express.Request, res: express.Response) => {
  Korisnik.find({ tip: 'gost', status:'aktivan' })
      .then((users) => {
        // console.log(users.length)
        res.status(200).json(users.length);
      })
      .catch((err) => {
        console.error('Error fetching registered guests:', err);
        res.status(500).json({ message: 'Error fetching registered guests' });
      });
};
loginAdmin = (req: express.Request, res: express.Response) => {
  
  let korisnickoIme = req.body.korisnickoIme;
  let lozinka = req.body.lozinka;

  Korisnik.findOne({ korisnickoIme: korisnickoIme })
      .then(async (user) => {
          if (!user) {
              return res.status(404).json({ message: "Korisnik nije pronađen. Proverite svoje kredencijale." });
          }

          const match = await bcrypt.compare(lozinka, user.lozinka || ''); // Compare hashed password with login password

          if (!match) {
              return res.status(403).json({ message: "Pogrešno korisničko ime ili lozinka" });
          }

          if (user.status !== 'aktivan') {
              return res.status(403).json({ message: "Vaš nalog je deaktiviran" });
          }

          res.json(user);
      })
      .catch((err) => {
          console.error('Greška pri prijavi:', err);
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

getSecurityQuestion = async (req: express.Request, res: express.Response) => {
  const { username } = req.params;

  try {
    const user = await Korisnik.findOne({ korisnickoIme: username });

    if (!user) {
      return res.status(404).json({ message: 'Korisnik nije pronađen' });
    }

    res.json({ securityQuestion: user.sigurnosnoPitanje });
  } catch (error) {
    console.error('Greška pri dobijanju sigurnosnog pitanja:', error);
    res.status(500).json({ message: 'Greška pri dobijanju sigurnosnog pitanja', error });
  }
};


changePassword = async (req: express.Request, res: express.Response) => {
  const {  oldPassword, newPassword } = req.body;
  let korisnickoIme = req.body.username;
  console.log(korisnickoIme)
  console.log(oldPassword)
  console.log(newPassword)

  try {
    const user = await Korisnik.findOne({ korisnickoIme });

    if (!user) {
      return res.status(404).json({ message: 'Korisnik nije pronađen' });
    }

    // Check if user.lozinka exists and is a string
    if (typeof user.lozinka !== 'string') {
      return res.status(500).json({ message: 'Nevažeći format lozinke za korisnika' });
    }

    const match = await bcrypt.compare(oldPassword, user.lozinka);

    if (!match) {
      return res.status(403).json({ message: 'Pogrešna stara lozinka' });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    user.lozinka = hashedPassword;

    await user.save();

    res.json({ message: 'Lozinka uspešno promenjena' });
  } catch (error) {
    console.error('Greška pri promeni lozinke:', error);
    res.status(500).json({ message: 'Greška pri promeni lozinke', error });
  }
};


}
