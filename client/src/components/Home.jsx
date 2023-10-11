import React, { useEffect } from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const Home = () => {

    const navigate = useNavigate()

    const handlelogout = () => {
        localStorage.clear()
        navigate('/')
    }

    const [user, setuser] = useState({})

    const getuser = async () => {

        let lsemail = localStorage.getItem('user')

        let user = await fetch('http://127.0.0.1:4000/getuser', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ lsemail }),
        })
        user = await user.json() 
        user = user.result
        setuser(user)
    }

    useEffect(() => {
        getuser()
    }, [])

    return (
        <div className='flex justify-center items-center h-[100vh] color1bg'>
            <div className='text-center'> 
                <h1 className='sm:text-[35px] text-[30px] font-bold m-[10px] color3 font-poppins '>Profile</h1>
                <img src={user.profilephoto} alt="" className='w-[200px] h-[200px] rounded-full mx-auto m-[20px] border-[5px] border-[#00ADB5] ' />
                <div className='grid grid-cols-2'>
                    <div className='flex flex-col text-left py-[10px] px-[100px] '>
                        <h1 className='font-poppins font-bold color3 text-[20px] '>Username</h1>
                        <h1 className='font-poppins color3 text-[18px] '>{user.username}</h1>
                    </div>
                    <div className='flex flex-col text-left py-[10px] px-[100px]'>
                        <h1 className='font-poppins font-bold color3 text-[20px] '>Phone Number</h1>
                        <h1 className='font-poppins color3 text-[18px] '>{user.phonenumber}</h1>
                    </div>
                    <div className='flex flex-col text-left py-[10px] px-[100px]'>
                        <h1 className='font-poppins font-bold color3 text-[20px] '>Gender</h1>
                        <h1 className='font-poppins color3 text-[18px] '>{user.gender}</h1>
                    </div>
                    <div className='flex flex-col text-left py-[10px] px-[100px]'>
                        <h1 className='font-poppins font-bold color3 text-[20px] '>Date Of Birth</h1>
                        <h1 className='font-poppins color3 text-[18px] '>{user.dob}</h1>
                    </div>
                    <div className='flex flex-col text-left py-[10px] px-[100px]'>
                        <h1 className='font-poppins font-bold color3 text-[20px] '>Email</h1>
                        <h1 className='font-poppins color3 text-[18px] '>{user.email}</h1>
                    </div>
                </div>
                <div>
                    <button className='text-[18px] border-[1px] color4bg color2 rounded-3xl py-[10px] px-[20px] mx-[30px] my-[20px]  hover:color3bg hover:scale-105 transition-all duration-300 ease-in-out '>Update Profile</button>
                    <button className='text-[18px] border-[1px] color4bg color2 rounded-3xl py-[10px] px-[20px] mx-[30px] my-[20px]  hover:color3bg hover:scale-105 transition-all duration-300 ease-in-out '>Change Password</button>
                </div>
                <button className='text-[18px] border-[1px] color4bg color2 rounded-3xl py-[10px] px-[20px] mx-[30px] my-[10px] hover:color3bg hover:scale-105 transition-all duration-300 ease-in-out ' onClick={handlelogout}>Logout</button>
            </div>
        </div>

    )
}

export default Home