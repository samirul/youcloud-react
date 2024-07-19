import React, { useEffect, useState } from 'react';
import Container from 'react-bootstrap/Container';
import Search from '../components/Search';
import MusicSection from '../components/MusicSection';
import axios from 'axios';
import Alert from '@mui/material/Alert';


const Homepage = () => {
  const [alert, setAlert] = React.useState(false)
  const [alertType, setAlertType] = React.useState('')
  const [alertMsg, setAlertMsg] = React.useState('')
  const setAccessFromRefresh = async () => {
    const refreshToken = localStorage.getItem('refresh')
    try {
      if (refreshToken) {
        const response = await axios.post('http://127.0.0.1:8000/api/social/login/api/token/refresh/', {
          'refresh': refreshToken,
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
          }
        })
        localStorage.clear('access')
        localStorage.clear('refresh')
        localStorage.setItem('access', response.data.access);
        localStorage.setItem('refresh', response.data.refresh);
      }
    } catch (error) {
      console.error("Error is: ", error)
      setAlert(true)
      setAlertType('error')
      setAlertMsg('Login Failed, Please Check your Username or Password.')
    }

  }

  useEffect(() => {
    const minute = 1000 * 60
    // setAccessFromRefresh();
    const timeout = setInterval(setAccessFromRefresh, minute);
    return () => clearInterval(timeout)
  }, []);

  return (
    <>
      {alert ? <div style={{ position: 'relative', top: 100, display: 'flex', justifyContent: 'center' }}>
        <Alert severity={alertType}>{alertMsg}</Alert>
      </div> : ""}

      <div className='search-zone'>
        <Search />
      </div>

      <div className='music-zone'>
        <MusicSection />
      </div>
    </>
  )
}

export default Homepage
