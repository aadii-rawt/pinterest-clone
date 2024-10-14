import React from 'react'
import { createPortal } from 'react-dom'
import { MdCancel } from 'react-icons/md'

function FollowersModal({ setIsFollowerOpen, title = "Following" }) {
    return createPortal(
        <div className='w-full min-h-screen max-h-screen bg-black/50 absolute top-0 left-0 z-50 flex items-center justify-center' onClick={(() => setIsFollowerOpen(false))}>
            <div className='w-[500px] max-h-[410px] follower-modal relative overflow-hidden  overflow-y-scroll rounded-lg  bg-white' onClick={(e) => e.stopPropagation()}>
                <div className='py-5  sticky bg-white top-0 left-0'>
                    <h1 className='font-semibold text-2xl text-center'>{title}</h1>
                    <div className='absolute right-5 cursor-pointer top-5' onClick={(() => setIsFollowerOpen(false))}>
                        <MdCancel size={24} />
                    </div>
                </div>
                <div className='space-y-3 px-6 py-2'>
                    <div className='flex items-center justify-between'>
                        <div className='flex gap-3 items-center'>
                            <div className='w-12 h-12 bg-gray-200 rounded-full'></div>

                            <h2 className='text-lg font-medium'>Aditya Rawat</h2>
                        </div>
                        <div>
                            <button className=' px-3 py-2 rounded-3xl bg-redTheme text-white'>Follow</button>
                        </div>
                    </div>
                    <div className='flex items-center justify-between'>
                        <div className='flex gap-3 items-center'>
                            <div className='w-12 h-12 bg-gray-200 rounded-full'></div>

                            <h2 className='text-lg font-medium'>Aditya Rawat</h2>
                        </div>
                        <div>
                            <button className=' px-3 py-2 rounded-3xl bg-redTheme text-white'>Follow</button>
                        </div>
                    </div>
                    <div className='flex items-center justify-between'>
                        <div className='flex gap-3 items-center'>
                            <div className='w-12 h-12 bg-gray-200 rounded-full'></div>

                            <h2 className='text-lg font-medium'>Aditya Rawat</h2>
                        </div>
                        <div>
                            <button className=' px-3 py-2 rounded-3xl bg-redTheme text-white'>Follow</button>
                        </div>
                    </div>
                    <div className='flex items-center justify-between'>
                        <div className='flex gap-3 items-center'>
                            <div className='w-12 h-12 bg-gray-200 rounded-full'></div>

                            <h2 className='text-lg font-medium'>Aditya Rawat</h2>
                        </div>
                        <div>
                            <button className=' px-3 py-2 rounded-3xl bg-redTheme text-white'>Follow</button>
                        </div>
                    </div>
                    
                </div>

            </div>
        </div >
        ,
        document.getElementById("portal")
    )
}

export default FollowersModal