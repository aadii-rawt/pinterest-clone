import { collection, doc, getDoc, getDocs, query, updateDoc, where } from 'firebase/firestore';
import React, { useEffect, useState } from 'react'
import {  db } from '../firebase';
import EditAvatar from '../Components/EditAvatar';
import {  useNavigate, useParams } from 'react-router-dom';
import FollowersModal from '../Components/FollowersModal';
import CreatedPost from '../Components/CreatedPost';
import SavedPost from '../Components/SavedPost';
import NotFound from './NotFound';
import { useDispatch } from 'react-redux';
import { setShowLoginModel } from '../Store/Reducers/statesSlice';

function UserProfile() {
    const { id } = useParams();
    const [userData, setUserData] = useState({})
    const [isSavedSelected, setIsSavedSelected] = useState(true)
    const [isEditAvatarOpen, setIsEditAvatarOpen] = useState(false);
    const [isFollowerOpen, setIsFollowerOpen] = useState(false);
    const {user} = useSelector(state => state.userSlice)
    const [notFound, setNotFound] = useState(false)
    const navigate = useNavigate()
    const dispatch = useDispatch()
    useEffect(() => {
        const fetchUser = async () => {
            try {
                const cleanId = id.replace(/[{}]/g, '');
                // Firestore query to fetch user whose username matches the param `id`
                const q = query(collection(db, 'users'), where('username', '==', cleanId));
                const querySnapshot = await getDocs(q);
                if (!querySnapshot.empty) {
                    querySnapshot.forEach((doc) => {
                        setUserData(doc.data()); // Set the matched user data
                    });
                } else {
                    setNotFound(true)
                }
            } catch (error) {
                setNotFound(true)
            } finally {
                // setLoading(false);
            }
        };

        if (id) {
            fetchUser();
        }

    }, [id]);

    const [isuserFollowed, setIsuserFollowed] = useState(false)
    useEffect(() => {

        if (user?.username === id) {
            navigate("/Profile")
        }

        const checkUserFollow = async () => {
            if (user && userData?.userId) {
                try {
                    const userDocRef = doc(db, 'users', user.userId);
                    const userDoc = await getDoc(userDocRef);

                    if (userDoc.exists()) {
                        const following = userDoc.data().following || [];
                        setIsuserFollowed(following.includes(userData.userId));
                    }
                } catch (error) {
                    console.error('Error checking follow status:', error);
                }
            }
        };

        checkUserFollow();
    }, [user, id]);

    const handleFollowToggle = async () => {
        if (!user) {
            dispatch(setShowLoginModel(true))
        }

        try {
            const userDocRef = doc(db, 'users', user?.userId);
            const pinUserDocRef = doc(db, 'users', userData?.userId);

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
                            following: following.filter(id => id !== userData.userId)
                        }),
                        updateDoc(pinUserDocRef, {
                            follower: followers.filter(id => id !== user.userId)
                        })
                    ]);
                } else {
                    // Follow: Add to both following and followers arrays
                    await Promise.all([
                        updateDoc(userDocRef, {
                            following: [...following, userData.userId]
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

    if (notFound) {
        return <NotFound />
    }

    return (
        <div className='py-5 relative'>
            <div className='flex w-full flex-col-reverse md:flex-row items-start justify-between relative'>
                <div className={`${userData?.cover && "-mt-14"} w-full flex items-center flex-col justify-center md:flex  md:items-start  space-y-3 md:mt-5`}>
                    <div className='md:flex items-center gap-3'>
                        {/*----------- user avatar------------  */}
                        {userData?.avatar ?
                            <div className='flex items-center justify-center bg-green-300 w-24 h-24 cursor-pointer rounded-full border-2' onClick={() => setIsEditAvatarOpen(true)}>
                                <img src={userData?.avatar} alt="" className='rounded-full w-full h-full' />
                            </div>
                            :
                            <div className='flex items-center justify-center bg-red-300 w-24 h-24 cursor-pointer rounded-full' onClick={() => setIsEditAvatarOpen(true)}>
                                <h1 className='text-4xl font-semibold capitalize'>{userData?.username?.[0]}</h1>
                            </div>
                        }
                        {/*----------- user name------------  */}
                        <h1 className='text-3xl font-medium text-center'>{userData?.username}</h1>
                    </div>
                    <div className='flex gap-2'>
                        {<button>{userData?.follower?.length || 0} followers</button>}
                        <span>●</span>
                        <button>{userData?.following?.length || 0} following</button>
                    </div>
                    <div>
                        <button
                            onClick={handleFollowToggle}
                            className={`btn border mt-4 md:px-3 md:py-1.5 ${isuserFollowed
                                ? 'bg-black text-white'
                                : 'bg-red-600 text-white'
                                }`}
                        >
                            {isuserFollowed ? 'Followed' : 'Follow'}
                        </button>
                    </div>
                </div>
                <div className='md:rounded-3xl overflow-hidden max-h-[400px]'>
                    <img src={userData?.cover} alt="" />
                </div>
            </div>


            <div className='my-5'>
                <div className='flex items-center justify-center text-base font-semibold gap-4 my-5'>
                    <button className={`  ${isSavedSelected && "border-b-4 border-black py-2"}`} onClick={() => setIsSavedSelected(true)}>Created</button>
                    <button className={` ${!isSavedSelected && "border-b-4 border-black py-2"}`} onClick={() => setIsSavedSelected(false)}>Saved</button>
                </div>
                {/* ==================== user created post and Saved Post ===================================== */}
                {isSavedSelected ? <CreatedPost userId={userData?.userId} /> : <SavedPost userId={userData?.userId} />}
            </div>


            {isFollowerOpen && <FollowersModal setIsFollowerOpen={setIsFollowerOpen} />}
            {isEditAvatarOpen && <EditAvatar setIsEditAvatarOpen={setIsEditAvatarOpen} />}

        </div>
    )
}

export default UserProfile