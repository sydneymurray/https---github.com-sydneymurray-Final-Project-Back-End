"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const morgan_1 = __importDefault(require("morgan"));
const express_1 = __importDefault(require("express"));
const dotenv_1 = require("dotenv");
const routes_1 = __importDefault(require("./resources/user/routes"));
const cors_1 = __importDefault(require("cors"));
const routes_2 = __importDefault(require("./resources/Auth/routes"));
const JWTGenerator_1 = require("./utils/JWTGenerator");
const routes_3 = __importDefault(require("./resources/favourites/routes"));
const routes_4 = __importDefault(require("./resources/Album/routes"));
const routes_5 = __importDefault(require("./resources/Listings/routes"));
const routes_6 = __importDefault(require("./resources/Track/routes"));
const routes_7 = __importDefault(require("./resources/transactions/routes"));
(0, dotenv_1.config)();
var app = (0, express_1.default)();
// view engine setup
app.use((0, cors_1.default)({
    origin: "http://localhost:3000",
    credentials: true,
}));
app.use((0, morgan_1.default)("dev"));
app.use(express_1.default.json());
app.use((0, cookie_parser_1.default)());
//app.use(express.static(path.join(__dirname, 'public')));
// app.use('/', indexRouter);
app.use(routes_2.default);
app.use((req, res, next) => {
    const token = req.cookies.token;
    const userData = (0, JWTGenerator_1.validateToken)(token);
    if (userData) {
        req.currentUser = userData;
        next();
    }
    else {
        res.status(401).json({ err: "You are not logged in" });
    }
});
app.use("/favourites", routes_3.default);
app.use("/users", routes_1.default);
app.use("/albums", routes_4.default);
app.use("/listings", routes_5.default);
app.use("/tracks", routes_6.default);
app.use("/transactions", routes_7.default);
// catch 404 and forward to error handler
app.all("*", (req, res) => {
    res.status(404).json("Route Not Found");
});
module.exports = app;
