import React from 'react';
import { FaPlay, FaPause } from "react-icons/fa";

const FooterBottom = ({ music, isPlaying, handlePlayPause, isp }) => {
  // Function to handle play/pause button click
  const handleTogglePlayPause = (id) => {
    // Check if any music is currently playing
    const isAnyMusicPlaying = Object.values(isPlaying).some(value => value);

    // If no music is playing, start playing the music item with the given ID
    if (!isAnyMusicPlaying && music.length > 0) {
      handlePlayPause(id);
    } else {
      // If music is playing, pause it
      handlePlayPause(id); // Pause the music with the given ID
    }
  };

  return (
    <footer className="footer navbar fixed-bottom">
      {/* Single play/pause button for the entire music collection */}
      {isPlaying[music] && Object.values(isPlaying).includes(true) ? (
        <FaPause className='play fs-1' onClick={() => handleTogglePlayPause(music[0].id)} />
      ) : (
        <FaPlay className='play fs-1' onClick={() => handleTogglePlayPause(music[0].id)} />
      )}
      {/* Progress bar */}
      <progress value="50" max="100"></progress>
    </footer>
  );
};

export default FooterBottom;
















































// import React, {useEffect} from 'react';
// import { FaPlayCircle, FaPauseCircle } from "react-icons/fa";
// import { CustomMusic } from '../pages/CustomMusic';

// const FooterBottom = () => {
//   const { music, getMusics, isPlayingMusic, timelineMusic, handlePlayPause, audioPlayingRefs } = CustomMusic();

//   useEffect(() => {
//           getMusics();
//           // music
//           const interval = setInterval(getMusics, 10000); // Fetch data every 10 seconds
      
//           return () => clearInterval(interval); // Cleanup function to clear interval when component unmounts
//         }, []);

//         return (
//           <footer className='footer navbar fixed-bottom'>
//             {music.map((data) => (
//               <div key={data.id}>
//                 {isPlayingMusic[data.id] ? (
//                   <FaPauseCircle className='play fs-1' onClick={() => handlePlayPause(data.id)} />
//                 ) : (
//                   <FaPlayCircle className='play fs-1' onClick={() => handlePlayPause(data.id)} />
//                 )}

//                 {/* <progress value={timelineMusic[data.id] || 0} max="100"></progress> */}
//                 {/* Audio element */}
//                 <audio ref={(ref) => audioPlayingRefs.current[data.id] = ref} src={`http://127.0.0.1:8000/${data.downloaded_music_files}`}></audio>
//               </div>
//             ))}
//           </footer>
//         );
//       };

// export default FooterBottom;



