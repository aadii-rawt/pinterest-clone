import React, { useRef, useState } from 'react'
import { useData } from '../Context/DataProvider';
import { getDownloadURL, getStorage, ref, uploadBytes } from 'firebase/storage';
import { doc, updateDoc } from 'firebase/firestore';
import { db } from '../firebase';

function EditCover({ setIsEditCoverOpen }) {
    const videoRef = useRef(null);
    const canvasRef = useRef(null);
    const [photoCaptured, setPhotoCaptured] = useState(false);
    const [newCover, setNewCover] = useState()
    const {user,setUser} = useData();


    async function openCamera() {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({
                video: { facingMode: 'user' }, // Use 'user' for the front camera
                audio: false,
            });

            const video = document.createElement('video'); // Hidden video element
            video.srcObject = stream;

            // Play the video stream to ensure it's active
            await new Promise((resolve) => (video.onloadedmetadata = resolve));
            video.play();

            const canvas = canvasRef.current;
            canvas.width = video.videoWidth;
            canvas.height = video.videoHeight;

            const context = canvas.getContext('2d');
            context.drawImage(video, 0, 0, canvas.width, canvas.height);

            // Stop the camera stream after capturing the photo
            stream.getTracks().forEach((track) => track.stop());

            setPhotoCaptured(true); // Update state to indicate a photo was captured
        } catch (error) {
            console.error('Error accessing camera: ', error);
            alert('Could not access the front camera. Please enable camera permissions.');
        }
    }

    async function uploadNewCover() {
        if (!newCover) return; // Ensure there's a file to upload

        const storage = getStorage(); // Get Firebase Storage instance
        const avatarRef = ref(storage, `covers/${user?.userId}/${newCover?.name}`); // Create a reference for the avatar file

        try {
            // Upload the file to Firebase Storage
            await uploadBytes(avatarRef, newCover);

            // Get the download URL of the uploaded file
            const downloadURL = await getDownloadURL(avatarRef);

            // Update the avatar URL in Firestore
            const userDocRef = doc(db, 'users', user?.userId);
            await updateDoc(userDocRef, { cover: downloadURL });

            // Update the user state with the new avatar URL
            setUser((prev) => ({ ...prev, cover: downloadURL }));

            // Close the modal
            setIsEditCoverOpen(false);
        } catch (error) {
            console.error('Error uploading avatar:', error);
            alert('Failed to upload avatar. Please try again.');
        }
    }

    async function removeAvatar() {
        try {
            const userDocRef = doc(db, 'users', user?.userId);
            await updateDoc(userDocRef, { cover: "" });
            setUser((prev) => ({ ...prev, cover: "" }));
            setIsEditCoverOpen(false);
        } catch (error) {
            console.error('Error removing avatar:', error);
        }
    }

    return (
        <div className='w-full  max-h-screen min-h-screen bg-black/60 fixed inset-0 z-50 flex items-center justify-center  cursor-zoom-in' onClick={() => setIsEditCoverOpen(false)}>
            {!newCover ?
                <div className='w-1/2 p-10 bg-white rounded-lg cursor-default' onClick={(e) => e.stopPropagation()}>
                    <h1 className='text-center  text-2xl font-semibold'>Change your Cover</h1>
                    <div className='flex items-center justify-around my-10'>
                        <button className='bg-red-600 hover:bg-red-700 text-lg cursor-pointer text-white rounded-3xl  py-2 px-4 font-medium' onClick={openCamera}>
                            Take Photo</button>
                        <div className='bg-red-600 relative hover:bg-red-700 text-lg cursor-pointer text-white rounded-3xl  py-2 px-4 font-medium'> <span className='cursor-pointer'>Choose Photo </span>
                            <input type="file" accept='image/*'  onChange={(e) => setNewCover(e.target.files[0])} className='w-full -z-0 absolute opacity-0 cursor-pointer inset-0' />
                        </div>
                        <button className='bg-gray-300 hover:bg-gray-400 text-lg text-black rounded-3xl  py-2 px-4 font-medium' onClick={removeAvatar}>Remove Photo</button>

                    </div>

                    {/* <canvas ref={canvasRef} style={{ width: '100%', maxWidth: '400px' }}></canvas> */}
                </div>
                :
                <div className='w-1/2 min-h-[50%] max-h-[50%] cursor-default rounded-2xl bg-white p-2  overflow-hidden flex flex-col items-center justify-center'>
                    <div className=' flex items-center justify-center rounded-full overflow-hidden'>
                        <img src={URL.createObjectURL(newCover)} alt="" className='w-[150px] h-[150px] rounded-full' />
                    </div>
                    <div className='flex items-center justify-around w-full my-10'>
                        <button className='bg-gray-300 hover:bg-gray-400 text-lg text-black rounded-3xl  py-2 px-4 font-medium'>Cancel</button>
                        <button className='bg-red-600 relative hover:bg-red-700 text-lg cursor-pointer text-white rounded-3xl  py-2 px-4 font-medium' onClick={uploadNewCover}>Upload</button>
                    </div>
                </div>
            }

        </div>
    )
}

export default EditCover