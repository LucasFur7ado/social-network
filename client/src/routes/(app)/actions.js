import { Fetcher } from '$lib/services/fetcher'
import postStore from '$lib/store/post.js'
import { goto } from '$app/navigation'
import Cookies from 'js-cookie'

export const getContacts = async () => {
    let result = {}
    await Fetcher.get(`/getContacts`)
        .then(async res => {
            result.data = res.data.people 
        })
        .catch(err => {
            if (err?.response?.status == 401) {
                goto('/login')
            }
            result = {
                ...result,
                error: err.response.data.message,
                success: false
            }
        })
    return result
}

export const loadUser = async () => {
    let user = Cookies.get('user') ?? false
    if (!user)
        return null
    return JSON.parse(user)
}

export const loadData = async () => {
    let result = {
        success: true,
        error: null,
        data: null
    }
    await Fetcher.get(`/getPublicPosts`)
        .then(async res => {
            result.data = res.data.data
        })
        .catch(err => {
            console.log("Error => ", err)
            if (err?.response?.status == 401) {
                goto('/login')
            }
            result = {
                ...result,
                error: err.response.data.message,
                success: false
            }
        })
    return result
}

export const handleSubmit = async (e) => {
    e.preventDefault()
    postStore.update(p => p = {
        ...p,
        posting: true
    })
    const formData = new FormData(e.target)
    if (!formData.get('content') || !formData.get('who')) {
        alert("Empty data")
        return
    }
    Fetcher.post('/newPost', {
        content: formData.get('content'),
        who: formData.get('who'),
    })
        .then(res => {
            if (!res.data.success)
                throw new Error(res.data.message)
            postStore.update(p => p = {
                ...p,
                posting: false,
                success: true,
                newPost: res.data.post
            })
        })
        .catch(err => {
            postStore.update(p => p = {
                ...p,
                posting: false,
                error: err,
                success: false
            })
        })
    setTimeout(() => {
        postStore.update(p => p = {
            ...p,
            posting: null,
            error: null,
            success: null
        })
    }, 3000)
}

export const logOut = () => {
    Cookies.remove('access-token')
    Cookies.remove('user')
    goto('/login')
}