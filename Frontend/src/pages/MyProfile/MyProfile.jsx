import React, { useState } from 'react'
import { assets } from '../../assets/assets'

const MyProfile = () => {
    const [userData, setUserData] = useState({
        name: "Biswas lohani",
        image:assets.profile_pic,
        email:'bisubhai1@gmail.com',
        phone:"9846065224",

    })
    const [isEdit, setIsEdit] = useState(false)
  return (
    <div className='name'>
      <img src={userData.image} alt="" className='img-1' />
        {
            isEdit
            ? <input value={userData.name} type="text" onChange={(e) => setUserData(prev => ({...prev,name:e.target.value}))}/>
            : <p>{userData.name}</p>
        }
        <hr />
        <div className='conatct info'>
            <p>Contact Info</p>
            <div>
                <p>Email id:</p>
                <p>{userData.email}</p>
                <p>phone:</p>
                {
            isEdit
            ? <input value={userData.phone} type="text" onChange={(e) => setUserData(prev => ({...prev,phone:e.target.value}))}/>
            : <p>{userData.phone}</p>
        }
            </div>
        </div>
        <div>
        {
            isEdit
            ? <button onClick={() => setIsEdit(false) }>Save Information</button>
            : <button onClick={() => setIsEdit(true) }>Edit</button>
        }
        </div>
    </div>
  )
}

export default MyProfile
