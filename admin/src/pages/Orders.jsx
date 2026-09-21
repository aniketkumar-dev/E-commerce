// import React, { useEffect, useState } from 'react'
// import axios from 'axios'
// import { toast } from 'react-toastify'
// import { backendUrl, currency } from '../App'
// import { assets } from '../assets/assets'

// const Orders = ({ token }) => {

//   const [orders, setOrders] = useState([])

//   const fetchAllOrders = async () => {

//     if (!token) {
//       return
//     }

//     try {

//       const response = await axios.post(
//         backendUrl + '/api/order/list',
//         {},
//         {
//           headers: {
//             token: token
//           }
//         }
//       )

//       if (response.data.success) {
//         setOrders(response.data.orders)
//       } else {
//         toast.error(response.data.message)
//       }

//     } catch (error) {

//       toast.error(error.message)

//     }
//   }
// const statusHandler = async (event, orderId) => {
//   try {
    
//   } catch (error) {
    
//   }

// }

//   useEffect(() => {
//     fetchAllOrders()
//   }, [token])


//   return (
//     <div>
//       <h3>Order Page</h3>
//       <div>
//         {
//           orders.map((order, index) => (
//             <div key={index}>
//               <img src={assets.parcel_icon} alt="" />
//               <div>

//                 <div>
//                   {order.item.map((item, index) => {
//                     if (index === order.items.length - 1) {
//                       return <p key={index}> {item.name} x {item.quantity}
//                         <span>{item.size}</span>
//                       </p>
//                     } else {
//                       return <p key={index}> {item.name} x {item.quantity}
//                         <span>{item.size} , </span>
//                       </p>


//                     }
//                   })}
//                 </div>
//                 <p>{order.address.firstName + " " + order.address.lastName}</p>
//                 <div>
//                   <p>{order.address.street + ","}</p>
//                   <p>{order.address.city + " ," + order.address.state + " ," + order.address.country + ", " + order.address.zipcode}</p>
//                 </div>
//                 <p>{order.address.phone}</p>

//               </div>
//               {/*  */}
//               <div> 
//                 <p>Items : {order.items.length}</p>
//                 <p>Method:{order.paymentMethod}</p>
//                 <p>Payment:{}</p>
//                 <p>Date :{}</p>
//               </div>
//               <p>{currency}{order.amout}</p>
//               <select>
//                 <option value="Order Placed">Order Placed</option>
//                 <option value="Packing">Packing</option>
//                 <option value="Shipped">Shipped</option>
//                 <option value="Out for delivery"> Out for delivery</option>
//                 <option value="Delivered">Delivered</option>
//               </select>
//             </div>
//           ))
//         }
//       </div>

//     </div>
//   )
// }

// export default Orders

import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { toast } from 'react-toastify'
import { backendUrl, currency } from '../App'
import { assets } from '../assets/assets'

const Orders = ({ token }) => {

  const [orders, setOrders] = useState([])

  const fetchAllOrders = async () => {

    if (!token) {
      return
    }

    try {

      const response = await axios.post(
        backendUrl + '/api/order/list',
        {},
        {
          headers: {
            token: token
          }
        }
      )

      if (response.data.success) {
        setOrders(response.data.orders)
      } else {
        toast.error(response.data.message)
      }

    } catch (error) {

      toast.error(error.message)

    }
  }


  // CHANGE ORDER STATUS
  const statusHandler = async (event, orderId) => {

    try {

      const response = await axios.post(
        backendUrl + '/api/order/status',
        {
          orderId,
          status: event.target.value
        },
        {
          headers: {
            token: token
          }
        }
      )

      if (response.data.success) {

        toast.success(response.data.message)

        await fetchAllOrders()

      } else {

        toast.error(response.data.message)

      }

    } catch (error) {

      toast.error(error.message)

    }

  }


  useEffect(() => {
    fetchAllOrders()
  }, [token])


  return (
    <div className="p-5 w-full">

      <h3 className="text-2xl font-semibold mb-6">
        Order Page
      </h3>

      <div className="flex flex-col gap-5">

        {
          orders.map((order, index) => (

            <div
              key={index}
              className="bg-white border border-gray-200 rounded-lg p-5 shadow-sm"
            >

              <div className="flex flex-col lg:flex-row gap-6">

                {/* PRODUCT + CUSTOMER DETAILS */}

                <div className="flex flex-1 gap-4">

                  <img
                    src={assets.parcel_icon}
                    alt=""
                    className="w-12 h-12"
                  />

                  <div className="flex-1">

                    {/* PRODUCTS */}

                    <div className="mb-4">

                      {
                        order.items.map((item, index) => {

                          if (index === order.items.length - 1) {

                            return (
                              <p
                                key={index}
                                className="text-sm text-gray-700"
                              >
                                {item.name} x {item.quantity}

                                <span className="ml-2 text-gray-500">
                                  {item.size}
                                </span>
                              </p>
                            )

                          } else {

                            return (
                              <p
                                key={index}
                                className="text-sm text-gray-700"
                              >
                                {item.name} x {item.quantity}

                                <span className="ml-2 text-gray-500">
                                  {item.size},
                                </span>
                              </p>
                            )

                          }

                        })
                      }

                    </div>


                    {/* CUSTOMER NAME */}

                    <p className="font-medium text-gray-800 mb-2">

                      {order.address.firstName + " " + order.address.lastName}

                    </p>


                    {/* ADDRESS */}

                    <div className="text-sm text-gray-500">

                      <p>
                        {order.address.street + ","}
                      </p>

                      <p>
                        {order.address.city +
                          " ," +
                          order.address.state +
                          " ," +
                          order.address.country +
                          ", " +
                          order.address.zipcode}
                      </p>

                    </div>


                    {/* PHONE */}

                    <p className="text-sm text-gray-600 mt-2">
                      {order.address.phone}
                    </p>

                  </div>

                </div>


                {/* ORDER INFORMATION */}

                <div className="lg:w-52 text-sm text-gray-600">

                  <p className="font-medium text-gray-800 mb-2">
                    Order Information
                  </p>

                  <p>
                    Items : {order.items.length}
                  </p>

                  <p>
                    Method : {order.paymentMethod}
                  </p>

                  <p>
                    Payment : {order.payment ? "Paid" : "Pending"}
                  </p>

                  <p>
                    Date : {new Date(order.date).toLocaleDateString()}
                  </p>

                </div>


                {/* AMOUNT + STATUS */}

                <div className="lg:w-44 flex flex-col justify-between gap-4">

                  <p className="text-xl font-semibold text-gray-800">
                    {currency}{order.amount}
                  </p>


                  <select
                    value={order.status}
                    onChange={(event) =>
                      statusHandler(event, order._id)
                    }
                    className="border border-gray-300 rounded px-3 py-2 text-sm outline-none cursor-pointer"
                  >

                    <option value="Order Placed">
                      Order Placed
                    </option>

                    <option value="Packing">
                      Packing
                    </option>

                    <option value="Shipped">
                      Shipped
                    </option>

                    <option value="Out for delivery">
                      Out for delivery
                    </option>

                    <option value="Delivered">
                      Delivered
                    </option>

                  </select>

                </div>

              </div>

            </div>

          ))
        }

      </div>

    </div>
  )
}

export default Orders