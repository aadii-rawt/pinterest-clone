import { collection, doc, getDoc, getDocs, getFirestore, query, where } from 'firebase/firestore';
import React, { useEffect, useState } from 'react'
import { createPortal } from 'react-dom'
import { MdCancel } from 'react-icons/md'
import { useData } from '../Context/DataProvider';
import { Link } from 'react-router-dom';
import { RxCross2 } from 'react-icons/rx';
import FollowersShimmer from './Shimmer/FollowersShimmer';

function FollowersModal({ setIsFollowerOpen, isFollowerOpen}) {
    const [followers, setFollowers] = useState([])
    const [loading,setLoading] = useState(true)
    const { user } = useData()
    
    useEffect(() => {
        const fetchFollowers = async () => {
            const db = getFirestore();
            const userRef = doc(db, 'users', user?.userId);
            const userSnap = await getDoc(userRef);

            if (userSnap.exists()) {
                const userData = userSnap.data();
                const followerIds = userData?.[isFollowerOpen?.title] || [];

                const usersRef = collection(db, 'users');
                const q = query(usersRef, where('__name__', 'in', followerIds));
                const querySnapshot = await getDocs(q);

                const followersData = querySnapshot.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data()
                }));

                setFollowers(followersData);
                setLoading(false)
            }
        };

        fetchFollowers();

        console.log(followers);

    }, [user?.userId]);

    return createPortal(
        <div className='w-full min-h-screen max-h-screen bg-black/50 fixed top-0 left-0 z-50 flex items-center justify-center' onClick={(() => setIsFollowerOpen(false))}>
            <div className='w-[500px] max-h-[410px] follower-modal relative overflow-hidden  overflow-y-scroll rounded-lg  bg-white' onClick={(e) => e.stopPropagation()}>
                <div className='py-5  sticky bg-white top-0 left-0'>
                    <h1 className='font-semibold text-2xl text-center capitalize'>{isFollowerOpen?.title}</h1>
                    <div className='absolute right-5 cursor-pointer top-5' onClick={(() => setIsFollowerOpen(false))}>
                        <RxCross2 size={24} />
                    </div>
                </div>
                {loading && <FollowersShimmer />}
                <div className='space-y-3 px-6 py-2'>
                    {followers?.length > 0 &&
                        followers.map((f) => (
                            <div key={f?.userId} className='flex items-center justify-between'>
                                <div className='flex gap-3 items-center'>
                                    {f?.avatar ?
                                     <Link to={`/user/${f?.username}`}>
                                            <img src={f?.avatar} alt="" className='rounded-full w-12 h-12' />
                                        </Link>
                                        :
                                        <Link  to={`/user/${f?.username}`} className='flex items-center justify-center bg-red-400 text-white w-12 h-12 cursor-pointer rounded-full'>
                                            <h1 className='text-2xl font-semibold capitalize'>{f?.username?.[0]}</h1>
                                        </Link>
                                    }
                                    {/* <div className='w-12 h-12 bg-gray-200 rounded-full'></div> */}
                                    <Link to={`/user/${f?.username}`} className='text-lg font-medium'>{f?.username}</Link>
                                </div>
                                <div>
                                    <button className=' px-3 py-2 rounded-3xl bg-redTheme text-white'>Follow</button>
                                </div>
                            </div>
                        ))}
                </div>

            </div>
        </div >
        ,
        document.getElementById("portal")
    )
}

export default FollowersModal