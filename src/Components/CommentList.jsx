import React, { useEffect, useState } from 'react'
import img from "../../public/img3.jpg";
import { db } from '../firebase';
import { collection, onSnapshot, query } from 'firebase/firestore';

function CommentList({ id }) {
    const [comments, setComments] = useState([]); // comment list
    // fetch comments
    useEffect(() => {
        const q = query(collection(db, "posts", id, "comments"));
        const unsubscribe = onSnapshot(q, (snapshot) => {
            setComments(snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
        });
        return () => unsubscribe();
    }, [id])

    return (
        <div className='comments'>
            {comments.length > 0 &&
                comments.map((comment, index) => {
                    return <div key={index} className='flex items-center gap-2'>
                        <img src={img} alt="user" className='w-7 h-7 rounded-full my-2' />
                        <p className='text-xs font-semibold'>{comment.username}</p>
                        <p className='text-xs'>{comment.commentText}</p>
                    </div>
                })
            }
        </div>
    )
}

export default CommentList