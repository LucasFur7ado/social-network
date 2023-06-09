import { writable } from "svelte/store"

const contacts = writable({
    contacts: null
})

export default contacts