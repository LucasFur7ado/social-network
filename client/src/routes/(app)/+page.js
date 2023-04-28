import { redirect } from '@sveltejs/kit'
import Cookies from 'js-cookie'

export const ssr = false

export const load = async () => {
    if (!(Cookies.get('access-token') ?? false))
        throw redirect(303, '/login')
} 