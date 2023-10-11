import React from 'react'
import { useNavigate } from 'react-router-dom'

const Landing = () => {

    const navigate = useNavigate()

    const handlelogin = () => {
        navigate('/login')
    }
    const handlesignup = () => {
        navigate('/signup')
    }

    return (
        <div className=' text-center h-[100vh] sm:py-[30vh] py-[30vh] px-[20px] bg-[#FFF5E0]'>
            <h1 className='sm:text-[40px] text-[30px] font-poppins text-[#141E46] font-bold '>Web based User Identification System</h1><br />
            <div className='flex justify-center items-center sm:gap-[50px] gap-[30px] py-[20px]'>
                <button onClick={handlelogin} className='text-[#FFF5E0] font-poppins sm:text-[20px] text-[18px] bg-[#C70039] transition-all duration-100 ease-in-out hover:scale-105 w-[100px] py-[10px] rounded-3xl border-[2px] border-[#141E46] '>Login</button>
                <button onClick={handlesignup} className='text-[#FFF5E0] font-poppins sm:text-[20px] text-[18px] bg-[#C70039] transition-all duration-100 ease-in-out hover:scale-105 w-[100px] py-[10px] rounded-3xl border-[2px] border-[#141E46] '>Signup</button>
            </div>
        </div>
    )
}

export default Landing