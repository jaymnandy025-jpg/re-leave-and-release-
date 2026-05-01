import React from 'react';
import { SongCard } from '../components/music/SongCard';
import { Track } from '../types/music';
import { motion } from 'framer-motion';
import { Play, TrendingUp, Sparkles, Clock } from 'lucide-react';

const MOCK_TRACKS: Track[] = [
  {
    id: '1',
    title: 'Neon Dreams',
    artist: 'Lofi Girl',
    coverUrl: 'https://storage.googleapis.com/dala-prod-public-storage/generated-images/2affc13a-9d4b-4733-8f7e-b79fe366d9c4/album-covers-mosaic-2064469f-1777608689362.webp',
    audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3',
    duration: 372,
    genre: 'Lofi'
  },
  {
    id: '2',
    title: 'Cyberpunk City',
    artist: 'SynthWave Master',
    coverUrl: 'https://storage.googleapis.com/dala-prod-public-storage/generated-images/2affc13a-9d4b-4733-8f7e-b79fe366d9c4/artist-placeholder-37b4cb81-1777608690801.webp',
    audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3',
    duration: 420,
    genre: 'Synthwave'
  },
  {
    id: '3',
    title: 'Morning Dew',
    artist: 'Acoustic Vibes',
    coverUrl: 'https://storage.googleapis.com/dala-prod-public-storage/generated-images/2affc13a-9d4b-4733-8f7e-b79fe366d9c4/hero-bg-3461d137-1777608689906.webp',
    audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3',
    duration: 250,
    genre: 'Acoustic'
  },
  {
    id: '4',
    title: 'Deep House Flow',
    artist: 'Club King',
    coverUrl: 'https://storage.googleapis.com/dala-prod-public-storage/generated-images/2affc13a-9d4b-4733-8f7e-b79fe366d9c4/album-covers-mosaic-2064469f-1777608689362.webp',
    audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3',
    duration: 480,
    genre: 'House'
  },
  {
    id: '5',
    title: 'Midnight Jazz',
    artist: 'Smooth Operator',
    coverUrl: 'https://storage.googleapis.com/dala-prod-public-storage/generated-images/2affc13a-9d4b-4733-8f7e-b79fe366d9c4/artist-placeholder-37b4cb81-1777608690801.webp',
    audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3',
    duration: 310,
    genre: 'Jazz'
  },
  {
    id: '6',
    title: 'Ethereal Space',
    artist: 'Ambient Explorer',
    coverUrl: 'https://storage.googleapis.com/dala-prod-public-storage/generated-images/2affc13a-9d4b-4733-8f7e-b79fe366d9c4/hero-bg-3461d137-1777608689906.webp',
    audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-6.mp3',
    duration: 600,
    genre: 'Ambient'
  }
];

export const Discover: React.FC = () => {
  return (
    <div className="space-y-12 py-8 px-8">
      {/* Hero Section */}
      <section className="relative h-80 rounded-3xl overflow-hidden group">
        <img 
          src="https://storage.googleapis.com/dala-prod-public-storage/generated-images/2affc13a-9d4b-4733-8f7e-b79fe366d9c4/hero-bg-3461d137-1777608689906.webp" 
          alt="Hero" 
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent flex flex-col justify-center px-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <span className="text-primary-foreground bg-primary/20 backdrop-blur-md px-3 py-1 rounded-full text-xs font-bold tracking-widest uppercase mb-4 inline-block">Featured Release</span>
            <h1 className="text-5xl font-black text-white mb-4 max-w-xl leading-tight">Unleash Your Creative Sound</h1>
            <p className="text-gray-300 text-lg mb-8 max-w-md">Discover thousands of independent artists and release your own music for free.</p>
            <div className="flex gap-4">
              <button className="bg-primary text-primary-foreground px-8 py-3 rounded-full font-bold flex items-center gap-2 hover:scale-105 transition-transform">
                <Play className="w-5 h-5 fill-current" /> Play Now
              </button>
              <button className="bg-white/10 backdrop-blur-md text-white border border-white/20 px-8 py-3 rounded-full font-bold hover:bg-white/20 transition-all">
                Learn More
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Quick Stats/Links */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          { icon: TrendingUp, label: 'Trending Globally', color: 'text-orange-500' },
          { icon: Sparkles, label: 'New Discoveries', color: 'text-blue-500' },
          { icon: Clock, label: 'Recently Released', color: 'text-purple-500' },
        ].map((item, i) => (
          <motion.div 
            key={item.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 + i * 0.1 }}
            className="bg-card/40 border border-border/40 p-6 rounded-2xl flex items-center gap-4 hover:bg-card/60 transition-colors cursor-pointer"
          >
            <div className={`p-3 rounded-xl bg-background ${item.color}`}>
              <item.icon className="w-6 h-6" />
            </div>
            <span className="font-bold text-lg">{item.label}</span>
          </motion.div>
        ))}
      </div>

      {/* Main Grid */}
      <section>
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-black">Trending Now</h2>
          <button className="text-sm font-semibold text-primary hover:underline">See all</button>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
          {MOCK_TRACKS.map((track, index) => (
            <motion.div
              key={track.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.05 }}
            >
              <SongCard track={track} />
            </motion.div>
          ))}
        </div>
      </section>

      {/* Suggested Artists */}
      <section>
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-black">Top Artists</h2>
          <button className="text-sm font-semibold text-primary hover:underline">See all</button>
        </div>
        <div className="flex gap-8 overflow-x-auto pb-4 no-scrollbar">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} className="flex-shrink-0 flex flex-col items-center gap-3">
              <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-background shadow-xl hover:border-primary transition-all cursor-pointer">
                <img 
                  src={`https://storage.googleapis.com/dala-prod-public-storage/generated-images/2affc13a-9d4b-4733-8f7e-b79fe366d9c4/artist-placeholder-37b4cb81-1777608690801.webp`} 
                  alt="Artist" 
                  className="w-full h-full object-cover"
                />
              </div>
              <span className="font-bold text-sm">Artist {i}</span>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};