import React from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const SignUp = () => {

  const navigate = useNavigate()

  const [email, setemail] = useState('')
  const [password, setpassword] = useState('')
  const [confirmpassword, setconfirmpassword] = useState('')
  const [username, setusername] = useState('')
  const [profilephoto, setprofilephoto] = useState(null)
  const [phonenumber, setphonenumber] = useState('')
  const [gender, setgender] = useState('male')
  const [dob, setdob] = useState('')

  const handlehaveaccount = () => {
    navigate('/login')
  }

  const handlesignup = async () => {
    let result = await fetch('https://user-authenticator-server.onrender.com/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, phonenumber, gender, dob, email, password, confirmpassword, profilephoto }),
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

  const handleGenderChange = (e) => {
    setgender(e.target.value);
  }

  const handleProfilePhotoChange = (e) => {
    var reader = new FileReader()
    reader.readAsDataURL(e.target.files[0])
    reader.onload = () => {
      setprofilephoto(reader.result)
    }
    reader.onerror = error => {
      console.log(error)
    }
  }

  const handledob = (e) => {
    setdob(e.target.value);
  };

  return (
    <div className='flex justify-center items-start h-[180vh] color4bg '>
      <div className='color1bg border-[2px] border-[#00ADB5] rounded-3xl sm:p-[40px] p-[20px] sm:mt-[100px] mt-[50px] text-center sm:w-[600px] w-[290px]'>
        <h1 className='color3 font-poppins text-[30px] font-bold mb-[30px]'>SignUp</h1>
        <div className="flex items-center justify-center w-[80px] h-[80px] mx-auto overflow-hidden text-center">
          {profilephoto ?
            <img src={profilephoto} alt="Profile" className=" w-full h-full rounded-full object-cover" />
            : <img src='https://static.vecteezy.com/system/resources/previews/021/548/095/non_2x/default-profile-picture-avatar-user-avatar-icon-person-icon-head-icon-profile-picture-icons-default-anonymous-user-male-and-female-businessman-photo-placeholder-social-network-avatar-portrait-free-vector.jpg' alt="Profile" className="w-full h-full rounded-full object-cover" />}
        </div>
        <br />
        <label className="cursor-pointer">
          <input type="file" accept="image/*" onChange={handleProfilePhotoChange} className="hidden" />
          <span className="color4bg color2 transition-all duration-300 ease-in-out hover:color3bg text-[#FFF5E0] py-2 px-4 rounded-full cursor-pointer">Upload Photo</span>
        </label>
        <h1 className='color3 font-poppins text-[20px] mt-[20px] '>Username</h1>
        <input className='focus:ring-[1px] focus:ring-[#00ADB5] outline-none font-poppins text-center text-[18px] border-[1px] p-[10px] sm:w-[350px] w-[250px] rounded-3xl ' value={username} onChange={(e) => { setusername(e.target.value) }} type="text" placeholder='Enter username' />
        <h1 className='color3 font-poppins text-[20px] mt-[20px] '>Phone Number</h1>
        <input className='focus:ring-[1px] focus:ring-[#00ADB5] outline-none font-poppins text-center text-[18px] border-[1px] p-[10px] sm:w-[350px] w-[250px] rounded-3xl ' value={phonenumber} onChange={(e) => { setphonenumber(e.target.value) }} type="text" placeholder='Enter phone number' /> <br />
        <h1 className='color3 font-poppins text-[20px] mt-[20px] '>Gender</h1>
        <input type="radio" id="male" name="gender" value="male" className="mr-1" checked={gender === 'male'} onChange={handleGenderChange} />
        <label htmlFor="male" className="color3 font-poppins mr-4">Male</label>
        <input type="radio" id="female" name="gender" value="female" className="mr-1" checked={gender === 'female'} onChange={handleGenderChange} />
        <label htmlFor="female" className="color3 font-poppins">Female</label>
        <div className="mt-6">
          <h1 className='color3 font-poppins text-[20px] mt-[20px] '>DOB</h1>
          <input
            type="date"
            value={dob}
            onChange={handledob}
            className="border-2 border-[#00ADB5] font-poppins p-2 rounded-md"
          />
        </div>
        <h1 className='color3 font-poppins text-[20px] mt-[20px] '>Email</h1>
        <input className='focus:ring-[1px] focus:ring-[#00ADB5] outline-none font-poppins text-center text-[18px] border-[1px] p-[10px] sm:w-[350px] w-[250px] rounded-3xl ' value={email} onChange={(e) => { setemail(e.target.value) }} type="email" placeholder='Enter email' />
        <h1 className='color3 font-poppins text-[20px] mt-[20px] '>Password</h1>
        <input className='focus:ring-[1px] focus:ring-[#00ADB5] outline-none font-poppins text-center text-[18px] border-[1px] p-[10px] sm:w-[350px] w-[250px] rounded-3xl ' value={password} onChange={(e) => { setpassword(e.target.value) }} type="password" placeholder='Enter password' /><br />
        <h1 className='color3 font-poppins text-[20px] mt-[20px] '>Confirm Password</h1>
        <input className='focus:ring-[1px] focus:ring-[#00ADB5] outline-none font-poppins text-center text-[18px] border-[1px] p-[10px] sm:w-[350px] w-[250px] rounded-3xl ' value={confirmpassword} onChange={(e) => { setconfirmpassword(e.target.value) }} type="password" placeholder='Enter password' /><br />
        <p className='color3 font-poppins text-[16px] cursor-pointer hover:underline hover:color2 my-[20px] w-[220px] mx-auto ' onClick={handlehaveaccount} >Already have an account ? </p>
        <button className='font-poppins sm:text-[20px] text-[18px] color4bg color2 transition-all duration-100 ease-in-out hover:color3bg w-[110px] py-[10px] rounded-3xl my-[10px] hover:scale-105 ' onClick={handlesignup}>SignUp</button>
      </div>
    </div>
  )
}

export default SignUp;