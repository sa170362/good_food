import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import userRouter from "./routers/user.router";
import restoranRouter from "./routers/restoran.router";
import rezervacijaRouter from "./routers/rezervacija.router";
import NarudzbinaRouter from "./routers/narudzbina.router";

const app = express();
const path = require('path');

app.use(cors());
app.use(express.json());
// app.use('/uploads', express.static(path.join(__dirname, '/uploads')));
app.use(express.static('uploads'));
app.use('/uploads', express.static('uploads'));
// app.use(express.static('uploads'));
mongoose.connect("mongodb://127.0.0.1:27017/lego");
const connection = mongoose.connection;
connection.once("open", () => {
  console.log("db connection ok");
});

const router = express.Router();
router.use("/users", userRouter);
router.use("/restorani", restoranRouter);
router.use("/rezervacije", rezervacijaRouter);
router.use("/porudzbine", NarudzbinaRouter);

app.use("/", router);

app.listen(4000, () => console.log(`Express server running on port 4000`));
