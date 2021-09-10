import { PrismaClient } from ".prisma/client"
import { hash } from "bcrypt";
import { users, tracks, listings } from "../src/utils/mockData"


const prisma = new PrismaClient()

console.log("Here are my imports, ", users, tracks, listings);

async function seed() {
    for (let user of users) {
        const hashedPassword = await hash(user.password, 10)
        user = {...user, password: hashedPassword}
        await prisma.user.create({
            data: user
        })
    }
    for (const track of tracks) {
        await prisma.track.create({
            data: track
        })
    }
    for (const listing of listings) {
        await prisma.listings.create({
            data: listing
        })
    }
}

seed()
.catch(async (e)=>{
    console.error(e);
    await prisma.$disconnect()
    process.exit(1)
})
.finally(async ()=>{
    await prisma.$disconnect()
})