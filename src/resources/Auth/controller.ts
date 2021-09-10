import { Request, Response } from "express";
import { User } from "@prisma/client";
import { findUserWithValidation } from "./service";
import { createToken } from "../../utils/JWTGenerator";
import { user } from "./service";
import dbClient from "../../utils/client";

export const loginUser = async (req: Request, res: Response) => {
  const loginDetails: User = req.body;

  try {
    const loggedUser = await findUserWithValidation(loginDetails);

    const token = createToken({
      id: loggedUser.id,
      username: loggedUser.username,
    });
    res.cookie("token", token, { httpOnly: true });
    res.json({ user: { id: loggedUser.id, username: loggedUser.username } });
  } catch (error: any) {
    res.status(401).json({ msg: error.message });
  }
};

export const createUser = async (req: Request, res: Response) => {
  const newUser = req.body;
  try {
    const savedUser = await user.create({ data: newUser });

    const token = createToken({
      id: savedUser.id,
      username: savedUser.username,
    });
    res.cookie("token", token, { httpOnly: true });
    res.json({ user: { id: savedUser.id, username: savedUser.username } });
  } catch (error) {
    res.status(412).json({
      msg: "You probably entered the sign up data in an invalid way ",
    });
  }
};

export const getAllListings = async (req: Request, res: Response) => {
  try {
    const allListings = await dbClient.listings.findMany({
      where: {
        forSale: true
      },
      select: {
        id: true,
        price: true,
        forSale: true,
        notes: true,
        condition: true,
        format: true,
        User: {
          select: {
            username: true,
          },
        },
        Track: {
          select: {
            artistName: true,
            trackName: true,
            coverURL: true,
          },
        },
        Album: {
          select: {
            artist: true,
            albumname: true,
            coverURL: true,
          },
        },
      },
    });
    res.json({ data: allListings });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ msg: "There seems to be a problem with our servers" });
  }
};

export const logoutUser = (req: Request, res: Response) => {
  res.cookie("token", "", { maxAge: 1 });
  res.redirect("/");
};

