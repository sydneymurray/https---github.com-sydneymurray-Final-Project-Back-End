import { User } from ".prisma/client";
import { Request, Response } from "express";
import dbClient from "../../utils/client";

export async function createOneListing(req: Request, res: Response) {
  const listingDetails = req.body;
  const currentUser = req.currentUser as User;

  if (listingDetails.albumId) {
    try {
      const newListing = await dbClient.listings.create({
        data: {
          user: currentUser.id,
          price: Number(listingDetails.price),
          notes: listingDetails.notes,
          format: listingDetails.format,
          condition: listingDetails.condition,
          albumId: listingDetails.albumId,
        },
      });
      res.json({
        msg: "listing successfully added to DB",
        data: newListing,
      });
    } catch (error) {
      res
        .status(401)
        .json({ msg: "You do not have permission to access this route" });
    }
  }

  if (listingDetails.trackId) {
    try {
      const newListing = await dbClient.listings.create({
        data: {
          user: currentUser.id,
          price: Number(listingDetails.price),
          notes: listingDetails.notes,
          format: listingDetails.format,
          condition: listingDetails.condition,
          track: listingDetails.trackId,
        },
      });
      res.json({
        msg: "listing successfully added to DB",
        data: newListing,
      });
    } catch (error) {
      res
        .status(401)
        .json({ msg: "You do not have permission to access this route" });
    }
  }
}
