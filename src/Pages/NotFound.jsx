import React from 'react'
import { BiRightArrow, BiSolidLeftArrow } from 'react-icons/bi'
import { HiOutlineArrowNarrowLeft } from 'react-icons/hi'
import { useNavigate } from 'react-router-dom'

function NotFound() {
    const navigate = useNavigate()
    return (
        <div className='w-full min-h-[calc(100vh-80px)] flex flex-col md:flex-row items-center justify-center md:justify-evenly'>
            <img src="/404.png" alt="" className='w-[250px] w-[250px]  md:w-[350px] md:h-[350px]' />
            <div className='w-full md:w-[500px]'>
                <h1 className='text-7xl font-semibold my-2 text-center md:text-left '>Oops!</h1>
                <h2 className='text-lg md:text-2xl text-gray-400 font-medium my-1 text-center md:text-left'>The page you are looking for can't be found.
                </h2>
                <h2 className='text-gray-400 text-lg md:text-2xl font-medium my-1 text-center md:text-left'>Go back to home and continue exploring.</h2>
                <div className='mt-10 flex items-center justify-center md:block'>
                    <button onClick={() => navigate('/')} className='btn  bg-red-600 text-white flex items-center gap-2'><HiOutlineArrowNarrowLeft size={22} /> Go back</button>
                </div>
            </div>
        </div>
    )
}

export default NotFound
