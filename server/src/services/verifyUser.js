import jwt from 'jsonwebtoken'
import { promisePool } from '../db/index.js'

export const verifyUser = async (token) => {
    if (token == 'undefined' || !token || token == 'null') {
        return { success: false, message: 'Empty data' }
    }
    let verified, res = {
        success: true,
        message: null,
        user: null
    }, tk = token.split(' ')[1]
    try {
        verified = jwt.verify(tk, process.env.LOGIN_SECRET)
    } catch (err) {
        console.log("Error => ", err)
        return {
            ...res,
            success: false,
            message: err
        }
    }
    if (!verified?.id)
        return { success: false, message: 'Invalid credentials' }
    const query = `SELECT id, username, name, role, email, isVerified FROM users 
    WHERE id = ${verified?.id}`
    const queryResult = await promisePool.query(query)
    const user = queryResult[0][0]
    if (!user)
        return {
            ...res,
            success: false,
            isLogged: false, 
            message: 'Not logged'
        }
    return {
        ...res,
        message: 'Ok',
        isLogged: true,
        isAdmin: Boolean(verified.role),
        user
    }
}