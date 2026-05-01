import React, { createContext, useContext, useState, useCallback, useRef, useEffect } from 'react';
import { Track, PlaybackStatus } from '../types/music';

interface MusicContextType {
  activeTrack: Track | null;
  status: PlaybackStatus;
  currentTime: number;
  duration: number;
  playTrack: (track: Track) => void;
  togglePlay: () => void;
  nextTrack: () => void;
  prevTrack: () => void;
  volume: number;
  setVolume: (v: number) => void;
  seek: (time: number) => void;
  queue: Track[];
  addToQueue: (track: Track) => void;
}

const MusicContext = createContext<MusicContextType | undefined>(undefined);

export const MusicProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [activeTrack, setActiveTrack] = useState<Track | null>(null);
  const [status, setStatus] = useState<PlaybackStatus>('stopped');
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(0.7);
  const [queue, setQueue] = useState<Track[]>([]);
  
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    if (!audioRef.current) {
      audioRef.current = new Audio();
    }

    const audio = audioRef.current;

    const updateProgress = () => setCurrentTime(audio.currentTime);
    const updateDuration = () => setDuration(audio.duration);
    const onEnded = () => nextTrack();

    audio.addEventListener('timeupdate', updateProgress);
    audio.addEventListener('loadedmetadata', updateDuration);
    audio.addEventListener('ended', onEnded);

    return () => {
      audio.removeEventListener('timeupdate', updateProgress);
      audio.removeEventListener('loadedmetadata', updateDuration);
      audio.removeEventListener('ended', onEnded);
    };
  }, []);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
    }
  }, [volume]);

  const playTrack = useCallback((track: Track) => {
    if (audioRef.current) {
      if (activeTrack?.id !== track.id) {
        audioRef.current.src = track.audioUrl;
        setActiveTrack(track);
      }
      audioRef.current.play();
      setStatus('playing');
    }
  }, [activeTrack]);

  const togglePlay = useCallback(() => {
    if (audioRef.current) {
      if (status === 'playing') {
        audioRef.current.pause();
        setStatus('paused');
      } else if (activeTrack) {
        audioRef.current.play();
        setStatus('playing');
      }
    }
  }, [status, activeTrack]);

  const nextTrack = useCallback(() => {
    if (queue.length > 0) {
      const currentIndex = queue.findIndex(t => t.id === activeTrack?.id);
      const nextIndex = (currentIndex + 1) % queue.length;
      playTrack(queue[nextIndex]);
    }
  }, [queue, activeTrack, playTrack]);

  const prevTrack = useCallback(() => {
    if (queue.length > 0) {
      const currentIndex = queue.findIndex(t => t.id === activeTrack?.id);
      const prevIndex = (currentIndex - 1 + queue.length) % queue.length;
      playTrack(queue[prevIndex]);
    }
  }, [queue, activeTrack, playTrack]);

  const seek = useCallback((time: number) => {
    if (audioRef.current) {
      audioRef.current.currentTime = time;
      setCurrentTime(time);
    }
  }, []);

  const addToQueue = useCallback((track: Track) => {
    setQueue(prev => [...prev, track]);
    if (!activeTrack) {
      playTrack(track);
    }
  }, [activeTrack, playTrack]);

  return (
    <MusicContext.Provider value={{
      activeTrack,
      status,
      currentTime,
      duration,
      playTrack,
      togglePlay,
      nextTrack,
      prevTrack,
      volume,
      setVolume,
      seek,
      queue,
      addToQueue
    }}>
      {children}
    </MusicContext.Provider>
  );
};

export const useMusic = () => {
  const context = useContext(MusicContext);
  if (!context) throw new Error('useMusic must be used within MusicProvider');
  return context;
};