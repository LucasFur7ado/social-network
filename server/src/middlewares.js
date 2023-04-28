import { verifyUser } from "./services/verifyUser.js"

const verify = async (req, res, next, att) => {
    const token = req.headers.authorization ?? false
    const verified = await verifyUser(token)
    if (!verified[att])
        return res.status(401).send({ success: false, message: 'Invalid credentials' })
    req.body = {
        ...req.body,
        userId: verified.user.id
    }
    next()
}

export const isAdmin = async (req, res, next) => {
    verify(req, res, next, 'isAdmin')
}

export const isLogged = async (req, res, next) => {
    verify(req, res, next, 'isLogged')
}