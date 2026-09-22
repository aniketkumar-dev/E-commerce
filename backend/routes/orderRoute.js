import express from 'express'

import {
    placeOrder,
    placeOrderStripe,
    placeOrderRazorpay,
    allOrders,
    userOrders,
    updateStatus,
    verifyStripe
} from '../controllers/orderController.js'

import adminAuth from '../middleware/adminAuth.js'
import authUser from '../middleware/auth.js'

const orderRouter = express.Router()


// Place order
orderRouter.post('/place', authUser, placeOrder)

// Stripe
orderRouter.post('/stripe', authUser, placeOrderStripe)

// Verify Stripe payment
orderRouter.post('/verifyStripe', authUser, verifyStripe)

// Razorpay - later
orderRouter.post('/razorpay', authUser, placeOrderRazorpay)

// All orders
orderRouter.post('/list', adminAuth, allOrders)

// User orders
orderRouter.post('/userorders', authUser, userOrders)

// Update order status
orderRouter.post('/status', adminAuth, updateStatus)


export default orderRouter