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
exports.retrieveAll = exports.createOne = void 0;
const client_1 = __importDefault(require("../../utils/client"));
function createOne(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        let authDetails = req.currentUser;
        let listingInfo = yield client_1.default.listings.findUnique({
            select: { user: true },
            where: { id: req.body.listing }
        });
        if (!listingInfo) {
            res.status(500).json({
                msg: "Data was not saved due to a problem"
            });
        }
        let transaction = {
            listing: Number(req.body.listing),
            new_ownerId: Number(authDetails.id),
            previous_ownerId: Number(listingInfo === null || listingInfo === void 0 ? void 0 : listingInfo.user)
        };
        if (transaction.previous_ownerId) {
            let dbResponse = yield client_1.default.transaction_Table.create({
                data: transaction
            });
            yield client_1.default.listings.update({
                where: { id: Number(req.body.listing) },
                data: { forSale: false }
            });
            res.json({ data: dbResponse });
        }
        res.status(500).json({
            msg: "Data was not saved due to a problem"
        });
    });
}
exports.createOne = createOne;
function retrieveAll(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const authDetails = req.currentUser;
        console.log(authDetails);
        let dbResponseSold = yield client_1.default.transaction_Table.findMany({
            where: { previous_ownerId: authDetails.id },
            include: { Listing: {
                    include: { Track: true }
                },
                previous_owner: { select: { id: true, email: true, username: true, name: true } },
                new_owner: { select: { id: true, email: true, username: true, name: true } } },
        });
        if (!dbResponseSold)
            res.status(500).json({
                msg: "Data was not retrieved due to a problem", error: dbResponseSold
            });
        let dbResponseBought = yield client_1.default.transaction_Table.findMany({
            include: { Listing: {
                    include: { Track: true }
                },
                previous_owner: { select: { id: true, email: true, username: true, name: true } },
                new_owner: { select: { id: true, email: true, username: true, name: true } } },
            where: { new_ownerId: authDetails.id }
        });
        if (!dbResponseBought)
            res.status(500).json({
                msg: "Data was not retrieved due to a problem", error: dbResponseSold
            });
        let result = {
            sold: [...dbResponseSold],
            bought: [...dbResponseBought]
        };
        res.json(result);
    });
}
exports.retrieveAll = retrieveAll;
