import express from 'express'
const router = express.Router()
import {protecct, admin} from '../middleware/authMiddleware.js'
import {
    getProducts,
    getProductById,
    deleteProduct,
    createProduct,
    updateProduct,
    createProductReview,
    getTopProducts
} from '../controllers/productController.js'




router.route('/').get(getProducts)
router.post('/', protecct, admin, createProduct)
router.post('/:id/reviews', protecct, createProductReview)
router.get('/top', getTopProducts)
 
router.route('/:id').get(getProductById)
router.delete('/:id', protecct, admin, deleteProduct)
router.put('/:id', protecct, admin, updateProduct)




export default router;