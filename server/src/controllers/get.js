import { promisePool } from '../db/index.js'

export const get = {}

get.getLists = async (req, res) => {
    await Promise.all([
        await promisePool.query(`SELECT * FROM lists WHERE userId = ${req.body.userId}`),
        await promisePool.query(`SELECT users.username, users.name, users.id 
        FROM users WHERE id IN (SELECT followerId FROM follow WHERE followedId 
        = ${req.body.userId} INTERSECT SELECT followedId FROM follow WHERE 
        followerId = ${req.body.userId}) LIMIT 5`)
    ]).then(async r => {
        res.send({
            success: true,
            lists: r[0][0],
            people: r[1][0]
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
    await Promise.all([
        await promisePool.query(`SELECT users.username, users.name, users.followers,
      users.id FROM users WHERE id = ${id}`),
        await promisePool.query(`SELECT *
      FROM posts WHERE userId = ${id} ORDER BY createdAt DESC`),
        await promisePool.query(`SELECT followerId FROM follow WHERE followedId = ${id}
      AND followerId = ${req.body.userId}`),
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
            userId = ${req.body.userId} AND postId IN (${postIds.slice(0, -1)})`)
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
    let q = `select users.id, users.name, users.username, posts.* 
    from users join posts on users.id = posts.userId and posts.isPublic = 1
    and users.id IN (SELECT followedId from follow where followerId = 
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
