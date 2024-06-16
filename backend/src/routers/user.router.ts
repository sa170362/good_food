import express from "express";
import { UserController } from "../controllers/user.controller";
import multer from "multer";
const userRouter = express.Router();
const controller = new UserController();
const upload = multer({ dest: 'uploads/' });

userRouter
  .route("/login")
  .post((req, res) => new UserController().login(req, res));

  userRouter
  .route("/profile")
  .get((req, res) => new UserController().getProfile(req, res))  // Nova ruta za dohvat profila
  .put((req, res) => new UserController().updateUser(req, res));  // Ruta za ažuriranje profila

userRouter
  .route("/profile/upload")
  .post(upload.single('profilna_slika'), (req, res) => new UserController().uploadProfilePicture(req, res));  // Ruta za učitavanje profilne slike

export default userRouter;
