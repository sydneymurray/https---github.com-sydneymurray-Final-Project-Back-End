"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteOne = exports.retrieveAll = exports.createOne = void 0;
const client_1 = __importDefault(require("../../utils/client"));
function createOne(req, res) {
    let authDetails = req.currentUser;
    client_1.default.favourites.create({ data: {
            user: Number(authDetails.id),
            listing: Number(req.body.listing)
        } })
        .then(dbResponse => res.json(dbResponse))
        .catch(dbResponse => res.status(500).json({
        msg: "Data was not saved due to a problem",
        error: dbResponse
    }));
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
