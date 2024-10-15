import { collection, getDocs, onSnapshot, orderBy, query, where } from 'firebase/firestore';
import React, { useEffect, useState } from 'react'
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth, db } from '../firebase';
// import Post from '../Components/Pin';
import Post from '../Components/Post'
import { useData } from '../Context/DataProvider';
import EditAvatar from '../Components/EditAvatar';
import Masonry from 'react-masonry-css';
import { Link, useParams } from 'react-router-dom';
import FollowersModal from '../Components/FollowersModal';

function UserProfile() {
    const { id } = useParams();
    const [user, setUser] = useState({})
    const [createdPosts, setCreatedPost] = useState([]);
    const [isEditAvatarOpen, setIsEditAvatarOpen] = useState(false);
    const [isFollowerOpen, setIsFollowerOpen] = useState(false);
    const [pins, setPins] = useState([]);

    useEffect(() => {
        const fetchUser = async () => {
            //   setLoading(true);
            try {
                const cleanId = id.replace(/[{}]/g, '');
                console.log(cleanId);

                // Firestore query to fetch user whose username matches the param `id`
                const q = query(collection(db, 'users'), where('username', '==', cleanId));
                const querySnapshot = await getDocs(q);
                if (!querySnapshot.empty) {
                    querySnapshot.forEach((doc) => {
                        setUser(doc.data()); // Set the matched user data
                    });
                } else {
                    console.log('No user found with this username');
                }
            } catch (error) {
                console.error('Error fetching user: ', error);
            } finally {
                // setLoading(false);
            }
        };

        if (id) {
            fetchUser();
        }

    }, [id]);

    const breakpointColumnsObj = {
        default: 5,
        1100: 3,
        700: 2,
        500: 2
    };

    return (
        <div className='py-5 relative'>
            <div className='profile flex justify-center items-center flex-col ' >
                <div className='w-[500px] h-[300px] max-w[500px] max-h[300px] border-2 rounded-xl bg-cover bg-center' style={{backgroundImage: `url('/img6.jpg')`,}}>
                </div>
                <div className='-mt-10'>
                {user?.avatar ?
                    <div className='flex items-center justify-center bg-green-300 w-24 h-24 cursor-pointer rounded-full border-2' onClick={() => setIsEditAvatarOpen(true)}>
                        <img src={user?.avatar} alt="" className='rounded-full w-full h-full' />
                    </div>
                    :
                    <div className='flex items-center justify-center bg-green-300 w-24 h-24 cursor-pointer rounded-full border-2' onClick={() => setIsEditAvatarOpen(true)}>
                        <h1 className='text-4xl font-semibold capitalize'>{user?.username?.[0]}</h1>
                    </div>
                }
                </div>
                {/* <div className='w-24 h-24 bg-grayTheme rounded-full'></div> */}
                <h1 className='my-2 font-semibold text-4xl capitalize'>{user?.username}</h1>
                <h1 className='font-semibold text-base cursor-pointer' onClick={() => setIsFollowerOpen(true)}>{user?.following?.length} 5 Following</h1>
            </div>

            <div className='my-5'>
                <div className='flex items-center justify-center text-base font-semibold gap-4 my-5'>
                    <button className=' border-b-4 border-black py-2'>Created</button>
                    <button>Saved</button>
                </div>
                <div>
                    <Masonry
                        breakpointCols={breakpointColumnsObj}
                        className="my-masonry-grid"
                        columnClassName="my-masonry-grid_column"
                    >
                        {pins?.map((data, index) => (
                            <Post key={index} data={data} showUserDetails={false} />
                        ))
                        }
                    </Masonry>
                </div>

            </div>

            {isFollowerOpen && <FollowersModal setIsFollowerOpen={setIsFollowerOpen} />}
            {isEditAvatarOpen && <EditAvatar setIsEditAvatarOpen={setIsEditAvatarOpen} />}

        </div>
    )
}

export default UserProfile