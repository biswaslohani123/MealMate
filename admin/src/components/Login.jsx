import axios from 'axios'
import React, { useState } from 'react'
import { assets, url } from '../assets/assets'
import { toast } from 'react-toastify'
import './Login.css'

const Login = ({setToken}) => {
    const  [email, setEmail] = useState('')
    const  [password, setPassword] = useState('')

    const onSubmitHandler = async (e) => {
        try {
            e.preventDefault();
            const response = await axios.post(url + '/api/user/admin',{email,password})
            if (response.data.success) {
                setToken(response.data.token)
            } else{
                toast.error(response.data.message)
            }
            
            
        } catch (error) {
            console.log(error);
            toast.error(response.data.message)
            
            
        }
    }
  return (
    <div  className='container'>
      <div className='login' >
        <img src={assets.logo} alt="" />
        <form onSubmit={onSubmitHandler}>
        <h1 >Admin Login</h1>
            <div box-1>
                <p >Email Address</p>
                <input onChange={(e) => setEmail(e.target.value)} value={email} type="email" placeholder='Your@email.com' required />
            </div>
            <div box-2>
                <p >Password</p>
                <input onChange={(e) => setPassword(e.target.value)} value={password}  type="password" placeholder='Enter Your password' required />
            </div>
         
        <button type='submit'>Login</button>
        </form>
      </div>
    </div>
  )
}

export default Login
