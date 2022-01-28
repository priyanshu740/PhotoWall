import React from 'react'
import { useState, useEffect } from 'react'
import { v4 as uuidv4 } from 'uuid'
import { Spinner } from './index'
import { client, urlFor } from '../client'
import { useParams } from 'react-router'
import { pinDetailQuery, pinDetailMorePinQuery } from '../utils/userQuery'
import { MdDownloadForOffline } from 'react-icons/md'
import Pin from './Pin'


const PinDetails = ({ user }) => {

    const inputCss = 'my-2 border-l-4 border-b-4 text-black border-blue-900 border bg-slate-300 w-full p-1 text-white '

    const { pinId } = useParams()
    const [PinDetails, setPinDetails] = useState()
    const [pins, setPins] = useState()
    const [comment, setComment] = useState('')

    const fetchDetailsOfPost = () => {
        const query = pinDetailQuery(pinId)

        if (query) {
            client.fetch(query).then((data) => {
                setPinDetails(data[0])
                // console.log(setPinDetails);

                if (data[0]) {
                    const query1 = pinDetailMorePinQuery(data[0])
                    client.fetch(query1).then((data) => {
                        setPins(data)
                    })
                }
            })
        }
    }

    useEffect(() => {
        fetchDetailsOfPost()
    }, [pinId])

    if (!PinDetails) {
        return (
            <Spinner />
        )
    }

    const AddComment = () => {
        if(comment){
        client.patch(pinId)
              .setIfMissing({comments:[]})
              .insert('after','comments[-1]',[{ comment, _key:uuidv4(), postedBy:{_type:'postedBy',_ref:user.id}
                }])
                .commit()
                .then(() => {
                    setComment('')
                    fetchDetailsOfPost()
                })
    }
}

    // console.log(PinDetails.comments);
  

    return (
        <>
            <div className='flex flex-col justify-center items-center' style={{ maxWidth: '1700px' }}>
                <div className='flex justify-center sm:w-3/5  lg:w-4/5 items-center cursor-pointer hover:shadow-lg'>
                    <img
                        className='rounded-md  cover'
                        src={(PinDetails?.image && urlFor(PinDetails?.image).url())}
                        alt='profile-img'
                    />
                </div>
                <a
                    href={`${PinDetails.image.asset.url}?dl=`}
                    download
                    className=' flex flex-col justify-center items-center my-2 '
                >
                    <MdDownloadForOffline className=' text-3xl' />
                </a>

                <div className='flex flex-col justify-center text-center items-center w-3/5 lg:w-4/5'>

                    <div className={inputCss}>
                        {PinDetails.title}
                    </div>
                    <p className={inputCss}>{PinDetails.about}</p>
                </div>
                <h2 className='font-bold bg-slate-200 w-full sm:w-3/5 lg:w-4/5 my-2 text-center p-1 rounded-full'>Comments</h2>
                
                <div className='sm:w-3/4 lg:w-5/4  flex flex-col items-center justify-center'>                   
                    {PinDetails?.comments?.map((comment,i)=>(
                        <>
                        <img src={comment.postedBy?.image} className='w-8 h-8 rounded-full'/>
                        <h3 key={i} className='font-bold bg-slate-300 w-full sm:w-3/5  lg:w-4/5 my-2 text-center p-1 rounded-full'>
                            {comment.postedBy?.userName}
                            {comment.comment}
                        </h3>
                        </>
                    ))}
                </div>
               
                <div className='flex flex-col mt-5'>
                    <input
                    placeholder='Add A Comment'
                    type='text'
                    className={inputCss}
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                     />
                     <button type='button' onClick={AddComment} className={inputCss}>
                         Done
                     </button>
                </div>
            </div>
        </>
    )
}

export default PinDetails
