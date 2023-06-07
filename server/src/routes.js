import { Router } from 'express'
import { get } from './controllers/get.js'
import { auth } from './controllers/auth.js'
import { funcs } from './controllers/funcs.js'
import { isLogged, isAdmin } from './middlewares.js'

const router = Router()

router.post('/login', auth.login)
router.get('/verifyLogin', isLogged, auth.verifyLogin)

// router.post('/register', controllers.register)
// router.get('/getUser', controllers.getPrivatePosts)

router.get('/getLists', isLogged, get.getLists)
router.get('/getProfile/:id', isLogged, get.getProfile)
router.get('/getPublicPosts', isLogged, get.getPublicPosts)

router.get('/search/:text', funcs.search)
router.post('/like', isLogged, funcs.like)
router.post('/follow', isLogged, funcs.follow)
router.post('/newPost', isLogged, funcs.newPost)

export default router