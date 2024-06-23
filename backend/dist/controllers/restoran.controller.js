"use strict";
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
exports.RestoranController = void 0;
const restoran_1 = __importDefault(require("../models/restoran"));
const restoran_2 = __importDefault(require("../models/restoran"));
class RestoranController {
    constructor() {
        // dohvatanje svih restorana sa ocenama
        this.getAllRestorani = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const restorani = yield restoran_2.default.find();
                res.json(restorani);
            }
            catch (error) {
                res.status(500).json({});
            }
        });
        this.getRestoranByName = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const restoran = yield restoran_2.default.findOne({ ime: req.params.ime });
                if (!restoran)
                    return res.status(404).json({ message: 'Restoran not found' });
                res.json(restoran);
            }
            catch (error) {
                res.status(500).json();
            }
        });
        this.addRestoran = (req, res) => {
            const { ime, adresa, tip, kratakOpis, kontaktOsoba, workingHoursFrom, workingHoursTo } = req.body;
            const newRestoran = new restoran_1.default({
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
    }
}
exports.RestoranController = RestoranController;
