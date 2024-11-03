import React, { useEffect, useState } from 'react';
// import { commentsData,} from '../utils'; // Import the users and comments data
import { useData } from '../Context/DataProvider';
import { collection, doc, getDoc, getDocs } from 'firebase/firestore';
import { db } from '../firebase';

function CommentList({ id }) {
    const [comments, setComments] = useState([]); // comment list
    const { users } = useData(); // Assuming `users` contains all the user data
    const [loading, setLoading] = useState(true); // Loading state for fetching comments

    // Fetch comments from Firestore
    useEffect(() => {
        const fetchComments = async () => {
            try {
                setLoading(true);

                // Reference to the comments collection for the given pin ID
                const commentsRef = collection(db, 'comments', id, 'userComments');

                // Fetch all comments for the specific pin
                const commentSnapshot = await getDocs(commentsRef);
                const commentsData = await Promise.all(
                    commentSnapshot.docs.map(async (commentDoc) => {
                        const comment = commentDoc.data();

                        // Fetch user data for each comment based on commentBy (userId)
                        const userRef = doc(db, 'users', comment.commentBy); // Corrected usage of `doc`
                        const userSnap = await getDoc(userRef);

                        // Combine comment with user details
                        return {
                            ...comment,
                            user: userSnap.exists() ? userSnap.data() : null,
                        };
                    })
                );

                // Set comments to state
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
                    const user = comment?.user; // Get user details for the comment
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