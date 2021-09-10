import { Request, Response } from "express"
import { User } from "@prisma/client";
import dbClient from "../../utils/client";


export async function createOne(req: Request, res: Response){
    let authDetails = req.currentUser as User
    const favouriteCheck = await dbClient.favourites.findFirst({
        where: {
            listing: Number(req.body.listing),
            user: Number(authDetails.id)
        }
    })
    console.log(favouriteCheck);
    if (!favouriteCheck) {
        const favouriteData = await dbClient.favourites.create({data:{
            user: Number(authDetails.id),
            listing: Number(req.body.listing)
        }})

        res.json({ data: favouriteData })
    }
    else res.status(403).json({ msg: "You cannot add the same listing twice" })
        // .catch (dbResponse =>
        // {    res.status(500).json({ 
        //         msg: "Data was not saved due to a problem",
        //         error: dbResponse
        // })
        
    }

export function retrieveAll(req: Request, res: Response){
    const authDetails = req.currentUser as User
    try {
        dbClient.favourites.findMany({
            include:{Listings: {include: {Track: true}}},
            where: {user: Number(authDetails.id)},
        })
        .then(dbResponse => res.json({ data: dbResponse }))
    } 
    catch (error) {
        res.status(401).json({ msg: "No favourites were found" })
    }
}

export function deleteOne(req: Request, res: Response){
    const authDetails = req.currentUser as User
    try {
        dbClient.favourites.delete({
            where: {id: Number(req.params.id)},
        })
        .then(dbResponse => res.json({ data: dbResponse }))
    } 
    catch (error) {
        res.status(401).json({ msg: "No favourite to delete was found" })
    }
}




