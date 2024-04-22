import React, { useRef, useState, useEffect } from "react";
import {
  FaPlay,
  FaPause,
  FaVolumeUp,
  FaVolumeMute,
  FaSyncAlt,
} from "react-icons/fa";

const AudioBar = () => {
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.5);
  const [isMuted, setIsMuted] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  useEffect(() => {
    if (localStorage.getItem("currentTrackUrl")) {
      audioRef.current.src = localStorage.getItem("currentTrackUrl");
      audioRef.current.volume = volume;
      audioRef.current.play();
      setIsPlaying(true);
    }
  }, []);
  
  useEffect(() => {
    const handleTimeUpdate = () => {
      setCurrentTime(audioRef.current.currentTime);
      setDuration(audioRef.current.duration);
    };

    audioRef.current.addEventListener("timeupdate", handleTimeUpdate);

    return () => {
      audioRef.current.removeEventListener("timeupdate", handleTimeUpdate);
    };
  }, []);

  const handlePlayPause = () => {
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  const handleMute = () => {
    if (isMuted) {
      audioRef.current.volume = volume;
    } else {
      audioRef.current.volume = 0;
    }
    setIsMuted(!isMuted);
  };

  const handleVolumeChange = (e) => {
    const volumeLevel = parseFloat(e.target.value);
    setVolume(volumeLevel);
    audioRef.current.volume = volumeLevel;
    if (volumeLevel > 0 && isMuted) {
      setIsMuted(false);
    }
  };

  const handleSeek = (e) => {
    const seekTime = parseFloat(e.target.value);
    audioRef.current.currentTime = seekTime;
    setCurrentTime(seekTime);
  };

  const handleEnded = () => {
    setIsPlaying(false);
    audioRef.current.currentTime = 0;
    audioRef.current.pause();
    audioRef.current.load();
    audioRef.current.play();
    setIsPlaying(true);
    
  };

  const handleReload = () => {
    setIsPlaying(false);
    audioRef.current.load();
    audioRef.current.play();
    setIsPlaying(true);
  };

  return (
    <div className="audio-bar">
      <audio ref={audioRef} onEnded={handleEnded}></audio>
      <div className="controls">
        <button onClick={handleReload}>
          <FaSyncAlt />
        </button>
        <button onClick={handlePlayPause}>
          {isPlaying ? <FaPause /> : <FaPlay />}
        </button>
        <div className="volume">
          <button onClick={handleMute}>
            {isMuted ? <FaVolumeMute /> : <FaVolumeUp />}
          </button>
          <input
            type="range"
            min={0}
            max={1}
            step={0.01}
            value={volume}
            onChange={handleVolumeChange}
          />
        </div>
      </div>
      <div className="progress">
        <span>{Math.floor(currentTime)}</span>
        <input
          type="range"
          min={0}
          max={duration}
          step={1}
          value={currentTime}
          onChange={handleSeek}
        />
        <span>{Math.floor(duration)}</span>
      </div>
    </div>
  );
};

export default AudioBar;
