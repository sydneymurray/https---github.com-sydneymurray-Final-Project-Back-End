import { Router } from "express";
import { createOneAlbum } from "./controller";

const albumRouter = Router();

albumRouter.post("/", createOneAlbum);

export default albumRouter;
