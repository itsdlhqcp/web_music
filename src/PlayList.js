// Playlist.js
import React from 'react';
import LibraryListItem from './Components/Library/LibraryListItem';
import './Playlist.css';

function Playlist({ playlist, setMusicIndex, currentAudio, isAudioPlaying, setSongState, showPlaylist, setShowPlaylist }) {
  const nowPlayingSongIndex = playlist.findIndex(song => song.songSrc === currentAudio.current.src);
  const headingStyle = {
    fontWeight: 'bold',
    color: 'black',
  };

  return (
    <div className={`playlist ${showPlaylist ? 'open' : ''}`}>
    <h2 style={headingStyle}>Playlist</h2>
      <div className="playlist__list">
        <div className="playlist__scrollable">
          {playlist.map((song, index) => (
            <LibraryListItem
              key={index}
              song={song}
              setMusicIndex={setMusicIndex}
              currentAudio={currentAudio}
              isAudioPlaying={isAudioPlaying}
              setSongState={setSongState}
              isNowPlaying={index === nowPlayingSongIndex}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Playlist;
