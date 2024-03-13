import React, { useState, useEffect, useRef } from 'react';
import Table from 'react-bootstrap/Table';
import { FaPlay, FaStop, FaPause } from "react-icons/fa6";
import axios from 'axios';

const MusicSection = () => {
  const accessToken = localStorage.getItem('key');
  const [music, setMusic] = useState([]);
  const [isPlayingMusic, setIsPlayingMusic] = useState({});
  const [currentPlayingMusic, setCurrentPlayingMusic] = useState(null);
  const [timelineMusic, setTimeLineMusic] = useState({});
  const audioPlayingRefs = useRef({});

  const getMusics = async () => {
    if (accessToken) {
      try {
        const response = await axios.get('http://127.0.0.1:8000/audio/show-musics/', {
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': `Token ${accessToken}`
          }
        });
        setMusic(response.data);
      } catch (error) {
        console.error(error);
      }
    }
  };

  useEffect(() => {
    getMusics();
    const interval = setInterval(getMusics, 10000); // Fetch data every 10 seconds

    return () => clearInterval(interval); // Cleanup function to clear interval when component unmounts
  }, []);

  const handlePlayPause = (id) => {
    const isPlaying = isPlayingMusic[id];
    if (isPlaying) {
      audioPlayingRefs.current[id].pause();
    } else {
      
      if(currentPlayingMusic !== null && currentPlayingMusic !== id){
      audioPlayingRefs.current[currentPlayingMusic].pause();
        setIsPlayingMusic(prevState => ({ ...prevState, [currentPlayingMusic]: false }));
      }

      audioPlayingRefs.current[id].play();
      setCurrentPlayingMusic(id)
    }
    setIsPlayingMusic(prevState => ({ ...prevState, [id]: !isPlaying }));
  };

  const handleStop = (id) => {
    audioPlayingRefs.current[id].pause();
    audioPlayingRefs.current[id].currentTime = 0;
    setIsPlayingMusic(prevState => ({ ...prevState, [id]: false }));
    setTimeLineMusic(prevState => ({ ...prevState, [id]: 0 }));
  };

  const handleTimeUpdate = (id) => {
    const currentPlayTime = audioPlayingRefs.current[id].currentTime;
    const musicCurrentDuration = audioPlayingRefs.current[id].duration;
    const musicProgressStatus = (currentPlayTime / musicCurrentDuration) * 100;
    setTimeLineMusic(prevState => ({ ...prevState, [id]: musicProgressStatus }));
    
    
    if (currentPlayTime >= musicCurrentDuration) {
      const currentIndex = music.findIndex(item => item.id === id);
      const nextIndex = currentIndex + 1;
      
      if (nextIndex === music.length) {
        handleStop(id);
        return; 
      }

      const nextId = music[nextIndex].id;
      handleStop(id);
      handlePlayPause(nextId);
      
    }
  };

  return (
    <div>
      <Table hover variant="dark" className='table' responsive="sm">
        <thead>
          <tr>
            <th colSpan={4}>Title</th>
            <th className='text-center'>Play</th>
            <th className='text-center'>Stop</th>
            <th className='text-center'>Status</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {music.map((data) => (
            <tr key={data.id}>
              <td colSpan={4}>{data.downloaded_music_title}</td>
              <td className='text-center fs-5'>
                <audio
                  ref={(ref) => audioPlayingRefs.current[data.id] = ref}
                  src={`http://127.0.0.1:8000/${data.downloaded_music_files}`}
                  onTimeUpdate={() => handleTimeUpdate(data.id)}
                  onEnded={() => setIsPlayingMusic(prevState => ({ ...prevState, [data.id]: false }))}
                ></audio>
                {isPlayingMusic[data.id] ? (
                  <FaPause key={data.id} onClick={() => handlePlayPause(data.id)} />
                ) : (
                  <FaPlay key={data.id} onClick={() => handlePlayPause(data.id)} />
                )}
              </td>
              <td className='text-center fs-5'>
                <FaStop key={data.id} onClick={() => handleStop(data.id)} />
              </td>
              <td className='text-center fs-5'>
                <progress value={timelineMusic[data.id] || 0} max="100"></progress>
              </td>
              <td><button>Delete</button></td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default MusicSection;

