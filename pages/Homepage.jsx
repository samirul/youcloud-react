import React, {useEffect, useState} from 'react';
import Container from 'react-bootstrap/Container';
import Search from '../components/Search';
import MusicSection from '../components/MusicSection';
import axios from 'axios';


const Homepage = () => {
  const setAccessFromRefresh = async() =>{
    const refreshToken = localStorage.getItem('refresh')
    try{
      if(refreshToken){
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
    }catch(error){
      console.error("Error is: ", error)
    } 
    
}

  useEffect(()=>{
      const minute = 1000 * 60
      // setAccessFromRefresh();
      const timeout = setInterval(setAccessFromRefresh, minute);
      return () => clearInterval(timeout)
  },[]);

  return (
    <>
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
