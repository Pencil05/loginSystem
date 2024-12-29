"use client"
import Link from 'next/link'
import React, { useState } from 'react'
import Navbar from '../components/Navbar'
import { redirect } from 'next/navigation'
import { useSession } from 'next-auth/react'

function RegisterPage() {

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [Cpassword, setCpassword] = useState("");
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    const {data:session} = useSession();
    if(session) redirect("/welcome");

    const handleSubmit = async (e) =>{
        e.preventDefault();//กันrefresh

        if(password!=Cpassword){
            setSuccess("")
            setError("Password not match! :)");
            return;
        }
        if(!name || !email || !password || !Cpassword){
            setSuccess("")
            setError("Bro, Complete all Input :(");
            return;
        }

        try {
            const resCheckUser  = await fetch("http://localhost:3000/api/checkUser", {
              method: "POST",
              headers:{
                "Content-Type" : "application/json"
              },
              body: JSON.stringify({email})
            })

            const {user} = await resCheckUser.json();
            if(user){
              setSuccess("")
              setError("User email already used :(");
              return;
            }
            const res = await fetch("http://localhost:3000/api/register", {
                method: "POST",
                headers:{
                    "Content-Type":"application/json"
                },
                body: JSON.stringify({
                    name,email,password
                })
            })

            if(res.ok){
                const form = e.target;
                setError("");
                setSuccess("User Registeration Successfully :)");
                form.reset();
            }else{
                console.log("User registeration failed :(");
            }
        } catch (error) {
            console.log("Register error :( = " , error);
        }
    }


  return (
    <div className=''>

    <Navbar /> 
      <div className="regis bg-white shadow-md rounded-lg p-6 w-full max-w-md">
        <h1>Register</h1>
        <hr className="my-3" />
        <form onSubmit={handleSubmit} className="space-y-4">
          
          {error && (
            <div className='bg-red-500 py-2 px-3 w-fit text-white rounded-md mt-2 mx-auto'>
                {error}
            </div>
          )}

          {success && (
            <div className='bg-green-500 py-2 px-3 w-fit text-white rounded-md mt-2 mx-auto'>
                {success}
            </div>
          )}
          
          
          
          <input
            type="text"
            placeholder="Enter your UserName"
            className="w-full border rounded-lg p-2"
            onChange={(e) => setName(e.target.value)}
          />
          <input
            type="email"
            placeholder="Enter your Email"
            className="w-full border rounded-lg p-2"
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Enter your Password"
            className="w-full border rounded-lg p-2"
            onChange={(e) => setPassword(e.target.value)}
          />
          <input
            type="password"
            placeholder="Confirm Password"
            className="w-full border rounded-lg p-2"
            onChange={(e) => setCpassword(e.target.value)}
          />
          <button type="submit" className="w-full bg-green-300 text-white rounded-lg py-2">
            Ok
          </button>
        </form>

        <hr className="mt-10" />
        <p className="text-center mt-4">
          Already have an account?{' '}
          <Link href="/login" className="text-blue-500 hover:underline">
            Login
          </Link>{' '}
          now.
        </p>
      </div>
    </div>

  )
}

export default RegisterPage