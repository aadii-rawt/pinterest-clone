import React, { useEffect, useState } from 'react'
import Pin from '../Components/Pin'
import { db } from '../firebase';
import { collection, doc, getDoc, getDocs, limit, onSnapshot, orderBy, query } from 'firebase/firestore';
import { useData } from '../Context/DataProvider';
import Post from '../Components/Post';
// import { fakePins, users } from '../utils'
import Masonry from 'react-masonry-css';
import Shimmer from '../Components/Shimmer';
function Home() {
  const [pins, setPins] = useState([])
  const { fakePins, users } = useData()
  const [lastDoc, setLastDoc] = useState(null);
  const [loading, setLoading] = useState(true);
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      const postsCollection = collection(db, "posts"); // Replace 'posts' with your collection name
      const postsSnapshot = await getDocs(postsCollection);
      try {      
        const postList = await Promise.all(
          postsSnapshot.docs.map(async (postDoc) => {
            const postData = postDoc.data();
            const userId = postData?.createdBy; // Assuming post contains userId
  
            // Fetch user details from 'users' collection using userId
            const userDocRef = doc(db, "users", userId); // Correctly creating a reference to the user's document
            const userDoc = await getDoc(userDocRef); // Correct usage of getDoc to fetch user data
            const userData = userDoc.exists() ? userDoc.data() : null;
  
            return {
              id: postDoc.id,
              ...postData,
              user: userData, // Attach user details to the post
            };
          })
        );
        setPins(postList);
        setLoading(false)
      } catch (error) {
        console.log("this is error", error); 
      }
    };
    fetchPosts();
  }, []);


  const breakpointColumnsObj = {
    default: 4,
    1100: 3,
    700: 2,
    500: 2
  };

  if (loading) {
    return <Shimmer />
  }


  return (
    <Masonry
      breakpointCols={breakpointColumnsObj}
      className="my-masonry-grid"
      columnClassName="my-masonry-grid_column"
    >
      {pins?.map((data, index) => (
        <Post key={index} data={data} showUserDetails={true} />
      ))
      }
    </Masonry>
  )
}

export default Home