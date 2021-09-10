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
exports.logoutUser = exports.getAllListings = exports.createUser = exports.loginUser = void 0;
const service_1 = require("./service");
const JWTGenerator_1 = require("../../utils/JWTGenerator");
const service_2 = require("./service");
const client_1 = __importDefault(require("../../utils/client"));
const loginUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const loginDetails = req.body;
    try {
        const loggedUser = yield (0, service_1.findUserWithValidation)(loginDetails);
        const token = (0, JWTGenerator_1.createToken)({
            id: loggedUser.id,
            username: loggedUser.username,
        });
        res.cookie("token", token, { httpOnly: true });
        res.json({ user: { id: loggedUser.id, username: loggedUser.username } });
    }
    catch (error) {
        res.status(401).json({ msg: error.message });
    }
});
exports.loginUser = loginUser;
const createUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const newUser = req.body;
    try {
        const savedUser = yield service_2.user.create({ data: newUser });
        const token = (0, JWTGenerator_1.createToken)({
            id: savedUser.id,
            username: savedUser.username,
        });
        res.cookie("token", token, { httpOnly: true });
        res.json({ user: { id: savedUser.id, username: savedUser.username } });
    }
    catch (error) {
        res.status(412).json({
            msg: "You probably entered the sign up data in an invalid way ",
        });
    }
});
exports.createUser = createUser;
const getAllListings = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const allListings = yield client_1.default.listings.findMany({
            where: {
                forSale: true
            },
            select: {
                id: true,
                price: true,
                forSale: true,
                notes: true,
                condition: true,
                format: true,
                User: {
                    select: {
                        username: true,
                    },
                },
                Track: {
                    select: {
                        artistName: true,
                        trackName: true,
                        coverURL: true,
                    },
                },
                Album: {
                    select: {
                        artist: true,
                        albumname: true,
                        coverURL: true,
                    },
                },
            },
        });
        res.json({ data: allListings });
    }
    catch (error) {
        console.error(error);
        res
            .status(500)
            .json({ msg: "There seems to be a problem with our servers" });
    }
});
exports.getAllListings = getAllListings;
const logoutUser = (req, res) => {
    res.cookie("token", "", { maxAge: 1 });
    res.redirect("/");
};
exports.logoutUser = logoutUser;
