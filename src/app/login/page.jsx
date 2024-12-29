"use client"
import Link from 'next/link'
import React ,{ useState } from 'react'
import Navbar from '../components/Navbar'
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { redirect } from 'next/navigation'
import { useSession } from 'next-auth/react'

function LoginPage() {

      const [email, setEmail] = useState("");
      const [password, setPassword] = useState("");
      const [error, setError] = useState("");
      const router = useRouter();

      const {data:session} = useSession();
      // if(session) redirect("/welcome");
      if(session) router.replace("/welcome");
      


      const handleSubmit = async(e)=>{
        e.preventDefault();
        try {
          const res = await signIn("credentials",{
            email,password,redirect:false
          })
          if(res.error){
            setError("Invalid credentials");
            return;
          }else{
            router.replace("welcome");
          }
        } catch (error) {
          console.log(error)
        }
      }

  return (
    <div>
        <Navbar/>
        <div className="regis bg-white shadow-md rounded-lg p-6 w-full max-w-md">
           <h1>Login</h1>
            <hr className='my-3'></hr>
            <form onSubmit={handleSubmit} className='mx-auto py-1'>
                {error && (
                <div className='bg-red-500 py-2 px-3 w-fit text-white rounded-md mt-2 mx-auto'>
                    {error}
                </div>
                )}

                <input type="text" 
                placeholder='enter you email'
                onChange={(e) => setEmail(e.target.value)}
                />
                <input type="text" 
                placeholder='enter your password'
                onChange={(e) => setPassword(e.target.value)}
                />
                <button type='submit' className='bg-green-300 rounded-xl py-1 px-10 text-white'>Ok</button>
           </form>
           <hr className='mt-10'/>
            <p className='mt-3'>Not have an account yet? <Link href={'/register'} className='text-blue-500 hover:underline '>Register</Link> now.</p>
        </div>
    </div>
  )
}

export default LoginPage