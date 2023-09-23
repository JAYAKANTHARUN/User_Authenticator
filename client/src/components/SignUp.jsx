import React from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const SignUp = () => {

  const navigate = useNavigate()

  const [email, setemail] = useState()
  const [password, setpassword] = useState()

  const handlehaveaccount = () => {
    navigate('/')
  }

  const handlesignup = async () => {
    let result = await fetch('http://127.0.0.1:4000/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    })
    result = await result.json()
    if (result.result.command === 'INSERT') {
      localStorage.setItem("user", email)
      navigate('/home')
    }
    else {
      alert(result.result)
    }
  }

  return (
    <div className='flex justify-center items-center h-[100vh]'>
      <div className='border-[1px] border-black rounded-md p-[20px] text-center sm:w-[500px] w-[300px]'>
        <h1 className='text-[30px] font-bold mb-[30px]'>SignUp</h1>
        <h1 className='text-[20px] mt-[10px] '>Email</h1>
        <input className='text-center text-[18px] border-[1px] p-[10px] sm:w-[300px] w-[250px] rounded-lg ' value={email} onChange={(e) => { setemail(e.target.value) }} type="email" placeholder='Enter email' />
        <h1 className='text-[20px] mt-[10px] '>Password</h1>
        <input className='text-center text-[18px] border-[1px] p-[10px] sm:w-[300px] w-[250px] rounded-lg ' value={password} onChange={(e) => { setpassword(e.target.value) }} type="password" placeholder='Enter password' /><br />
        <p className='text-[16px] cursor-pointer hover:underline my-[20px] w-[200px] mx-auto ' onClick={handlehaveaccount} >Already have an account ? </p>
        <button className='text-[18px] border-[1px] border-black rounded-lg py-[5px] px-[10px] m-[10px] bg-slate-300 hover:bg-slate-100 transition-all duration-300 ease-in-out ' onClick={handlesignup}>SignUp</button>
      </div>
    </div>
  )
}

export default SignUp;