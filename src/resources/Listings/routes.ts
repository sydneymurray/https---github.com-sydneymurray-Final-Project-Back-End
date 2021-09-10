import { Router } from "express";
import { createOneListing } from "./controller";

const listingRouter = Router();

listingRouter.post("/", createOneListing);

export default listingRouter;
