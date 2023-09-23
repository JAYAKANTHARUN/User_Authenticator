import React from 'react'
import { useNavigate } from 'react-router-dom'

const Home = () => {

    const navigate = useNavigate()

    const handlelogout = () => {
        localStorage.clear()
        navigate('/')
    }

    return (
        <div className='flex justify-center items-center h-[100vh]'>
            <div className='text-center'>
                <h1 className='sm:text-[50px] text-[45px] font-bold m-[10px] '>Successfully Logged In</h1>
                <button className='text-[18px] border-[1px] bg-slate-300 border-black rounded-lg py-[10px] px-[15px] m-[50px] hover:bg-slate-100 transition-all duration-300 ease-in-out ' onClick={handlelogout}>Logout</button>
            </div>
        </div>

    )
}

export default Home