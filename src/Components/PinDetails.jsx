import React, { useEffect, useState } from 'react'
import CommentList from './CommentList';
// import { users } from '../utils';
import { Link } from 'react-router-dom';
import { useData } from '../Context/DataProvider';

function PinDetails({ id, pin }) {
    const [userDetails, setUserDetails] = useState(null)
    const {users} = useData()
    useEffect(() => {
        const userData = users?.find((d) => d?.userId === pin?.createdBy)
        setUserDetails(userData)
    }, [pin])

    return (
        <div className='pindetails py-3 h-full'>
            <h1 className='font-semibold'>{pin?.title}</h1>
            <p className='text-sm my-1.5'>{pin?.description}</p>
            <p>{pin?.link}</p>
            <p>{pin?.tags}</p>
            <div className='flex justify-between items-center'>
                <Link to={`/user/{${userDetails?.userId}}`} className='flex items-center gap-2'>
                    {userDetails?.avatar ?
                        <img src={`/${userDetails?.avatar}`} alt="" className='w-8 h-8 rounded-full' />
                        :
                        <div className='w-8 h-8 rounded-full capitalize bg-red-400 flex items-center justify-center text-white'>{userDetails?.username?.[0]}</div>
                    }
                    <p className='text-sm'>{userDetails?.username}</p>
                </Link>
                <div><button className='btn border border-gray-700 md:px-3 md:py-1.5'>Follow</button></div>
            </div>
            <CommentList id={id} />
        </div>
    )
}

export default PinDetails