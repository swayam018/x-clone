
import React from 'react'
import Posts from './Posts'
import Link from 'next/link'

function ProfileFeed() {
   
    return (
        <div className=' text-white bg-black w-[598px] relative border-r border-gray-500 pt-5  '>
            <nav className=' flex w-full border-b border-gray-500'>
                <Link href={`/`} className={`feedhead  `}><span className=' h-full border-b-4 border-primary1 py-2 px-2.5 font-bold '>Posts</span></Link>
                <Link href={`//replies`}className={`feedhead`}><span>Replies</span></Link>
                <Link href={`//media`}className={`feedhead `}><span>Media</span></Link>
                <Link href={`//likes`}className={`feedhead `}><span>Likes</span></Link>
            </nav>
            <Posts/>
        </div>
    )
}
export default ProfileFeed