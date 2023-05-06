import React from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from './Navbar';
import ProfilePic from './ProfilePic';

function Layout() {
  return (
    <>
      <Navbar />
      <ProfilePic />
      <Outlet />
    </>
  )
}

export default Layout
