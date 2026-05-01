export interface Track {
  id: string;
  title: string;
  artist: string;
  coverUrl: string;
  audioUrl: string;
  duration: number;
  genre: string;
}

export type PlaybackStatus = 'playing' | 'paused' | 'stopped';