import { Fetcher } from "../services/fetcher"

export const like = async (id, liked) => {
    Fetcher.post('/like', { 
        id, unlike: liked
    }) .catch(err => {
        console.log("ERR => ", err)
    })
}