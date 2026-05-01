import React from 'react';
import { Sidebar, SidebarContent, SidebarHeader, SidebarMenu, SidebarMenuItem, SidebarMenuButton, SidebarProvider } from '@/components/ui/sidebar';
import { MusicPlayer } from '../music/MusicPlayer';
import { Home, Compass, Library, UploadCloud, Search, ListMusic } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ShellProps {
  children: React.ReactNode;
  activeView: string;
  onViewChange: (view: string) => void;
}

export const Shell: React.FC<ShellProps> = ({ children, activeView, onViewChange }) => {
  return (
    <SidebarProvider>
      <div className="flex h-screen w-full bg-background overflow-hidden">
        <Sidebar className="border-r border-border/40 bg-card/50 backdrop-blur-xl">
          <SidebarHeader className="p-6">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
                <img 
                  src="https://storage.googleapis.com/dala-prod-public-storage/generated-images/2affc13a-9d4b-4733-8f7e-b79fe366d9c4/app-logo-dbda9a3a-1777608689299.webp" 
                  alt="Logo" 
                  className="w-full h-full object-cover rounded-lg"
                />
              </div>
              <span className="text-xl font-bold tracking-tight">SoundFree</span>
            </div>
          </SidebarHeader>
          <SidebarContent className="px-3">
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton 
                  isActive={activeView === 'discover'} 
                  onClick={() => onViewChange('discover')}
                  className={cn("transition-all duration-200", activeView === 'discover' && "bg-primary/10 text-primary")}
                >
                  <Home className="w-5 h-5" />
                  <span className="font-medium">Home</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton 
                  isActive={activeView === 'explore'} 
                  onClick={() => onViewChange('explore')}
                  className={cn("transition-all duration-200", activeView === 'explore' && "bg-primary/10 text-primary")}
                >
                  <Compass className="w-5 h-5" />
                  <span className="font-medium">Explore</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton 
                  isActive={activeView === 'library'} 
                  onClick={() => onViewChange('library')}
                  className={cn("transition-all duration-200", activeView === 'library' && "bg-primary/10 text-primary")}
                >
                  <Library className="w-5 h-5" />
                  <span className="font-medium">Your Library</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>

            <div className="mt-8 px-3">
              <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-4 px-2">Artist Studio</h3>
              <SidebarMenu>
                <SidebarMenuItem>
                  <SidebarMenuButton 
                    isActive={activeView === 'upload'} 
                    onClick={() => onViewChange('upload')}
                    className={cn("bg-primary text-primary-foreground hover:bg-primary/90 shadow-md", activeView === 'upload' && "ring-2 ring-primary ring-offset-2 ring-offset-background")}
                  >
                    <UploadCloud className="w-5 h-5" />
                    <span className="font-semibold text-white">Release Music</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </SidebarMenu>
            </div>

            <div className="mt-8 px-3">
              <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-4 px-2">Playlists</h3>
              <SidebarMenu>
                {['Relaxing Beats', 'Driving Fast', 'Code Mode', 'Indie Gems'].map((playlist) => (
                  <SidebarMenuItem key={playlist}>
                    <SidebarMenuButton className="group">
                      <ListMusic className="w-4 h-4 text-muted-foreground group-hover:text-foreground" />
                      <span className="text-sm">{playlist}</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </div>
          </SidebarContent>
        </Sidebar>

        <main className="flex-1 flex flex-col relative overflow-hidden">
          <header className="h-16 border-b border-border/40 flex items-center justify-between px-8 bg-background/80 backdrop-blur-md sticky top-0 z-10">
            <div className="flex-1 max-w-xl">
              <div className="relative group">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
                <input 
                  type="text" 
                  placeholder="Search for tracks, artists, or genres..." 
                  className="w-full bg-muted/50 border-transparent focus:bg-background focus:border-primary/20 rounded-full py-2 pl-10 pr-4 text-sm transition-all outline-none"
                />
              </div>
            </div>
            <div className="flex items-center gap-4">
              <button className="text-sm font-medium hover:text-primary transition-colors">Sign In</button>
              <button className="bg-foreground text-background px-4 py-2 rounded-full text-sm font-semibold hover:opacity-90 transition-opacity">Get Started</button>
            </div>
          </header>

          <div className="flex-1 overflow-y-auto pb-32">
            {children}
          </div>

          <MusicPlayer />
        </main>
      </div>
    </SidebarProvider>
  );
};