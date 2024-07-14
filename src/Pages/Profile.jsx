import { collection, onSnapshot, orderBy, query, where } from 'firebase/firestore';
import React, { useEffect, useState } from 'react'
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth, db } from '../firebase';
import Post from '../Components/Post';

function Profile() {
  const [user] = useAuthState(auth)
  const [createdPosts,setCreatedPost] = useState([])
  useEffect(() => {
    // fetch data from firestore database
    if (user) { 
      const notesQuery = query(
        collection(db,`posts`), where("createdBy", "==", user.email), 
        orderBy("timestamp", "desc"));
      const unsubscribe = onSnapshot(notesQuery, (snapshot) => {
        const notesData = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data()
        }));
        setCreatedPost(notesData);
      });
      return () => unsubscribe();
    }
  }, [user]);

  return (
    <div className='py-5'>
      <div className='profile flex justify-center items-center flex-col'>
        <div className='w-24 h-24 bg-grayTheme rounded-full'></div>
        <h1 className='my-2 font-semibold text-3xl'>Aditya Rawat</h1>
      </div>
      <div className='columns-2 md:columns-3 lg:columns-5 gap-1.5 py-5 '>
        {createdPosts.length > 0 ?
          createdPosts.map((post) => <Post key={post.id} post={post} />) :
          <span>No post created yet</span>}
      </div>
    </div>
  )
}

export default Profile