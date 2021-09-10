"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const controller_1 = require("./controller");
const trackRouter = (0, express_1.Router)();
trackRouter.post("/", controller_1.createOneTrack);
exports.default = trackRouter;
