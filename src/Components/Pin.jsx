import React, { useEffect, useState } from 'react'

import { useParams } from 'react-router-dom';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../firebase';
import PinDetails from './PinDetails';
import Comment from './Comment';
import { MdOutlineFileDownload } from 'react-icons/md';
import { IoMdShare } from 'react-icons/io';
// import { fakePins } from '../utils'
import Masonry from 'react-masonry-css';
import Post from './Post';
import { useData } from '../Context/DataProvider';
// import Img from '../../public/img4.jpg'

function Pin() {
    const { id } = useParams()
    const [pin, setPin] = useState(null)
    const [morePins,setMorePins] = useState([])
    const {users,fakePins} = useData()
    useEffect(() => {
        const p = fakePins?.find((data) => data.id === id)
        setPin(p)
    }, [id])

    useEffect(()=>{
        const morePinsData = fakePins.map((data) => {
          const userData = users.find((d) => d?.userId === data?.createdBy)
          return {...userData, ...data} 
        })
        setMorePins(morePinsData)
      },[])

    const breakpointColumnsObj = {
        default: 4,
        1100: 3,
        700: 2,
        500: 2
    };


    return (
        <div>
            <div className='w-full flex items-center justify-center'>
                <div className='w-full lg:w-3/5 relative flex flex-col lg:flex-row  overflow-hidden rounded-3xl shadow-[0px_4px_6px_1px_rgba(0,0,0,0.2),_0px_2px_4px_1px_rgba(0,0,0,0.08)]'>
                    <div className='w-full lg:w-1/2 flex items-center justify-center' >
                        <img src={`/${pin?.img}`} alt="" />
                    </div>
                    <div className='w-full lg:w-1/2 h-full px-3 py-5 relative'>
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
            {/*====================== more pins =======================*/}
            <div className='mt-10'>
                <h1 className='text-center font-semibold text-xs md:text-xl my-5'>more to explore</h1>
                <Masonry
                    breakpointCols={breakpointColumnsObj}
                    className="my-masonry-grid"
                    columnClassName="my-masonry-grid_column"
                >
                    {morePins?.map((data,index) => (
                        <Post key={index} data={data} />
                    ))
                    }
                </Masonry>
            </div>
        </div>
    )
}

export default Pin
