import React from 'react'
import { FaDownload, FaShareNodes } from 'react-icons/fa6'
import { Link } from 'react-router-dom'

function Post({ post }) {

  return (
    // <Link to={`pin/${post?.id}`} className='post relative rounded-xl cursor-pointer overflow-hidden group mb-4'>
    //   <img src={post?.file} alt="" />
    //   <div className='absolute rounded-xl z-10 inset-0 w-full bg-black bg-opacity-60 text-white hidden group-hover:flex items-center justify-center'>
    //    <span className='font-semibold text-xl'>Open</span>
    //   <div className='absolute bottom-0 right-0 p-5 flex gap-4'>
    //     <span className='cursor-pointer rounded-full bg-white p-2'><FaShareNodes size={18} color='black' /></span>
    //     <span className='cursor-pointer rounded-full bg-white p-2'><FaDownload size={18} color='black' /></span>
    //   </div>
    //   </div>
    // </Link>

    <Link to={`pin/${post?.id}`} className='inline-block'>
      <div className='post relative rounded-xl cursor-pointer overflow-hidden group mb-4'>
        <img src={post?.file} alt="" />
        <div className='absolute rounded-xl z-10 inset-0 w-full bg-black bg-opacity-60 text-white hidden group-hover:flex items-center justify-center'>
          <span className='font-semibold text-xl'>Open</span>
          <div className='absolute bottom-0 right-0 p-5 flex gap-4'>
            <span className='cursor-pointer rounded-full bg-white p-2'><FaShareNodes size={18} color='black' /></span>
            <span className='cursor-pointer rounded-full bg-white p-2'><FaDownload size={18} color='black' /></span>
          </div>
        </div>
      </div>
      <div className='flex gap-2 items-center font-semibold text-sm '>
        <img src="img5.jpg" alt="" className='w-8 h-8 rounded-full' />
        <p className='text-nowrap  text-ellipsis overflow-hidden '>{post?.createdBy}</p>
      </div>
    </Link>
  )
}

export default Post