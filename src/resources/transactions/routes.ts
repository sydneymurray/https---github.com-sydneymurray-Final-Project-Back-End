import { Router } from "express";
import { retrieveAll } from "./controller";
import {createOne} from "./controller"

const transactionRouter = Router()

transactionRouter.get("/", retrieveAll)
transactionRouter.post("/", createOne)

export default transactionRouter 