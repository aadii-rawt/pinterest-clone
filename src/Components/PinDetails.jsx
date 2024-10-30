import React, { useEffect, useState } from 'react'
import CommentList from './CommentList';
// import { users } from '../utils';
import { Link } from 'react-router-dom';
import { useData } from '../Context/DataProvider';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { db } from '../firebase';

function PinDetails({ id, pin, userDetails }) {
    const { user } = useData()
    const [isuserFollowed, setIsuserFollowed] = useState(false)

    useEffect(() => {
        const checkUserFollow = async () => {
            if (user && userDetails?.userId) {
                try {
                    const userDocRef = doc(db, 'users', user.userId);
                    const userDoc = await getDoc(userDocRef);

                    if (userDoc.exists()) {
                        const following = userDoc.data().following || [];
                        setIsuserFollowed(following.includes(userDetails.userId));
                    }
                } catch (error) {
                    console.error('Error checking follow status:', error);
                }
            }
        };

        checkUserFollow();
    }, [user, userDetails]);

    const handleFollowToggle = async () => {
        if (!user) return; // Handle not logged in case
    
        try {
            const userDocRef = doc(db, 'users', user?.userId);
            const pinUserDocRef = doc(db, 'users', userDetails?.userId);
            
            const [userDoc, pinUserDoc] = await Promise.all([
                getDoc(userDocRef),
                getDoc(pinUserDocRef)
            ]);
    
            if (userDoc.exists() && pinUserDoc.exists()) {
                const following = userDoc.data()?.following || [];
                const followers = pinUserDoc.data()?.follower || [];
                
                if (isuserFollowed) {
                    // Unfollow: Remove from both following and followers arrays
                    await Promise.all([
                        updateDoc(userDocRef, {
                            following: following.filter(id => id !== userDetails.userId)
                        }),
                        updateDoc(pinUserDocRef, {
                            follower: followers.filter(id => id !== user.userId)
                        })
                    ]);
                } else {
                    // Follow: Add to both following and followers arrays
                    await Promise.all([
                        updateDoc(userDocRef, {
                            following: [...following, userDetails.userId]
                        }),
                        updateDoc(pinUserDocRef, {
                            follower: [...followers, user.userId]
                        })
                    ]);
                }
    
                setIsuserFollowed(!isuserFollowed);
            }
        } catch (error) {
            console.error('Error updating follow status:', error);
        }
    };
    


    return (
        <div className='pindetails py-3 h-full'>
            <h1 className='font-semibold'>{pin?.title}</h1>
            <p className='text-sm my-1.5'>{pin?.description}</p>
            <p>{pin?.link}</p>
            <p>{pin?.tags}</p>
            <div className='flex justify-between items-center'>
                <Link to={`/user/{${userDetails?.username}}`} className='flex items-center gap-2'>
                    {userDetails?.avatar ?
                        <img src={userDetails?.avatar} alt="" className='w-8 h-8 rounded-full' />
                        :
                        <div className='w-8 h-8 rounded-full capitalize bg-red-400 flex items-center justify-center text-white'>{userDetails?.username?.[0]}</div>
                    }
                    <p className='text-sm font-medium'>{userDetails?.username}</p>
                </Link>
                <div>
                    <button
                        onClick={handleFollowToggle}
                        className={`btn border md:px-3 md:py-1.5 ${isuserFollowed
                                ? 'bg-black text-white'
                                : 'border-gray-700'
                            }`}
                    >
                        {isuserFollowed ? 'Followed' : 'Follow'}
                    </button>
                </div>
            </div>
            <CommentList id={id} />
        </div>
    )
}

export default PinDetails