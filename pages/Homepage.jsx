import React from 'react'
import Container from 'react-bootstrap/Container';
import Search from '../components/Search';
import MusicSection from '../components/MusicSection';


const Homepage = () => {
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
