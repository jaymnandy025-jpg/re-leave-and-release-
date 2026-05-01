import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Upload, Music, Image as ImageIcon, CheckCircle2, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { toast } from 'sonner';

export const UploadForm: React.FC = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    title: '',
    artist: '',
    genre: '',
    description: '',
    audioFile: null as File | null,
    coverArt: null as File | null,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title || !formData.audioFile) {
      toast.error('Please fill in all required fields');
      return;
    }
    
    // Simulate upload
    const uploadPromise = new Promise(resolve => setTimeout(resolve, 2000));
    
    toast.promise(uploadPromise, {
      loading: 'Uploading track...',
      success: 'Track released successfully!',
      error: 'Failed to upload track',
    });

    try {
      await uploadPromise;
      setStep(3);
    } catch (error) {
      // toast.promise handles the error message
    }
  };

  return (
    <div className="max-w-2xl mx-auto py-12 px-6">
      <div className="mb-10 text-center">
        <h1 className="text-4xl font-black mb-4 bg-gradient-to-r from-primary via-purple-500 to-pink-500 bg-clip-text text-transparent">
          Release Your Music
        </h1>
        <p className="text-muted-foreground">Share your sound with the world for free.</p>
      </div>

      <div className="flex items-center justify-center gap-4 mb-12">
        {[1, 2, 3].map(i => (
          <div key={i} className="flex items-center">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-colors ${
              step >= i ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'
            }`}>
              {i === 3 && step === 3 ? <CheckCircle2 className="w-4 h-4" /> : i}
            </div>
            {i < 3 && <div className={`w-12 h-0.5 ${step > i ? 'bg-primary' : 'bg-muted'}`} />}
          </div>
        ))}
      </div>

      <AnimatePresence mode="wait">
        {step === 1 && (
          <motion.div 
            key="step1"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-6"
          >
            <div className="grid grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label>Track Title *</Label>
                <Input 
                  placeholder="Enter track name" 
                  value={formData.title}
                  onChange={e => setFormData({...formData, title: e.target.value})}
                />
              </div>
              <div className="space-y-2">
                <Label>Artist Name *</Label>
                <Input 
                  placeholder="Artist name" 
                  value={formData.artist}
                  onChange={e => setFormData({...formData, artist: e.target.value})}
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <Label>Genre</Label>
              <select 
                className="w-full bg-background border border-input rounded-md px-3 py-2 text-sm"
                value={formData.genre}
                onChange={e => setFormData({...formData, genre: e.target.value})}
              >
                <option value="">Select Genre</option>
                <option value="electronic">Electronic</option>
                <option value="hip-hop">Hip Hop</option>
                <option value="rock">Rock</option>
                <option value="lofi">Lofi</option>
                <option value="indie">Indie</option>
              </select>
            </div>

            <div className="space-y-2">
              <Label>Description</Label>
              <Textarea 
                placeholder="Tell listeners about this track..." 
                className="h-24"
                value={formData.description}
                onChange={e => setFormData({...formData, description: e.target.value})}
              />
            </div>

            <Button className="w-full" onClick={() => setStep(2)}>Continue to Files</Button>
          </motion.div>
        )}

        {step === 2 && (
          <motion.div 
            key="step2"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-8"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-4">
                <Label>Audio File (.mp3, .wav) *</Label>
                <div className="border-2 border-dashed border-border rounded-xl p-8 flex flex-col items-center justify-center text-center hover:border-primary/50 transition-colors cursor-pointer relative group">
                  <input 
                    type="file" 
                    accept="audio/*" 
                    className="absolute inset-0 opacity-0 cursor-pointer"
                    onChange={e => setFormData({...formData, audioFile: e.target.files?.[0] || null})}
                  />
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                    <Music className="w-6 h-6 text-primary" />
                  </div>
                  <p className="text-sm font-medium">{formData.audioFile ? formData.audioFile.name : 'Click to upload audio'}</p>
                  <p className="text-xs text-muted-foreground mt-1">High quality files preferred</p>
                </div>
              </div>

              <div className="space-y-4">
                <Label>Cover Art</Label>
                <div className="border-2 border-dashed border-border rounded-xl p-8 flex flex-col items-center justify-center text-center hover:border-primary/50 transition-colors cursor-pointer relative group">
                  <input 
                    type="file" 
                    accept="image/*" 
                    className="absolute inset-0 opacity-0 cursor-pointer"
                    onChange={e => setFormData({...formData, coverArt: e.target.files?.[0] || null})}
                  />
                  <div className="w-12 h-12 bg-secondary/10 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                    <ImageIcon className="w-6 h-6 text-secondary-foreground" />
                  </div>
                  <p className="text-sm font-medium">{formData.coverArt ? formData.coverArt.name : 'Click to upload art'}</p>
                  <p className="text-xs text-muted-foreground mt-1">1:1 ratio recommended</p>
                </div>
              </div>
            </div>

            <div className="flex gap-4">
              <Button variant="outline" className="flex-1" onClick={() => setStep(1)}>Back</Button>
              <Button className="flex-1" onClick={handleSubmit}>Release Track</Button>
            </div>
          </motion.div>
        )}

        {step === 3 && (
          <motion.div 
            key="step3"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="text-center py-12"
          >
            <div className="w-20 h-20 bg-green-500/10 text-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle2 className="w-10 h-10" />
            </div>
            <h2 className="text-2xl font-bold mb-2">Track Released!</h2>
            <p className="text-muted-foreground mb-8">Your music is now live on SoundFree for everyone to hear.</p>
            <div className="flex gap-4 justify-center">
              <Button variant="outline" onClick={() => {
                setStep(1);
                setFormData({
                  title: '',
                  artist: '',
                  genre: '',
                  description: '',
                  audioFile: null,
                  coverArt: null,
                });
              }}>Release Another</Button>
              <Button>Go to Track</Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};