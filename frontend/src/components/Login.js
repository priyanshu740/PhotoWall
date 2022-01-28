import React from 'react'
import { useNavigate } from 'react-router-dom';
import { FcGoogle } from 'react-icons/fc';
import GoogleLogin from 'react-google-login'
import video from '../assets/video.mp4'
import { client } from '../client';

const Login = () => {

    const navigate = useNavigate()

    const success = (res) => {
        localStorage.setItem("user",JSON.stringify(res.profileObj))
        const {name,googleId,imageUrl} = res.profileObj
        const doc = {
            _id: googleId,
            _type: 'user',
            userName: name,
            image: imageUrl,
        }
        client.createIfNotExists(doc).then(()=>{
            navigate("/",{replace:true})

        })
        console.log(res);
    }


    const failure = () => {

    }
    return (
        <div className='flex justify-start items-center flex-col h-screen'>
            <div className='relative w-full h-full'>
                <video
                    className='w-full h-full object-cover'
                    src={video}
                    muted
                    loop
                    autoPlay
                />
                <div className=' absolute flex flex-col justify-center items-center top-0 right-0 left-0 bottom-0 bg-blackOverlay'>
                    <div className=' shadow-2xl'>
                        <GoogleLogin
                            clientId='591379229271-ft5deglj4kqh0joac77i2st7psbbhucv.apps.googleusercontent.com'
                            render={(renderProp) => (
                                <button
                                    type='button'
                                    className='bg-white m-3 p-3  flex flex-row items-center rounded-lg cursor-pointer'
                                    onClick={renderProp.onClick}
                                    disabled={renderProp.disabled}
                                >
                                    <FcGoogle className='text-2xl mr-4' /> SignIn
                                </button>
                            )}
                            onSuccess={success}
                            onFailure={failure}
                            cookiePolicy='single_host_origin'
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login
