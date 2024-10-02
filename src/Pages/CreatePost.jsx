import React, { useState } from 'react'
import { auth, db, imgDb } from '../firebase'
import { getDownloadURL, list, ref, uploadBytes } from 'firebase/storage'
import { addDoc, collection, serverTimestamp } from 'firebase/firestore'
import { useAuthState } from 'react-firebase-hooks/auth'

function CreatePost() {
  const [user] = useAuthState(auth)
  const [formData, setFormData] = useState({
    title: "",
    file: "",
    description: "",
    link: "",
    tags: "",
    comments: "",
  })
  const [img, setImg] = useState()
  
  // handle form data
  function handleData(e) {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }
  // add post to database
  async function handleSubmit(e) {
    e.preventDefault()
    // upload image to firebase storege
    const refrs = ref(imgDb, `posts/${crypto.randomUUID()}`);
    const data = await uploadBytes(refrs, img);
    const imgURL = await getDownloadURL(data.ref)
    // add data to firestore database
    await addDoc(collection(db,`posts`), {
      ...formData,
      file: imgURL,
      createdBy: user.displayName,
      createdAt: serverTimestamp(),
    });
    // clear post inputs
    setFormData({
      title: "",
      file: "",
      description: "",
      link: "",
      tags: "",
      comments:"",
    })
    setImg()
  }

  return (
    <div className='grid md:grid-cols-2 items-center justify-items-center py-5'>
      {/* upload file */}
      <div className='bg-grayTheme relative overflow-hidden rounded-3xl w-full sm:w-[55%] h-[450px] flex items-center justify-center cursor-pointer'>
        {img ?
          <div className='' >
            <img src={URL.createObjectURL(img)} alt="" />
          </div> :
          <div className='w-full h-full my-4 flex items-center rounded-3xl justify-center  border-dashed border-2 border-black/70'>
            <span > Click to upload</span>
          </div>
        }
        <input type="file" name='file'
          className='w-full absolute h-full cursor-pointer opacity-0'
          onChange={(e) => setImg(e.target.files[0])} />
      </div>
      <div className='py-10 w-full md:w-2/3'>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 text-base font-bold mb-2" htmlFor="title">
              Title
            </label>
            <input
              className="appearance-none border-2 font-semibold border-gray-500 rounded-xl w-full py-2 px-3 text-black leading-tight outline-none"
              id="title"
              name='title'
              type="text"
              placeholder="Add a title"
              value={formData.title}
              onChange={handleData}
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-base font-bold mb-2" htmlFor="description">
              Description
            </label>
            <textarea
              className="appearance-none border-2 resize-none border-gray-500 rounded-xl w-full py-2 px-3 text-black leading-tight outline-none"
              id="description"
              name='description'
              rows={2}
              value={formData?.description}
              placeholder="Add a detailed description"
              onChange={handleData}
            ></textarea>
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-base font-bold mb-2" htmlFor="link">
              Link
            </label>
            <input
              className="appearance-none border-2 border-gray-500 rounded-xl w-full py-2 px-3 text-black leading-tight outline-none"
              id="link"
              name="link"
              type="text"
              value={formData.link}
              placeholder="Add a link"
              onChange={handleData}
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-base font-bold mb-2" htmlFor="tags">
              Tagged topics
            </label>
            <input
              className="appearance-none border-2 border-gray-500 rounded-xl w-full py-2 px-3 text-black leading-tight outline-none"
              id="tags"
              name='tags'
              type="text"
              value={formData.tags}
              placeholder="Add tag"
              onChange={handleData}
            />
          </div>
          <div className="flex items-center justify-between">
            <button
              className="btn bg-red-500 text-white font-semibold hover:bg-redTheme"
              type="submit">Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default CreatePost