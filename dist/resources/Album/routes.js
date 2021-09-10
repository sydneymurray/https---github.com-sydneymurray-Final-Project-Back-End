"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const controller_1 = require("./controller");
const albumRouter = (0, express_1.Router)();
albumRouter.post("/", controller_1.createOneAlbum);
exports.default = albumRouter;
