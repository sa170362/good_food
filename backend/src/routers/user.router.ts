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
  .route("/loginAdmin")
  .post((req, res) => new UserController().loginAdmin(req, res));
  userRouter
  .route("/profile")
  .get((req, res) => new UserController().getProfile(req, res))  // Nova ruta za dohvat profila
  .put((req, res) => new UserController().updateUser(req, res));  // Ruta za ažuriranje profila

userRouter
  .route("/profile/upload")
  .post(upload.single('profilna_slika'), (req, res) => new UserController().uploadProfilePicture(req, res));  // Ruta za učitavanje profilne slike


//   userRouter.route("/register").post(
//     (req,res)=>new UserController().register(req,res)
    
// )
userRouter.route("/register").post(upload.single('profilnaSlika'), (req, res) => controller.register(req, res));

userRouter
  .route("/check-username/:korisnickoIme")
  .get((req, res) =>  {
    console.log("Request received for check-username");
    controller.checkUsername(req, res);
  }); // Ruta za proveru jedinstvenosti korisničkog imena

userRouter
  .route("/check-email/:mejl")
  .get((req, res) => controller.checkEmail(req, res)); // Ruta za proveru jedinstvenosti email-a

  userRouter.route('/type/:type').get((req, res) => controller.getUsersByType(req, res));

  userRouter.put('/deactivateUserGuest/:korisnickoIme', (req, res) => {
    controller.deactivateUserGuest(req, res);
  });
  userRouter.put('/deactivateUserKonobar/:korisnickoIme', (req, res) => {
    controller.deactivateUserGuest(req, res);
  });
  userRouter.route('/requests').get((req, res) => controller.getRequests(req, res));
  userRouter.route('/blocked').get((req, res) => controller.getUsersBlocked(req, res));
  userRouter.get('/pending-guests', controller.getPendingGuests);
  userRouter
  .get('/users', (req, res) => {
    const userType = req.query.type as string;
    const status = req.query.status as string;

    if (userType === 'gost' && status === 'pending') {
      controller.getPendingGuests(req, res);
    } else {
      res.status(400).json({ message: 'Invalid query parameters' });
    }
  });
  userRouter.put('/activateUser/:korisnickoIme', (req, res) => {
    controller.activateUser(req, res);
  });
  userRouter.put('/rejectUser/:korisnickoIme', (req, res) => {
    controller.rejectUser(req, res);
  });

  userRouter.put('/users/:korisnickoIme', (req, res) => controller.updateUserByAdmin(req, res));
  userRouter.get('/getusers/:korisnickoIme', (req, res) => controller.getUserByUsername(req, res));
  userRouter.route("/registerKonobar").post(upload.single('profilnaSlika'), (req, res) => controller.registerKonobar(req, res));
  userRouter.put('/unblockUser/:korisnickoIme', (req, res) => {
    controller.unblockUser(req, res);
  });

  userRouter.get('/security-question/:username', controller.getSecurityQuestion);
  userRouter.get('/brojRegistrovanihGostiju', controller.getBrojRegistrovanihGostiju);
  userRouter.put('/change-password', (req, res) => controller.changePassword(req, res));
  userRouter.get('/konobari/:imeRestorana', controller.getKonobari);
export default userRouter;
