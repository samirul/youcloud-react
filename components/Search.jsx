import React, {useState} from 'react';
import { FaSearch } from "react-icons/fa";
import axios from "axios";

const Search = () => {
  const [linkurl, setlinkUrl] = React.useState('');
  const [res, setRes] = React.useState('')
  const [stats, setStatus] = React.useState({ 'status': 'Looking for Url...' })

  React.useEffect(() => {
    const fetchTaskStatus = async () => {
      const token = localStorage.getItem('access')
      if (res && res['download_id'] && token) {
        try {
          const response = await axios.get(`http://127.0.0.1:8000/audio/download/${res['download_id']}/`, {
            headers: {
              'Content-Type': 'application/json',
              'Accept': 'application/json',
              'Authorization': `Bearer ${token}`
            }
          });
          setStatus(response.data);
        } catch (error) {
          console.error('Error receiving data:', error);
        }
      }

    };

    const interval = setInterval(fetchTaskStatus, 3000); // fetch every 3 sec

    setStatus({ 'status': 'Looking for Url...' })

    return () => clearInterval(interval); // Clean up the interval after component would be unmounted
  }, [res]);




  const handleChange = (e) => {
    setlinkUrl(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('access')
    if (token) {
      // Send form data using Axios POST request
      await axios.post('http://127.0.0.1:8000/audio/download/', { 'downloaded_url_video_link': linkurl }, {
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      })
        .then(response => {
          // Handle success
          setRes(response.data)
        })
        .catch(error => {
          // Handle error
          console.error('Error sending form data:', error);
        });

      } else {
        window.location.replace('/login')
      }

  }

    
    return (
      <>
      <div>
        <form onSubmit={handleSubmit}>
          <div className="wrap-one">
            <div className="search-one">
              <input
                type="text"
                className="searchTerm-one"
                onChange={handleChange}
                value={linkurl}
                placeholder="Enter URL"
              />
              <button type="submit" className="searchButton-one">
                <FaSearch />
              </button>
            </div>
          </div>
        </form>
        <div>
          <p style={{ color: 'white', paddingTop: 50, display: 'flex', justifyContent: 'center' }}>{stats['status']}</p>
        </div>
      </div>
      </>
    );
    }


export default Search;

