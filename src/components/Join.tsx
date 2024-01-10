"use client"
import { signIn } from 'next-auth/react';
import React from 'react'
import { SiGithub } from 'react-icons/si';
import { FaFacebook } from "react-icons/fa";
import Link from 'next/link';

function Join() {
  return (
    <div className=' flex flex-row min-h-screen bg-black max-lg:h-full max-lg:justify-center relative'>
      <div className=' w-1/2  h-screen flex justify-center items-center max-lg:hidden'>
        <div className=' w-80'>
          <svg viewBox="0 0 24 24" aria-hidden="true" className="">
            <g>
              <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" fill="#ffffff"></path>
            </g>
          </svg>
        </div>
      </div>

      {/* right bar */}

      <div className=' w-1/2 text-slate-50 flex flex-col justify-center items-center '>
        <div className=' w-fit pt-7 pl-4 max-xs:pt-2 flex flex-col gap-8 max-xs:gap-4'>
          <div className=' w-10 hidden max-lg:inline-block'>
            <svg viewBox="0 0 24 24" aria-hidden="true" className="">
              <g>
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" fill="#ffffff"></path>
              </g>
            </svg>
          </div>
          <div className='flex flex-col gap-14 pt-14 max-lg:gap-10 max-lg:pt-4 '>
            <span className=' text-7xl font-extrabold max-xs:text-5xl '>Happening now</span>
            <span className=' text-5xl font-bold max-xs:text-2xl '>Join today.</span>
          </div>
          <div className=' flex flex-col gap-4 '>
            <button
              type="button"
              onClick={() => signIn('github')}
              className="oauthButton">
              <span className=' text-2xl max-[380px]:text-lg'>
                <SiGithub />
              </span>
              <span>Sign in with Github</span>
            </button>
            <button
              type="button"
              onClick={() => signIn('facebook')}
              className="oauthButton">
              <span className='text-blue-500 text-2xl max-[380px]:text-lg'>
                <FaFacebook />
              </span>
              <span>Sign in with FaceBook</span>
            </button>
            <div className=' flex items-center w-80 gap-2 max-[380px]:w-64'><span className='w-full h-[1px] bg-gray-700' />or<span className='w-full h-[1px] bg-gray-700' /></div>
            <Link href={'/signup'} className=" w-80 bg-primary py-2 text-lg rounded-full max-[380px]:w-64 text-center " >Create account</Link>
            <div className=' flex flex-col gap-4'>
              <span>Already have an account?</span>
              <Link href={'/login'} className=" w-80 max-[380px]:w-64 text-primary py-2 text-lg rounded-full border border-slate-50 hover:bg-primary/20 font-semibold text-center ">Sign in</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Join