import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { AiTwotoneDelete } from 'react-icons/ai'
import { client, urlFor } from '../client'
import { fetchUser } from '../utils/fetchUser'
import { v4 as uuidv4 } from 'uuid';
import { MdDownloadForOffline } from 'react-icons/md'
import { Link } from 'react-router-dom'

const Pin = ({ pin }) => {

    const { image, _id, postedBy, save, destination } = pin

    const navigate = useNavigate()

    const [Hovered, setHovered] = useState(false)
    const [SavingPost, setSavingPost] = useState(false)

    const user = fetchUser()

    let alreadySaved = pin?.save?.filter((item) => item?.postedBy?._id === user?.googleId);

    alreadySaved = alreadySaved?.length > 0 ? alreadySaved : [];

    const savePost = (id) => {
        if (alreadySaved.lenght === 0) {
            setSavingPost(true)
        }
        client.patch(id)
            .setIfMissing({ save: [] })
            .insert('after', 'save[-1]', [{
                _key: uuidv4(),
                userId: user?.googleId,
                postedBy: {
                    _type: 'postedBy'
                }
            }])
            .commit()
            .then(() => {
                window.location.reload()
                setSavingPost(false)
            })
    }

    const deletePost = (id) => {
        client.delete(id)
            .then(() => {
                window.location.reload()
            })
    }

    return (
        <div className='m-2'>
            <div className='hover:shadow-lg relative overflow-hidden w-auto'
                onMouseEnter={() => setHovered(true)}
                onMouseLeave={() => setHovered(false)}
                onClick={() => navigate(`/pin-detail/${_id}`)}

            >{image && (
                <img src={(urlFor(image).width(250).url())} alt='user-img' className='rounded-xl w-full h-full' />
                
            )}
         
                {Hovered && (
                    <div className='absolute top-0 w-full h-full flex flex-col justify-between p-1'>
                        <div className='flex justify-between items-center'>
                            <div className=''>
                                <a
                                    href={`${image?.asset?.url}?dl=`}
                                    download
                                    onClick={(e) => e.stopPropagation()}
                                    className="bg-blue-800 text-2xl w-7 h-7 flex flex-col text-white font-bold justify-center items-center rounded-full opacity-75 hover:opacity-100 hover:shadow-md outline-none">
                                    <MdDownloadForOffline />
                                </a>
                            </div>
                            {alreadySaved ? (
                                <button className='bg-blue-800 font-bold rounded-3xl px-2.5 text-white py-0.5 opacity-75 hover:opacity-100 p-2'>
                                    saved
                                </button>
                            ) : (
                                <button
                                    className='bg-blue-800 font-bold rounded-3xl px-2.5 text-white py-0.5 opacity-75 hover:opacity-100 p-2'
                                    onClick={(e) => {
                                        e.stopPropagation()
                                        savePost(_id)
                                    }}
                                >
                                    {save?.length} save
                                </button>
                            )}
                        </div>
                        <div className='flex items-center justify-end pr-2 w-full'>
                            {
                                pin?.UserId === user?.Ba ? (
                                    <button
                                        type="button"
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            deletePost(_id);
                                        }}
                                        className="bg-red-500 p-1 rounded-full w-7 h-7 flex items-center justify-center text-dark opacity-75 hover:opacity-100 outline-none"
                                    >    
                                        <AiTwotoneDelete />
                                    </button>
                                ) : ''
                            }
                        </div>                
                    </div>
                )}

             </div>
                    <Link to={`/user-profile/${postedBy?._id}`} className="flex justify-between items-center gap-2 mt-2 items-center">
                            <img
                                className="w-8 h-8 rounded-full object-cover"
                                src={user?.imageUrl}
                                alt=''
                            />
                            <p className=" font-semibold text-black capitalize">{user.givenName}</p>
                    </Link>
             </div>
    )
}

export default Pin
