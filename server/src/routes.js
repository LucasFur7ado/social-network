import { Router } from 'express'
import { controllers } from './controllers.js'
import { isLogged, isAdmin } from './middlewares.js'

const router = Router()

router.post('/login', controllers.login)
router.get('/search/:text', controllers.search)

// router.post('/register', controllers.register)
// router.get('/getUser', controllers.getPrivatePosts)

router.post('/like', isLogged, controllers.like)
router.post('/follow', isLogged, controllers.follow)
router.post('/newPost', isLogged, controllers.newPost)
router.get('/verifyLogin', isLogged, controllers.verifyLogin)
router.get('/getProfile/:id', isLogged, controllers.getProfile)
router.get('/getPublicPosts', isLogged, controllers.getPublicPosts)

export default router