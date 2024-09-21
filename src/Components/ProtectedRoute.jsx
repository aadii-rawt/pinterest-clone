import React, { useEffect } from 'react'
import { useData } from '../Context/DataProvider'

function ProtectedRoute() {
    const {user} = useData()
    useEffect(()=>{
        // if()
    },[])
  return (
    <div>ProtectedRoute</div>
  )
}

export default ProtectedRoute