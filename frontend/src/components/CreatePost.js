import React, { useState } from 'react';
import { AiOutlineCloudUpload } from 'react-icons/ai';
import { v4} from 'uuid'
import { useNavigate } from 'react-router-dom';
import { MdDelete } from 'react-icons/md';
import { Spinner } from './index'
import { client } from '../client';
import { categories } from '../utils/userQuery'

const CreatePost = ({ user }) => {

  const navigate = useNavigate()

  const [Fields, setFields] = useState()
  const [Loading, setLoading] = useState(false)
  const [image, setImage] = useState()
  const [WrongImageType, setWrongImageType] = useState(false)
  const [title, setTitle] = useState()
  const [about, setAbout] = useState()
  const [destination, setDestination] = useState()
  const [category, setCategorys] = useState()

  const uploadImg = (e) => {
    const selectedFile = e.target.files[0]

    if (selectedFile.type === "image/jpg" || selectedFile.type === "image/tiff" || selectedFile.type === "image/svg" || selectedFile.type === "image/jpeg" || selectedFile.type === "image/png" || selectedFile.type === "image/gif") {
      setWrongImageType(false)
      setLoading(true)
      client.assets.upload('image', selectedFile, { filename: selectedFile.name })
        .then((image) => {
          setLoading(false)
          setImage(image)
        })
        .catch((err) => console.log(err))
    } else {
      setLoading(false)
      setWrongImageType(true)
    }
  }
  const savePin = () => {
      if(title || destination || image._id || about || category){
        const doc  = {
          _type:'pin',
                title,
                destination,
                about,
          image:{
            _type:'image',
            asset:{        
              _ref:image?._id
            },
            postedBy:{
              _type:'postedBy'
            },
            userId:user._id,
            category,
          }
        }
        client.create(doc).then(() => {
          navigate('/')
        })
      }else{
        setFields(true)
      }

  }

  return (
    <div className='flex flex-col justify-center items-center w-full'>
      {Fields && (
        <p className='text-2xl text-slate-900'>add all fields to submit</p>
      )}
      <div className='flex flex-col justify-center m-1 items-center lg:w-4/5 w-full bg-white'>
        <div className='bg-secoundryColorflex w-full flex-0.7 '>
          <div className='flex justify-center cursor-pointer flex-col  items-center  w-full h-64'>
            {Loading && <Spinner />}
            {!image ? (
              <label>
                <div className='flex flex-xol justify-center items-center'>

                  <AiOutlineCloudUpload />
                </div>
                <p className='font-bold pt-1'>Click To Upload</p>
                <input
                  type='file'
                  onChange={uploadImg}
                  className='w-0 h-0'
                  name='upload'
                />
              </label>
            ) : (
              <div className='relative w-full h-full '>
                <img
                  src={image?.url}
                  alt='image'
                  className='w-full h-full'
                />
                <button onClick={() => setImage(null)} className='h-auto absolute top-48 m-2 text-white opacity-90 hover:opacity-100 border rounded-full p-1 bg-red-700  w-auto cursor-pointer text-4xl '>
                  <MdDelete />
                </button>
              </div>
            )}

          </div>
        </div>
        <div className='flex flex-col'>
          <input
            className="text-center outline-none text-2xl sm:text-3xl font-bold border-b-2 border-gray-200 p-2"
            type='text'
            valur={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder='Add Your Title'
          />
          {user && (
            <div className="flex gap-2 mt-2 mb-2 items-center justify-between bg-white rounded-lg ">
              <img
                src={user.image}
                className="w-10 h-10 rounded-full"
                alt="user-profile"
              />
              <p className="font-bold text-lg">{user.userName}</p>
            </div>
          )}
          <input
            type="text"
            value={about || ''}
            onChange={(e) => setAbout(e.target.value)}
            placeholder="Tell everyone what your Pin is about"
            className="text-center coutline-none text-base sm:text-lg border-b-2 border-gray-200 p-2"
          />
          <input
            type="text"
            vlaue={destination}
            onChange={(e) => setDestination(e.target.value)}
            placeholder="Add a destination link"
            className="text-center outline-none text-base sm:text-lg border-b-2 border-gray-200 p-2"
          />
        </div>
        <div className='flex flex-col'>
          <p>Choose A Pin</p>
          <select onChange={(e) => setCategorys(e.target.value)}>
            <option value='others'>select a category</option>
            {categories.map((item) => (
              <option  key={v4()} className="text-base border-0 outline-none capitalize bg-white text-black " value={item.name}>{item.name}</option>
            ))}

          </select>
        </div>
        <div className="flex justify-end items-end mt-5">
              <button
                type="button"
                onClick={savePin}
                className="bg-red-500 text-white font-bold p-2 rounded-full w-28 outline-none"
              >
                Save Pin
              </button>
        </div>
      </div>
    </div>
  )
};

export default CreatePost;
