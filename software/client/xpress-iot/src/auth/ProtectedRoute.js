import React from 'react'
import { Navigate, Outlet} from 'react-router-dom'

export const ProtectedRoute = () => {
   return localStorage.getItem("token") && localStorage.getItem("userInfo") ? <Outlet/>:<Navigate replace to="/login" />
}


export const ProtectedRuteLogin=()=>{
   return localStorage.getItem("token") && localStorage.getItem("userInfo") ? <Navigate replace to="/admin/overview" />:<Outlet/>
}