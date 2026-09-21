import express from 'express'

import {
    placeOrder,
    placeOrderStripe,
    placeOrderRazorpay,
    allOrders,
    userOrders,
    updateStatus
} from '../controllers/orderController.js'

import authUser from '../middleware/auth.js'
import adminAuth from '../middleware/adminAuth.js'

const orderRouter = express.Router()


// placing orders using cod method
orderRouter.post('/place', authUser, placeOrder)


// placing order using stripe method
orderRouter.post('/stripe', authUser, placeOrderStripe)


// placing orders using Razorpay Method
orderRouter.post('/razorpay', authUser, placeOrderRazorpay)


// all orders data for admin panel
orderRouter.post('/list', adminAuth, allOrders)


// user order data for frontend
orderRouter.post('/userorders', authUser, userOrders)


// update order status from admin panel
orderRouter.post('/status', adminAuth, updateStatus)


export default orderRouter