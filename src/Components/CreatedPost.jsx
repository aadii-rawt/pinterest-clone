import { collection, doc, getDoc } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { db } from '../firebase';
import Masonry from 'react-masonry-css';
import { useData } from '../Context/DataProvider';
import Post from './Post';

function CreatedPost({ userId }) {
  const [savedPosts, setSavedPosts] = useState([]); // State to hold saved post details
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error state
  const {breakpointColumnsObj} = useData()

  useEffect(() => {
    const fetchSavedPosts = async () => {
      try {
        if (userId) {
          // Get the user's Firestore document by UID
          const userDocRef = doc(db, `usersPosts/${userId}`);
          const userDocSnapshot = await getDoc(userDocRef);

          if (userDocSnapshot.exists()) {
            // Extract the 'savedPost' array from the document
            const userData = userDocSnapshot.data();
            const userSavedPosts = userData?.savedPost || [];

            // Fetch the details of each saved post
            const postsPromises = userSavedPosts.map(async (postId) => {
              const postDocRef = doc(db, 'posts', postId); // Assuming 'posts' is the collection where the posts are stored
              const postDocSnapshot = await getDoc(postDocRef);
              
              if (postDocSnapshot.exists()) {
                return { id: postDocSnapshot.id, ...postDocSnapshot.data() };
              } else {
                console.error(`Post with ID ${postId} does not exist`);
                return null;
              }
            });

            const postsData = await Promise.all(postsPromises);
            const validPosts = postsData.filter(post => post !== null); // Filter out any null posts
            setSavedPosts(validPosts); // Set the fetched posts into state
          } else {
            console.error('User document does not exist');
            setError('User document does not exist');
          }
        } else {
          console.error('No user is logged in');
          setError('No user is logged in');
        }
      } catch (error) {
        console.error('Error fetching saved posts:', error);
        setError('Error fetching saved posts');
      } finally {
        setLoading(false);
      }
    };

    fetchSavedPosts();
  }, [userId]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
            <Masonry
                breakpointCols={breakpointColumnsObj}
                className="my-masonry-grid"
                columnClassName="my-masonry-grid_column"
            >
                {savedPosts?.map((data, index) => (
                    <Post key={index} data={data} showUserDetails={false} />
                ))
                }
            </Masonry>
        </div>
  );
}

export default CreatedPost;
