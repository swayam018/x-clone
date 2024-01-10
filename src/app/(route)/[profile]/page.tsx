"use client"
import Profile from '@/components/Profile'
import React, { useEffect, useState } from 'react'
import { IoMdArrowBack } from 'react-icons/io'
import Link from 'next/link'
import Posts from '@/components/Posts'
import { usePathname } from 'next/navigation'
import axios from 'axios'
import { Tprofile } from '../../../../type'
import Lottie from 'lottie-react'
import loadingData from '../../../../public/loading.json';
import ProfileFeed from '@/components/ProfileFeed'


const ProfilePage = () => {
  const username = usePathname();
  const [userExist, setUserExist] = useState(false);
  const [loading, setLoading] = useState(true);
  const [userdata, setUserdata] = useState<Tprofile>();
  useEffect(() => {
    const fetchProfile = async () => {
      await axios.post('api/user/userdata', { username: username.split('/')[1] }).then((resp:any) => {
        if (resp.data.status === 200) {
          setUserdata(resp.data.user);
          setUserExist(true);
          setLoading(false);
        }
        else {
          console.log(resp);
          setLoading(false);  
        }
      }).catch((error: any) => {
        console.log(error.message);
        setUserExist(false);
        setLoading(false);
      })
    }
    fetchProfile();
  }, [])

  return (
    <>
      {
        loading && (<div className=' w-[598px] max-h-screen  h-screen flex justify-center items-center'>
          <div className=' w-20 h-20'>
            <Lottie animationData={loadingData} loop={true} />
          </div>
        </div>)
      }
      {
       userExist ? (
          <div className={` text-white bg-black w-[598px] relative border-l border-r  border-gray-500 max-[725px]:w-fit max-[482px]:border-none ${loading?"hidden":"block"}  `}>
            <header className=' sticky top-0 backdrop-blur-sm backdrop-saturate-200 bg-black/80  w-full z-50 '>
              <nav className='flex flex-row h-[53px] items-center gap-10 w-fit pl-8 pb-1'>
                <div className=' text-2xl'>
                  <IoMdArrowBack />
                </div>
                <div className=' flex flex-col  text-lg'>
                  <span className=' font-semibold tracking-widest '>{userdata?.name}</span>
                  <span className=' text-sm'>5 posts</span>
                </div>
              </nav>
            </header>
            <Profile profile={userdata} />
            <ProfileFeed/>
          </div>
        ) : (<div className={` w-[598px] flex justify-center h-screen max-h-screen items-center ${loading?"hidden":"block"}`}>
          <div className=' w-fit'>
            User does not exist
          </div>
        </div>)
      }

    </>
  )
}

export default ProfilePage