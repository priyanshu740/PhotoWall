import React from 'react'
import Loader from 'react-loader-spinner'

const Spinner = ({message}) => {
    return (
        <div className='flex flex-col justify-center items-center'>
            <Loader 
            type='Circles'
            className='m-3'
            color='#708090'
            />
            <p className='text-2xl font-medium '>{message}</p>
        </div>
    )
}

export default Spinner
