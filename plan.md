## Project Plan: SoundFree - Free Music Release & Discovery App

**1. Project Goal:**
Create a modern, intuitive platform where music lovers can discover independent artists and creators can release their music for free.

**2. Core Features (Phase 1):**
*   **Music Discovery:** A sleek dashboard featuring trending tracks, new releases, and curated genres.
*   **Music Player:** A persistent bottom bar with playback controls, progress tracking, and volume management.
*   **Free Release System:** A simple, multi-step form for artists to upload music, add metadata (title, artist, genre), and release it immediately.
*   **Library Management:** Mock library to save "liked" tracks (local state for now).

**3. Visual Design:**
*   **Theme:** Modern dark/light mode support (defaulting to a sleek dark-themed "Studio" look).
*   **Color Palette:** Primary: Deep Blue/Indigo, Accents: Electric Purple/Pink.
*   **Typography:** Sans-serif (Inter/system-ui) for clarity.

**4. Technical Architecture:**
*   **State Management:** React Context API for global audio state.
*   **Animations:** Framer Motion for smooth page transitions and player interactions.
*   **Icons:** Lucide React for consistent UI iconography.
*   **Components:** Modular React components using Shadcn UI primitives.

**5. Implementation Steps:**
1.  **Define Types & Mock Data:** Establish the `Track` and `Artist` interfaces.
2.  **Music Context:** Build the logic for `play`, `pause`, `next`, `previous`, and `activeTrack`.
3.  **Layout Shell:** Create the `Sidebar`, `TopNav`, and `MusicPlayer` wrapper.
4.  **Discovery View:** Build the home screen with hero and grid layouts.
5.  **Release/Upload View:** Implement the artist submission form with validation.
6.  **Integration:** Connect the views and ensure responsive behavior.
