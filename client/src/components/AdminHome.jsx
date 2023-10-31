import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'


const AdminHome = () => {

  const navigate = useNavigate()

  const [alluser, setalluser] = useState([])

  const getalluser = async () => {
    let user = await fetch('https://user-authenticator-server.onrender.com/getalluser', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    })
    user = await user.json()
    user = user.result
    setalluser(user)
  }

  const handlelogout = () => {
    localStorage.removeItem("admin")
    navigate('/')
  }

  const handleremoveuser = async (userid) => {
    if (window.confirm("Are You Sure?")) {
      let result = await fetch(`https://user-authenticator-server.onrender.com/removeuser/${userid}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      })
      result = await result.json()
      if (result) {
        getalluser()
      }
    }
  }

  const searchuser = async (e) => {
    let key = e.target.value
    if (key) {
      let result = await fetch(`https://user-authenticator-server.onrender.com/search/${key}`, {
        headers: {
          'Content-Type': 'application/json',
        }
      })
      result = await result.json()
      if (result) {
        setalluser(result)
      }
    }
    else {
      getalluser()
    }
  }

  useEffect(() => {
    getalluser()
  }, [])

  return (
    <div className='color1bg flex flex-col items-center sm:py-[80px] py-[50px] min-h-[100vh]'>
      <h1 className='color3 font-poppins text-[30px] mb-[20px] '>User List</h1>
      <div>
        <div className='flex justify-between items-center'>
          <input onChange={searchuser} className='focus:ring-[1px] focus:ring-[#00ADB5] outline-none font-poppins sm:text-[18px] text-[15px] rounded-full px-[20px] py-[5px] sm:py-[8px] my-[20px] sm:w-[500px] w-[200px] ' type="text" placeholder="search users" />
          <div>
            <button onClick={handlelogout} className='font-poppins sm:text-[16px] text-[15px] color4bg color2 transition-all duration-100 ease-in-out hover:scale-105 hover:color3bg sm:w-[100px] w-[80px] sm:py-[8px] py-[5px] rounded-3xl '>Logout</button>
          </div>
        </div>
        <div className='flex flex-col'>
          {alluser.length !== 0 ? (
            alluser.map((user) => (
              <div key={user.userid} className='border-[2px] border-[#00ADB5] h-[200px] sm:h-[200px] w-[300px] sm:w-[1000px] rounded-3xl flex items-center my-[10px]'>
                <div className='w-[300px] '>
                  <img className='sm:w-[120px] w-[80px] sm:h-[120px] h-[70px] rounded-full object-cover mx-auto' src={user.profilephoto} alt="" />
                </div>
                <div className='grid grid-cols-2 w-[600px]'>
                  <div className='flex flex-col text-left py-[5px] sm:px-[50px] px-[10px]'>
                    <h1 className='font-poppins font-bold color3 sm:text-[16px] text-[12px] '>UserID</h1>
                    <h1 className='font-poppins color3 sm:text-[18px] text-[12px] '>{user.userid}</h1>
                  </div>
                  <div className='flex flex-col text-left py-[5px] sm:px-[50px] px-[10px]'>
                    <h1 className='font-poppins font-bold color3 sm:text-[16px] text-[12px] '>Username</h1>
                    <h1 className='font-poppins color3 sm:text-[18px] text-[12px] '>{user.username}</h1>
                  </div> 
                  <div className='flex flex-col text-left py-[5px] sm:px-[50px] px-[10px]'>
                    <h1 className='font-poppins font-bold color3 sm:text-[16px] text-[12px] '>Phone Number</h1>
                    <h1 className='font-poppins color3 sm:text-[18px] text-[12px] '>{user.phonenumber}</h1>
                  </div>
                  <div className='flex flex-col text-left py-[5px] sm:px-[50px] px-[10px]'>
                    <h1 className='font-poppins font-bold color3 sm:text-[16px] text-[12px] '>Gender</h1>
                    <h1 className='font-poppins color3 sm:text-[18px] text-[12px] '>{user.gender}</h1>
                  </div>
                  <div className='flex flex-col text-left py-[5px] sm:px-[50px] px-[10px]'>
                    <h1 className='font-poppins font-bold color3 sm:text-[16px] text-[12px] '>Date Of Birth</h1>
                    <h1 className='font-poppins color3 sm:text-[18px] text-[12px] '>{user.dob}</h1>
                  </div>
                  <div className='flex flex-col text-left py-[5px] sm:px-[50px] px-[10px]'>
                    <h1 className='font-poppins font-bold color3 sm:text-[16px] text-[12px] '>Email</h1>
                    <h1 className='font-poppins color3 sm:text-[18px] text-[12px] '>{user.email}</h1>
                  </div>
                </div>
                <div className='w-[200px]'>
                  <button onClick={() => handleremoveuser(user.userid)} className='font-poppins sm:text-[16px] text-[13px] color4bg color2 transition-all duration-100 ease-in-out hover:scale-105 hover:color3bg sm:w-[100px] w-[70px] sm:py-[8px] py-[5px] rounded-3xl my-[10px] '>Remove</button>
                </div>
              </div>
            ))
          ) :
            <div className='h-[50vh] w-[1000px] flex items-center '>
              <h1 className='font-poppins sm:text-[30px] text-[20px] color3 mx-auto '>No Users Found</h1>
            </div>
          }

        </div>
      </div>
    </div>
  )
}

export default AdminHome