"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const user_controller_1 = require("../controllers/user.controller");
const multer_1 = __importDefault(require("multer"));
const userRouter = express_1.default.Router();
const controller = new user_controller_1.UserController();
const upload = (0, multer_1.default)({ dest: 'uploads/' });
userRouter
    .route("/login")
    .post((req, res) => new user_controller_1.UserController().login(req, res));
userRouter
    .route("/profile")
    .get((req, res) => new user_controller_1.UserController().getProfile(req, res)) // Nova ruta za dohvat profila
    .put((req, res) => new user_controller_1.UserController().updateUser(req, res)); // Ruta za ažuriranje profila
userRouter
    .route("/profile/upload")
    .post(upload.single('profilna_slika'), (req, res) => new user_controller_1.UserController().uploadProfilePicture(req, res)); // Ruta za učitavanje profilne slike
//   userRouter.route("/register").post(
//     (req,res)=>new UserController().register(req,res)
// )
userRouter.route("/register").post(upload.single('profilnaSlika'), (req, res) => controller.register(req, res));
userRouter
    .route("/check-username/:korisnickoIme")
    .get((req, res) => {
    console.log("Request received for check-username");
    controller.checkUsername(req, res);
}); // Ruta za proveru jedinstvenosti korisničkog imena
userRouter
    .route("/check-email/:mejl")
    .get((req, res) => controller.checkEmail(req, res)); // Ruta za proveru jedinstvenosti email-a
exports.default = userRouter;
