import React, { useState, useRef, useEffect } from 'react'
import { Sidebar, Pins, UserProfile } from '../components'
import { Link } from 'react-router-dom'
import image from '../assets/image.png'
import { client } from '../client'
import { userQuery } from '../utils/userQuery'
import { AiFillCloseCircle } from 'react-icons/ai'
import { Route, Routes } from 'react-router-dom'
import {fetchUser}  from '../utils/fetchUser'

const Home = () => {
    const [user, setUser] = useState([])
    const [toggle, setToggle] = useState(false)
    const scrollRef = useRef(null)

    const userInfo = fetchUser()

    useEffect(() => {
        const query = userQuery(userInfo?.googleId)

        client.fetch(query).then((res) => setUser(res[0]))
    }, [])

    useEffect(() => {
        scrollRef.current.scrollTo(0, 0)
    }, [])

    return (
        <div className='flex flex-row flex-col md:flex-row '>
            <div className='md:flex hidden '>
                <Sidebar user={user && user}/>
            </div>
            <div className='md:hidden flex flex-row justify-between items-center'>
                <button className='' onClick={() => setToggle(true)}>
                    <div className='bg-blue-900  h-1 w-8 m-2'></div>
                    <div className='bg-blue-900  h-1 w-8 m-2'></div>
                    <div className='bg-blue-900  h-1 w-8 m-2'></div>
                </button>
                <Link to='/'>
                    <img src={image} alt='image' className='w-20 h-19 rounded m-5' />
                </Link>
                <Link to={`user-profile/${user?._id}`}>
                    <img src={user?.image} alt='image' className='rounded-full w-14 h-14 m-2' />
                </Link>
            </div>
            {toggle && (
                <div className="fixed w-3/5 bg-slate-100 h-screen overflow-y-auto shadow-md z-10 animate-slide-in ">
                    <div className="absolute w-full flex justify-end items-center p-2">
                        <AiFillCloseCircle fontSize={30} className="cursor-pointer " onClick={() => setToggle(false)} />
                    </div>
                    <Sidebar closeToggle={setToggle} user={user && user}/>
                </div>
            )}

            <div className="pb-2 flex-1 flex-col h-screen overflow-y-scroll" ref={scrollRef}>
                <Routes>
                    <Route path="/user-profile/:userId" element={<UserProfile/>}/>
                    <Route path="/*" element={<Pins user={user && user} />}/>
                </Routes>
            </div>
        </div>
    )
}

export default Home
