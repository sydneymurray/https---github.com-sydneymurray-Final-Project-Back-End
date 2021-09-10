import { Router } from "express";
import { createOneTrack } from "./controller";

const trackRouter = Router();

trackRouter.post("/", createOneTrack);

export default trackRouter;
