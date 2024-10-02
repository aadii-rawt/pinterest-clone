import React, { useState } from 'react'
import img from "../../public/img3.jpg";
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import { auth, db } from '../firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import { IoMdSend } from 'react-icons/io';
import { useData } from '../Context/DataProvider'
import { comment } from 'postcss';
function Comment({ id }) {

  const { user, setShowLoginModel, commentsData, setCommentsData } = useData()

  const [newComment, setNewComment] = useState("");
  // const [user] = useAuthState(auth)
  // console.log("bew");

  // // add new comment
  function handleCommentSubmit() {
    // if (!user) {
    //   return setShowLoginModel(true)
    // }
    console.log("commnet");

    userComment = {
      id: "59875",
      cmnt: newComment,
      commentBy: user?.userId,
    }

    setCommentsData((prev) => ([...prev,
    {
      pinId: id,
      comments: [
        userComment
      ]
    }
    ]))

    setNewComment("")
    console.log(commentsData);


    // if (newComment.trim() && user) {
    //   await addDoc(collection(db, "posts", id, "comments"), {
    //     username: user?.displayName,
    //     commentText: newComment,
    //     createdAt: serverTimestamp()
    //   });
    //   setNewComment(""); // clear comment input
    // }
  }
  return (
    <div className='flex items-center justify-between gap-2'>
      {user && <div className='flex items-center justify-center'>
        {
          user?.avatar ?
            <img src={`/${user?.avatar}`} alt="" className='w-9 h-9 rounded-full' />
            :
            <div className='w-9 h-9 rounded-full bg-red-400 flex items-center justify-center text-white text-lg'>{user?.username[0]}</div>
        }
      </div>}
      <div className='flex-auto' >
        <form action="">
          <textarea
            name="comment"
            rows={1}
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            className='text-sm w-full resize-none px-2 py-2 border outline-none border-gray-400 rounded-3xl' id=""></textarea>
        </form>
      </div>
      <div className='w-9 h-9 cursor-pointer rounded-full bg-green-700 flex items-center justify-center' onClick={handleCommentSubmit}>
        <button ><IoMdSend color='white' /></button>
      </div>
    </div>
  )
}

export default Comment