import { Request, Response } from "express";
import dbClient from "../../utils/client";

export async function createOneTrack(req: Request, res: Response) {
  const trackDetails = req.body;
  try {
    const allTracks = await dbClient.track.findMany()
    
    const artistCheck = allTracks.some(track=>track.artistName === trackDetails.artistName)
  
    const trackNameCheck = allTracks.some(track=>track.trackName === trackDetails.trackName)
  
    if (artistCheck && trackNameCheck) {
      const trackRequired = await dbClient.track.findFirst({
        where: {
          artistName: trackDetails.artist,
          trackName: trackDetails.trackName
        }
      })
      return res.json({ msg: "this track was already in the DB", data: trackRequired})
    }
  } catch (error) {
    res
    .status(401)
    .json({ msg: "You do not have permission to access this route" });
  }

  try {
    const newTrack = await dbClient.track.create({
      data: trackDetails,
    });
    res.json({
      msg: "track successfully added to DB",
      data: newTrack,
    });
  } catch (error) {
    console.error("what's the problem", error);

    res
      .status(401)
      .json({ msg: "You do not have permission to access this route" });
  }
}
