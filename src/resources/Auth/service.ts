import dbClient from "../../utils/client"
import { User } from "prisma/prisma-client"
import { compare } from "bcrypt"
import { hash } from "bcrypt"

export const findUserWithValidation = async (userData: User) => {
    const userDataFromDB = await dbClient.user.findUnique({
        where: {
            email : userData.email
        }
    })

    if (!userDataFromDB) throw new Error("Username/Password is incorrect")

    const isPasswordValid = await compare(userData.password, userDataFromDB.password)

    if (!isPasswordValid) throw new Error("Username/Password is incorrect")

    return userDataFromDB
}

const create = async ({ data: newUser } : { data : User }) => {
    const passwordString = newUser.password

    const hashedPassword = await hash(passwordString, 10)
    const savedUser = await dbClient.user.create({ data: {...newUser, password: hashedPassword} }) 

    return savedUser
}

export const user = {
    ...dbClient.user,
    create
}