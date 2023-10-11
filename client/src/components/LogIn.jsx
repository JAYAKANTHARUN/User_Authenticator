import React from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const LogIn = () => {

  const navigate = useNavigate()

  const [email, setemail] = useState()
  const [password, setpassword] = useState()

  const handlenewuser = () => {
    navigate('/signup')
  }

  const handlelogin = async () => {
    let result = await fetch('http://127.0.0.1:4000/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    })
    result = await result.json()
    if (result.result === 'user present') {
      localStorage.setItem("user", email)
      navigate('/home')
    }
    else {
      alert(result.result)
    }
  }
  return (
    <div className='flex justify-center items-center h-[100vh] bg-[#FFF5E0] '>
      <div className='border-[2px] border-[#C70039] rounded-3xl sm:p-[40px] p-[20px] text-center sm:w-[500px] w-[290px]'>
        <h1 className='text-[#141E46] font-poppins text-[30px] font-bold mb-[30px]'>LogIn</h1>
        <h1 className='text-[#141E46] font-poppins text-[20px] mt-[10px] '>Email</h1>
        <input className='placeholder-[#141E46] bg-[#FF6969] font-poppins text-center text-[18px] border-[1px] p-[10px] sm:w-[300px] w-[250px] rounded-3xl ' value={email} onChange={(e) => { setemail(e.target.value) }} type="email" placeholder='Enter email' />
        <h1 className='text-[#141E46] font-poppins text-[20px] mt-[20px] '>Password</h1>
        <input className='placeholder-[#141E46] bg-[#FF6969] font-poppins text-center text-[18px] border-[1px] p-[10px] sm:w-[300px] w-[250px] rounded-3xl ' value={password} onChange={(e) => { setpassword(e.target.value) }} type="password" placeholder='Enter password' /><br />
        <p className='text-[#141E46] font-poppins text-[16px] cursor-pointer hover:underline my-[20px] w-[90px] mx-auto ' onClick={handlenewuser} >New User ? </p>
        <button className='text-[#FFF5E0] font-poppins sm:text-[20px] text-[18px] bg-[#C70039] transition-all duration-100 ease-in-out hover:scale-105 w-[100px] py-[10px] rounded-3xl border-[2px] border-[#141E46] my-[10px] ' onClick={handlelogin}>LogIn</button>
      </div>
    </div>
  )
}

export default LogIn;