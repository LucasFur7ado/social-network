import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { promisePool } from './db/index.js'
import { sendEmail } from './services/sendEmail.js'
import { generateCode } from './services/generateCode.js'

export const controllers = {}

controllers.like = async (req, res) => {
    if (!req.body.id || req.body.unlike == undefined)
        return res.send({
            success: false,
            message: 'Empty data'
        })

    let q = req.body.unlike ?
        `DELETE FROM postLikes WHERE userId = ${req.body.userId} AND 
        postId = ${req.body.id}` :
        `INSERT INTO postLikes(postId, userId)
        VALUES (${req.body.id}, ${req.body.userId})`

    await promisePool.query(q)
        .then(async r => {
            // TODO: create trigger instead of manually   
            // update likesCount in posts 
            await promisePool.query(`UPDATE posts SET likesCount = likesCount 
            ${req.body.unlike ? '- 1' : '+ 1'} where id = ${req.body.id}`)
                .then(async r2 => {
                    if (r2[0].affectedRows)
                        res.send({ success: true })
                })
        })
        .catch(err => {
            console.log("Error => ", err)
            res.send({
                success: false,
                message: err
            })
        })
}

controllers.verifyLogin = async (req, res) => {
    res.send({ success: true })
}

controllers.search = async (req, res) => {
    let text = req.params.text
    if (!text)
        res.send({
            success: false,
            message: 'Empty text'
        })
    await promisePool.query(`select id, name, username from users 
        where name LIKE '%${text}%' OR username LIKE '%${text}%'`)
        .then(async r => {
            res.send({
                success: true,
                data: r[0]
            })
        })
        .catch(err => {
            console.log("Error => ", err)
            res.send({
                success: false,
                message: err
            })
        })
}

controllers.follow = async (req, res) => {
    if (!req.body.toFollow)
        return res.send({
            success: false,
            message: 'Empty data'
        })
    await promisePool.query(`insert into follow(followerId, followedId) 
    values(${req.body.userId}, ${req.body.toFollow})`)
        .then(async r => {
            res.send({ success: true })
        })
        .catch(err => {
            console.log("Error => ", err)
            res.send({
                success: false,
                message: err
            })
        })
}

controllers.getProfile = async (req, res) => {
    let id = req.params.id
    await promisePool.query(`select users.username, users.name,
    users.followers, posts.* from users  
    JOIN posts on posts.userId = ${id} and users.id = ${id} and posts.isPublic = 1`)
        .then(async result => {
            let postIds = '', finalData, user = result[0][0]
            result[0].map(r => postIds += r.id + ',')
            finalData = result[0]
            await promisePool.query(`select postId from postLikes where
            userId = ${req.body.userId} and postId IN (${postIds.slice(0, -1)})`)
                .then(result2 => {
                    finalData = finalData.map(f => {
                        return {
                            ...f,
                            liked: result2[0].some(i => i.postId == f.id)
                        }
                    })
                    res.send({
                        success: true,
                        data: {
                            user: {
                                followers: user.followers,
                                username: user.username,
                                name: user.name,
                                id: user.id,
                            },
                            posts: finalData
                        }})})})
        .catch(err => {
            console.log("Error => ", err)
            res.send({
                success: false,
                message: err
            })
        })
}

controllers.newPost = async (req, res) => {
    if (!req.body.content)
        return res.send({
            success: false,
            message: 'Empty data'
        })
    await promisePool.query(`insert into posts(userId, content) 
        values(${req.body.userId}, '${req.body.content}')`)
        .then(async result => {
            await promisePool.query(`select * from posts where id = 
            ${result[0].insertId}`)
                .then(result2 => res.send({
                    success: true,
                    post: result2[0][0]
                }))
        })
        .catch(err => {
            console.log("Error => ", err)
            res.send({
                success: false,
                message: err
            })
        })
}

controllers.getPublicPosts = async (req, res) => {
    let q = `select users.id, users.name, users.username, posts.* 
    from users join posts on users.id = posts.userId and posts.isPublic = 1
    and posts.createdAt >= DATE_SUB(NOW(), INTERVAL 2 DAY) and
    users.id IN (SELECT followedId from follow where followerId = 
    ${req.body.userId}) ORDER BY createdAt DESC`

    await promisePool.query(q)
        .then(async result => {
            if(!result[0].length)
                return res.send({
                    success: true,
                    data: []
                })
            let postIds = '', finalData
            result[0].map(r => postIds += r.id + ',')
            finalData = result[0]
            await promisePool.query(`select postId from postLikes where
            userId = ${req.body.userId} and postId IN (${postIds.slice(0, -1)})`)
                .then(result2 => {
                    finalData = finalData.map(f => {
                        return {
                            ...f,
                            liked: result2[0].some(i => i.postId == f.id)
                        }
                    })
                    res.send({
                        success: true,
                        data: finalData
                    })
                })
        })
        .catch(err => {
            console.log("Error => ", err)
            res.send({
                success: false,
                message: err
            })
        })
}

controllers.login = async (req, res) => {
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

controllers.register = async (req, res) => {
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

// controllers.confirm = async (req, res) => {
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