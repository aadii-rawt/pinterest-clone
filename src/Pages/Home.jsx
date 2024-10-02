import React, { useEffect, useState } from 'react'
import Pin from '../Components/Pin'
import { db } from '../firebase';
import { collection, doc, getDocs, limit, onSnapshot, orderBy, query } from 'firebase/firestore';
import { useData } from '../Context/DataProvider';
import Post from '../Components/Post';
// import { fakePins, users } from '../utils'
import Masonry from 'react-masonry-css';
function Home() {
  const [pins, setPins, fakePins,users] = useState([])
  const [lastDoc, setLastDoc] = useState(null);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  useEffect(()=>{
    const pinsData = fakePins.map((data) => {
      const userData = users.find((d) => d?.userId === data?.createdBy)
      
      return {...userData, ...data} 
    })
    setPins(pinsData)
  },[])


  // async function fetchPosts() {
  //   setLoading(true);
  //   const postsCollection = collection(db, "posts");
  //   const postsQuery = query(postsCollection, orderBy("createdAt", "desc"), limit(20));
  //   const postsSnapshot = await getDocs(postsQuery);

  //   const lastVisible = postsSnapshot.docs[postsSnapshot.docs.length - 1];
  //   setLastDoc(lastVisible);

  //   const postsList = postsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  //   setPins(postsList);
  //   setLoading(false);
  // };

  // // fetch more pins when reached the bottom of the page
  // async function fetchMorePosts() {
  //   if (!lastDoc || !hasMore) return;
  //   setLoading(true);
  //   const postsCollection = collection(db, "posts");
  //   const postsQuery = query(postsCollection, orderBy("createdAt", "desc"), startAfter(lastDoc), limit(20));
  //   const postsSnapshot = await getDocs(postsQuery);
  //   if (postsSnapshot.size === 0) {
  //     setHasMore(false);
  //   } else {
  //     const lastVisible = postsSnapshot.docs[postsSnapshot.docs.length - 1];
  //     setLastDoc(lastVisible);
  //     const morePosts = postsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  //     setPins(prevPosts => [...prevPosts, ...morePosts]);
  //   }

  //   setLoading(false);
  // };
  // // fetch data
  // useEffect(() => {
  //   fetchPosts();
  // }, []);
  // // tracking scroll 
  // useEffect(() => {
  //   const handleScroll = () => {
  //     if (window.innerHeight + document.documentElement.scrollTop + 1 >= document.documentElement.scrollHeight) {
  //       fetchMorePosts();
  //     }
  //   };
  //   window.addEventListener("scroll", handleScroll);
  //   return () => window.removeEventListener("scroll", handleScroll);
  // }, [lastDoc, hasMore]);

  // useEffect(()=>{
  //   const docRef = query(collection(db,"posts"),orderBy("timestamp", 'desc'))
  //   const unsubscribe = onSnapshot(docRef, (snapshot) => {
  //     const pinsData = snapshot.docs.map((doc) => ({id: doc.id,...doc.data()}));
  //     setPins(pinsData);
  //   }); 
  //   return () => unsubscribe();
  // },[])

  const breakpointColumnsObj = {
    default: 4,
    1100: 3,
    700: 2,
    500:2
  };

  return (
    <Masonry
      breakpointCols={breakpointColumnsObj}
      className="my-masonry-grid"
      columnClassName="my-masonry-grid_column"
    >
      {pins?.map((data,index) => (
        <Post key={index} data={data} />
      ))
      }
    </Masonry>



  )
}

export default Home