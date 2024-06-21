"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserController = void 0;
const user_1 = __importDefault(require("../models/user"));
const path_1 = __importDefault(require("path"));
const multer_1 = __importDefault(require("multer"));
const bcrypt = __importStar(require("bcryptjs"));
const fs_1 = __importDefault(require("fs"));
const storage = multer_1.default.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/'); // Your uploads directory
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + path_1.default.extname(file.originalname));
    }
});
const upload = (0, multer_1.default)({
    storage: storage,
    limits: { fileSize: 300 * 1024 },
    fileFilter: function (req, file, cb) {
        if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
            cb(null, true);
        }
        else {
            cb(null, false); // reject file
        }
    }
}).single('profileImage'); // 'profileImage' is the field name
const clearMulterUploads = () => {
    const directory = 'uploads/';
    fs_1.default.readdir(directory, (err, files) => {
        if (err)
            throw err;
        for (const file of files) {
            fs_1.default.unlink(path_1.default.join(directory, file), err => {
                if (err)
                    throw err;
            });
        }
    });
};
class UserController {
    constructor() {
        //   login = (req: express.Request, res: express.Response) => {
        //   let korisnickoIme = req.body.korisnickoIme;
        //   let lozinka = req.body.lozinka;
        //   Korisnik.findOne({ korisnickoIme: korisnickoIme })
        //       .then(async (user) => {
        //           if (!user) {
        //               return res.status(404).json({ message: "Korisnik nije pronađen. Proverite svoje kredencijale." });
        //           }
        //           const match = await bcrypt.compare(lozinka, user.lozinka || '');
        //           if (!match) {
        //               return res.status(403).json({ message: "Pogrešno korisničko ime ili lozinka" });
        //           }
        //           if (user.status !== 'aktivan') {
        //               return res.status(403).json({ message: "Vaš nalog je deaktiviran" });
        //           }
        //           res.json(user);
        //       })
        //       .catch((err) => {
        //           console.error('Greška pri prijavi:', err);
        //           res.status(500).json({ message: "Greška prilikom prijave korisnika", error: err });
        //       });
        // };
        this.login = (req, res) => {
            let korisnickoIme = req.body.korisnickoIme;
            let lozinka = req.body.lozinka;
            user_1.default.findOne({ korisnickoIme: korisnickoIme })
                .then((user) => __awaiter(this, void 0, void 0, function* () {
                if (!user) {
                    return res.status(404).json({ status: 'not_found', message: "Korisnik nije pronađen. Proverite svoje kredencijale." });
                }
                const match = yield bcrypt.compare(lozinka, user.lozinka || '');
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
            }))
                .catch((err) => {
                console.error('Greška pri prijavi:', err);
                res.status(500).json({ status: 'error', message: "Greška prilikom prijave korisnika.", error: err });
            });
        };
        this.getBrojRegistrovanihGostiju = (req, res) => __awaiter(this, void 0, void 0, function* () {
            user_1.default.find({ tip: 'gost', status: 'aktivan' })
                .then((users) => {
                // console.log(users.length)
                res.status(200).json(users.length);
            })
                .catch((err) => {
                console.error('Error fetching registered guests:', err);
                res.status(500).json({ message: 'Error fetching registered guests' });
            });
        });
        this.loginAdmin = (req, res) => {
            let korisnickoIme = req.body.korisnickoIme;
            let lozinka = req.body.lozinka;
            user_1.default.findOne({ korisnickoIme: korisnickoIme })
                .then((user) => __awaiter(this, void 0, void 0, function* () {
                if (!user) {
                    return res.status(404).json({ message: "Korisnik nije pronađen. Proverite svoje kredencijale." });
                }
                const match = yield bcrypt.compare(lozinka, user.lozinka || ''); // Compare hashed password with login password
                if (!match) {
                    return res.status(403).json({ message: "Pogrešno korisničko ime ili lozinka" });
                }
                if (user.status !== 'aktivan') {
                    return res.status(403).json({ message: "Vaš nalog je deaktiviran" });
                }
                res.json(user);
            }))
                .catch((err) => {
                console.error('Greška pri prijavi:', err);
                res.status(500).json({ message: "Greška prilikom prijave korisnika", error: err });
            });
        };
        this.register = (req, res) => __awaiter(this, void 0, void 0, function* () {
            // console.log(req)
            let korisnickoIme = req.body.korisnickoIme;
            const hashedPassword = yield bcrypt.hash(req.body.lozinka, 10);
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
            let profilnaSlika = req.body.profilnaSlika ? req.body.profilnaSlika : 'frontend\src\assets\default_profile.jpg';
            let tip = "gost";
            let status = "pending";
            console.log(profilnaSlika);
            let user = {
                korisnickoIme: korisnickoIme,
                lozinka: lozinka,
                ime: ime,
                prezime: prezime,
                profilna_slika: profilnaSlika,
                mejl: mejl,
                sigurnosnoPitanje: sigurnosnoPitanje,
                sigurnosniOdgovor: sigurnosniOdgovor,
                adresa: adresa,
                pol: pol,
                kontaktTelefon: kontaktTelefon,
                brojKreditneKartice: brojKreditneKartice,
                tip: tip,
                status: status
            };
            new user_1.default(user).save().then(ok => {
                res.json({ message: "ok" });
            }).catch(err => {
                console.log(err);
            });
            clearMulterUploads();
        });
        this.getUser = (req, res) => {
            let korisnickoIme = req.body.korisnickoIme;
            user_1.default.findOne({ korisnickoIme: korisnickoIme })
                .then((user) => {
                res.json(user);
            })
                .catch((err) => console.log(err));
        };
        this.updateUser = (req, res) => {
            let korisnickoIme = req.body.korisnickoIme;
            let updatedData = req.body;
            user_1.default.findOneAndUpdate({ korisnickoIme: korisnickoIme }, updatedData, { new: true })
                .then((user) => {
                res.json(user);
            })
                .catch((err) => {
                console.error('Error updating user', err);
                res.status(500).json({ message: err });
            });
        };
        this.uploadProfilePicture = (req, res) => {
            var _a;
            const filePath = (_a = req.file) === null || _a === void 0 ? void 0 : _a.path;
            user_1.default.findOneAndUpdate({ korisnickoIme: req.body.korisnickoIme }, { profilnaSlika: filePath }, { new: true })
                .then((user) => {
                res.json(user);
            })
                .catch((err) => {
                console.error('Error updating profile picture', err);
                res.status(500).json({ message: err });
            });
        };
        this.getProfile = (req, res) => {
            let korisnickoIme = req.query.korisnickoIme;
            user_1.default.findOne({ korisnickoIme: korisnickoIme })
                .then((user) => {
                res.json(user);
            })
                .catch((err) => {
                console.error('Error fetching user', err);
                res.status(500).json({ message: err });
            });
        };
        this.checkUsername = (req, res) => {
            let korisnickoIme = req.params.korisnickoIme;
            user_1.default.findOne({ korisnickoIme: korisnickoIme })
                .then((user) => {
                if (user) {
                    res.json(true);
                }
                else {
                    res.json(false);
                }
            })
                .catch((err) => {
                console.error('Error checking username:', err);
                res.status(500).json({ message: err });
            });
        };
        this.checkEmail = (req, res) => {
            let mejl = req.params.mejl;
            user_1.default.findOne({ mejl: mejl })
                .then((user) => {
                if (user) {
                    res.json(true);
                }
                else {
                    res.json(false);
                }
            })
                .catch((err) => {
                console.error('Error checking email:', err);
                res.status(500).json({ message: err });
            });
        };
        this.getUsersByType = (req, res) => {
            const userType = req.params.type;
            user_1.default.find({ tip: userType, status: 'aktivan' })
                .then((users) => {
                // console.log(users.length)
                res.status(200).json(users);
            })
                .catch((err) => {
                console.error('Error fetching users by type:', err);
                res.status(500).json({ message: 'Error fetching users by type' });
            });
        };
        this.getUsersBlocked = (req, res) => {
            user_1.default.find({ status: 'deaktiviran' })
                .then((users) => {
                // console.log(users.length)
                res.status(200).json(users);
            })
                .catch((err) => {
                console.error('Error fetching users blocked:', err);
                res.status(500).json({ message: 'Error fetching users blocked' });
            });
        };
        this.deactivateUserGuest = (req, res) => {
            let korisnickoIme = req.params.korisnickoIme;
            console.log('Received request to deactivate user:', korisnickoIme); // Provjera parametara
            let status = "deaktiviran";
            user_1.default.findOneAndUpdate({ korisnickoIme: korisnickoIme }, { status: status }, { new: true })
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
        this.deactivateUserKonobar = (req, res) => {
            let korisnickoIme = req.params.korisnickoIme;
            console.log('Received request to deactivate user:', korisnickoIme); // Provjera parametara
            let status = "deaktiviran";
            user_1.default.findOneAndUpdate({ korisnickoIme: korisnickoIme }, { status: status }, { new: true })
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
        this.getRequests = (req, res) => {
            user_1.default.find({ tip: 'gost' }, { status: "pending" })
                .then((users) => {
                // console.log('Updated user:', users[0]);
                res.status(200).json(users);
            })
                .catch((err) => {
                console.error('Error fetching users by type:', err);
                res.status(500).json({ message: 'Error fetching users by type' });
            });
        };
        this.getPendingGuests = (req, res) => {
            user_1.default.find({ tip: 'gost', status: 'pending' })
                .then((users) => {
                res.status(200).json(users);
            })
                .catch((err) => {
                console.error('Error fetching pending guests:', err);
                res.status(500).json({ message: 'Error fetching pending guests' });
            });
        };
        this.activateUser = (req, res) => {
            let korisnickoIme = req.params.korisnickoIme;
            let status = "aktivan";
            user_1.default.findOneAndUpdate({ korisnickoIme: korisnickoIme }, { status: status }, { new: true })
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
        this.rejectUser = (req, res) => {
            let korisnickoIme = req.params.korisnickoIme;
            let status = "odbijen";
            user_1.default.findOneAndUpdate({ korisnickoIme: korisnickoIme }, { status: status }, { new: true })
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
        this.getUserByUsername = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const korisnickoIme = req.params.korisnickoIme;
                // console.log(korisnickoIme)
                const user = yield user_1.default.findOne({ korisnickoIme: korisnickoIme });
                if (user) {
                    res.status(200).json(user);
                }
                else {
                    res.status(404).json({ message: 'User not found' });
                }
            }
            catch (error) {
                console.error('Error fetching user by username:', error);
                res.status(500).json({ message: 'Error fetching user by username' });
            }
        });
        this.registerKonobar = (req, res) => __awaiter(this, void 0, void 0, function* () {
            // console.log(req)
            let korisnickoIme = req.body.korisnickoIme;
            const hashedPassword = yield bcrypt.hash(req.body.lozinka, 10);
            let lozinka = hashedPassword;
            let ime = req.body.ime;
            let prezime = req.body.prezime;
            let mejl = req.body.mejl;
            let adresa = req.body.adresa;
            let pol = req.body.pol;
            let kontaktTelefon = req.body.kontaktTelefon;
            let profilnaSlika = req.body.profilnaSlika ? req.body.profilnaSlika : 'frontend\src\assets\default_profile.jpg';
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
                mejl: mejl,
                adresa: adresa,
                pol: pol,
                kontaktTelefon: kontaktTelefon,
                tip: tip,
                status: status,
                restoran: restoran
            };
            new user_1.default(user).save().then(ok => {
                res.json({ message: "ok" });
            }).catch(err => {
                console.log(err);
            });
            clearMulterUploads();
        });
        this.unblockUser = (req, res) => {
            let korisnickoIme = req.params.korisnickoIme;
            let status = "aktivan";
            user_1.default.findOneAndUpdate({ korisnickoIme: korisnickoIme }, { status: status }, { new: true })
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
        this.changePasswordWithOld = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const { korisnickoIme, staraLozinka, novaLozinka } = req.body;
            try {
                const user = yield user_1.default.findOne({ korisnickoIme });
                if (!user) {
                    return res.status(404).json({ message: 'Korisnik nije pronađen' });
                }
                // Check if user.lozinka exists and is a string
                if (typeof user.lozinka !== 'string') {
                    return res.status(500).json({ message: 'Nevažeći format lozinke za korisnika' });
                }
                const match = yield bcrypt.compare(staraLozinka, user.lozinka);
                if (!match) {
                    return res.status(403).json({ message: 'Pogrešna stara lozinka' });
                }
                const hashedPassword = yield bcrypt.hash(novaLozinka, 10);
                user.lozinka = hashedPassword;
                yield user.save();
                res.json({ message: 'Lozinka uspešno promenjena' });
            }
            catch (error) {
                console.error('Greška pri promeni lozinke:', error);
                res.status(500).json({ message: 'Greška pri promeni lozinke', error });
            }
        });
        // Method to get security question for a username
        this.getSecurityQuestion = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const { username } = req.params;
            try {
                const user = yield user_1.default.findOne({ korisnickoIme: username });
                if (!user) {
                    return res.status(404).json({ message: 'Korisnik nije pronađen' });
                }
                res.json({ securityQuestion: user.sigurnosnoPitanje });
            }
            catch (error) {
                console.error('Greška pri dobijanju sigurnosnog pitanja:', error);
                res.status(500).json({ message: 'Greška pri dobijanju sigurnosnog pitanja', error });
            }
        });
        // Method to answer security question and change password
        this.answerSecurityQuestion = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const { korisnickoIme, odgovor, novaLozinka } = req.body;
            try {
                const user = yield user_1.default.findOne({ korisnickoIme });
                if (!user) {
                    return res.status(404).json({ message: 'Korisnik nije pronađen' });
                }
                // Check if user.lozinka exists and is a string
                if (typeof user.lozinka !== 'string') {
                    return res.status(500).json({ message: 'Nevažeći format lozinke za korisnika' });
                }
                if (user.sigurnosniOdgovor !== odgovor) {
                    return res.status(403).json({ message: 'Pogrešan odgovor na sigurnosno pitanje' });
                }
                const hashedPassword = yield bcrypt.hash(novaLozinka, 10);
                user.lozinka = hashedPassword;
                yield user.save();
                res.json({ message: 'Lozinka uspešno promenjena' });
            }
            catch (error) {
                console.error('Greška pri promeni lozinke sa sigurnosnim odgovorom:', error);
                res.status(500).json({ message: 'Greška pri promeni lozinke sa sigurnosnim odgovorom', error });
            }
        });
        // Method to change password with security answer
        this.changePasswordWithSecurityAnswer = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const { korisnickoIme, staraLozinka, novaLozinka, odgovor } = req.body;
            try {
                const user = yield user_1.default.findOne({ korisnickoIme });
                if (!user) {
                    return res.status(404).json({ message: 'Korisnik nije pronađen' });
                }
                // Check if user.lozinka exists and is a string
                if (typeof user.lozinka !== 'string') {
                    return res.status(500).json({ message: 'Nevažeći format lozinke za korisnika' });
                }
                const match = yield bcrypt.compare(staraLozinka, user.lozinka);
                if (!match) {
                    return res.status(403).json({ message: 'Pogrešna stara lozinka' });
                }
                if (user.sigurnosniOdgovor !== odgovor) {
                    return res.status(403).json({ message: 'Pogrešan odgovor na sigurnosno pitanje' });
                }
                const hashedPassword = yield bcrypt.hash(novaLozinka, 10);
                user.lozinka = hashedPassword;
                yield user.save();
                res.json({ message: 'Lozinka uspešno promenjena' });
            }
            catch (error) {
                console.error('Greška pri promeni lozinke sa sigurnosnim odgovorom:', error);
                res.status(500).json({ message: 'Greška pri promeni lozinke sa sigurnosnim odgovorom', error });
            }
        });
    }
    updateUserByAdmin(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const korisnickoIme = req.params.korisnickoIme;
            const updatedData = req.body;
            try {
                const user = yield user_1.default.findOneAndUpdate({ korisnickoIme: korisnickoIme }, updatedData, { new: true });
                if (!user) {
                    return res.status(404).json({ message: "User not found" });
                }
                res.status(200).json(user);
            }
            catch (error) {
                res.status(500).json({ message: "Error updating user", error });
            }
        });
    }
}
exports.UserController = UserController;
