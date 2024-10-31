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
  const { user, setShowLoginModel } = useData()
  const [isEditAvatarOpen, setIsEditAvatarOpen] = useState(false)
  const [isEditCoverOpen, setIsEditCoverOpen] = useState(false)
  const [isFollowerOpen, setIsFollowerOpen] = useState({
    isOpen: false,
    title: ""
  })
  const [isSavedSelected, setIsSavedSelected] = useState(true)

  const showFollowersFollowing = (title) => {
    if(!user){
      setShowLoginModel(true)
    }
    setIsFollowerOpen({
      isOpen: true,
      title: title
    })
  }

  return (
    <div className='py-5 relative'>
      <div className='flex w-full flex-col-reverse md:flex-row items-start justify-between relative'>
                <div className={`${user?.cover && "-mt-14"} w-full flex items-center flex-col justify-center md:flex  md:items-start  space-y-3 md:mt-5`}>
                    <div className='md:flex items-center gap-3'>
                        {/*----------- user avatar------------  */}
                        {user?.avatar ?
                            <div className='flex items-center justify-center bg-green-300 w-24 h-24 cursor-pointer rounded-full border-2' onClick={() => setIsEditAvatarOpen(true)}>
                                <img src={user?.avatar} alt="" className='rounded-full w-full h-full' />
                            </div>
                            :
                            <div className='flex items-center justify-center bg-red-300 w-24 h-24 cursor-pointer rounded-full' onClick={() => setIsEditAvatarOpen(true)}>
                                <h1 className='text-4xl font-semibold capitalize'>{user?.username?.[0]}</h1>
                            </div>
                        }
                        {/*----------- user name------------  */}
                        <h1 className='text-3xl font-medium text-center'>{user?.username}</h1>
                    </div>
                    <div className='flex gap-2'>
                        {<button onClick={() => showFollowersFollowing("follower")}>{user?.follower?.length || 0} followers</button>}
                        <span>●</span>
                        <button onClick={() => showFollowersFollowing("following")}>{user?.following?.length || 0} following</button>
                    </div>
                    <div>
                        <button
                            // onClick={handleFollowToggle}
                            className="btn bg-gray-300 text-black" >
                            {/* {isuserFollowed ? 'Followed' : 'Follow'} */}
                            Share
                        </button>
                    </div>
                </div>
                <div className='md:rounded-3xl min-w-[600px] overflow-hidden max-h-[400px] cursor-pointer' onClick={() => setIsEditCoverOpen(true)}>
                    <img src={user?.cover} alt="" />
                </div>
            </div>

      <div className='my-5 mt-9'>
        <div className='flex items-center justify-center text-base font-semibold gap-4 my-5'>
          <button className={`  ${isSavedSelected && "border-b-4 border-red-600 py-2"}`} onClick={() => setIsSavedSelected(true)}>Created</button>
          <button className={` ${!isSavedSelected && "border-b-4 border-red-600 py-2"}`} onClick={() => setIsSavedSelected(false)}>Saved</button>
        </div>
        {/* ==================== user created post and Saved Post ===================================== */}
        {user && isSavedSelected ? <CreatedPost userId={user?.userId} /> : <SavedPost userId={user?.userId} />}
      </div>
      {/* ---------------------- modals ------------------------------------ */}
      {isFollowerOpen?.isOpen && <FollowersModal isFollowerOpen={isFollowerOpen} setIsFollowerOpen={setIsFollowerOpen} />}
      {isEditAvatarOpen && <EditAvatar setIsEditAvatarOpen={setIsEditAvatarOpen} imgUrl={user?.avatar} username={user?.username} />}
      {isEditCoverOpen && <EditCover setIsEditCoverOpen={setIsEditCoverOpen} imgUrl={user?.cover} />}

    </div>
  )
}

export default Profile