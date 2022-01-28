import React, { useState } from 'react'
import {PinDetails,Feed,NavBar,Search ,CreatePost} from '../components'
import { Route,Routes ,BrowserRouter as Router} from 'react-router-dom'

const Pins = ({user}) => {

    const [searchWord,setSearchWord] = useState('')

    return (
        <div className='px-3 md:px-6'>
        <div className=''>
            <div className=''>
                <NavBar searchWord={searchWord} setSearchWord={setSearchWord} user={user}/>
            </div>
        </div>
        <div className='h-full'>
            <Routes>
                <Route path='/' element={<Feed/>}/>
                <Route path='/category/:categoryId' element={<Feed/>}/>
                <Route path='/pin-detail/:pinId' element={<PinDetails user={user}/>}/>
                <Route path='/search' element={<Search searchWord={searchWord} setSearchWord={setSearchWord} user={user&&user}/>}/>
                <Route path='/create-post' element={<CreatePost user={user && user}/>}/>
            </Routes>
              
        </div>
        </div>
    )
}

export default Pins
