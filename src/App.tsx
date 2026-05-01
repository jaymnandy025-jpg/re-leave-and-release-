import React, { useState } from 'react';
import { MusicProvider } from './context/MusicContext';
import { Shell } from './components/layout/Shell';
import { Discover } from './pages/Discover';
import { UploadForm } from './components/music/UploadForm';
import { Toaster } from '@/components/ui/sonner';

function App() {
  const [activeView, setActiveView] = useState('discover');

  return (
    <MusicProvider>
      <div className="min-h-screen bg-background text-foreground font-sans antialiased">
        <Shell activeView={activeView} onViewChange={setActiveView}>
          {activeView === 'discover' && <Discover />}
          {activeView === 'upload' && <UploadForm />}
          {activeView === 'explore' && (
            <div className="p-12 text-center">
              <h2 className="text-2xl font-bold">Explore coming soon...</h2>
            </div>
          )}
          {activeView === 'library' && (
            <div className="p-12 text-center">
              <h2 className="text-2xl font-bold">Your library is empty.</h2>
              <p className="text-muted-foreground mt-2">Like some tracks to see them here!</p>
            </div>
          )}
        </Shell>
        <Toaster position="top-center" expand={true} richColors />
      </div>
    </MusicProvider>
  );
}

export default App;