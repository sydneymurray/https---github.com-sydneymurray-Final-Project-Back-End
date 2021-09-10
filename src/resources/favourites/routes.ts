import { Router } from "express";
import { retrieveAll } from "./controller";
import {createOne} from "./controller"
import {deleteOne} from "./controller"
const favouritesRouter = Router()

favouritesRouter.get("/", retrieveAll)
favouritesRouter.delete("/:id", deleteOne)
favouritesRouter.post("/add", createOne)

export default favouritesRouter 