import { Fetcher } from "$lib/services/fetcher"
import { goto } from '$app/navigation'

export const follow = async (idToFollow, following) => {
    if(idToFollow == following) 
        return 
    let result = {
        success: true,
        error: null,
        data: null
    }
    await Fetcher.post(`/follow`, {
        toFollow: idToFollow,
        unfollow: following 
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
        .catch(err => {
            console.log("Error => ", err)
            result = {
                ...result,
                error: err,
                success: false
            }
            if(err.response.status == 401)
                goto('/login')
        })
    return result 
}