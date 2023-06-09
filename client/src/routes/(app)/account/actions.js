import { Fetcher } from '$lib/services/fetcher.js'
import { goto } from '$app/navigation'

export const deleteAccount = async () => {
    let result = {}
    await Fetcher.get(`/deleteAccount`)
        .then(async res => {
            if(res.data.success) goto('/login')
        })
        .catch(err => {
            result = {
                ...result,
                error: err,
                success: false
            }
            if (err.response.status == 401)
                goto('/login')
        })
    return result
}

export const loadFullUser = async (id) => {
    let result = {}
    await Fetcher.get(`/getMyUser`)
        .then(async res => {
            console.log("RES => ", res)
            result.data = res?.data.user
        })
        .catch(err => {
            result = {
                ...result,
                error: err,
                success: false
            }
            if (err.response.status == 401)
                goto('/login')
        })
    return result
}