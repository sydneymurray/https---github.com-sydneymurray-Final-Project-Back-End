"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const controller_1 = require("./controller");
const controller_2 = require("./controller");
const transactionRouter = (0, express_1.Router)();
transactionRouter.get("/", controller_1.retrieveAll);
transactionRouter.post("/", controller_2.createOne);
exports.default = transactionRouter;
