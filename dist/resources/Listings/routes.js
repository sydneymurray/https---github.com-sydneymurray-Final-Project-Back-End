"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const controller_1 = require("./controller");
const listingRouter = (0, express_1.Router)();
listingRouter.post("/", controller_1.createOneListing);
exports.default = listingRouter;
