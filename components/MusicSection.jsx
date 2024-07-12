import React, { useEffect, useState, useRef } from 'react';
import { CustomMusic } from '../pages/CustomMusic'
import Table from 'react-bootstrap/Table';
import { FaPlay, FaStop, FaPause } from "react-icons/fa6";
import FooterBottom from './FooterBottom';
import { FaVolumeUp, FaVolumeDown } from "react-icons/fa";
import Checkbox from '@mui/material/Checkbox';
import {CheckboxExport} from './CheckboxExport'
import Button from '@mui/material/Button';
import axios from 'axios';


const MusicSection = () => {
  const { music, isPlayingMusic, timelineMusic, audioPlayingRefs,
    getMusics, handlePlayPause, handleStop, handleTimeUpdate,
    setIsPlayingMusic, handleProgressBarChange, progressValues,

  } = CustomMusic()

  const {BpIcon, BpCheckedIcon} = CheckboxExport()

  const [volumeLevel, setVolumeLevel] = useState(50);
  const [isChecked, setIsChecked] = useState(false);



  useEffect(() => {
    getMusics();
    const interval = setInterval(getMusics, 2000); // Fetch data every 10 seconds....
    return () => clearInterval(interval)// Cleanup function to clear interval when component unmounts....
  }, []);





  // Function to handle volume change....
  const handleVolumeChange = (newValue) => {
    setVolumeLevel(newValue); // Update the volume level....

    // Update the volume for all music items....
    Object.values(audioPlayingRefs.current).forEach(audioRef => {
      if (audioRef) {
        audioRef.volume = newValue / 100; // Volume should be between 0 and 1....
      }
    });
  };


  const handleLoopToggle = () => {
    setIsChecked(prevState => !prevState); // Toggle the loop state....

    // Update the loop property for all audio elements....
    Object.values(audioPlayingRefs.current).forEach(audioRef => {
      if (audioRef) {
        audioRef.loop = !isChecked;
      }
    });
  };


  const handleCheckbox = (event) => {
    setIsChecked(event.target.checked);
  }



  const deleteMusic = async (data) => {
    const token = localStorage.getItem('access')
    try {
      await axios.get(`http://127.0.0.1:8000/audio/delete-audio/${data.id}/`, {
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      })
    } catch (error) {

    }
  }

  useEffect(() => {
    deleteMusic();
  }, [])



  return (
    <>
      <Table hover variant="dark" className='table' responsive="sm">
        <thead>
          <tr>
            <th colSpan={4} className='text-center'>Title</th>
            <th className='text-center'>Play</th>
            <th className='text-center'>Stop</th>
            <th className='text-center'>Music Progress</th>
            <th className='text-center'>Slider</th>
            <th className='text-center'>Volume</th>
            <th className='text-center'>Loop</th>
            <th className='text-center'>Delete</th>
          </tr>
        </thead>
        <tbody>
          {music.map((data) => (
            <tr key={data.id}>
              <td colSpan={4} className='text-center'>{data.downloaded_music_title}</td>
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
                <progress className="progress-bars" value={timelineMusic[data.id] || 0} max="100"></progress>
              </td>
              <td className='text-center fs-5'>
                <input
                  type="range"
                  value={progressValues[data.id] || 0}
                  onChange={(e) => handleProgressBarChange(data.id, parseInt(e.target.value))}
                  min="0"
                  max="100"
                  id='myinput'
                  style={{
                    background: `linear-gradient(to right, #238d43 0%, #2cd87a, #238d43, #238d43 100%)`,
                  }}
                />
              </td>
              <td>
                <div className="text-center volume-controls">
                  <FaVolumeDown className='volume-icon' onClick={() => handleVolumeChange(volumeLevel - 10)} />
                  <input
                    type="range"
                    value={volumeLevel}
                    onChange={(e) => handleVolumeChange(parseInt(e.target.value))}
                    min="0"
                    max="100"
                    id='myvol'
                    style={{
                      background: `linear-gradient(to right, #238d43 0%, #2cd87a, #238d43, #238d43 100%)`,
                    }}
                  />
                  <FaVolumeUp className='volume-icon' onClick={() => handleVolumeChange(volumeLevel + 10)} />
                </div>
              </td>
              <td>
                <div className='text-center'>
                  <Checkbox
                    // type="checkbox"
                    checked={isChecked}
                    onChange={handleLoopToggle}
                    color="success"
                    checkedIcon={<BpCheckedIcon />}
                    icon={<BpIcon />}
                    
                  />
                </div>
              </td>
              <td><div className='text-center'><Button variant="contained" color="error" style={{fontWeight: 700}} onClick={() => deleteMusic(data)}>Delete</Button></div></td>
            </tr>
          ))}
        </tbody>
      </Table>
      {/* <div>
      <FooterBottom music ={music} isPlaying={isPlayingMusic} handlePlayPause={handlePlayPause} />
      </div> */}

    </>

  );
};

export default MusicSection;

