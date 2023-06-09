import { promisePool } from '../db/index.js'

export const get = {}

get.getMyUser = async (req, res) => {
    await promisePool.query(`SELECT email, username, name, isVerified 
    FROM users WHERE id = ${req.body.userId}`)
        .then(async r => {
            res.send({
                success: true,
                user: r[0]
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

get.getFollowers = async (req, res) => {
    await promisePool.query(`
    SELECT U.name, U.username, U.id FROM users AS U WHERE U.id IN (
        SELECT F.followerId FROM follow AS F 
        WHERE F.followedId = ${req.body.userId}
    )`)
        .then(async r => {
            res.send({
                success: true,
                followers: r[0]
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

get.getContacts = async (req, res) => {
    await Promise.all([
        await promisePool.query(`SELECT users.username, users.name, users.id 
        FROM users WHERE id IN (SELECT followerId FROM follow WHERE followedId 
        = ${req.body.userId} INTERSECT SELECT followedId FROM follow WHERE 
        followerId = ${req.body.userId}) LIMIT 5`)
    ]).then(async r => {
        res.send({
            success: true,
            people: r[0][0]
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

get.getProfile = async (req, res) => {
    let id = req.params.id
    const { userId } = req.body
    await Promise.all([
        await promisePool.query(`SELECT users.username, users.name, users.followers,
      users.id FROM users WHERE id = ${id}`),
        await promisePool.query(`SELECT *
      FROM posts WHERE userId = ${id} AND isPublic = 1 ORDER BY createdAt DESC`),
        await promisePool.query(`SELECT followerId FROM follow WHERE followedId = ${id}
      AND followerId = ${userId}`),
    ]).then(async r => {
        let result = {
            success: true,
            data: { user: null, posts: [] }
        }, finalData, postIds = '', user = r[0][0][0]

        if (!r[0][0].length)
            return res.send({
                ...result,
                success: false,
                message: 'Invalid user'
            })
        result.data.user = {
            followed: Boolean(r[2][0].length),
            followers: user.followers,
            username: user.username,
            name: user.name,
            id: user.id,
        }
        if (!r[1][0].length)
            return res.send(result)

        r[1][0].map(r => postIds += r.id + ',')
        finalData = r[1][0]
        await promisePool.query(`SELECT postId FROM postLikes WHERE
            userId = ${userId} AND postId IN (${postIds.slice(0, -1)})`)
            .then(r2 => {
                finalData = finalData.map(f => {
                    return { ...f, liked: r2[0].some(i => i.postId == f.id) }
                })
                res.send({
                    ...result,
                    data: {
                        ...result.data,
                        posts: finalData
                    }
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

get.getPublicPosts = async (req, res) => {
    let q = `SELECT users.id, users.name, users.username, posts.* 
    FROM users JOIN posts ON users.id = posts.userId AND posts.isPublic = 1
    OR (posts.isPublic = 0 AND posts.destinationUserId = ${req.body.userId})
    AND users.id IN (SELECT followedId FROM follow WHERE followerId = 
    ${req.body.userId}) ORDER BY createdAt DESC`

    // ONLY IN PRODUCTION, WITH MANY POSTS
    // and posts.createdAt >= DATE_SUB(NOW(), INTERVAL 2 DAY) 

    await promisePool.query(q)
        .then(async result => {
            if (!result[0].length)
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
