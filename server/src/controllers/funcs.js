import { promisePool } from '../db/index.js'

export const funcs = {}

funcs.like = async (req, res) => {
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

funcs.search = async (req, res) => {
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

funcs.follow = async (req, res) => {
    const { toFollow, unfollow, userId } = req.body
    if (!toFollow || unfollow == undefined)
        return res.send({
            success: false,
            message: 'Empty data'
        })
    if (toFollow == userId)
        return res.send({
            success: false,
            message: 'You cant follow yourself'
        })
    let q = unfollow ? `delete from follow where followedId = 
    ${toFollow} AND followerId = ${userId}`
        : `insert into follow(followerId, followedId) 
    values(${userId}, ${toFollow})`
    await Promise.all([
        await promisePool.query(q),
        await promisePool.query(`UPDATE users SET
            followers = followers ${unfollow ? '- 1' : '+ 1'} 
            WHERE users.id = ${toFollow}`)
    ]).then(async r => {
        if (r[0][0].affectedRows && r[1][0].affectedRows)
            return res.send({ success: true })
        throw new Error('Something went wrong')
    })
        .catch(err => {
            console.log("Error => ", err)
            res.send({
                success: false,
                message: err
            })
        })
}

// TODO: express validator validations 
funcs.newPost = async (req, res) => {
    if (!req.body.content)
        return res.send({
            success: false,
            message: 'Empty data'
        })
    const { userId, who, content } = req.body
    const q = `insert into posts (userId, content ${!who ? '' : ', isPublic'}
    ${who ? ', destinationUserId' : ''}) 
        values (?, ? ${!who ? '' : ', false'} ${who ? ', ?' : ''})`
    const values = !who ? [userId, content] : [userId, content, who]
    await promisePool.query(q, values)
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
