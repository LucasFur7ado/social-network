import { writable } from "svelte/store"

const post = writable({
    posting: null,
    error: null,
    succes: null,
    newPost: null
})

export default post