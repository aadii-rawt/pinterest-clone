import React from 'react'

function FollowersShimmer() {
    return (
        <div className='space-y-3 px-6 py-2'>
            <div className='flex items-center justify-between'>
                <div className='flex gap-3 items-center'>
                    <div className='w-12 h-12 bg-gray-200 rounded-full animate-pulse'></div>
                    <div className='text-lg font-medium bg-gray-200 w-24 h-5 rounded animate-pulse'></div>
                </div>
                <div>
                    <button className='px-10 py-5 rounded-3xl bg-gray-200  text-white animate-pulse'></button>
                </div>
            </div>
            <div className='flex items-center justify-between'>
                <div className='flex gap-3 items-center'>
                    <div className='w-12 h-12 bg-gray-200 rounded-full animate-pulse'></div>
                    <div className='text-lg font-medium bg-gray-200 w-28 h-5 rounded animate-pulse'></div>
                </div>
                <div>
                    <button className='px-10 py-5 rounded-3xl bg-gray-200  text-white animate-pulse'></button>
                </div>
            </div>
            <div className='flex items-center justify-between'>
                <div className='flex gap-3 items-center'>
                    <div className='w-12 h-12 bg-gray-200 rounded-full animate-pulse'></div>
                    <div className='text-lg font-medium bg-gray-200 w-20 h-5 rounded animate-pulse'></div>
                </div>
                <div>
                    <button className='px-10 py-5 rounded-3xl bg-gray-200  text-white animate-pulse'></button>
                </div>
            </div>
            <div className='flex items-center justify-between'>
                <div className='flex gap-3 items-center'>
                    <div className='w-12 h-12 bg-gray-200 rounded-full animate-pulse'></div>
                    <div className='text-lg font-medium bg-gray-200 w-24 h-5 rounded animate-pulse'></div>
                </div>
                <div>
                    <button className='px-10 py-5 rounded-3xl bg-gray-200  text-white animate-pulse'></button>
                </div>
            </div>
        </div>
    )
}

export default FollowersShimmer
