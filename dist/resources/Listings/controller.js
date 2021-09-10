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
exports.createOneListing = void 0;
const client_1 = __importDefault(require("../../utils/client"));
function createOneListing(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const listingDetails = req.body;
        const currentUser = req.currentUser;
        if (listingDetails.albumId) {
            try {
                const newListing = yield client_1.default.listings.create({
                    data: {
                        user: currentUser.id,
                        price: Number(listingDetails.price),
                        notes: listingDetails.notes,
                        format: listingDetails.format,
                        condition: listingDetails.condition,
                        albumId: listingDetails.albumId,
                    },
                });
                res.json({
                    msg: "listing successfully added to DB",
                    data: newListing,
                });
            }
            catch (error) {
                res
                    .status(401)
                    .json({ msg: "You do not have permission to access this route" });
            }
        }
        if (listingDetails.trackId) {
            try {
                const newListing = yield client_1.default.listings.create({
                    data: {
                        user: currentUser.id,
                        price: Number(listingDetails.price),
                        notes: listingDetails.notes,
                        format: listingDetails.format,
                        condition: listingDetails.condition,
                        track: listingDetails.trackId,
                    },
                });
                res.json({
                    msg: "listing successfully added to DB",
                    data: newListing,
                });
            }
            catch (error) {
                res
                    .status(401)
                    .json({ msg: "You do not have permission to access this route" });
            }
        }
    });
}
exports.createOneListing = createOneListing;
