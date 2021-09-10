import { Request, Response } from "express"
import { User } from "@prisma/client";
import dbClient from "../../utils/client";

export const getCurrentUser = async (req: Request, res: Response) => {
    const authDetails = req.currentUser as User

    try {
        const currentUser = await dbClient.user.findUnique({
            where: { id: Number(authDetails.id) },
            select: {
                id: true,
                name: true,
                username: true,
                email:true
            }
        })
    
        res.json({ data: currentUser })
    } catch (error) {
        res.status(401).json({ msg: "You don't seem to be logged in???" })
    }
}