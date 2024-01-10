"use client"
import React, { useState } from 'react'
import { signIn } from 'next-auth/react'
import { SiGithub } from 'react-icons/si'
import { redirect, useRouter } from 'next/navigation';


function Login() {
    const [formData, setformData] = useState({
        email: "",
        password: "",
        redirect: false
    });
    const router = useRouter();
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setformData({ ...formData, [e.target.name]: e.target.value });
    }
    const handlerSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const signInResult = await signIn('credentials', formData );
        if (signInResult?.error) {
            console.log("error happened");
        }
        if(signInResult?.ok){
            console.log("ok");
            router.push('/home');
        }
    }

    return (
        <div className=' flex justify-center items-center min-h-screen h-full w-full bg-black'>
            <div className=' w-[500px] h-fit bg-stone-800 text-white  flex justify-center flex-col items-center py-10 px-4 gap-4 rounded-2xl'>
                <button
                    type="button"
                    onClick={() => signIn('github',{callbackUrl: 'http://localhost:3000/home'})}
                    className="w-80 items-center flex gap-4 flex-row px-5 bg-gray-950 text-xl text-slate-50 py-2 rounded-full justify-center">
                    <span>
                        <SiGithub />
                    </span>
                    <span>Sign in with Github</span>
                </button>
                <button
                    type="button"
                    onClick={() => signIn('facebook',{callbackUrl: 'http://localhost:3000/home'})}
                    className="w-80 items-center flex gap-4 flex-row px-5 bg-blue-500 text-xl text-slate-50 py-2 rounded-full justify-center">
                    <span>
                        <SiGithub />  
                    </span>
                    <span>Sign in with FaceBook</span>
                </button>
                <span className=' w-80'>---------------- OR ----------------</span>
                <form className=' flex flex-col gap-4 items-center w-full' onSubmit={handlerSubmit}>
                    <div className=' input'>
                        <label htmlFor="Email">Email</label>
                        <input type="email" placeholder='Enter email' className=' outline-none border border-white rounded-md bg-transparent px-2 py-2 w-full  focus:shadow-normal focus:shadow-white' required onChange={handleChange} value={formData.email} name='email' />
                    </div>
                    <div className=' input'>
                        <label htmlFor="Password">Password</label>
                        <input type="password" placeholder='Enter password' className=' outline-none border border-white rounded-md bg-transparent px-2 py-2 w-full focus:shadow-normal focus:shadow-white' minLength={8} required onChange={handleChange} value={formData.password} name='password' />
                    </div>
                    <button type='submit' className=' bg-primary px-5 py-2 w-fit text-xl rounded-full  shadow-lg shadow-primary/50'>Sign Up</button>
                </form>
            </div>
        </div>
    )
}

export default Login;