import express from 'express'
const router = express.Router()
import {protecct, admin} from '../middleware/authMiddleware.js'

import {
    authUser,
    getUserProfile,
    registerUser,
    updateUserProfile,
    getUsers,
    deleteUser,
    getUserById ,
    updateUser
} from '../controllers/userController.js'




router.post('/login', authUser)
router.post('/', registerUser)
router.delete('/:id', protecct, admin, deleteUser)
router.get('/:id', protecct, admin, getUserById)
router.put('/:id', protecct, admin, updateUser)
router.get('/', protecct, admin, getUsers)
router
.route('/profile')
.get(protecct, getUserProfile)
.put(protecct, updateUserProfile)



export default router;