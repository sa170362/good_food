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
const storage = multer_1.default.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + '-' + Date.now() + path_1.default.extname(file.originalname));
    }
});
const upload = (0, multer_1.default)({
    storage: storage,
    limits: { fileSize: 2 * 1024 * 1024 },
    fileFilter: (req, file, cb) => {
        if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
            cb(null, true); // Accept only JPEG and PNG files
        }
        else {
            cb(new Error('Only JPEG and PNG images are allowed'));
        }
    }
});
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
        this.login = (req, res) => {
            let korisnickoIme = req.body.korisnickoIme;
            let lozinka = req.body.lozinka;
            user_1.default.findOne({ korisnickoIme: korisnickoIme, lozinka: lozinka })
                .then((user) => {
                res.json(user);
            })
                .catch((err) => console.log(err));
        };
        this.register = (req, res) => __awaiter(this, void 0, void 0, function* () {
            // console.log(req)
            let korisnickoIme = req.body.korisnickoIme;
            const hashedPassword = yield bcrypt.hash(req.body.lozinka, 10);
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
            let profilnaSlika = req.body.profilnaSlika ? req.body.profilnaSlika : 'frontend\src\assets\default_profile.jpg';
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
                brojKreditneKartice: brojKreditneKartice
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
            user_1.default.findOneAndUpdate({ korisnickoIme: req.body.korisnickoIme }, { profilna_slika: filePath }, { new: true })
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
    }
}
exports.UserController = UserController;
