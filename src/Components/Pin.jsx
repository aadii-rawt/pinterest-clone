import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { arrayUnion, doc, getDoc, setDoc } from 'firebase/firestore';
import { db } from '../firebase';
import PinDetails from './PinDetails';
import Comment from './Comment';
import { MdOutlineFileDownload } from 'react-icons/md';
import { IoMdShare } from 'react-icons/io';
import Masonry from 'react-masonry-css';
import Post from './Post';
import { saveAs } from 'file-saver';
import { useDispatch, useSelector } from 'react-redux';
import { setShowLoginModel } from '../Store/Reducers/statesSlice';

function Pin() {
    const { id } = useParams()
    const [pin, setPin] = useState(null)
    const [userDetails, setUserDetails] = useState({})
    const [morePins, setMorePins] = useState([])
    const {breakpointColumnsObj} = useSelector(state => state.statesSlice)
    const [openShareModal, setOpenShareModal] = useState(false)
    const {user} = useSelector(state => state.userSlice)
    const [isSaved, setIsSaved] = useState(false)
    const dispatch = useDispatch()

    // -------------------- fetch the pin ----------------------------
    useEffect(() => {
        const fetchPin = async () => {
            try {
                const postDocRef = doc(db, 'posts', id);
                const postDoc = await getDoc(postDocRef);

                if (postDoc.exists()) {
                    const postData = postDoc.data();
                    setPin(postData);
                    const userDocRef = doc(db, 'users', postData?.createdBy);
                    const userDoc = await getDoc(userDocRef);
                    if (userDoc.exists()) {
                        setUserDetails(userDoc.data());
                        console.log('User details:', userDoc.data());
                    } else {
                        console.log('No such user!');
                    }
                } else {
                    console.log('No such post!');
                }
            } catch (error) {
                console.error('Error fetching post: ', error);
            }
        };

        console.log(pin);


        fetchPin();
    }, [id]);

    // -------------------- check if the pin is saved ----------------------------
    useEffect(() => {
        const checkIfPinSaved = async () => {
            if (!user) return;
            try {
                const userPostsRef = doc(db, 'usersPosts', user?.userId);
                const userPostsDoc = await getDoc(userPostsRef);
                if (userPostsDoc.exists()) {
                    const savedPosts = userPostsDoc.data().savedPost || [];
                    setIsSaved(savedPosts.includes(id));
                }
            } catch (error) {
                console.error('Error checking saved status:', error);
            }
        };

        checkIfPinSaved();
    }, [user, id]);

    // -------------------- download the image ----------------------------

    function downloadImage(url) {
        fetch(url)
            .then(response => response.blob()) // Convert the image to a blob
            .then(blob => {
                const fileName = pin?.title || 'download'; // Use the pin title or a default name
                saveAs(blob, `${fileName}.jpg`); // Save the image as a file
            })
            .catch(error => {
                console.error('Error downloading image:', error);
            });
    }

    // -------------------- copy the link ----------------------------
    function copyLink() {
        const currentUrl = window.location.href;
        navigator.clipboard.writeText(currentUrl)
    }

    // -------------------- save the pin ----------------------------
    async function savePin() {
        if (!user) {
            dispatch(setShowLoginModel(true))
            return;
        }
        try {
            const userPostsRef = doc(db, 'usersPosts', user?.userId);
            await setDoc(userPostsRef, {
                savedPost: arrayUnion(id)
            }, { merge: true });
            setIsSaved(true);
        } catch (error) {
            console.error('Error saving pin: ', error)
        }

    }

    // -------------------- unsave the pin ----------------------------
    async function unsavePin() {
        if (!user) return;

        try {
            const userPostsRef = doc(db, 'usersPosts', user?.userId);

            const userPostsDoc = await getDoc(userPostsRef);
            const currentSavedPosts = userPostsDoc.data()?.savedPost || [];

            const updatedSavedPosts = currentSavedPosts.filter(postId => postId !== id);

            await setDoc(userPostsRef, {
                savedPost: updatedSavedPosts
            }, { merge: true });
            setIsSaved(false);
        } catch (error) {
            console.error('Error unsaving pin:', error);
        }
    }

    return (
        <div>
            <div className='w-full flex items-center justify-center'>
                <div className='w-full lg:w-3/5 relative flex flex-col lg:flex-row  overflow-hidden rounded-3xl shadow-[0px_4px_6px_1px_rgba(0,0,0,0.2),_0px_2px_4px_1px_rgba(0,0,0,0.08)]'>
                    <div className='w-full lg:w-1/2 flex items-center justify-center' >
                        <img src={pin?.img} alt="" />
                    </div>
                    <div className='w-full lg:w-1/2 h-full px-3 py-5 relative'>
                        <div className='flex justify-between items-center'>
                            <div className='flex gap-3 justify-around'>
                                <div className={`cursor-pointer relative rounded-full flex items-center justify-center hover:bg-grayTheme w-10 h-10 p-2 ${openShareModal && "bg-black hover:bg-black"}`}>
                                    <IoMdShare size={22} color={openShareModal ? "white" : "black"} onClick={() => setOpenShareModal(!openShareModal)} />
                                    {openShareModal &&
                                        <div className='absolute bg-gray-100 shadow-lg rounded-md w-80 h-40 px-3 py-5 space-y-4 top-12 left-0'>
                                            <h1 className='text-center font-medium'>Share</h1>
                                            <div className='flex items-center justify-between px-3  gap-5 text-xs font-medium'>
                                                <div className='w-10 h-10 text-center flex flex-col items-center' onClick={copyLink}>
                                                    <button className='bg-gray-200 rounded-full hover:bg-gray-300/70'>
                                                        <img src="/link.png" alt="" />
                                                    </button>
                                                    <p className='text-nowrap'>Copy link</p>
                                                </div>
                                                <div className='w-10 h-10 text-center flex flex-col items-center'>
                                                    <a href={`https://api.whatsapp.com/send?text=${pin?.title} - https://pinterest-ar.netlify.app/pin/${id}`} target="_blank" rel="noreferrer">
                                                        <img src="/whatsapp.png" alt="" />
                                                    </a>
                                                    <p>Whatsapp</p>
                                                </div>
                                                <div className='w-10 h-10 text-center flex flex-col items-center'>
                                                    <a href={`https://www.facebook.com/sharer/sharer.php?u=https://pinterest-ar.netlify.app/pin/${id}`} target="_blank" rel="noreferrer">
                                                        <img src="/facebook.png" alt="" />
                                                    </a>
                                                    <p>Facebook</p>
                                                </div>
                                                <div className='w-10 h-10 text-center flex flex-col items-center'>
                                                    <a href={`https://twitter.com/intent/tweet?url=https://pinterest-ar.netlify.app/pin/${id}&text=${pin?.title}`} target="_blank" rel="noreferrer">
                                                        <img src="/twitter.png" alt="" />
                                                    </a>
                                                    <p>X</p>
                                                </div>
                                            </div>
                                        </div>
                                    }
                                </div>
                                <div className='cursor-pointer rounded-full flex items-center justify-center hover:bg-grayTheme w-10 h-10 p-2' onClick={() => downloadImage(pin?.img)}><MdOutlineFileDownload size={28} color='black' /></div>
                            </div>
                            <div>
                                <button
                                    className={`btn ${isSaved ? 'bg-black' : 'bg-redTheme '} text-white  md:px-3 md:py-1.5`}
                                    onClick={() => isSaved ? unsavePin() : savePin()}
                                >
                                    {isSaved ? 'Saved' : 'Save'}
                                </button>
                            </div>
                        </div>
                        <PinDetails id={id} pin={pin} userDetails={userDetails} />
                        <Comment id={id} />
                    </div>
                </div>
            </div>
            {/*====================== more pins =======================*/}
            <div className='mt-10'>
                <h1 className='text-center font-semibold text-xs md:text-xl my-5'>more to explore</h1>
                <Masonry
                    breakpointCols={breakpointColumnsObj}
                    className="my-masonry-grid"
                    columnClassName="my-masonry-grid_column"
                >
                    {morePins?.map((data, index) => (
                        <Post key={index} data={data} />
                    ))
                    }
                </Masonry>
            </div>
        </div >
    )
}

export default Pin
