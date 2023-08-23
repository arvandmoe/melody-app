import React, { useState, useEffect } from 'react';

interface Song {
  src: string;
  title: string;
}

interface MusicPlayerProps {
  songs: Song[];
}

const MusicPlayer: React.FC<MusicPlayerProps> = ({ songs }) => {
  const [currentSongIndex, setCurrentSongIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  const currentSong = songs[currentSongIndex];

  const audioRef = React.createRef<HTMLAudioElement>();

  useEffect(() => {
    if (isPlaying) {
      audioRef.current?.play();
    } else {
      audioRef.current?.pause();
    }
  }, [isPlaying, currentSongIndex]);

  const playPauseHandler = () => {
    setIsPlaying(!isPlaying);
  };

  const nextSongHandler = () => {
    setCurrentSongIndex((prevIndex) => (prevIndex + 1) % songs.length);
  };

  const prevSongHandler = () => {
    setCurrentSongIndex((prevIndex) =>
      prevIndex === 0 ? songs.length - 1 : prevIndex - 1
    );
  };

  return (
    <div className="bg-gray-100 p-4 rounded-lg shadow-md">
      <div className="text-lg font-semibold mb-4">{currentSong.title}</div>
      <audio ref={audioRef} src={currentSong.src} />
      <div className="flex justify-center space-x-4">
        <button
          onClick={prevSongHandler}
          className="px-2 py-1 bg-blue-500 text-white rounded-md"
        >
          Previous
        </button>
        <button
          onClick={playPauseHandler}
          className="px-2 py-1 bg-green-500 text-white rounded-md"
        >
          {isPlaying ? 'Pause' : 'Play'}
        </button>
        <button
          onClick={nextSongHandler}
          className="px-2 py-1 bg-blue-500 text-white rounded-md"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default MusicPlayer;
