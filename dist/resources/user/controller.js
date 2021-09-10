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
exports.getCurrentUser = void 0;
const client_1 = __importDefault(require("../../utils/client"));
const getCurrentUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const authDetails = req.currentUser;
    try {
        const currentUser = yield client_1.default.user.findUnique({
            where: { id: Number(authDetails.id) },
            select: {
                id: true,
                name: true,
                username: true,
                email: true
            }
        });
        res.json({ data: currentUser });
    }
    catch (error) {
        res.status(401).json({ msg: "You don't seem to be logged in???" });
    }
});
exports.getCurrentUser = getCurrentUser;
