"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const controller_1 = require("./controller");
const authRouter = (0, express_1.Router)();
authRouter.route("/login").post(controller_1.loginUser);
authRouter.route("/sign-up").post(controller_1.createUser);
authRouter.route("/listings").get(controller_1.getAllListings);
// jdw added below
authRouter.route("/logout").get(controller_1.logoutUser);
exports.default = authRouter;
