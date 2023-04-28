import { Fetcher } from "$lib/services/fetcher"

export const follow = async (idToFollow) => {
    let result = {
        success: true,
        error: null,
        data: null
    }
    await Fetcher.post(`/follow`, {
        toFollow: idToFollow
    })
        .then(async res => {
           console.log("RES", res)
        })
        .catch(err => result = {
            ...result,
            error: err,
            success: false
        })
    return result
}

export const loadProfile = async (id) => {
    let result = {
        success: true,
        error: null,
        data: null
    }
    await Fetcher.get(`/getProfile/${id}`)
        .then(async res => {
            result = {
                ...result,
                data: {
                    user: res.data.data.user,
                    posts: res.data.data.posts.map(p => {
                        return {
                            ...p,
                            username: res.data.data.user.username,
                            name: res.data.data.user.name
                        }
                    })
                },
            }
        })
        .catch(err => result = {
            ...result,
            error: err,
            success: false
        })
    return result 
}