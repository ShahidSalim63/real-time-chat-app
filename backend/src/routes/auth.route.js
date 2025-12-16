import { Router } from "express";

import { signup, login, logout, checkAuth, getAllUsers } from '../controllers/auth.controller.js'
import { protectRoute } from '../middleware/auth.middleware.js'

const router = Router()

router.post('/signup', signup)
router.post('/login', login)
router.post('/logout', logout)
router.get('/check-auth', protectRoute, checkAuth)
router.get('/get-all-users', getAllUsers)

export default router
