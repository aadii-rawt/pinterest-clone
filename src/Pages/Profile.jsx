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
  const [openShareModal, setOpenShareModal] = useState(false)

  const showFollowersFollowing = (title) => {
    if (!user) {
      setShowLoginModel(true)
    }
    setIsFollowerOpen({
      isOpen: true,
      title: title
    })
  }

  function copyLink() {
    const currentUrl = `https://pinterest-ar.netlify.app/user/${user?.username}`;
    navigator.clipboard.writeText(currentUrl)
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
          <div className='relative'>
            <button
              onClick={() => setOpenShareModal(!openShareModal)}
              className="btn bg-gray-300 text-black" >
              Share
            </button>
            {openShareModal &&
              <div className='absolute bg-gray-100 shadow-lg rounded-md w-80 h-40 px-3 py-5 space-y-4 left-24 -top-10'>
                <h1 className='text-center font-medium'>Share</h1>
                <div className='flex items-center justify-between px-3  gap-5 text-xs font-medium'>
                  <div className='w-10 h-10 text-center flex flex-col items-center' onClick={copyLink}>
                    <button className='bg-gray-200 rounded-full hover:bg-gray-300/70'>
                      <img src="/link.png" alt="" />
                    </button>
                    <p className='text-nowrap'>Copy link</p>
                  </div>
                  <div className='w-10 h-10 text-center flex flex-col items-center'>
                    <a href={`https://api.whatsapp.com/send?text=${user?.username} - https://pinterest-ar.netlify.app/user/${user?.username}`} target="_blank" rel="noreferrer">
                      <img src="/whatsapp.png" alt="" />
                    </a>
                    <p>Whatsapp</p>
                  </div>
                  <div className='w-10 h-10 text-center flex flex-col items-center'>
                    <a href={`https://www.facebook.com/sharer/sharer.php?u=https://pinterest-ar.netlify.app/user/${user?.username}`} target="_blank" rel="noreferrer">
                      <img src="/facebook.png" alt="" />
                    </a>
                    <p>Facebook</p>
                  </div>
                  <div className='w-10 h-10 text-center flex flex-col items-center'>
                    <a href={`https://twitter.com/intent/tweet?url=https://pinterest-ar.netlify.app/user/${user?.username}&text=${user?.username}`} target="_blank" rel="noreferrer">
                      <img src="/twitter.png" alt="" />
                    </a>
                    <p>X</p>
                  </div>
                </div>
              </div>
            }
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