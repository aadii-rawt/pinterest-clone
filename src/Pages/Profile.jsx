import { collection, onSnapshot, orderBy, query, where } from 'firebase/firestore';
import React, { useEffect, useState } from 'react'
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth, db } from '../firebase';
import Post from '../Components/Pin';
import { useData } from '../Context/DataProvider';
import EditAvatar from '../Components/EditAvatar';

function Profile() {
  const { user } = useData()
  const [createdPosts, setCreatedPost] = useState([])
  const [isEditAvatarOpen, setIsEditAvatarOpen] = useState(false)
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

  console.log(user);
  

  return (
    <div className='py-5 relative'>
      <div className='profile flex justify-center items-center flex-col ' >
        {user?.avatar ?
          <div className='flex items-center justify-center bg-green-300 w-24 h-24 cursor-pointer rounded-full' onClick={() => setIsEditAvatarOpen(true)}>
            <img src={user?.avatar} alt="" className='rounded-full w-full h-full' />
          </div>
          :
          <div className='flex items-center justify-center bg-green-300 w-24 h-24 cursor-pointer rounded-full' onClick={() => setIsEditAvatarOpen(true)}>
            <h1 className='text-4xl font-semibold'>{user?.username?.[0]}</h1>
          </div>
        }
        {/* <div className='w-24 h-24 bg-grayTheme rounded-full'></div> */}
        <h1 className='my-2 font-semibold text-4xl'>{user?.username}</h1>
        <h1 className='font-semibold text-base'>{user?.following?.length} Following</h1>
      </div>
      <div className='columns-2 md:columns-3 lg:columns-5 gap-1.5 py-5 '>
        {createdPosts.length > 0 ?
          createdPosts.map((post) => <Post key={post.id} post={post} />) :
          <span>No post created yet</span>}
      </div>

      {isEditAvatarOpen && <EditAvatar setIsEditAvatarOpen={setIsEditAvatarOpen} />}

    </div>
  )
}

export default Profile