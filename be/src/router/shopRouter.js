import {getAllData, getDataById, createData, updateData, deleteData} from "../controllers/shopController.js";
import { getCart, updateCart, addToCart, deleteCart, deleteAllCart} from "../controllers/cartController.js";
import express from "express"

const router = express.Router()

router.get('/', getAllData)
router.get('/cart', getCart)
router.get('/:id', getDataById)
router.post('/', addToCart)
router.post('/toko', createData)
router.delete('/', deleteAllCart)
router.delete('/cart/:id', deleteCart)
router.patch('/:id', updateData)

router.patch('/cart/:id', updateCart)

export default router


// penjelasan:
// router.get('/', getToko) -> ketika ada request dengan method get dan path '/' maka akan menjalankan fungsi getToko
// router.get('/:id', getTokoById) -> ketika ada request dengan method get dan path '/:id' maka akan menjalankan fungsi getTokoById
// router.post('/', saveToko) -> ketika ada request dengan method post dan path '/' maka akan menjalankan fungsi saveToko
// router.delete('/', deleteAllToko) -> ketika ada request dengan method delete dan path '/' maka akan menjalankan fungsi deleteAllToko
// router.delete('/:id', deleteToko) -> ketika ada request dengan method delete dan path '/:id' maka akan menjalankan fungsi deleteToko
// router.patch('/:id', updateToko) -> ketika ada request dengan method patch dan path '/:id' maka akan menjalankan fungsi updateToko
