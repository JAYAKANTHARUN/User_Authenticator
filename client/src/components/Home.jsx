import React, { useEffect } from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const Home = () => {

    const navigate = useNavigate()

    const handlelogout = () => {
        localStorage.removeItem("user")
        navigate('/')
    }

    const [user, setuser] = useState({})

    const getuser = async () => {

        let lsemail = localStorage.getItem('user')

        let user = await fetch('https://user-authenticator-server.onrender.com/getuser', {
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

    const handleupdateprofile = () => {
        navigate('/updateprofile')
    }
    const handlechangepassword = () => {
        navigate('/changepassword')
    }

    useEffect(() => {
        const getuserdetails = async() => {
            await getuser()
        }
        getuserdetails()
    },[])

    return (
        <div className='flex justify-center items-center h-[100vh] color1bg'>
            <div className='text-center'> 
                <h1 className='sm:text-[35px] text-[30px] font-bold m-[10px] color3 font-poppins '>Profile</h1>
                <img src={user.profilephoto} alt="" className='sm:w-[200px] sm:h-[200px] w-[100px] h-[100px] rounded-full mx-auto m-[20px] border-[5px] border-[#00ADB5] ' />
                <div className='grid grid-cols-2'>
                    <div className='flex flex-col text-left py-[10px] sm:px-[100px] px-[20px] '>
                        <h1 className='font-poppins font-bold color3 sm:text-[20px] text-[18px] '>Username</h1>
                        <h1 className='font-poppins color3 sm:text-[18px] text-[16px] '>{user.username}</h1>
                    </div>
                    <div className='flex flex-col text-left py-[10px] sm:px-[100px] px-[20px]'>
                        <h1 className='font-poppins font-bold color3 sm:text-[20px] text-[18px] '>Phone Number</h1>
                        <h1 className='font-poppins color3 sm:text-[18px] text-[16px] '>{user.phonenumber}</h1>
                    </div>
                    <div className='flex flex-col text-left py-[10px] sm:px-[100px] px-[20px]'>
                        <h1 className='font-poppins font-bold color3 sm:text-[20px] text-[18px] '>Gender</h1>
                        <h1 className='font-poppins color3 sm:text-[18px] text-[16px] '>{user.gender}</h1>
                    </div>
                    <div className='flex flex-col text-left py-[10px] sm:px-[100px] px-[20px]'>
                        <h1 className='font-poppins font-bold color3 sm:text-[20px] text-[18px] '>Date Of Birth</h1>
                        <h1 className='font-poppins color3 sm:text-[18px] text-[16px] '>{user.dob}</h1>
                    </div>
                    <div className='flex flex-col text-left py-[10px] sm:px-[100px] px-[20px]'>
                        <h1 className='font-poppins font-bold color3 sm:text-[20px] text-[18px] '>Email</h1>
                        <h1 className='font-poppins color3 sm:text-[18px] text-[16px] '>{user.email}</h1>
                    </div>
                </div>
                <div>
                    <button onClick={handleupdateprofile} className='sm:text-[18px] text-[15px] border-[1px] color4bg color2 rounded-3xl sm:py-[10px] py-[8px] sm:px-[20px] px-[10px] sm:mx-[30px] mx-[10px] my-[20px]  hover:color3bg hover:scale-105 transition-all duration-300 ease-in-out '>Update Profile</button>
                    <button onClick={handlechangepassword} className='sm:text-[18px] text-[15px] border-[1px] color4bg color2 rounded-3xl sm:py-[10px] py-[8px] sm:px-[20px] px-[10px] sm:mx-[30px] mx-[10px] my-[20px]  hover:color3bg hover:scale-105 transition-all duration-300 ease-in-out '>Change Password</button>
                </div>
                <button className='sm:text-[18px] text-[16px] border-[1px] color4bg color2 rounded-3xl sm:py-[10px] py-[8px] sm:px-[20px] px-[12px] sm:mx-[30px] mx-[10px] hover:color3bg hover:scale-105 transition-all duration-300 ease-in-out ' onClick={handlelogout}>Logout</button>
            </div>
        </div>

    )
}

export default Home