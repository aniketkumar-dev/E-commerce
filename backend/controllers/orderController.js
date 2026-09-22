// import orderModel from "../models/orderModel.js"
// import userModel from "../models/userModel.js"
// import Stripe from 'stripe'


// // gateway initialise
// const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)


// // ===============================
// // PLACE ORDER - COD
// // ===============================
// const placeOrder = async (req, res) => {

//     try {

//         const { userId, items, amount, address } = req.body

//         const orderData = {
//             userId,
//             items,
//             amount,
//             address,
//             paymentMethod: "COD",
//             payment: false,
//             date: Date.now()
//         }

//         const newOrder = new orderModel(orderData)

//         await newOrder.save()

//         // Clear user cart
//         await userModel.findByIdAndUpdate(
//             userId,
//             { cartData: {} }
//         )

//         res.json({
//             success: true,
//             message: "Order Placed"
//         })

//     } catch (error) {

//         console.log(error)

//         res.json({
//             success: false,
//             message: error.message
//         })

//     }

// }


// // ===============================
// // PLACE ORDER - STRIPE
// // ===============================
// const placeOrderStripe = async (req, res) => {

//     try {

//         const { userId, items, amount, address } = req.body
//         const { origin } = req.headers

//         const orderData = {
//             userId,
//             items,
//             amount,
//             address,
//             paymentMethod: "Stripe",
//             payment: false,
//             date: Date.now()
//         }

//         const newOrder = new orderModel(orderData)

//         await newOrder.save()

//         const line_items = items.map((item) => ({
//             price_data: {
//                 currency: "usd",
//                 product_data: {
//                     name: item.name
//                 },
//                 unit_amount: Math.round(item.price * 100)
//             },
//             quantity: item.quantity
//         }))

//         const session = await stripe.checkout.sessions.create({
//             success_url: `${origin}/verify?success=true&orderId=${newOrder._id}`,
//             cancel_url: `${origin}/verify?success=false&orderId=${newOrder._id}`,
//             line_items,
//             mode: "payment"
//         })

//         res.json({
//             success: true,
//             session_url: session.url
//         })

//     } catch (error) {

//         console.log(error)

//         res.json({
//             success: false,
//             message: error.message
//         })

//     }

// }

// // ===============================
// // PLACE ORDER - RAZORPAY
// // ===============================
// const placeOrderRazorpay = async (req, res) => {

//     try {

//         res.json({
//             success: false,
//             message: "Razorpay payment is not available yet"
//         })

//     } catch (error) {

//         console.log(error)

//         res.json({
//             success: false,
//             message: error.message
//         })

//     }

// }


// // ===============================
// // ALL ORDERS - ADMIN
// // ===============================
// const allOrders = async (req, res) => {

//     try {

//         const orders = await orderModel.find({})

//         res.json({
//             success: true,
//             orders
//         })

//     } catch (error) {

//         console.log(error)

//         res.json({
//             success: false,
//             message: error.message
//         })

//     }

// }


// // ===============================
// // USER ORDERS - FRONTEND
// // ===============================
// const userOrders = async (req, res) => {

//     try {

//         const { userId } = req.body

//         console.log("USER ID:", userId)

//         const orders = await orderModel.find({
//             userId: userId
//         })

//         console.log("ORDERS FOUND:", orders.length)

//         res.json({
//             success: true,
//             orders
//         })

//     } catch (error) {

//         console.log(error)

//         res.json({
//             success: false,
//             message: error.message
//         })

//     }

// }


// // ===============================
// // UPDATE ORDER STATUS - ADMIN
// // ===============================
// const updateStatus = async (req, res) => {

//     try {

//         const { orderId, status } = req.body

//         await orderModel.findByIdAndUpdate(
//             orderId,
//             { status }
//         )

//         res.json({
//             success: true,
//             message: "Status Updated"
//         })

//     } catch (error) {

//         console.log(error)

//         res.json({
//             success: false,
//             message: error.message
//         })

//     }

// }


// export {
//     placeOrder,
//     placeOrderStripe,
//     placeOrderRazorpay,
//     allOrders,
//     userOrders,
//     updateStatus
// }

import orderModel from "../models/orderModel.js"
import userModel from "../models/userModel.js"
import Stripe from "stripe"

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)


// Place Order using COD
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

        await userModel.findByIdAndUpdate(userId, { cartData: {} })

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


// Place Order using Stripe
const placeOrderStripe = async (req, res) => {

    try {

        const { userId, items, amount, address } = req.body
        const { origin } = req.headers

        const orderData = {
            userId,
            items,
            amount,
            address,
            paymentMethod: "Stripe",
            payment: false,
            date: Date.now()
        }

        const newOrder = new orderModel(orderData)
        await newOrder.save()

        const line_items = items.map((item) => ({
            price_data: {
                currency: "usd",
                product_data: {
                    name: item.name
                },
                unit_amount: Math.round(item.price * 100)
            },
            quantity: item.quantity
        }))

        const session = await stripe.checkout.sessions.create({
            success_url: `${origin}/verify?success=true&orderId=${newOrder._id}&session_id={CHECKOUT_SESSION_ID}`,
            cancel_url: `${origin}/verify?success=false&orderId=${newOrder._id}`,
            line_items,
            mode: "payment"
        })

        res.json({
            success: true,
            session_url: session.url
        })

    } catch (error) {
        console.log(error)

        res.json({
            success: false,
            message: error.message
        })
    }
}


// Verify Stripe Payment
const verifyStripe = async (req, res) => {

    try {

        const { orderId, sessionId } = req.body

        const session = await stripe.checkout.sessions.retrieve(sessionId)

        if (session.payment_status === "paid") {

            const order = await orderModel.findById(orderId)

            if (!order) {
                return res.json({
                    success: false,
                    message: "Order not found"
                })
            }

            await orderModel.findByIdAndUpdate(
                orderId,
                {
                    payment: true
                }
            )

            // Clear user's cart
            await userModel.findByIdAndUpdate(
                order.userId,
                {
                    cartData: {}
                }
            )

            res.json({
                success: true,
                message: "Payment Successful"
            })

        } else {

            res.json({
                success: false,
                message: "Payment not completed"
            })
        }

    } catch (error) {

        console.log(error)

        res.json({
            success: false,
            message: error.message
        })
    }
}


// Razorpay - later
const placeOrderRazorpay = async (req, res) => {

    res.json({
        success: false,
        message: "Razorpay payment is not available yet"
    })
}


// Get all orders
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


// User orders
const userOrders = async (req, res) => {

    try {

        const { userId } = req.body

        const orders = await orderModel.find({ userId })

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


// Update order status
const updateStatus = async (req, res) => {

    try {

        const { orderId, status } = req.body

        await orderModel.findByIdAndUpdate(
            orderId,
            {
                status
            }
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
    verifyStripe,
    allOrders,
    userOrders,
    updateStatus
}