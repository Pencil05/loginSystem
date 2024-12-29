"use client"
import React from 'react'
import Link from 'next/link'
import {signOut} from "next-auth/react"

function Navbar({session}) {
  return (
    <nav className=' bg-gray-700 text-white px-10 '>
      <div className='flex justify-between items-center text-2xl max-w-7xl mx-auto'>
      <div className='logo'>
        <Link href={'/'}>
          Logo
        </Link>
      </div>
      <div className='p-3'>
        <ul className='flex justify-between'>
            {!session  ? (
              <>
                <Link href={'/login'} className='mx-4'>
                <li>Login</li>
                </Link>
                <Link href={'/register'}  className='mx-4'>
                <li>SignUp</li>
                </Link>
              </>
            ):(
              <>
                <a href='/welcome'  className='mx-4 bg-gray-400 w-fit border py-1 px-2 rounded-md'>Profile</a>
                <a onClick={() => signOut()}  className='mx-4 bg-red-400 w-fit border py-1 px-2 rounded-md'>Logout</a>
              </>
            )}
        </ul>
      </div>
      </div>
    </nav>
  )
}

export default Navbar