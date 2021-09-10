import { Request, Response } from "express"
import { User } from "@prisma/client";
import dbClient from "../../utils/client";


export async function createOne(req: Request, res: Response){
  let authDetails = req.currentUser as User
  
  let listingInfo = await dbClient.listings.findUnique({
    select:{user: true},
    where: {id: req.body.listing}
  })
  if (!listingInfo) {
    res.status(500).json({ 
        msg: "Data was not saved due to a problem"
    })
  }

  let transaction = {
    listing: Number(req.body.listing),
    new_ownerId: Number(authDetails.id),
    previous_ownerId: Number(listingInfo?.user)  
  }

  if (transaction.previous_ownerId) {
    let dbResponse = await dbClient.transaction_Table.create({
    data: transaction})
    await dbClient.listings.update({
      where: { id: Number(req.body.listing) },
      data: { forSale: false }
    })
    res.json({ data: dbResponse })
  }
  res.status(500).json({ 
    msg: "Data was not saved due to a problem"
  })
}

export async function retrieveAll(req: Request, res: Response){
  const authDetails = req.currentUser as User
  console.log(authDetails)

  let dbResponseSold = await dbClient.transaction_Table.findMany({
    where: {previous_ownerId : authDetails.id},
     include: {Listing: {
      include: {Track: true}},
        previous_owner: {select: {id: true, email: true, username: true, name: true}},
        new_owner:{select: {id: true, email: true, username: true, name: true}}},
  })

  if (!dbResponseSold) res.status(500).json({ 
    msg: "Data was not retrieved due to a problem", error: dbResponseSold
  })

  let dbResponseBought = await dbClient.transaction_Table.findMany({
    include: {Listing: {
      include: {Track: true}},
        previous_owner: {select: {id: true, email: true, username: true, name: true}},
        new_owner:{select: {id: true, email: true, username: true, name: true}}},
   where: {new_ownerId: authDetails.id}
  })

  if (!dbResponseBought) res.status(500).json({ 
    msg: "Data was not retrieved due to a problem", error: dbResponseSold
  })
  
  let result = {
      sold: [...dbResponseSold],
      bought: [...dbResponseBought]
  }

  res.json(result)
  }








