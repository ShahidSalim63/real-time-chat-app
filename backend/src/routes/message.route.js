import { Router } from 'express'

import { protectRoute } from '../middleware/auth.middleware.js'
import { getUsersForSidebar, getMessages, sendMessages } from '../controllers/message.controller.js'

const router = new Router()

router.get('/users', protectRoute, getUsersForSidebar)
router.get('/:_id', protectRoute, getMessages)
router.post('/send/:id', protectRoute, sendMessages)

export default router