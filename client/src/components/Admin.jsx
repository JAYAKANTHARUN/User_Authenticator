import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'


const Admin = () => {

    const navigate = useNavigate()

    const [username, setusername] = useState('')
    const [password, setpassword] = useState('')

    const handleadminlogin = async() => {
        let result = await fetch('http://127.0.0.1:4000/adminlogin', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username, password }),
        })
        result = await result.json()
        if (result.result === 'admin present') {
            localStorage.setItem("admin", username)
            navigate('/adminhome')
        }
        else {
            alert(result.result)
        }
    }

    return (
        <div className='flex justify-center items-center h-[100vh] color4bg '>
            <div className='color1bg border-[2px] border-[#00ADB5] rounded-3xl sm:p-[40px] p-[20px] text-center sm:w-[500px] w-[290px]'>
                <h1 className='color3 font-poppins text-[30px] font-bold mb-[30px]'>Admin LogIn</h1>
                <h1 className='color3 font-poppins text-[20px] mt-[10px] '>Username</h1>
                <input className='focus:ring-[1px] focus:ring-[#00ADB5] outline-none font-poppins text-center text-[18px] border-[1px] p-[10px] sm:w-[350px] w-[250px] rounded-3xl ' value={username} onChange={(e) => { setusername(e.target.value) }} type="text" placeholder='Enter username' />
                <h1 className='color3 font-poppins text-[20px] mt-[20px] '>Password</h1>
                <input className='focus:ring-[1px] focus:ring-[#00ADB5] outline-none font-poppins text-center text-[18px] border-[1px] p-[10px] sm:w-[350px] w-[250px] rounded-3xl ' value={password} onChange={(e) => { setpassword(e.target.value) }} type="password" placeholder='Enter password' /><br /><br />
                <button className='text-[#FFF5E0] font-poppins sm:text-[20px] text-[18px] color4bg color2 transition-all duration-100 ease-in-out hover:scale-105 hover:color3bg w-[100px] py-[10px] rounded-3xl my-[10px] ' onClick={handleadminlogin}>LogIn</button>
            </div>
        </div>
    )
}

export default Admin