import React, { useState } from 'react';
import { db, imgDb } from '../firebase';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { arrayUnion, doc, serverTimestamp, setDoc } from 'firebase/firestore';
import { useData } from '../Context/DataProvider';

function CreatePost() {
  const { user } = useData();
  const [formData, setFormData] = useState({
    title: '',
    img: '',
    description: '',
    link: '',
    tags: '',
  });
  const [loading, setLoading] = useState(false)

  const [img, setImg] = useState();

  // Handle form data
  function handleData(e) {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  }

  // Add post to the database
  async function handleSubmit(e) {
    e.preventDefault();
  setLoading(true)

    try {
      // Upload image to Firebase Storage
      const refrs = ref(imgDb, `posts/${crypto.randomUUID()}`);
      const data = await uploadBytes(refrs, img);
      const imgURL = await getDownloadURL(data.ref);

      // Manually create a document ID
      const postId = crypto.randomUUID(); // Generate a unique ID

      // Use setDoc to add the post with a specific document ID
      await setDoc(doc(db, 'posts', postId), {
        id: postId, // Assign the post ID to be the same as the document ID
        ...formData,
        img: imgURL,
        createdBy: user?.userId,
        createdAt: serverTimestamp(),
      });
      // store data in the userspost collection
      const userPostRef = doc(db, 'usersPosts', user?.userId);
      await setDoc(userPostRef, {
        createdPost: arrayUnion(postId)
      }, { merge: true });

      // Clear post inputs
      setFormData({
        title: '',
        img: '',
        description: '',
        link: '',
        tags: '',
      });
      setImg();
    } catch (error) {
      console.error('Error creating post:', error);
    }finally{
      setLoading(false)
    }
  }

  return (
    <div className='grid md:grid-cols-2 items-center justify-items-center py-5'>
      {/* Upload file */}
      <div className='bg-grayTheme relative overflow-hidden rounded-3xl w-full sm:w-[55%] h-[450px] flex items-center justify-center cursor-pointer'>
        {img ? (
          <div>
            <img src={URL.createObjectURL(img)} alt='' />
          </div>
        ) : (
          <div className='w-full h-full my-4 flex items-center rounded-3xl justify-center  border-dashed border-2 border-black/70'>
            <span> Click to upload</span>
          </div>
        )}
        <input
          type='file'
          name='file'
          className='w-full absolute h-full cursor-pointer opacity-0'
          onChange={(e) => setImg(e.target.files[0])}
        />
      </div>

      <div className='py-10 w-full md:w-2/3'>
        <form onSubmit={handleSubmit}>
          <div className='mb-4'>
            <label className='block text-gray-700 text-base font-bold mb-2' htmlFor='title'>
              Title
            </label>
            <input
              className='appearance-none border-2 font-semibold border-gray-500 rounded-xl w-full py-2 px-3 text-black leading-tight outline-none'
              id='title'
              name='title'
              type='text'
              placeholder='Add a title'
              value={formData.title}
              onChange={handleData}
            />
          </div>

          <div className='mb-4'>
            <label className='block text-gray-700 text-base font-bold mb-2' htmlFor='description'>
              Description
            </label>
            <textarea
              className='appearance-none border-2 resize-none border-gray-500 rounded-xl w-full py-2 px-3 text-black leading-tight outline-none'
              id='description'
              name='description'
              rows={2}
              value={formData?.description}
              placeholder='Add a detailed description'
              onChange={handleData}
            ></textarea>
          </div>

          <div className='mb-4'>
            <label className='block text-gray-700 text-base font-bold mb-2' htmlFor='link'>
              Link
            </label>
            <input
              className='appearance-none border-2 border-gray-500 rounded-xl w-full py-2 px-3 text-black leading-tight outline-none'
              id='link'
              name='link'
              type='text'
              value={formData.link}
              placeholder='Add a link'
              onChange={handleData}
            />
          </div>

          <div className='mb-4'>
            <label className='block text-gray-700 text-base font-bold mb-2' htmlFor='tags'>
              Tagged topics
            </label>
            <input
              className='appearance-none border-2 border-gray-500 rounded-xl w-full py-2 px-3 text-black leading-tight outline-none'
              id='tags'
              name='tags'
              type='text'
              value={formData.tags}
              placeholder='Add tag'
              onChange={handleData}
            />
          </div>

          <div className='flex items-center justify-between'>
            <button className='btn bg-red-500 text-white font-semibold hover:bg-redTheme' type='submit' disabled={loading}>
             Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default CreatePost;
