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
        // Dodajte ostale metode za dodavanje, izmenu i brisanje restorana ako je potrebno
    }
}
exports.RestoranController = RestoranController;
