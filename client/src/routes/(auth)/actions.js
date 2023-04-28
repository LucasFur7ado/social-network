import { Fetcher } from "../../lib/services/fetcher"
import { goto } from "$app/navigation"
import Cookies from 'js-cookie'

export const login = async (e) => {
    e.preventDefault()
    const formData = new FormData(e.target)
    Fetcher.post('/login', {
        email: formData.get('email'),
        password: formData.get('password') 
    })
    .then(res => {
        if(!res.data.success)
            throw new Error(res.data.message)
        Cookies.set('access-token', JSON.stringify(res.data.token), {
            path: '/'
        })
        Cookies.set('user', JSON.stringify(res.data.user), {
            path: '/'
        })
        goto('/')
    })
    .catch(err => {
        console.log("Err => ", err?.response?.data?.message ?? err)
    })  
}

export const register = async (e) => {
    return 
    e.preventDefault()
    const formData = new FormData(e.target)
    Fetcher.post('/register', {
        email: formData.get('email'),
        password: formData.get('password') 
    })
    .then(res => console.log("SUBMIT RES => ", res))
    .catch(err => console.log("SUBMIT ERR =A> ", err.response.data.message))
}