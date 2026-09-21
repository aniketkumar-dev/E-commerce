import express from 'express'
import {
    addToCart,
    updateCart,
    getUserCart
} from '../controllers/cartController.js'
import authUser from '../middleware/auth.js'

const cartRouter = express.Router()

// add products to user cart
cartRouter.post('/add', authUser, addToCart)

// update cart
cartRouter.post('/update', authUser, updateCart)

// get user cart
cartRouter.post('/get', authUser, getUserCart)

export default cartRouter