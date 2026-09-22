import React, { useContext, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import axios from 'axios'
import { ShopContext } from '../context/ShopContext'

const Verify = () => {

    const {
        navigate,
        token,
        setCartItems,
        backendUrl
    } = useContext(ShopContext)

    const [searchParams] = useSearchParams()

    const success = searchParams.get('success')
    const orderId = searchParams.get('orderId')
    const sessionId = searchParams.get('session_id')


    const verifyPayment = async () => {

        try {

            if (!token) {
                return
            }

            if (success !== 'true') {
                navigate('/place-order')
                return
            }

            if (!orderId || !sessionId) {
                navigate('/place-order')
                return
            }

            const response = await axios.post(
                backendUrl + '/api/order/verifyStripe',
                {
                    orderId,
                    sessionId
                },
                {
                    headers: {
                        token
                    }
                }
            )

            if (response.data.success) {

                setCartItems({})

                navigate('/orders')

            } else {

                navigate('/place-order')

            }

        } catch (error) {

            console.log(error)

            navigate('/place-order')
        }
    }


    useEffect(() => {
        verifyPayment()
    }, [token])


    return (
        <div className='flex items-center justify-center min-h-[60vh]'>

            <div className='text-center'>

                <p className='text-lg font-medium'>
                    Verifying Payment...
                </p>

                <p className='text-gray-500 text-sm mt-2'>
                    Please wait
                </p>

            </div>

        </div>
    )
}

export default Verify