import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Spinner from './Spinner'
import {client} from '../client'
import { feedQuery, searchQuery } from '../utils/userQuery'
import {MasnoryLayout} from './index'

const Feed = () => {
    const [Loading,isNotLoading] = useState(false)
    const [pins,setPins] = useState(null)
    const {categoryName} = useParams()

    useEffect(() => {
        isNotLoading(true)

        if(categoryName){
            const query = searchQuery(categoryName)

            client.fetch(query).then((data)=>{
                setPins(data)
                isNotLoading(false)
            })

        }else{
            isNotLoading(true)
            client.fetch(feedQuery).then((data => {
                    setPins(data)
                    isNotLoading(false)
            }))
        }
    }, [categoryName])

    if(Loading) return <Spinner message='we are adding new features'/>
    return (
        <div className=''>
            {pins && (<MasnoryLayout pins={pins}/>)}
        </div>
    )
}

export default Feed
