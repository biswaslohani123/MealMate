import React, { useEffect, useState } from 'react'
import Navbar from './components/Navbar/Navbar'
import Sidebar from './components/SIdebar.jsx/Sidebar'
import { Route, Routes } from 'react-router-dom'
import Add from './pages/Add/Add'
import List from './pages/List/List'
import Orders from './pages/Orders/Orders'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Login from './components/Login'


const App = () => {

  const url = "http://localhost:4000"
  const [token, setToken] = useState(localStorage.getItem('token')?localStorage.getItem('token'):'')

  useEffect(() => {
    localStorage.setItem('token',token)
  },[token])
  return (
    <div>
       <ToastContainer />
      {token === '' ? (
        <Login setToken={setToken} />
      ) : (
        <>
          <Navbar setToken={setToken} />
          <hr />
          <div className="app-content">
            <Sidebar />
            <Routes>
              <Route path='/add' element={<Add url={url} token={token}/>} />
              <Route path='/list' element={<List url={url} token={token} />} />
              <Route path='/orders' element={<Orders url={url} token={token} />} />
            </Routes>
          </div>
        </>
      )}
     
    </div>
  )
  
}

export default App
