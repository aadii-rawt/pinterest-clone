import React, { useEffect, useState } from 'react'

import { useParams } from 'react-router-dom';
import {doc, getDoc} from 'firebase/firestore';
import { db } from '../firebase';
import PinDetails from './PinDetails';
import Comment from './Comment';
import { MdOutlineFileDownload } from 'react-icons/md';
import { IoMdShare } from 'react-icons/io';

function Pin() {
    const { id } = useParams()
    const [pin, setPin] = useState(null)
    // fetch data from firestore database
    useEffect(() => {
        async function fetchPin() {
            const docRef = doc(db, "posts", id)
            const docSnap = await getDoc(docRef)
            if (docSnap.exists()) setPin(docSnap.data());
        }
        fetchPin();
    }, [])

    return (
        <div>
            <div className='w-full flex items-center justify-center'>
                <div className='w-3/5 relative flex overflow-hidden rounded-3xl shadow-[0_0px_20px_2px_rgba(0,0,0,0.3)]'>
                    <div className='w-1/2'>
                        <img src={pin?.file} alt="pin img" />
                    </div>
                    <div className='w-1/2 h-full px-3 py-5 relative'>
                        <div className='flex justify-between items-center'>
                            <div className='flex gap-3 justify-around'>
                                <div className='cursor-pointer rounded-full flex items-center justify-center hover:bg-grayTheme w-10 h-10 p-2'><IoMdShare size={22} color='black' /></div>
                                <div className='cursor-pointer rounded-full flex items-center justify-center hover:bg-grayTheme w-10 h-10 p-2'><MdOutlineFileDownload size={28} color='black' /></div>
                            </div>
                            <div><button className='btn bg-redTheme text-white md:px-3 md:py-1.5'>Save</button></div>
                        </div>
                        <PinDetails id={id} pin={pin} />
                        <Comment id={id} />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Pin