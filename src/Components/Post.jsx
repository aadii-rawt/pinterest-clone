import React from 'react'
import { Link } from 'react-router-dom'
function Post({ data ,showUserDetails}) {

  return (
    <Link to={`/pin/${data?.id}`} className='inline-block mb-3'>
      <div className='post relative rounded-xl cursor-pointer overflow-hidden group mb-4'>
        <img src={data?.img} alt="" />
        <div className='absolute rounded-xl z-10 inset-0 w-full bg-black bg-opacity-60 text-white hidden group-hover:flex items-center justify-center'>
          <span className='font-semibold text-xl'>Open</span>
        </div>
      </div>
      {showUserDetails &&
      <div className='flex gap-2 items-center font-semibold text-sm '>
        {data?.user?.avatar ? 
        <img src={data?.user?.avatar} alt="" className='w-8 h-8 rounded-full' />
        : 
        <div className='w-8 h-8 rounded-full capitalize bg-red-400 flex items-center justify-center text-white'>{data?.user?.username[0]}</div>
        }
        <p className='text-nowrap  text-ellipsis overflow-hidden '>{data?.user?.username}</p>
      </div>
      }
    </Link>
  )
}

export default Post