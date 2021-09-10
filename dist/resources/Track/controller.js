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
exports.createOneTrack = void 0;
const client_1 = __importDefault(require("../../utils/client"));
function createOneTrack(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const trackDetails = req.body;
        try {
            const allTracks = yield client_1.default.track.findMany();
            const artistCheck = allTracks.some(track => track.artistName === trackDetails.artistName);
            const trackNameCheck = allTracks.some(track => track.trackName === trackDetails.trackName);
            if (artistCheck && trackNameCheck) {
                const trackRequired = yield client_1.default.track.findFirst({
                    where: {
                        artistName: trackDetails.artist,
                        trackName: trackDetails.trackName
                    }
                });
                return res.json({ msg: "this track was already in the DB", data: trackRequired });
            }
        }
        catch (error) {
            res
                .status(401)
                .json({ msg: "You do not have permission to access this route" });
        }
        try {
            const newTrack = yield client_1.default.track.create({
                data: trackDetails,
            });
            res.json({
                msg: "track successfully added to DB",
                data: newTrack,
            });
        }
        catch (error) {
            console.error("what's the problem", error);
            res
                .status(401)
                .json({ msg: "You do not have permission to access this route" });
        }
    });
}
exports.createOneTrack = createOneTrack;
