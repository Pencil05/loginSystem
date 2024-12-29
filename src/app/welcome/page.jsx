"use client"

import React from "react"
import Navbar from "../components/Navbar"
import { useSession } from "next-auth/react"
import { redirect } from "next/navigation"

function WelcomePage(){

    const {data: session} = useSession();
    console.log(session)

    if(!session) redirect('/login');

    return(
        <div>
        <Navbar session={session}/>
        <div className="regis bg-white shadow-md rounded-lg p-6 w-full max-w-md">
            <h1>Welcome!! {session?.user?.name}</h1>
            <hr className="mt-4" />
            <p className="mt-4">Email : {session?.user?.email}</p>
            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Natus, ut voluptates repudiandae fugit aperiam sunt magni fugiat nobis nulla quos.</p>
            <hr className="mt-4" />
        </div>
        
        </div>
    )
}

export default WelcomePage


