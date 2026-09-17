import React from 'react'
import { assets } from '../assets/assets'

const Footer = () => {
  return (
    <div>
        <div className='flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10 mt-40 text-sm'>
            <div>
                <img
                    src={assets.logo}
                    className='w-8 -mt-6 ml-8'
                    style={{ transform: 'rotate(-90deg)' }}
                    alt='Logo'
                    />
                <p className='w-full md:w-2/3 text-gray-600'>
                    Loren Ipsum is simply dummy text of the printing typesetting industry.Lorem Ipsum has been the industry's standard dummy text ever since 2000s.when an unknown printer took a galley of type and scramed it to make a type specimen book.
                </p>
            </div>

            <div>
                <p className='text-xl font-medium mb-5'>COMPANY</p>
                <ul className='flex flex-col gap-1 text-gray-600'>
                    <li>Home</li>
                    <li>About us</li>
                    <li>Delivery</li>
                    <li>Privacy policy</li>

                </ul>
            </div>

            <div>
                <p className='text-xl font-medium mb-5'>GET IN TOUCH</p>
                <ul className='flex flex-col gap-1 text-gray-600'>
                    <li>+91-212-456-7890</li>
                    <li>contact@foreveryou.com</li>

                </ul>
            </div>

        </div>

        <div>
            <hr/>
            <p className='py-5 text-sm text-center'> Copyright2026@ forever.com - All Right Reversed.</p>
        </div>
      
    </div>
  )
}

export default Footer
