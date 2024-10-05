import React, { Suspense } from 'react'
import Header from '../Components/Header'
import { Outlet } from 'react-router-dom'

function Layout() {
  return (
    <>
      <Header />
      <div className='container'>
        <Suspense>
          <Outlet />
        </Suspense>
      </div>
    </>
  )
}

export default Layout