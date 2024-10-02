import React, { useEffect, useState } from 'react';
// import { commentsData,} from '../utils'; // Import the users and comments data
import { useData } from '../Context/DataProvider';

function CommentList({ id }) {
    const [comments, setComments] = useState([]); // comment list
    const {users,commentsData} = useData()

    useEffect(() => {
        // Fetch the comments based on the pin ID
        const cmnt = commentsData?.find((c) => c?.pinId === id);
        setComments(cmnt?.comments || []);
    }, [id]);

    // Function to find the user based on userId
    const findUser = (userId) => {
        return users.find(user => user.userId === userId);
    };

    return (
        <div className='comments h-full'>
            {comments?.length > 0 ? (
                comments.map((comment, index) => {
                    const user = findUser(comment.commentBy); // Find user by commentBy (userId)
                    return (
                        <div key={index} className='flex items-center gap-2'>
                            {user?.avatar  ?
                            <img 
                                src={`/${user?.avatar}`} 
                                alt="user avatar" 
                                className='w-7 h-7 rounded-full my-2' 
                            /> :
                            <div className='bg-red-300 h-7 w-7 rounded-full my-2 flex items-center justify-center text-white'>{user?.username[0]}</div>
                            }
                            <p className='text-xs font-semibold'>{user?.username || 'Unknown User'}</p>
                            <p className='text-sm'>{comment?.cmnt}</p>
                        </div>
                    );
                })
            ) : (
                <p>No comments yet</p>
            )}
        </div>
    );
}

export default CommentList;
