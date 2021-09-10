import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.SECRET_KEY as string

export function createToken(payload: jwt.JwtPayload) {
    return jwt.sign(payload, JWT_SECRET)
}

export function validateToken(token: string) {
    return jwt.verify(token, JWT_SECRET)
}