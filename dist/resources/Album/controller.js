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
exports.createOneAlbum = void 0;
const client_1 = __importDefault(require("../../utils/client"));
function createOneAlbum(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const albumDetails = req.body;
        try {
            const allAlbums = yield client_1.default.album.findMany();
            const artistCheck = allAlbums.some(album => album.artist === albumDetails.artist);
            const albumNameCheck = allAlbums.some(album => album.albumname === albumDetails.albumname);
            if (artistCheck && albumNameCheck) {
                const albumRequired = yield client_1.default.album.findFirst({
                    where: {
                        artist: albumDetails.artist,
                        albumname: albumDetails.albumname
                    }
                });
                return res.json({ msg: "this album was already in the DB", data: albumRequired });
            }
        }
        catch (error) {
            res
                .status(401)
                .json({ msg: "You do not have permission to access this route" });
        }
        try {
            const newAlbum = yield client_1.default.album.create({
                data: albumDetails,
            });
            res.json({
                msg: "album successfully added to DB",
                data: newAlbum,
            });
        }
        catch (error) {
            res
                .status(401)
                .json({ msg: "You do not have permission to access this route" });
        }
    });
}
exports.createOneAlbum = createOneAlbum;
