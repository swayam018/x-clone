import React from 'react'
import { IoLocationOutline } from "react-icons/io5";
import { CgCalendarDates } from "react-icons/cg";
import { BsBalloon } from "react-icons/bs";
import { RiLinkM } from "react-icons/ri";
import { MdOutlineWorkOutline } from "react-icons/md";
import Image from 'next/image';

function Profile({ profile }: any) {
  console.log(profile);
  return (
    <div className='text-white bg-black w-[598px] relative border-r border-gray-500 '>
      <div>
        <div className=' w-full h-52 bg-gray-800'>
        <Image src={'https://static.vecteezy.com/system/resources/thumbnails/009/292/244/small/default-avatar-icon-of-social-media-user-vector.jpg'} width={400} height={128} alt='profile image' className=' overflow-hidden w-full h-52 object-cover'/>
        </div>
      </div>
      <div>
        <div className=' h-fit w-full relative px-8'>
          <div className=' w-32 h-32 rounded-full border-4 border-black absolute inset-x-10 inset-y-[-70px] overflow-hidden'>
            <Image src={'https://static.vecteezy.com/system/resources/thumbnails/009/292/244/small/default-avatar-icon-of-social-media-user-vector.jpg'} width={128} height={128} alt='profile image' className=' overflow-hidden'/>
          </div>
          <div className=' h-16 py-4 flex justify-end items-start'>
            <button className=' border border-white hover:bg-slate-800 px-4 py-2 rounded-full'>Edit profile</button>
            {/* <button className=' bg-white text-black font-semibold hover:bg-slate-100/80 px-4 py-2 rounded-full'>Edit profile</button> */}
          </div>
          <div className=' h-full flex flex-col gap-4 pt-2'>
            <div className=''>
              <h1 className=' text-2xl font-semibold tracking-widest'> {profile.name} </h1>
              <span>@{profile.twitterId}</span>
            </div>
            <div className=' h-fit w-full text-base font-thin'>
              {profile.bio}
            </div>
            <div className=' flex flex-wrap justify-start leading-2 text-gray-500'>
              {profile.location&&(
              <span className='usertag'><IoLocationOutline />{profile.location}</span>
              )}
              {/* <span className='usertag'><RiLinkM />websitedomain</span> */}
              <span className='usertag'><CgCalendarDates /> Joined on {profile.createdTime.split(',')[0]}</span>
              {profile.birthday && <span className='usertag'><BsBalloon />{profile.birthday}</span>}
              {/* <span className='usertag'><MdOutlineWorkOutline />interested topic</span> */}
            </div>
            <div className=' flex gap-4'>
              <div className=' flex gap-2 items-center'>
                <span className=' font-bold text-xl '>{profile.following}</span>
                <span className=' font-thin text-base'>Following</span>
              </div>
              <div className=' flex gap-2 items-center'>
                <span className=' font-bold text-xl '>{profile.followers}</span>
                <span className=' font-thin text-base'>Followers</span>
              </div>
            </div>
            <div>
              Followed by someone anyone
            </div>
          </div>
        </div>
      </div>
    </div>


  )
}

export default Profile