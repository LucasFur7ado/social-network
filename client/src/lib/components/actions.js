import { Fetcher } from "../services/fetcher"

export const like = async (id, liked) => {
    Fetcher.post('/like', { 
        id, 
        unlike: liked
    })
    .then(res => {
        console.log("RES => ", res)
    })
    .catch(err => {
        console.log("ERR => ", err)
    })
}