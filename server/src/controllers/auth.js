import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { promisePool } from '../db/index.js'
import { sendEmail } from '../services/sendEmail.js'
import { generateCode } from '../services/generateCode.js'

export const auth = {}

auth.verifyLogin = async (req, res) => {
    res.send({ success: true })
}

auth.login = async (req, res) => {
    let obj = {
        email: null,
        password: null
    }
    if (Object.keys(obj).some(k => !req.body[k]))
        return res.send({
            success: false,
            message: 'Empty data'
        })
    const query = `SELECT * FROM users WHERE email = '${req.body.email}'`
    const [rows] = await promisePool.query(query)
    const user = rows[0]
    if (req.body.email !== user?.email ||
        !(await bcrypt.compare(req.body.password, user?.password)))
        return res.send({
            success: false,
            message: 'Invalid credentials'
        })
    const token = jwt.sign({ id: user?.id }, process.env.LOGIN_SECRET, {
        expiresIn: '6h'
    })
    res.send({
        success: true, token, user: {
            username: user.username,
            name: user.name,
            id: user.id
        }
    })
}

auth.register = async (req, res) => {
    let obj = {
        name: null,
        email: null,
        username: null,
        password: null
    }
    if (Object.keys(obj).some(k => !req.body[k]))
        return res.status(400).send({
            success: false,
            message: 'Empty data'
        })
    const pw = await bcrypt.hash(req.body.password, 10)
    const code = await generateCode()
    const encryptedCode = await bcrypt.hash(code, 10)
    try {
        await promisePool.query(`INSERT INTO users (name, username, email, password, vCode)
        VALUES('${req.body.email}', '${pw}', '${encryptedCode}')`)
    } catch (err) {
        console.log("Error => ", err)
        if (err.errno == 1062)
            return res.send({ success: false, message: 'User already exist' })
        return res.send({ success: false, message: 'Something went wrong' })
    }
    const [rows] = await promisePool.query(`SELECT id FROM users
    WHERE email = '${req.body.email}'`)
    const token = jwt.sign({ id: rows[0]?.id }, process.env.LOGIN_SECRET)
    try {
        await sendEmail(req.body.email, code)
    } catch (err) {
        console.log("Error => ", err)
        await promisePool.query(`DELETE FROM users WHERE email = 
        '${req.body.email}'`)
        return {
            success: false,
            message: "Something went wrong, please try again later"
        }
    }
    res.send({ success: true, token })
}

// auth.confirm = async (req, res) => {
//     const { code } = req.body
//     if (!code)
//         return res.send({ success: false, message: 'Empty data' })
//     const result = await verifyUser(req.headers.authorization)
//     if (result.isVerified)
//         return res.send({ success: false, message: 'Already verified' })
//     const queryResult = await promisePool.query(`SELECT vCode FROM users
//     WHERE id = ${result.id}`)
//     if (!queryResult[0].length)
//         return res.send({ success: false, message: 'User does not exist' })
//     const bdCode = queryResult[0][0].vCode
//     const validCode = await bcrypt.compare(code, bdCode)
//     if (!validCode)
//         return res.send({ success: false, message: 'Invalid code' })
//     const [ResultSetHeader] = await promisePool.query(`UPDATE users SET vCode = NULL, isVerified
//     = true WHERE id = ${result.id}`)
//     if (ResultSetHeader.affectedRows)
//         return res.send({ success: true })
//     res.send({ success: false, message: 'Something went wrong' })
// }