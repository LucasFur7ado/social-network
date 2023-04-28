import { writable } from "svelte/store"

const search = writable({
    searching: null,
    data: null 
})

export default search 