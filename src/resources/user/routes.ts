import { Router } from "express";
import { getCurrentUser } from "./controller";

const userRouter = Router()

userRouter.get("/current", getCurrentUser)

export default userRouter 