import React from 'react'
import Title from '../components/Title'
import { assets } from '../assets/assets'
import NewsletterBox from '../components/NewsletterBox'

const About = () => {
  return (
    <div>
        <div className='text-2xl text-center pt-8 border-t'>
            <Title  text1={'ABOUT'} text2={'US'}/>

        </div>
        <div className='my-10 flex flex-col md:flex-row gap-16'>
            <img className=' w-full md:max-w-[450px]' src={assets.about_img} alt="" />
            <div className='flex flex-col justify-center gap-6 md:w-2/4 text-gray-600'>
            <p>At Forever, we believe fashion is more than just clothing — it’s a way to express who you are. We bring together quality, comfort, and modern style to create a shopping experience that feels simple and enjoyable. From everyday essentials to the latest trends, our collection is carefully selected to help you find something that fits your style. We’re committed to delivering quality products, reliable service, and a seamless shopping experience for every customer.</p>
            <p>Our goal is to make fashion accessible, convenient, and inspiring for everyone. We continuously explore new styles and ideas to keep our collection fresh while maintaining the quality our customers can trust. Whether you’re looking for something casual, elegant, or perfect for everyday wear, Forever is here to make every shopping journey easy, reliable, and enjoyable.</p>
            <b className='text-gray-800'>Our Mission</b>
            <p>Our mission is to make quality fashion simple, accessible, and enjoyable for everyone.</p>

            </div>

        </div>

        <div className='text-4xl py-4'>
            <Title  text1={'WHY'} text2={'CHOOSE US'}/>

        </div>

        <div className='flex flex-col md:flex-row text-row text-sm mb-20'>
            <div className='border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5'>
                <b>Quality Assurance:</b>
                <p className='text-gray-600'>We are committed to maintaining high standards of quality in every product we offer. Each item is carefully selected and checked to ensure that our customers receive products that are reliable, well-made, and worth their trust.</p>

            </div>

            <div className='border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5'>
                <b>Convenience:</b>
                <p className='text-gray-600'>We make shopping easy and hassle-free with a smooth browsing experience, simple navigation, and convenient ordering. Our goal is to help you find your favorite products quickly and enjoy a seamless shopping experience from start to finish.</p>

            </div>

            <div className='border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5'>
                <b>Expectional Customer Service:</b>
                <p className='text-gray-600'>We are dedicated to providing friendly, responsive, and reliable customer support. From helping you choose the right product to resolving any concerns, we’re always here to make your shopping experience smooth and satisfying.</p>

            </div>

        </div>
        <NewsletterBox />
      
    </div>
  )
}

export default About
