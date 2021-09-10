import { Request, Response } from "express";
import dbClient from "../../utils/client";

export async function createOneAlbum(req: Request, res: Response) {
  const albumDetails = req.body;
  try {
    const allAlbums = await dbClient.album.findMany()
    
    const artistCheck = allAlbums.some(album=>album.artist === albumDetails.artist)
  
    const albumNameCheck = allAlbums.some(album=>album.albumname === albumDetails.albumname)
  
    if (artistCheck && albumNameCheck) {
      const albumRequired = await dbClient.album.findFirst({
        where: {
          artist: albumDetails.artist,
          albumname: albumDetails.albumname
        }
      })
      return res.json({ msg: "this album was already in the DB", data: albumRequired})
    }
  } catch (error) {
    res
    .status(401)
    .json({ msg: "You do not have permission to access this route" });
  }
  

  try {
    const newAlbum = await dbClient.album.create({
      data: albumDetails,
    });
    res.json({
      msg: "album successfully added to DB",
      data: newAlbum,
    });
  } catch (error) {
    res
      .status(401)
      .json({ msg: "You do not have permission to access this route" });
  }
}