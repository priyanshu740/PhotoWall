import React from 'react'
import { IoMdAdd, IoMdSearch } from 'react-icons/io';
import { Link, useNavigate } from 'react-router-dom';

const NavBar = ({ user, searchWord, setSearchWord }) => {

    const navigate = useNavigate()

    if (user) {
        return (
            <div className='flex items-center '>
                <div className='my-5 mx-2 border rounded-lg flex justify-start items-center w-full'>
                    <input
                        type='text'
                        value={searchWord}
                        onChange={(e) => setSearchWord(e.target.value)}
                        className='px-5 py-2 bg-slate-100 w-full outline-none'
                        placeholder='search'
                        onFocus={() => navigate('/search')}
                    />
                </div>
                <div className='flex items-center'>              
                    <Link to="/create-post" className="bg-black text-white rounded-lg w-8 h-8 md:w-10 md:h-10 flex justify-center items-center">
                        <IoMdAdd />
                    </Link>
                    <Link to='/' className='hidden px-2 md:block'>
                        <img src={user.image} alt='image' className='w-10 h-10 rounded-lg'/>
                    </Link> 
                 </div>
            </div>
        )
     }
}

export default NavBar
