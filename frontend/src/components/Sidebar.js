import React from 'react'
import image from '../assets/image.png'
import logo from '../assets/logo.png'
import {AiFillHome} from 'react-icons'
import {Link,NavLink} from 'react-router-dom'
// import {FontAwesomeIcon} from  '@FontAwesomeIcon'


const categories = [
    {name:'Animals'},
    {name:'Wallpapers'},
    {name:'Nature'},
    {name:'Coding'},
    {name:'Tech'},
]

const isActive = 'flex items-center justify-center align-center gap-5 font-lg font-extrabold '
const isNotActive = 'flex items-center justify-center align-center text-gray-500 hover:text-black hover:text-grey'


const Sidebar = () => {
    
    return (
        <div className='flex flex-col justify-between '>
           <div className='flex flex-col bg-gray-100 h-full'>
                <Link to='/' className='flex px-5 justify-between '>
                  <img src={logo} alt='img' className='w-22 h-10 mx-auto my-3 '/>
                </Link>      
                <div className='flex flex-col '>
                <NavLink to='/' className='flex flex-col align-center justify-center items-center text-purple-900 text-lg font-bold'>
                    Home
                </NavLink>
                
                <h3 className='flex px-5 mt-4 mb-1 mx-auto justify-between'>DISCOVER CATEGORIES</h3>
                    {categories.map((category) => (
                        <NavLink
                            to={`/category/${category.name}`}
                            key={category.name}
                            className={({isOn}) => (isOn ? isActive : isNotActive)}
                        >
                            {category.name}
                        </NavLink>
                    ))}
                </div>    
           </div>
        </div>
        
    )
}

export default Sidebar
