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
    if (result.result==='user present'){
      localStorage.setItem("user",email)
      navigate('/home')
    }
    else{
      alert(result.result)
    }
  }

  return (
    <div className='flex justify-center items-center h-[100vh]'>
      <div className='border-[1px] border-black rounded-md p-[20px] text-center sm:w-[500px] w-[300px]'>
        <h1 className='text-[30px] font-bold mb-[30px]'>LogIn</h1>
        <h1 className='text-[20px] mt-[10px] '>Email</h1>
        <input className='text-center text-[18px] border-[1px] p-[10px] sm:w-[300px] w-[250px] rounded-lg ' value={email} onChange={(e) => { setemail(e.target.value) }} type="email" placeholder='Enter email' />
        <h1 className='text-[20px] mt-[10px] '>Password</h1>
        <input className='text-center text-[18px] border-[1px] p-[10px] sm:w-[300px] w-[250px] rounded-lg ' value={password} onChange={(e) => { setpassword(e.target.value) }} type="password" placeholder='Enter password' /><br />
        <p className='text-[16px] cursor-pointer hover:underline my-[20px] w-[90px] mx-auto ' onClick={handlenewuser} >New User ? </p>
        <button className='text-[18px] border-[1px] border-black rounded-lg py-[5px] px-[10px] m-[10px] bg-slate-300 hover:bg-slate-100 transition-all duration-300 ease-in-out ' onClick={handlelogin}>LogIn</button>
      </div>
    </div>
  )
}

export default LogIn;