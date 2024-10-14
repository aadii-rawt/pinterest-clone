import { collection, onSnapshot, orderBy, query, where } from 'firebase/firestore';
import React, { useEffect, useState } from 'react'
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth, db } from '../firebase';
// import Post from '../Components/Pin';
import Post from '../Components/Post'
import { useData } from '../Context/DataProvider';
import EditAvatar from '../Components/EditAvatar';
import Masonry from 'react-masonry-css';
import { Link } from 'react-router-dom';
import Banner from '../../public/img6.jpg'
import FollowersModal from '../Components/FollowersModal';

function Profile() {
  const { user, users, fakePins } = useData()
  const [createdPosts, setCreatedPost] = useState([])
  const [isEditAvatarOpen, setIsEditAvatarOpen] = useState(false)
  const [isFollowerOpen, setIsFollowerOpen] = useState(false)
  const [pins, setPins] = useState([])

  useEffect(() => {
    const pinsData = fakePins.filter((data) => {
      // const userData = users.find((d) => d?.userId === data?.createdBy)
      if(data?.createdBy === user?.userId){
        return {...data }
      }
    })
    setPins(pinsData)
  }, [])


  // useEffect(() => {
  //   // fetch data from firestore database
  //   if (user) { 
  //     const notesQuery = query(
  //       collection(db,`posts`), where("createdBy", "==", user.email), 
  //       orderBy("timestamp", "desc"));
  //     const unsubscribe = onSnapshot(notesQuery, (snapshot) => {
  //       const notesData = snapshot.docs.map((doc) => ({
  //         id: doc.id,
  //         ...doc.data()
  //       }));
  //       setCreatedPost(notesData);
  //     });
  //     return () => unsubscribe();
  //   }
  // }, [user]);

  console.log(pins);
  const breakpointColumnsObj = {
    default: 5,
    1100: 3,
    700: 2,
    500: 2
  };

  return (
    <div className='py-5 relative'>
      <div className='profile flex justify-center items-center flex-col ' >
        <div className=' border-2 rounded-xl' style={{"backgroundImage": `url('/img6.jpg')`}}>
     {/* <img src="" style={{backgroundImage: "url('/img5.jpg')"}} alt="" /> */}
        </div>
        
        {user?.avatar ?
          <div className='flex items-center justify-center bg-green-300 w-24 h-24 cursor-pointer rounded-full' onClick={() => setIsEditAvatarOpen(true)}>
            <img src={user?.avatar} alt="" className='rounded-full w-full h-full' />
          </div>
          :
          <div className='flex items-center justify-center bg-green-300 w-24 h-24 cursor-pointer rounded-full' onClick={() => setIsEditAvatarOpen(true)}>
            <h1 className='text-4xl font-semibold capitalize'>{user?.username?.[0]}</h1>
          </div>
        }
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

export default Profile