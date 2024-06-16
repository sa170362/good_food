"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserController = void 0;
const user_1 = __importDefault(require("../models/user"));
const path_1 = __importDefault(require("path"));
const multer_1 = __importDefault(require("multer"));
// Konfiguracija za multer
const storage = multer_1.default.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + '-' + Date.now() + path_1.default.extname(file.originalname));
    }
});
const upload = (0, multer_1.default)({ storage: storage });
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
            let korisnickoIme = req.query.korisnickoIme; // Pretpostavka da je korisničko ime prosleđeno kao query parametar
            user_1.default.findOne({ korisnickoIme: korisnickoIme })
                .then((user) => {
                res.json(user);
            })
                .catch((err) => {
                console.error('Error fetching user', err);
                res.status(500).json({ message: err });
            });
        };
    }
}
exports.UserController = UserController;
