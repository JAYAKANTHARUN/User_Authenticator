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
    let result = await fetch('https://user-authenticator-server.onrender.com/login', {
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
    <div className='flex justify-center items-center h-[100vh] color4bg '>
      <div className='color1bg border-[2px] border-[#00ADB5] rounded-3xl sm:p-[40px] p-[20px] text-center sm:w-[500px] w-[290px]'>
        <h1 className='color3 font-poppins text-[30px] font-bold mb-[30px]'>LogIn</h1>
        <h1 className='color3 font-poppins text-[20px] mt-[10px] '>Email</h1>
        <input className='focus:ring-[1px] focus:ring-[#00ADB5] outline-none font-poppins text-center text-[18px] border-[1px] p-[10px] sm:w-[350px] w-[250px] rounded-3xl ' value={email} onChange={(e) => { setemail(e.target.value) }} type="email" placeholder='Enter email' />
        <h1 className='color3 font-poppins text-[20px] mt-[20px] '>Password</h1>
        <input className='focus:ring-[1px] focus:ring-[#00ADB5] outline-none font-poppins text-center text-[18px] border-[1px] p-[10px] sm:w-[350px] w-[250px] rounded-3xl ' value={password} onChange={(e) => { setpassword(e.target.value) }} type="password" placeholder='Enter password' /><br />
        <p className='color3 font-poppins text-[16px] cursor-pointer hover:underline hover:color2 my-[20px] w-[90px] mx-auto ' onClick={handlenewuser} >New User ? </p>
        <button className='text-[#FFF5E0] font-poppins sm:text-[20px] text-[18px] color4bg color2 transition-all duration-100 ease-in-out hover:scale-105 hover:color3bg w-[100px] py-[10px] rounded-3xl my-[10px] ' onClick={handlelogin}>LogIn</button>
      </div>
    </div>
  )
}

export default LogIn;