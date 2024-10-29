import React, { useEffect, useState } from 'react'
import CommentList from './CommentList';
// import { users } from '../utils';
import { Link } from 'react-router-dom';
import { useData } from '../Context/DataProvider';
import { doc } from 'firebase/firestore';
import { db } from '../firebase';

function PinDetails({ id, pin,user }) {
    // const {user} = useData()
    const [isuserFollowed,setIsuserFollowed] = useState(false)

    useEffect(() => {
        const checkUserFollow = async () => {
            if (!user) return;
            try {
                const userPostsRef = doc(db, 'users', user?.userId);
                const userPostsDoc = await getDoc(userPostsRef);
                if (userPostsDoc.exists()) {
                   setIsuserFollowed(false)
                }
            } catch (error) {
                console.error('Error checking saved status:', error);
            }
        };

        checkUserFollow();
    }, [user, id]);

    return (
        <div className='pindetails py-3 h-full'>
            <h1 className='font-semibold'>{pin?.title}</h1>
            <p className='text-sm my-1.5'>{pin?.description}</p>
            <p>{pin?.link}</p>
            <p>{pin?.tags}</p>
            <div className='flex justify-between items-center'>
                <Link to={`/user/{${user?.username}}`} className='flex items-center gap-2'>
                    {user?.avatar ?
                        <img src={user?.avatar} alt="" className='w-8 h-8 rounded-full' />
                        :
                        <div className='w-8 h-8 rounded-full capitalize bg-red-400 flex items-center justify-center text-white'>{user?.username?.[0]}</div>
                    }
                    <p className='text-sm font-medium'>{user?.username}</p>
                </Link>
                <div><button className='btn border border-gray-700 md:px-3 md:py-1.5'>Follow</button></div>
            </div>
            <CommentList id={id} />
        </div>
    )
}

export default PinDetails