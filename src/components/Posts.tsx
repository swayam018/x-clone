"use client"
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { FiMoreHorizontal } from "react-icons/fi";
import { BiMessageRounded } from "react-icons/bi";
import { FaRetweet } from "react-icons/fa6";
import { GrFavorite } from "react-icons/gr";
import { CgPoll } from "react-icons/cg";
import { FiUpload } from "react-icons/fi";
import { IoBookmarkOutline } from "react-icons/io5";
import axios from 'axios';
import { useSession } from 'next-auth/react';
import { MdOutlineFavorite } from "react-icons/md";


function Posts({ post }: any) {
    const { data: session }:any = useSession();
    const [isLiked,setIsLiked] = useState(false);
    const onLikeHandler = async (post: any) => {
        await axios.post('/api/tweet/likes', { user_id:session?.user?.id ,tweet_id:session.id })
    }

    useEffect(()=>{
        post.tweet_liked.map((liked:any)=>{
            if(liked.toString() === session?.user?.id){
                setIsLiked(true);
            }
        })
    },[]) 

    return (
        <div className='flex flex-row py-4 px-4 gap-4 border-t border-gray-400  cursor-pointer max-md:px-2 max-md:gap-2'>
            <div className=''>
                <Link href={'/profile'}>
                    <div className=' bg-slate-400/20  rounded-full'>
                        <div className=' w-10 h-10'></div>
                    </div>
                </Link>
            </div>
            <div className=' w-full'>
                <div className=' flex flex-row justify-between w-full items-center h-fit '>
                    <div className='flex flex-row gap-2 justify-start items-center max-[476px]:flex-col max-[476px]:justify-start max-[476px]:items-start max-[476px]:gap-0'>
                        <div className=' w-fit max-w-[170px] overflow-hidden break-inside-avoid ' > {post.name} </div>
                        <div className='flex items-center gap-2  '>
                            <div className='min-w-fit max-w-[170px] overflow-hidden'>@{post.username} </div>
                            <div className='w-fit max-w-[100px] overflow-hidden'>{post.createdTime}</div>
                        </div>
                    </div>
                    <div className=' hover:bg-primary/20 px-2 py-2 rounded-full hover:text-primary'>
                        <FiMoreHorizontal />
                    </div>
                </div>
                <div className=' pt-2' >
                    <div className=' pb-4 w-full break-all'>
                        {post.tweet_content}
                    </div>
                    {post.tweet_image !== undefined && (
                        <div className=' h-80 aspect-square w-full max-w-fit bg-gray-500 rounded-lg max-[485px]:w-full max-[485px]:aspect-auto  ' />
                    )}
                </div>
                <div className=' flex flex-row justify-between w-full items-center mt-2'>
                    <div className=' text-gray-400  hover:text-primary flex items-center gap-1 '>
                        <div className='px-2 py-2 rounded-full text-xl hover:bg-primary/20 max-sm:text-lg '> <BiMessageRounded /></div>
                        <span> {post.comments.length} </span>
                    </div>
                    <div className=' text-gray-400 hover:text-green-400 flex items-center '>
                        <div className='px-2 py-2 rounded-full text-xl hover:bg-green-400/20 max-sm:text-lg '><FaRetweet /></div>
                        <span>{post.retweet.length}</span>
                    </div>
                    <div className='  hover:text-red-400 flex items-center ' >
                        <div className={`px-2 py-2 rounded-full text-xl max-sm:text-lg hover:bg-red-400/20 ${isLiked?"text-red-700":"text-gray-400"} `} onClick={() => { onLikeHandler(post); setIsLiked(!isLiked) }}>{!isLiked?<GrFavorite /> :<MdOutlineFavorite/>}</div>
                        <span>{isLiked?post.tweet_liked.length+1:post.tweet_liked.length}</span>
                    </div>
                    <div className=' text-gray-400 hover:bg-primary/20 hover:text-primary items-center text-xl flex  max-sm:text-lg px-2 py-2 rounded-full'>
                        <CgPoll />
                    </div>
                    <div className='text-gray-400 items-center text-xl flex max-sm:text-lg '>
                        <div className='hover:bg-primary/20 hover:text-primary flex px-2 py-2 rounded-full'>
                            <IoBookmarkOutline />
                        </div>
                        <div className='hover:bg-primary/20 hover:text-primary flex px-2 py-2 rounded-full'>
                            <FiUpload />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Posts