import React from 'react';
import { Track } from '../../types/music';
import { Play, MoreVertical, Heart, Plus } from 'lucide-react';
import { useMusic } from '../../context/MusicContext';
import { motion } from 'framer-motion';

interface SongCardProps {
  track: Track;
}

export const SongCard: React.FC<SongCardProps> = ({ track }) => {
  const { activeTrack, status, playTrack } = useMusic();
  const isActive = activeTrack?.id === track.id;
  const isPlaying = isActive && status === 'playing';

  return (
    <motion.div 
      whileHover={{ y: -4 }}
      className="group relative bg-card/40 hover:bg-card/80 p-4 rounded-xl transition-all border border-transparent hover:border-border/50 shadow-sm"
    >
      <div className="relative aspect-square mb-4 overflow-hidden rounded-lg">
        <img 
          src={track.coverUrl} 
          alt={track.title} 
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
          <motion.button 
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => playTrack(track)}
            className="w-12 h-12 bg-primary rounded-full flex items-center justify-center text-primary-foreground shadow-xl"
          >
            {isPlaying ? (
              <div className="flex gap-1 items-end h-4">
                {[0, 1, 2].map(i => (
                  <motion.div 
                    key={i}
                    animate={{ height: [8, 16, 8] }}
                    transition={{ duration: 0.6, repeat: Infinity, delay: i * 0.2 }}
                    className="w-1 bg-current rounded-full"
                  />
                ))}
              </div>
            ) : (
              <Play className="w-6 h-6 fill-current ml-1" />
            )}
          </motion.button>
        </div>
        
        {isActive && (
          <div className="absolute top-2 right-2 px-2 py-1 bg-primary text-[10px] font-bold text-primary-foreground rounded-full shadow-lg">
            {status === 'playing' ? 'PLAYING' : 'PAUSED'}
          </div>
        )}
      </div>
      
      <div className="flex justify-between items-start gap-2">
        <div className="flex-1 min-w-0">
          <h3 className="font-bold text-sm truncate">{track.title}</h3>
          <p className="text-xs text-muted-foreground truncate hover:text-foreground cursor-pointer transition-colors">
            {track.artist}
          </p>
        </div>
        <div className="flex flex-col gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
          <button className="p-1 hover:text-red-500 transition-colors">
            <Heart className="w-4 h-4" />
          </button>
          <button className="p-1 hover:text-primary transition-colors">
            <Plus className="w-4 h-4" />
          </button>
        </div>
      </div>
    </motion.div>
  );
};