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
exports.deleteOne = exports.retrieveAll = exports.createOne = void 0;
const client_1 = __importDefault(require("../../utils/client"));
function createOne(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        let authDetails = req.currentUser;
        const favouriteCheck = yield client_1.default.favourites.findFirst({
            where: {
                listing: Number(req.body.listing),
                user: Number(authDetails.id)
            }
        });
        console.log(favouriteCheck);
        if (!favouriteCheck) {
            const favouriteData = yield client_1.default.favourites.create({ data: {
                    user: Number(authDetails.id),
                    listing: Number(req.body.listing)
                } });
            res.json({ data: favouriteData });
        }
        else
            res.status(403).json({ msg: "You cannot add the same listing twice" });
        // .catch (dbResponse =>
        // {    res.status(500).json({ 
        //         msg: "Data was not saved due to a problem",
        //         error: dbResponse
        // })
    });
}
exports.createOne = createOne;
function retrieveAll(req, res) {
    const authDetails = req.currentUser;
    try {
        client_1.default.favourites.findMany({
            include: { Listings: { include: { Track: true } } },
            where: { user: Number(authDetails.id) },
        })
            .then(dbResponse => res.json({ data: dbResponse }));
    }
    catch (error) {
        res.status(401).json({ msg: "No favourites were found" });
    }
}
exports.retrieveAll = retrieveAll;
function deleteOne(req, res) {
    const authDetails = req.currentUser;
    try {
        client_1.default.favourites.delete({
            where: { id: Number(req.params.id) },
        })
            .then(dbResponse => res.json({ data: dbResponse }));
    }
    catch (error) {
        res.status(401).json({ msg: "No favourite to delete was found" });
    }
}
exports.deleteOne = deleteOne;
