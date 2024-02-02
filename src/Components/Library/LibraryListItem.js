// LibraryListItem.js
import React from "react";

function LibraryListItem({ song, setSongState, songState, audioRef, isNowPlaying }) {
  const changeCurrentSongHandler = () => {
    setSongState({
      ...songState,
      currentSong: [song],
      isPlaying: true,
    });

    if (audioRef.current) {
      const playPromise = audioRef.current.play();

      if (playPromise !== undefined) {
        playPromise.then((audio) => {
          audioRef.current.play();
        });
      }
    }
  };

  const songTitleStyle = {
    color: song.songName ? 'black' : 'red', 
  };

  const truncatedSongName = song.songName
    ? song.songName.substring(0, song.songName.length - 4).substring(0, 24)
    : "Let's goo song";

  return (
    <div
      onClick={changeCurrentSongHandler}
      className={`library__list-item ${isNowPlaying ? "now-playing" : "other-song"}`}
    >
      <div className={`library__song-column ${isNowPlaying ? "now-playing-text" : "other-song-text"}`}>
        <h3 className="library__song-title" style={songTitleStyle}>
          {truncatedSongName || <span style={{ color: 'red' }}>Starting Song 🎶🎶</span>}
        </h3>
      </div>
    </div>
  );
}

export default LibraryListItem;
