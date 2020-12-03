import React from 'react'
import * as FaIcons from "react-icons/fa"
import * as AiIcons from "react-icons/ai"
import * as IoIcons from "react-icons/io"
import * as GiIcons from "react-icons/gi"
import * as RiIcons from "react-icons/ri"

export const SidebarData = [
    {
    title: 'Home',
    path: '/',
    icon: <AiIcons.AiFillHome />,
    cName: 'nav-text'
},
{
    title: 'Booking',
    path: '/booking',
    icon: <GiIcons.GiCarKey />,
    cName: 'nav-text'
},
{
    title: 'Cars',
    path: '/cars',
    icon: <IoIcons.IoMdCar />,
    cName: 'nav-text'
},
{
    title: 'About',
    path: '/about.us',
    icon: <FaIcons.FaBuilding />,
    cName: 'nav-text'
},
{
    title: 'Q&A',
    path: '/qa',
    icon: <RiIcons.RiQuestionAnswerFill />,
    cName: 'nav-text'
},
{
    title: 'User',
    path: '/user',
    icon: <AiIcons.AiOutlineUser />,
    cName: 'nav-text'
},
]