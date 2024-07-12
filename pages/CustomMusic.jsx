import { useState, useRef, useEffect} from 'react';
import axios from 'axios';

export const CustomMusic = () => {

    const accessToken = localStorage.getItem('access');
    const [music, setMusic] = useState([]);
    const [isPlayingMusic, setIsPlayingMusic] = useState({});
    const [currentPlayingMusic, setCurrentPlayingMusic] = useState(null);
    const [timelineMusic, setTimeLineMusic] = useState({});
    const audioPlayingRefs = useRef({});
    const [progressValues, setProgressValues] = useState({});

    const getMusics = async () => {
        const token = localStorage.getItem('access')
        if(token) {
                try {
                    const response = await axios.get('http://127.0.0.1:8000/audio/show-musics/', {
                        headers: {
                            'Content-Type': 'application/json',
                            'Accept': 'application/json',
                            'Authorization': `Bearer ${token}`
                        }
                    });
                    setMusic(response.data);
                } catch (error) {
                    console.error("showmusic Error is: ", error)
                }
            }
    };

    const handlePlayPause = (id) => {
        const isPlaying = isPlayingMusic[id];
        if (isPlaying) {
          if (audioPlayingRefs.current[id]) {
            audioPlayingRefs.current[id].pause();
          }
        } else {
          if (currentPlayingMusic !== null && currentPlayingMusic !== id) {
            if (audioPlayingRefs.current[currentPlayingMusic]) {
              audioPlayingRefs.current[currentPlayingMusic].pause();
            }
            setIsPlayingMusic(prevState => ({ ...prevState, [currentPlayingMusic]: false }));
          }
    
          if (audioPlayingRefs.current[id]) {
            audioPlayingRefs.current[id].play();
            setCurrentPlayingMusic(id);
          }
        }
        setIsPlayingMusic(prevState => ({ ...prevState, [id]: !isPlaying }));
      };


    const handleStop = (id) => {
        if (audioPlayingRefs.current[id]) {
          audioPlayingRefs.current[id].pause();
          audioPlayingRefs.current[id].currentTime = 0;
        }
        setIsPlayingMusic(prevState => ({ ...prevState, [id]: false }));
        setTimeLineMusic(prevState => ({ ...prevState, [id]: 0 }));
        if (id === currentPlayingMusic) {
          setCurrentPlayingMusic(null);
        }
      };


    const handleTimeUpdate = (id) => {
        if (audioPlayingRefs.current[id]) {
          const currentPlayTime = audioPlayingRefs.current[id].currentTime;
          const musicCurrentDuration = audioPlayingRefs.current[id].duration;
          const musicProgressStatus = (currentPlayTime / musicCurrentDuration) * 100;
          setProgressValues(prevState => ({ ...prevState, [id]: musicProgressStatus }));
          setTimeLineMusic(prevState => ({ ...prevState, [id]: musicProgressStatus }));
    
          if (currentPlayTime >= musicCurrentDuration) {
            if (loopStatus[id]) {
              audioPlayingRefs.current[id].currentTime = 0;
              audioPlayingRefs.current[id].play();
            } else {
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
          }
        }
      };

    const handleProgressBarChange = (id, newValue) => {
        setProgressValues(prevState => ({
            ...prevState,
            [id]: newValue
        }));
        const newPlaybackTime = (newValue / 100) * audioPlayingRefs.current[id].duration;
        audioPlayingRefs.current[id].currentTime = newPlaybackTime;
    };





    return {
        accessToken, music, isPlayingMusic, currentPlayingMusic, timelineMusic, audioPlayingRefs, getMusics,
        handlePlayPause, handleStop, handleTimeUpdate, setIsPlayingMusic, handleProgressBarChange, progressValues,
        
    }


}

