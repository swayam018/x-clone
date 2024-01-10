"use client"
import React, { useState } from 'react'
import Header from './Header'
import PostInput from './PostInput'
import Posts from './Posts'
import BottomBar from './BottomBar'
import axios from 'axios'
import { useEffect } from 'react'

 function FeedPage() {
  const [posts,setPosts] = useState([]);
 useEffect(()=>{
  const fetchData = async()=>{
    try {
      const data = await axios.get('/api/tweet/tweetfeed')
      console.log(data.data.allTweets);
      setPosts(data.data.allTweets);
    } catch (error:any) {
      console.log(error.message)
    }
  }
  fetchData();
 },[])

  return (
    <main className=' text-white bg-black w-[598px] relative border-l border-r border-gray-500 max-[725px]:w-fit max-[482px]:border-none '>
        <Header/>
        <PostInput/>
        <BottomBar/>
        {posts.length>0 && posts.map((post,index)=>(
          <React.Fragment key={index}>
            <Posts post={post}/>
          </React.Fragment>
        ))}
    </main>
  )
}

export default FeedPage