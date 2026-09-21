import orderModel from "../models/orderModel.js"
import userModel from "../models/userModel.js"


// ===============================
// PLACE ORDER - COD
// ===============================
const placeOrder = async (req, res) => {

    try {

        const { userId, items, amount, address } = req.body

        const orderData = {
            userId,
            items,
            amount,
            address,
            paymentMethod: "COD",
            payment: false,
            date: Date.now()
        }

        const newOrder = new orderModel(orderData)

        await newOrder.save()

        // Clear user cart
        await userModel.findByIdAndUpdate(
            userId,
            { cartData: {} }
        )

        res.json({
            success: true,
            message: "Order Placed"
        })

    } catch (error) {

        console.log(error)

        res.json({
            success: false,
            message: error.message
        })

    }

}


// ===============================
// PLACE ORDER - STRIPE
// ===============================
const placeOrderStripe = async (req, res) => {

    try {

        res.json({
            success: false,
            message: "Stripe payment is not available yet"
        })

    } catch (error) {

        console.log(error)

        res.json({
            success: false,
            message: error.message
        })

    }

}


// ===============================
// PLACE ORDER - RAZORPAY
// ===============================
const placeOrderRazorpay = async (req, res) => {

    try {

        res.json({
            success: false,
            message: "Razorpay payment is not available yet"
        })

    } catch (error) {

        console.log(error)

        res.json({
            success: false,
            message: error.message
        })

    }

}


// ===============================
// ALL ORDERS - ADMIN
// ===============================
const allOrders = async (req, res) => {

    try {

        const orders = await orderModel.find({})

        res.json({
            success: true,
            orders
        })

    } catch (error) {

        console.log(error)

        res.json({
            success: false,
            message: error.message
        })

    }

}


// ===============================
// USER ORDERS - FRONTEND
// ===============================
const userOrders = async (req, res) => {

    try {

        const { userId } = req.body

        console.log("USER ID:", userId)

        const orders = await orderModel.find({
            userId: userId
        })

        console.log("ORDERS FOUND:", orders.length)

        res.json({
            success: true,
            orders
        })

    } catch (error) {

        console.log(error)

        res.json({
            success: false,
            message: error.message
        })

    }

}


// ===============================
// UPDATE ORDER STATUS - ADMIN
// ===============================
const updateStatus = async (req, res) => {

    try {

        const { orderId, status } = req.body

        await orderModel.findByIdAndUpdate(
            orderId,
            { status }
        )

        res.json({
            success: true,
            message: "Status Updated"
        })

    } catch (error) {

        console.log(error)

        res.json({
            success: false,
            message: error.message
        })

    }

}


export {
    placeOrder,
    placeOrderStripe,
    placeOrderRazorpay,
    allOrders,
    userOrders,
    updateStatus
}