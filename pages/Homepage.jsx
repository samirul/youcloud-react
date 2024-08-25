import React, { useEffect, useState } from 'react';
import Container from 'react-bootstrap/Container';
import Search from '../components/Search';
import MusicSection from '../components/MusicSection';
import axios from 'axios';
import Alert from '@mui/material/Alert';
import Cookies from 'js-cookie';


const Homepage = () => {
  axios.defaults.withXSRFToken = true
  const [alert, setAlert] = React.useState(false)
  const [alertType, setAlertType] = React.useState('')
  const [alertMsg, setAlertMsg] = React.useState('')
  const setAccessFromRefresh = async () => {
    const refreshToken = Cookies.get('refresh')
    try {
      if (refreshToken) {
        const response = await axios.post('http://127.0.0.1:80/api/social/login/api/token/refresh/', {
          'refresh': refreshToken,
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
          }
        })
        Cookies.remove('access', { path: '' })
        Cookies.remove('refresh', { path: '' })
        Cookies.set('access', response.data.access, { expires: new Date(new Date().getTime() + 5 * 60 * 1000),  path: '' })
        Cookies.set('refresh', response.data.refresh, { expires: 1,  path: '' })
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
