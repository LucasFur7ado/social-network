import { Fetcher } from "$lib/services/fetcher"
import searchStore from '$lib/store/search.js'

export const search = async (e) => {
    e.preventDefault()
    const formData = new FormData(e.target)
    if (!formData.get('user'))
        return result
    searchStore.update(s => s = {
        ...s,
        searching: true
    })
    Fetcher.get(`/search/${formData.get('user')}`)
        .then(async res => {
            if (res?.data?.success)
                searchStore.update(s => s = {
                    ...s,
                    searching: false,
                    data: res.data.data
                })
        })
        .catch(err => {
            console.log("Error => ", err)
            searchStore.update(s => s = {
                ...s,
                searching: false,
                error: err 
            })
        })
}