import { Router } from "express";
import {
  loginUser,
  createUser,
  getAllListings,
  logoutUser,
} from "./controller";

const authRouter = Router();

authRouter.route("/login").post(loginUser);
authRouter.route("/sign-up").post(createUser);
authRouter.route("/listings").get(getAllListings);

// jdw added below

authRouter.route("/logout").get(logoutUser);

export default authRouter;
