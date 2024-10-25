import React, { useState } from 'react'
import Login from './Login'
import Signup from './Singup'
import { Link } from 'react-router-dom'
import { BiBell, BiLogOut, BiUserCircle } from 'react-icons/bi'
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from '../firebase'
import { MdCancel } from 'react-icons/md'
import { useData } from '../Context/DataProvider'

function Header() {
  const [searchText, setSearchText] = useState("")
  const [showLinks, setShowLinks] = useState(false) // show links when user click  // show login model
  const [showSignupModal, setShowSignupModal] = useState(false) // show signup model
  const { user, showLoginModel, setShowLoginModel } = useData()
  function handleSingOut() {
    auth.signOut()
  }


  return (
    <div className='sticky container bg-white inset-0 z-30  flex justify-between items-center py-3'>
      <div className='flex gap-3 items-center'>
        <img src="logo.png" alt="" className="w-8" />
        <div>
          {user ? (
            <div>
              <ul className='flex gap-3 text-lg font-semibold'>
                <li><Link to='/' className='bg-black text-white px-3 py-2.5 rounded-3xl'>Home</Link></li>
                <li><Link to='create'>Create</Link></li>
              </ul>
            </div>
          ) : (
            <button className={`btn relative  ${showLinks ? "bg-black text-white" : "bg-grayTheme text-black"}`}
              onClick={() => setShowLinks(!showLinks)}>Explore
              {showLinks &&
                <div className='absolute top-14 left-0 z-50 bg-grayTheme text-black rounded-md py-2.5'>
                  <ul>
                    <li className='px-5 py-1.5 '>Today</li>
                    <li className='px-5 py-1.5 '>Watch</li>
                    <li className='px-5 py-1.5 '>Explore</li>
                  </ul>
                </div>}
            </button>
          )}
        </div>
      </div>
      <div className='hidden md:flex md:w-2/4 xl:w-4/6 py-3 px-4 bg-grayTheme rounded-3xl items-center gap-2 border-[3px] focus-within:border-blue-400 '>
        <input type="text" placeholder='Search for easy dinners, fashion, etc.'
          className='w-full bg-transparent outline-none'
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
        />
        {searchText.length > 0 &&
          <span
            className='cursor-pointer'
            onClick={(e) => {
              e.stopPropagation()
              setSearchText('')
            }}><MdCancel size={22} /></span>
        }
      </div>
      <div className='flex gap-2 items-center overflow-hidden'>
        {user ?
          <>
            <span className=' cursor-pointer' onClick={handleSingOut}><BiBell size={30} /></span>
            <Link to="profile" className=' cursor-pointer'>
              {user?.avatar ?
                <img src={user?.avatar} alt="" className='w-8 h-8 rounded-full' />
                :
                <div className='w-8 h-8 rounded-full bg-red-400 capitalize flex items-center justify-center text-white'>{user?.username[0]}</div>
              }
            </Link>
            <BiLogOut  size={25} className='cursor-pointer' onClick={handleSingOut}/>
          </> :
          <> <button className='btn bg-grayTheme text-black' onClick={() => setShowLoginModel(true)}>Log in
            {showLoginModel && <Login />}
          </button>
            <button className='btn bg-redTheme text-white' onClick={() => setShowSignupModal(true)}>Sign up
              {showSignupModal && <Signup setShowSignupModal={setShowSignupModal} />}
            </button></>}
      </div>


    </div >
  )
}

export default Header