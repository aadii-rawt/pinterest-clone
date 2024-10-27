import { collection, onSnapshot, orderBy, query, where } from 'firebase/firestore';
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
import EditCover from '../Components/EditCover';
import CreatedPost from '../Components/CreatedPost';
import SavedPost from '../Components/SavedPost';

function Profile() {

  const { id } = useParams()
  const { user, users, fakePins } = useData()
  const [isEditAvatarOpen, setIsEditAvatarOpen] = useState(false)
  const [isEditCoverOpen, setIsEditCoverOpen] = useState(false)
  const [isFollowerOpen, setIsFollowerOpen] = useState(false)
  const [isSavedSelected, setIsSavedSelected] = useState(true)

  return (
    <div className='py-5 relative'>
      <div className='profile flex justify-center items-center flex-col ' >
        <div className='w-full h-[300px] max-w-[900px] max-h[700px] border-2 rounded-xl bg-cover bg-center cursor-pointer' style={{
          backgroundImage: user?.cover ? `url(${user.cover})` : "none",
          backgroundColor: user?.cover ? "transparent" : "rgb(229 231 235)",
        }}
          onClick={() => setIsEditCoverOpen(true)}>
        </div>
        <div className='-mt-10' onClick={(e) => {
          e.stopPropagation()
          setIsEditAvatarOpen(true)
        }}>
          {user?.avatar ?
            <div className='flex items-center justify-center bg-green-300 w-24 h-fit max-h-24 border-2 cursor-pointer rounded-full'>
              <img src={user?.avatar} alt="" className='rounded-full w-full h-full' />
            </div>
            :
            <div className='flex items-center justify-center bg-green-300 w-24 h-24 cursor-pointer rounded-full'>
              <h1 className='text-4xl font-semibold capitalize'>{user?.username?.[0]}</h1>
            </div>
          }
        </div>
        <h1 className='my-2 font-semibold text-4xl capitalize'>{user?.username}</h1>
        <h1 className='font-semibold text-base cursor-pointer' onClick={() => setIsFollowerOpen(true)}>{user?.follower?.length} Follower</h1>
      </div>

      <div className='my-5'>
        <div className='flex items-center justify-center text-base font-semibold gap-4 my-5'>
          <button className={`  ${isSavedSelected && "border-b-4 border-red-600 py-2"}`} onClick={() => setIsSavedSelected(true)}>Created</button>
          <button className={` ${!isSavedSelected && "border-b-4 border-red-600 py-2"}`} onClick={() => setIsSavedSelected(false)}>Saved</button>
        </div>
        {/* ==================== user created post and Saved Post ===================================== */}
        {user && isSavedSelected ? <CreatedPost userId={user?.userId} /> : <SavedPost userId={user?.userId} />}
      </div>
      {/* ---------------------- modals ------------------------------------ */}
      {isFollowerOpen && <FollowersModal setIsFollowerOpen={setIsFollowerOpen} />}
      {isEditAvatarOpen && <EditAvatar setIsEditAvatarOpen={setIsEditAvatarOpen} imgUrl={user?.avatar} username={user?.username} />}
      {isEditCoverOpen && <EditCover setIsEditCoverOpen={setIsEditCoverOpen} imgUrl={user?.cover} />}

    </div>
  )
}

export default Profile