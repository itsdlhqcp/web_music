import { useRef, useState, useEffect } from 'react';
import Playlist from './PlayList';  //
import './App.css';

function App() {
  const [currentMusicDetails, setCurrentMusicDetails] = useState({
    songName: 'Inspired (Clean)',
    songArtist: 'NEFFEX',
    songSrc: './Assets/songs/Inspired (Clean) - NEFFEX.mp3',
    songAvatar: './Assets/Images/image3.jpg',
  });
  

  const [nowPlaying, setNowPlaying] = useState({});
  const [audioProgress, setAudioProgress] = useState(0);
  const [isAudioPlaying, setIsAudioPlaying] = useState(false);
  const [musicIndex, setMusicIndex] = useState(0);
  const [musicTotalLength, setMusicTotalLength] = useState('04:38');
  const [musicCurrentTime, setMusicCurrentTime] = useState('00:00');
  const [videoIndex, setVideoIndex] = useState(0);
  const [selectedFile, setSelectedFile] = useState(null);
  const [showPlaylist, setShowPlaylist] = useState(false); 

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const handleFileUpload = () => {
    if (selectedFile) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const audioSrc = reader.result;
        const fileName = selectedFile.name;
        const newPlaylist = [...playlist, { songSrc: audioSrc, songName: fileName  }];
        setPlaylist(newPlaylist);
        storePlaylistInStorage(newPlaylist);

        
        setNowPlaying({ songName: fileName, songArtist: 'Unknown', songSrc: audioSrc, songAvatar: './Assets/Images/image3.jpg' });
      };
      reader.readAsDataURL(selectedFile);
    } else {
      alert('Please select a file to upload.');
    }
  };

  

  const currentAudio = useRef();

  const handleMusicProgressBar = (e) => {
    setAudioProgress(e.target.value);
    currentAudio.current.currentTime = (e.target.value * currentAudio.current.duration) / 100;
  };

  let avatarClass = ['objectFitCover', 'objectFitContain', 'none'];
  const [avatarClassIndex, setAvatarClassIndex] = useState(0);

  const handleAvatar = () => {
    if (avatarClassIndex >= avatarClass.length - 1) {
      setAvatarClassIndex(0);
    } else {
      setAvatarClassIndex(avatarClassIndex + 1);
    }
  };

  const handleAudioPlay = () => {
    if (currentAudio.current.paused) {
      currentAudio.current.play();
      setIsAudioPlaying(true);
    } else {
      currentAudio.current.pause();
      setIsAudioPlaying(false);
    }
  };

  const playlistKey = 'musicPlaylist';

  const storePlaylistInStorage = (playlist) => {
    localStorage.setItem(playlistKey, JSON.stringify(playlist));
  };

  const retrievePlaylistFromStorage = () => {
    const storedPlaylist = localStorage.getItem(playlistKey);
    return storedPlaylist ? JSON.parse(storedPlaylist) : [];
  };

  const [playlist, setPlaylist] = useState(() => retrievePlaylistFromStorage());

  useEffect(() => {
    if (playlist.length > 0) {
      const firstSong = playlist[musicIndex];
      currentAudio.current.src = firstSong.songSrc;
      setCurrentMusicDetails({
        songName: 'Unknown',
        songArtist: 'Unknown',
        songSrc: firstSong.songSrc,
        songAvatar: './Assets/Images/image3.jpg',
      });
      setIsAudioPlaying(true);

      // Set now playing to the first song when the playlist is not empty
      setNowPlaying({
        songName: firstSong.songName || 'Unknown',
        songArtist: firstSong.songArtist || 'Unknown',
        songSrc: firstSong.songSrc,
        songAvatar: './Assets/Images/image3.jpg',
      });
    }
  }, [playlist, musicIndex]);

  const handleNextSong = () => {
    if (musicIndex >= playlist.length - 1) {
      setMusicIndex(0);
    } else {
      setMusicIndex((prevIndex) => prevIndex + 1);
    }
    setIsAudioPlaying(true);
  };

  const handlePrevSong = () => {
    if (musicIndex === 0) {
      setMusicIndex(playlist.length - 1);
    } else {
      setMusicIndex((prevIndex) => prevIndex - 1);
    }
  };

  const handleAudioUpdate = () => {
    let minutes = Math.floor(currentAudio.current.duration / 60);
    let seconds = Math.floor(currentAudio.current.duration % 60);
    let musicTotalLength0 = `${minutes < 10 ? `0${minutes}` : minutes}:${seconds < 10 ? `0${seconds}` : seconds}`;
    setMusicTotalLength(musicTotalLength0);

    let currentMin = Math.floor(currentAudio.current.currentTime / 60);
    let currentSec = Math.floor(currentAudio.current.currentTime % 60);
    let musicCurrentT = `${currentMin < 10 ? `0${currentMin}` : currentMin}:${currentSec < 10 ? `0${currentSec}` : currentSec}`;
    setMusicCurrentTime(musicCurrentT);

    const progress = parseInt((currentAudio.current.currentTime / currentAudio.current.duration) * 100);
    setAudioProgress(isNaN(progress) ? 0 : progress);
  };

  const vidArray = ['./Assets/Videos/video1.mp4', './Assets/Videos/video2.mp4', './Assets/Videos/video3.mp4', './Assets/Videos/video4.mp4', './Assets/Videos/video5.mp4', './Assets/Videos/video6.mp4'];

  const handleChangeBackground = () => {
    if (videoIndex >= vidArray.length - 1) {
      setVideoIndex(0);
    } else {
      setVideoIndex((prevIndex) => prevIndex + 1);
    }
  };

  const truncatedSongName = nowPlaying.songName
  ? nowPlaying.songName.substring(0, nowPlaying.songName.length - 4).substring(0, 24)
  : "Let's goo song";

  return (
    <>
      <div className="container">
        <audio src={currentMusicDetails.songSrc} ref={currentAudio} onEnded={handleNextSong} onTimeUpdate={handleAudioUpdate}></audio>
        <video src={vidArray[videoIndex]} loop muted autoPlay className="backgroundVideo"></video>
        <div className="blackScreen"></div>
        <div className="music-Container">
          <p className="musicPlayer">Music Player</p>
          <p className="music-Head-Name">{truncatedSongName}</p>
          <p className="music-Artist-Name">{nowPlaying.songArtist}</p>
          <img src={currentMusicDetails.songAvatar} className={avatarClass[avatarClassIndex]} onClick={handleAvatar} alt="song Avatar" id="songAvatar" />
          <div className="musicTimerDiv">
            <p className="musicCurrentTime">{musicCurrentTime}</p>
            <p className="musicTotalLenght">{musicTotalLength}</p>
          </div>
          <input type="range" name="musicProgressBar" className="musicProgressBar" value={audioProgress} onChange={handleMusicProgressBar} />
          
          <div className="musicControlers">
            <i className="fa-solid fa-backward musicControler" onClick={handlePrevSong}></i>
            <i className={`fa-solid ${isAudioPlaying ? 'fa-pause-circle' : 'fa-circle-play'} playBtn`} onClick={handleAudioPlay}></i>
            <i className="fa-solid fa-forward musicControler" onClick={handleNextSong}></i>
            <input type="file" accept=".mp3" onChange={handleFileChange} />
            <button onClick={handleFileUpload}>Upload</button>
          </div>

          {/* Show Playlist Button */}
          <button onClick={() => setShowPlaylist(!showPlaylist)}>
            {showPlaylist ? 'Hide Playlist' : 'Show Playlist'}
          </button>

          {/* Playlist Component */}
          {showPlaylist && (
            <Playlist
              playlist={playlist}
              setMusicIndex={setMusicIndex}
              currentAudio={currentAudio}
              isAudioPlaying={isAudioPlaying}
              setSongState={setCurrentMusicDetails}
              showPlaylist={showPlaylist}
              setShowPlaylist={setShowPlaylist}
            />
          )}
        </div>
        <div className="changeBackBtn" onClick={handleChangeBackground}>
          Change Background
        </div>
      </div>
    </>
  );
}

export default App;
