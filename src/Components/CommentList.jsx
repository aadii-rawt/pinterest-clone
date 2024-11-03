import React, { useEffect, useState } from 'react';
import { collection, doc, getDoc, getDocs } from 'firebase/firestore';
import { db } from '../firebase';

function CommentList({ id }) {
    const [comments, setComments] = useState([]);
    const [loading, setLoading] = useState(true);

    // Fetch comments from Firestore
    useEffect(() => {
        const fetchComments = async () => {
            try {
                setLoading(true);

                const commentsRef = collection(db, 'comments', id, 'userComments');
                const commentSnapshot = await getDocs(commentsRef);
                const commentsData = await Promise.all(
                    commentSnapshot.docs.map(async (commentDoc) => {
                        const comment = commentDoc.data();
                        const userRef = doc(db, 'users', comment.commentBy);
                        return {
                            ...comment,
                            user: userSnap.exists() ? userSnap.data() : null,
                        };
                    })
                );
                setComments(commentsData);
            } catch (error) {
                console.error("Error fetching comments:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchComments();
    }, [id]);


    return (
        <div className='comments h-full'>
            {loading ? (
                <p>Loading comments...</p>
            ) : comments?.length > 0 ? (
                comments.map((comment, index) => {
                    const user = comment?.user;
                    return (
                        <div key={index} className='flex items-baseline gap-2'>
                            {user?.avatar ? (
                                <img
                                    src={`${user?.avatar}`}
                                    alt="user avatar"
                                    className='w-7 h-7 rounded-full my-2'
                                />
                            ) : (
                                <div className='bg-red-300 h-7 w-7  capitalize rounded-full my-2 flex items-center justify-center text-white'>
                                    {user?.username ? user?.username[0] : "?"}
                                </div>
                            )}
                            <div>
                                <div className='flex gap-1'>
                                    <p className='text-sm font-semibold '>{user?.username || 'Unknown User'}</p>
                                    <p className='text-sm'>{comment?.cmnt}</p>
                                </div>
                                <div>
                                    <p className='text-sm text-gray-400'>6 mo</p>
                                </div>
                            </div>
                        </div>
                    );
                })
            ) : (
                <p className='p -3'>No comments yet.</p>
            )}
        </div>
    );
}

export default CommentList;