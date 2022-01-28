import React from 'react'
import Masonry from 'react-masonry-css'
import Pin from './Pin'

const breakPoints = {
    default:4,
    3000:6,
    1500:5,
    1000:3,
    500:1
}

const MasnoryLayout = ({pins}) => (
            <Masonry className='flex' breakpointCols={breakPoints}>
                {pins?.map((pin) => <Pin key={pin._id} pin={pin} className='w-max'/> )}
            </Masonry>
)

export default MasnoryLayout
