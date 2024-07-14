import React from 'react'
import CommentList from './CommentList';

function PinDetails({ id, pin }) {
    return (
        <div className='pindetails py-3'>
            <h1 className='font-semibold'>{pin?.title}</h1>
            <p className='text-sm my-1.5'>{pin?.description}</p>
            <p>{pin?.link}</p>
            <p>{pin?.tags}</p>
            <div className='flex justify-between items-center'>
                <div className='flex items-center gap-2'>
                    <img src="" alt="" className='w-9 h-9 rounded-full my-4' />
                    <p className='text-sm'>{pin?.createdBy}</p>
                </div>
                <div><button className='btn border border-gray-700 md:px-3 md:py-1.5'>Follow</button></div>
            </div>
            <CommentList id={id} />
        </div>
    )
}

export default PinDetails