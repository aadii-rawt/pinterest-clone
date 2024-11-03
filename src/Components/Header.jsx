import React, { useState } from 'react'
import Login from './Login'
import Signup from './Singup'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { BiBell } from 'react-icons/bi'
import { auth } from '../firebase'
import { MdCancel, MdOutlineKeyboardArrowDown } from 'react-icons/md'
import { setShowLoginModel } from '../Store/Reducers/statesSlice'
import { useDispatch, useSelector } from 'react-redux'

function Header() {
  const [searchText, setSearchText] = useState("")
  const [showLinks, setShowLinks] = useState(false)
  const [showSignupModal, setShowSignupModal] = useState(false) 
  const [viewProfileOpen, setViewProfileOpen] = useState(false)
  const navigate = useNavigate()
  function handleSingOut() {
    auth.signOut()
    navigate("/")
    setViewProfileOpen(false)
  }

  const { showLoginModel } = useSelector((state) => state.statesSlice)
  const { user } = useSelector((state) => state.userSlice)
  const dispatch = useDispatch()


  return (
    <div className='sticky container bg-white inset-0 z-30  flex justify-between items-center py-3'>
      <div className='flex gap-3 items-center'>
        <img src="/logo.png" alt="" className="w-8" />
        <div>
          {user &&
            <div>
              <ul className='flex gap-3 text-lg font-semibold'>
                <li><NavLink to='/' className='bg-black text-white text-sm md:text-base px-3 py-2.5 rounded-3xl'>Home</NavLink></li>
                <li><NavLink to='create'>Create</NavLink></li>
              </ul>
            </div>}
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
            <MdOutlineKeyboardArrowDown size={25} className='cursor-pointer text-gray-600 hover:text-black hover:bg-gray-200 rounded-full' onClick={() => setViewProfileOpen(!viewProfileOpen)} />
            {viewProfileOpen &&
              <div className='absolute top-14 md:top-16 right-3 md:right-0 z-50 bg-gray-100 shadow-md text-black rounded-md p-2.5'>
                <div className='flex items-start gap-2 hover:bg-gray-200 p-2 rounded-md'>
                  <div>
                    {user?.avatar ?
                      <img src={user?.avatar} alt="" className='w-12 h-12 rounded-full' />
                      :
                      <div className='w-12 h-12 rounded-full text-xl bg-red-400 capitalize flex items-center justify-center text-white'>{user?.username[0]}</div>
                    }

                  </div>
                  <div>
                    <h1 className='text-lg font-medium'>{user?.username}</h1>
                    <h1 className='text-sm'>{user?.email}</h1>
                  </div>
                </div>
                <div><button onClick={() => { navigate("/profile"); setViewProfileOpen(false) }} className='w-full text-left hover:bg-gray-200 flex items-center gap-2 font-medium p-2 rounded-md'> View Profile</button></div>
                <div><button className='w-full text-left hover:bg-gray-200 flex items-center gap-2 font-medium p-2 rounded-md' onClick={handleSingOut}> Log Out</button></div>
              </div>
            }
          </> :
          <> <button className='btn bg-grayTheme text-black' onClick={() => dispatch(setShowLoginModel(true))}>Log in
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