// Playlist.js
import React from 'react';
import LibraryListItem from './Components/Library/LibraryListItem';

function Playlist({ playlist, setMusicIndex, currentAudio, isAudioPlaying, setSongState }) {
  return (
    <div className="playlist">
      <h2>Playlist</h2>
      <div className="playlist__list">
        {playlist.map((song, index) => (
          <LibraryListItem
            key={index}
            song={song}
            setMusicIndex={setMusicIndex}
            currentAudio={currentAudio}
            isAudioPlaying={isAudioPlaying}
            setSongState={setSongState}
          />
        ))}
      </div>
    </div>
  );
}

export default Playlist;
