"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RestoranController = void 0;
const restoran_1 = __importDefault(require("../models/restoran"));
class RestoranController {
    constructor() {
        this.getAllRestorani = (req, res) => {
            restoran_1.default.find()
                .then((restorani) => {
                res.json(restorani);
            })
                .catch((err) => {
                console.log(err);
                res.status(500).json({ message: "Eror pri dovlacenju restorana" });
            });
        };
        this.getRestoran = (req, res) => {
            const ime = req.params.restoran;
            console.log(ime);
            restoran_1.default.findOne({ ime: ime })
                .then((restorani) => {
                res.json(restorani);
            })
                .catch((err) => {
                console.log(err);
                res.status(500).json({ message: "Eror pri dovlacenju restorana" });
            });
        };
        this.getRestoranById = (req, res) => {
            const id = req.params.id;
            restoran_1.default.findById(id)
                .then((restoran) => {
                if (!restoran) {
                    res.status(404).json({ message: "Restoran nije nadjen" });
                }
                else {
                    res.json(restoran);
                }
            })
                .catch((err) => {
                console.log(err);
                res.status(500).json({ message: "Error" });
            });
        };
        this.addRestoran = (req, res) => {
            const { ime, adresa, tip, kratakOpis, kontaktOsoba, workingHours } = req.body;
            const newRestoran = new restoran_1.default({
                ime,
                adresa,
                tip,
                kratakOpis,
                kontaktOsoba,
                workingHours
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
        this.saveLayoutForRestoran = (req, res) => {
            const { ime } = req.params;
            const { layout } = req.body;
            restoran_1.default.findOne({ ime: ime })
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
}
exports.RestoranController = RestoranController;
