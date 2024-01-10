import React from 'react'
import { BiHomeCircle } from "react-icons/bi";
import { GrNotification } from "react-icons/gr";
import { IoSearchOutline } from "react-icons/io5";
import { MdMailOutline } from "react-icons/md";
import { BsSlashSquare } from "react-icons/bs";
import Link from 'next/link';


const NavigationItems = [
    { title: "Home", icon: BiHomeCircle },
    { title: "Explore", icon: IoSearchOutline },
    { title: "Notifications", icon: GrNotification },
    { title: "Messages", icon: MdMailOutline },
    { title: "Grok", icon: BsSlashSquare },
];

function BottomBar() {
  return (
    <div className='relative hidden max-[482px]:inline-block'>
        <div className='flex justify-between items-center fixed bottom-0 bg-black/80 backdrop-blur-sm backdrop-saturate-20 w-screen pr-4'>
        {NavigationItems.map((items: any, index) => (
                    <Link
                        href={`/${items?.title.toLowerCase()}`}
                        key={index}
                        className="hover:bg-gray-700/40 py-[10px] text-xl rounded-full px-[10px] my-2 mx-2">
                        <div>
                            <items.icon />
                        </div>
                    </Link>
                ))}
        </div>
    </div>
  )
}

export default BottomBar