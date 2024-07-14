import React, { useEffect, useState } from 'react'
import Post from '../Components/Post'
import { db } from '../firebase';
import { collection, doc, getDocs, limit, onSnapshot, orderBy, query } from 'firebase/firestore';

function Home() {
  const [pins, setPins] = useState([])
  const [lastDoc, setLastDoc] = useState(null);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  // fetch pins from firestore database
  async function fetchPosts(){
    setLoading(true);
    const postsCollection = collection(db, "posts");
    const postsQuery = query(postsCollection, orderBy("createdAt", "desc"), limit(20));
    const postsSnapshot = await getDocs(postsQuery);

    const lastVisible = postsSnapshot.docs[postsSnapshot.docs.length - 1];
    setLastDoc(lastVisible);

    const postsList = postsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    setPins(postsList);
    setLoading(false);
  };

  // fetch more pins when reached the bottom of the page
  async function  fetchMorePosts(){
    if (!lastDoc || !hasMore) return;
    setLoading(true);
    const postsCollection = collection(db, "posts");
    const postsQuery = query(postsCollection, orderBy("createdAt", "desc"), startAfter(lastDoc), limit(20));
    const postsSnapshot = await getDocs(postsQuery);
    if (postsSnapshot.size === 0) {
      setHasMore(false);
    } else {
      const lastVisible = postsSnapshot.docs[postsSnapshot.docs.length - 1];
      setLastDoc(lastVisible);
      const morePosts = postsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setPins(prevPosts => [...prevPosts, ...morePosts]);
    }

    setLoading(false);
  };
  // fetch data
  useEffect(() => {
    fetchPosts();
  }, []);
  // tracking scroll 
  useEffect(() => {
    const handleScroll = () => {
      if (window.innerHeight + document.documentElement.scrollTop + 1 >= document.documentElement.scrollHeight) {
        fetchMorePosts();
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastDoc, hasMore]);

  // useEffect(()=>{
  //   const docRef = query(collection(db,"posts"),orderBy("timestamp", 'desc'))
  //   const unsubscribe = onSnapshot(docRef, (snapshot) => {
  //     const pinsData = snapshot.docs.map((doc) => ({id: doc.id,...doc.data()}));
  //     setPins(pinsData);
  //   }); 
  //   return () => unsubscribe();
  // },[])
  return (
    <div className='columns-2 md:columns-3 lg:columns-5 gap-1.5 py-5 '>
      {loading ? 
        <span>loading...</span> : 
        pins.map((post) => <Post key={post.id} post={post} />) 
      }
      {/* <Post /> */}
    </div>
  )
}

export default Home