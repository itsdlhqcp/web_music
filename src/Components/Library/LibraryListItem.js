import React from "react";

function LibraryListItem({ song, setSongState, songState, audioRef }) {
    const changeCurrentSongHandler = () => {
        if (songState && songState.currentSong) {
            setSongState({
                ...songState,
                currentSong: [song],
            });

            if (songState.isPlaying) {
                const playPromise = audioRef.current.play();

                if (playPromise !== undefined) {
                    playPromise.then((audio) => {
                        audioRef.current.play();
                    });
                }
            }
        }
    };

    return (
        <div
            onClick={changeCurrentSongHandler}
            className={`library__list-item ${
                songState && songState.currentSong && song.id === songState.currentSong[0].id ? "active-song" : ""
            }`}
        >
            {/* Your content here */}
            <div className="library__song-column">
                {/* Your content here */}
            </div>
        </div>
    );
}

export default LibraryListItem;
