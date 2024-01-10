"use client"
import React, { useEffect, useRef, useState } from 'react'
import { CiImageOn } from "react-icons/ci";
import { MdOutlineGifBox } from "react-icons/md";
import { CgPoll } from "react-icons/cg";
import { BsEmojiSmile } from "react-icons/bs";
import { LuCalendarClock } from "react-icons/lu";
import { IoLocationOutline } from "react-icons/io5";
import { FaGlobeAmericas } from "react-icons/fa";
import Link from 'next/link';
import Image from 'next/image';
import { RxCross2 } from "react-icons/rx";
import axios from 'axios';
import { useSession } from "next-auth/react"
import { revalidatePath } from 'next/cache';

function PostInput() {
    const fileInputRef = useRef<HTMLInputElement | null>(null);
    const filegifRef = useRef<HTMLInputElement | null>(null);
    const [files, setFiles] = useState([]);
    const [previews, setPreviews] = useState<string[]>([]);
    const [text,setText] = useState("");
    const [postStatus,setPostStatus] = useState(false);
    const {data : session ,status} = useSession();


    const handleInputChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        setText(event.target.value);
        const textarea = event.target;
        textarea.style.height = 'auto';
        textarea.style.height = `${textarea.scrollHeight}px`;
    };

    const handleButtonClick = () => {
        if (fileInputRef.current) {
            fileInputRef.current.click();
        }
    };
    const handleButtongifClick = () => {
        if (filegifRef.current) {
            filegifRef.current.click();
        }
    };

    const handleFileChange = (e: any) => {
        if (e.target.files.length > 5) {
            alert('Please select up to 5 images.')
            return;
        }
        for (let i = 0; i < files?.length; i++) {
            if (files && e.target.files[i].size > 400 * 1024) {
                alert('Please select images with size less than 400KB.');
                return;
            }
        }
        setFiles(e.target.files);
    };

    useEffect(() => {
        
        if (!files) return;
        let tmp = [];
        for (let i = 0; i < files?.length; i++) {
            tmp.push(URL.createObjectURL(files[i]));
        }
        const objectUrls = tmp;
        setPreviews(objectUrls);

        for (let i = 0; i < objectUrls.length; i++) {
            return () => {
                URL.revokeObjectURL(objectUrls[i]);
            };
        }
        
    }, [files]);

    const imageHandler = (index: any) => {
        let newArray = [...previews.slice(0, index), ...previews.slice(index + 1)];
        setPreviews(newArray);
    }


    const onClickHandler = async ()=>{
        console.log(session);
        if(!session){
            return <dialog open className=' z-50 absolute inset-x-1/2'>Please Login</dialog>
        }
        await axios.post('/api/tweet/posttweet',{text:text ,user:session?.user}).then((resp)=>{
            setPostStatus(true);
            setText("");
            // revalidatePath('(route)/home');
        }).catch((error:any)=>{
            console.log(error.message);
        })
    }
  
    return (
        <div className=' px-4 mt-4 flex flex-row max-sm:px-2  '>
            <div className='pr-4 max-md:pr-2'>
                <Link href={'/profile'}>
                    <div className=' bg-slate-400/20  rounded-full'>
                        <div className=' w-10 h-10'></div>
                    </div>
                </Link>
            </div>
            <div className=' w-full '>
                <div className=' flex flex-col justify-start border-b border-gray-500 pb-4 flex-1'>
                    <textarea placeholder='What is happening?!' maxLength={250} minLength={1} className='outline-none bg-black text-slate-50 text-xl break-all resize-none w-full max-h-[500px] ' onChange={handleInputChange} value={text} />
                    <div className={` w-full grid gap-4 pt-4 ${previews.length > 1 ? "grid-cols-2" : "grid-cols-1"}`}>
                        {previews &&
                            previews.map((pic, index) => {
                                return (
                                    <span key={index} className='aspect-w-1 aspect-h-1 relative'>
                                        <span className=' bg-black/50 absolute px-1 text-lg hover:bg-black rounded-full py-1 right-1 top-1 cursor-pointer' onClick={() => imageHandler(index)}><RxCross2 /></span>
                                        <Image src={pic} alt="sfaaf" width={10} height={10} className='object-cover w-full h-full rounded-lg' />
                                    </span>
                                );
                            })}
                    </div>
                    <div className=' text-primary flex gap-2 font-semibold items-center '><FaGlobeAmericas />Everyone can reply</div>
                </div>
                <div className=' flex-row flex mx-2 py-2 items-center' >
                    <div className=' text-primary flex gap-1 flex-1 max-[407px]:gap-0 '>
                        <input
                            type="file"
                            accept=".jpg, .jpeg, .png"
                            ref={fileInputRef}
                            className=' hidden'
                            onChange={handleFileChange}
                            multiple />
                        <input
                            type="file"
                            accept=".gif"
                            ref={filegifRef}
                            className='hidden'
                            onChange={handleButtongifClick}
                            multiple />
                        <div className='icons' onClick={handleButtonClick}><CiImageOn /></div>
                        <div className='icons' onClick={handleButtonClick}><MdOutlineGifBox /></div>
                        <div className='icons max-sm:hidden'><CgPoll /></div>
                        <div className='icons'><BsEmojiSmile /></div>
                        <div className='icons max-sm:hidden'><LuCalendarClock /></div>
                        <div className='icons'><IoLocationOutline /></div>
                    </div>
                    <div className=' px-4 text-primary'>{text.length}/250</div>
                    <button type="submit" disabled={text.length<1} className={` disabled:bg-gray-400/50 disabled:cursor-not-allowed bg-primary py-2 px-5 text-lg  rounded-full`} onClick={onClickHandler}>Post</button>
                </div>
            </div>
        </div>
    )
}

export default PostInput