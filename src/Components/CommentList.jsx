import React, { useEffect, useState } from 'react'
import img from "../../public/img5.jpg";
import { db } from '../firebase';
import { collection, onSnapshot, query } from 'firebase/firestore';
import {commentsData} from '../utils'

function CommentList({ id }) {
    const [comments, setComments] = useState([]); // comment list
    // fetch comments
    // useEffect(() => {
    //     const q = query(collection(db, "posts", id, "comments"));
    //     const unsubscribe = onSnapshot(q, (snapshot) => {
    //         setComments(snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
    //     });
    //     return () => unsubscribe();
    // }, [id])

    useEffect(() => {
       const cmnt = commentsData?.find((c) => c?.pinId === id );
    //    const cmntData = cmnt?.comments.filter((u) => u?.commentBy)
       setComments(cmnt?.comments)
    },[id])
    return (
        <div className='comments h-full'>
            {comments?.length > 0 ?
                comments.map((comment, index) => {
                    return <div key={index} className='flex items-center gap-2'>
                        <img src={img} alt="user" className='w-7 h-7 rounded-full my-2' />
                        <p className='text-xs font-semibold'>{comment.username}</p>
                        <p className='text-sm'>{comment?.cmnt}</p>
                    </div>
                }) :
                <p>No comments yet</p>
            }
        </div>
    )
}

export default CommentList