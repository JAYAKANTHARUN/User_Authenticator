import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

const ChangePassword = () => {

    const navigate = useNavigate()

    const [oldpassword, setoldpassword] = useState('')
    const [newpassword, setnewpassword] = useState('')
    const [confirmpassword, setconfirmpassword] = useState('')
    const [email,setemail] = useState('')

    const handlepasswordupdate = async () => {
        let result = await fetch('http://127.0.0.1:4000/changepassword', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, oldpassword, newpassword, confirmpassword }),
        })
        result = await result.json()
        if (result.result.command === 'UPDATE') {
            localStorage.removeItem("user")
            localStorage.setItem("user", email)
            navigate('/home')
        }
        else {
            alert(result.result)
        }
    }

    useEffect(()=>{
        const lsemail = localStorage.getItem("user")
        setemail(lsemail)
    },[])

return (
    <div className='flex justify-center items-center h-[100vh] color4bg '>
        <div className='color1bg border-[2px] border-[#00ADB5] rounded-3xl sm:p-[40px] p-[20px] text-center sm:w-[500px] w-[290px]'>
            <h1 className='color3 font-poppins text-[30px] font-bold mb-[30px]'>Change Password</h1>
            <h1 className='color3 font-poppins text-[20px] mt-[20px] '>Current Password</h1>
            <input className='focus:ring-[1px] focus:ring-[#00ADB5] outline-none font-poppins text-center text-[18px] border-[1px] p-[10px] sm:w-[350px] w-[250px] rounded-3xl ' value={oldpassword} onChange={(e) => { setoldpassword(e.target.value) }} type="password" placeholder='Enter current password' />
            <h1 className='color3 font-poppins text-[20px] mt-[20px] '>New Password</h1>
            <input className='focus:ring-[1px] focus:ring-[#00ADB5] outline-none font-poppins text-center text-[18px] border-[1px] p-[10px] sm:w-[350px] w-[250px] rounded-3xl ' value={newpassword} onChange={(e) => { setnewpassword(e.target.value) }} type="password" placeholder='Enter new password' /><br />
            <h1 className='color3 font-poppins text-[20px] mt-[20px] '>Confirm Password</h1>
            <input className='focus:ring-[1px] focus:ring-[#00ADB5] outline-none font-poppins text-center text-[18px] border-[1px] p-[10px] sm:w-[350px] w-[250px] rounded-3xl ' value={confirmpassword} onChange={(e) => { setconfirmpassword(e.target.value) }} type="password" placeholder='Enter password' /><br /><br />
            <button className='text-[#FFF5E0] font-poppins sm:text-[20px] text-[18px] color4bg color2 transition-all duration-100 ease-in-out hover:scale-105 hover:color3bg w-[100px] py-[10px] rounded-3xl my-[10px] ' onClick={handlepasswordupdate}>Update</button>
        </div>
    </div>
)
}

export default ChangePassword