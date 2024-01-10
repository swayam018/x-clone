"use client"
import React, { useState } from 'react'
import { signIn } from 'next-auth/react'
import { SiGithub } from 'react-icons/si'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { RxCross2 } from 'react-icons/rx'


function Signup() {
  const [formData, setformData] = useState({
    name: "",
    email: "",
    password: "",
    username: ""
  });
  const router = useRouter();
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setformData({ ...formData, [e.target.name]: e.target.value });
  }
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await axios.post('/api/register', formData).then((response) => {
      router.push('/login');
    }).catch((error) => { console.log(error) })
  }
  const onClose = () => {
    router.replace('/');
  }


  return (
    <div className='w-full h-screen bg-slate-950/80 flex justify-center items-center absolute'>
      <div className='w-[598px] bg-black aspect-square rounded-2xl relative flex justify-center items-center'>
        <span
          className='absolute px-1 text-lg rounded-full py-1 left-4 top-4 cursor-pointer text-white font-extrabold hover:bg-gray-400'
          onClick={onClose}>
          <RxCross2 />
        </span>
        <div className=' flex justify-center items-center h-fit w-full  rounded-xl'>
          <div className=' w-[500px] h-fit text-white  flex justify-center flex-col items-center py-10 px-4 gap-4 rounded-2xl'>
            <button
              type="button"
              onClick={() => signIn('github')}
              className="w-80 items-center flex gap-4 flex-row px-5 bg-gray-950 text-xl text-slate-50 py-2 rounded-full justify-center"
            >
              <span>
                <SiGithub />
              </span>
              <span>Sign in with Github</span>
            </button>

            <button
              type="button"
              onClick={() => signIn('facebook')}
              className="w-80 items-center flex gap-4 flex-row px-5 bg-blue-500 text-xl text-slate-50 py-2 rounded-full justify-center"
            >
              <span>
                <SiGithub />
              </span>
              <span>Sign in with FaceBook</span>
            </button>
            <span className=' w-80'>---------------- OR ----------------</span>
            <form className=' flex flex-col gap-4 items-center w-full' onSubmit={handleSubmit}>
              <div className=' input'>
                <label htmlFor="Email">Email</label>
                <input type="email" placeholder='Enter email' className=' outline-none border border-white rounded-md bg-transparent px-2 py-2 w-full  focus:shadow-normal focus:shadow-primary focus:ring-2  ring-primary focus:border-transparent  ' required onChange={handleChange} value={formData.email} name='email' />
              </div>
              <div className=' input'>
                <label htmlFor="Password">Password</label>
                <input type="password" placeholder='Enter password' className=' outline-none border border-white rounded-md bg-transparent px-2 py-2 w-full focus:shadow-normal   focus:shadow-primary focus:ring-2  ring-primary focus:border-transparent' minLength={8} required onChange={handleChange} value={formData.password} name='password' />
              </div>
              <button type='submit' className=' bg-primary px-5 py-2 w-fit text-xl rounded-full  shadow-lg shadow-primary/50'>Sign Up</button>
            </form>
            <div className=' pt-4'>
              Alreday have an account. <Link href={'/login'}>Login</Link>
            </div>
          </div>
        </div>

      </div>
    </div>



  )
}

export default Signup