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
const client_1 = __importDefault(require("../../utils/client"));
const bcrypt_1 = require("bcrypt");
const create = ({ data: newUser }) => __awaiter(void 0, void 0, void 0, function* () {
    const passwordString = newUser.password;
    const hashedPassword = yield (0, bcrypt_1.hash)(passwordString, 10);
    const savedUser = yield client_1.default.user.create({ data: Object.assign(Object.assign({}, newUser), { password: hashedPassword }) });
    return savedUser;
});
exports.default = Object.assign(Object.assign({}, client_1.default.user), { create });
