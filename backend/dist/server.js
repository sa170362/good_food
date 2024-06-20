"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const mongoose_1 = __importDefault(require("mongoose"));
const user_router_1 = __importDefault(require("./routers/user.router"));
const restoran_router_1 = __importDefault(require("./routers/restoran.router"));
const rezervacija_router_1 = __importDefault(require("./routers/rezervacija.router"));
const narudzbina_router_1 = __importDefault(require("./routers/narudzbina.router"));
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
mongoose_1.default.connect("mongodb://127.0.0.1:27017/lego");
const connection = mongoose_1.default.connection;
connection.once("open", () => {
    console.log("db connection ok");
});
const router = express_1.default.Router();
router.use("/users", user_router_1.default);
router.use("/restorani", restoran_router_1.default);
router.use("/rezervacije", rezervacija_router_1.default);
router.use("/porudzbine", narudzbina_router_1.default);
app.use("/", router);
app.listen(4000, () => console.log(`Express server running on port 4000`));
