import { Fetcher } from '$lib/services/fetcher.js'

export const loadFollowers = async () => {
    let result = {}
    await Fetcher.get(`/getFollowers`)
        .then(async res => {
            result.data = {
                success: true,
                followers: res.data.followers
            }
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