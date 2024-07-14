import React from 'react'
import Header from '../Components/Header'
import { Outlet } from 'react-router-dom'

function Layout() {
  return (
    <>
        <Header />
      <div className='container'>
        <Outlet />
      </div>
    </>
  )
}

export default Layout