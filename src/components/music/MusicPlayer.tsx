import React from 'react';
import { useMusic } from '../../context/MusicContext';
import { 
  Play, 
  Pause, 
  SkipBack, 
  SkipForward, 
  Volume2, 
  Repeat, 
  Shuffle, 
  Maximize2,
  Heart
} from 'lucide-react';
import { Slider } from '@/components/ui/slider';
import { Button } from '@/components/ui/button';
import { motion, AnimatePresence } from 'framer-motion';

export const MusicPlayer: React.FC = () => {
  const { 
    activeTrack, 
    status, 
    togglePlay, 
    currentTime, 
    duration, 
    seek, 
    volume, 
    setVolume,
    nextTrack,
    prevTrack
  } = useMusic();

  const formatTime = (time: number) => {
    const mins = Math.floor(time / 60);
    const secs = Math.floor(time % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  if (!activeTrack) return null;

  return (
    <motion.div 
      initial={{ y: 100 }}
      animate={{ y: 0 }}
      className="fixed bottom-0 left-0 right-0 h-24 bg-card/95 backdrop-blur-2xl border-t border-border/40 px-6 flex items-center justify-between z-50"
    >
      {/* Track Info */}
      <div className="flex items-center gap-4 w-1/4">
        <div className="relative group">
          <img 
            src={activeTrack.coverUrl} 
            alt={activeTrack.title} 
            className="w-14 h-14 rounded-md object-cover shadow-lg"
          />
          <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity rounded-md flex items-center justify-center">
            <Maximize2 className="w-4 h-4 text-white" />
          </div>
        </div>
        <div className="flex flex-col">
          <h4 className="font-semibold text-sm line-clamp-1">{activeTrack.title}</h4>
          <p className="text-xs text-muted-foreground line-clamp-1">{activeTrack.artist}</p>
        </div>
        <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-red-500">
          <Heart className="w-4 h-4" />
        </Button>
      </div>

      {/* Controls */}
      <div className="flex flex-col items-center gap-2 flex-1 max-w-2xl">
        <div className="flex items-center gap-6">
          <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-foreground">
            <Shuffle className="w-4 h-4" />
          </Button>
          <Button variant="ghost" size="icon" onClick={prevTrack}>
            <SkipBack className="w-5 h-5 fill-current" />
          </Button>
          <Button 
            size="icon" 
            className="w-10 h-10 rounded-full bg-foreground text-background hover:scale-105 transition-transform"
            onClick={togglePlay}
          >
            {status === 'playing' ? <Pause className="w-5 h-5 fill-current" /> : <Play className="w-5 h-5 fill-current ml-1" />}
          </Button>
          <Button variant="ghost" size="icon" onClick={nextTrack}>
            <SkipForward className="w-5 h-5 fill-current" />
          </Button>
          <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-foreground">
            <Repeat className="w-4 h-4" />
          </Button>
        </div>
        
        <div className="flex items-center gap-3 w-full max-w-md">
          <span className="text-[10px] text-muted-foreground font-medium tabular-nums w-8">
            {formatTime(currentTime)}
          </span>
          <Slider 
            value={[currentTime]} 
            max={duration || 100} 
            step={1}
            onValueChange={(vals) => seek(vals[0])}
            className="flex-1 cursor-pointer"
          />
          <span className="text-[10px] text-muted-foreground font-medium tabular-nums w-8">
            {formatTime(duration)}
          </span>
        </div>
      </div>

      {/* Volume & Misc */}
      <div className="flex items-center justify-end gap-4 w-1/4">
        <div className="flex items-center gap-2 w-32">
          <Volume2 className="w-4 h-4 text-muted-foreground" />
          <Slider 
            value={[volume * 100]} 
            max={100} 
            onValueChange={(vals) => setVolume(vals[0] / 100)}
            className="w-24"
          />
        </div>
      </div>
    </motion.div>
  );
};