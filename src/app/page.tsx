import { LiveRankCard } from '@/components/LiveRankCard';
import { GoalTracker } from '@/components/GoalTracker';
import { NowPlaying } from '@/components/NowPlaying';
import { PpCounter } from '@/components/PpCounter';
import { SongQueue } from '@/components/SongQueue';

export default function Home() {
  return (
    <main className="relative w-full min-h-screen flex flex-col items-center py-8">

      {/* Container Vertical Split */}
      <div className="flex flex-col gap-5 w-[380px] items-center">

        {/* Widget 1: Live Rank */}
        <div className="w-[310px] relative overflow-hidden rounded-xl border-2 border-cyan-400 shadow-[0_0_15px_rgba(0,229,255,0.4)]">
          {/* SVG Background Layer */}
          <div
            className="absolute inset-0 opacity-20 pointer-events-none"
            style={{ backgroundImage: "url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI4MCIgaGVpZ2h0PSI4MCIgdmlld0JveD0iMCAwIDgwIDgwIj48ZyBmaWxsPSIjZmY2NmFhIiBmaWxsLW9wYWNpdHk9IjAuMDQiPjxwYXRoIGQ9Ik0wIDBINjg0IDBWMDgzIDE2SDAgNEg0SDAgNEgwIDRoNDAgNjhINDAgNjg0IDBWMDgzIDE2SDAgNEg0SDAgNEgwIDRoNDBaIi8+PC9nPjwvc3ZnPg==')" }}
          />
          <div className="relative z-10">
            <LiveRankCard />
          </div>
        </div>

        {/* Widget 2: Goal Tracker */}
        <GoalTracker />

        {/* Widget 3: Real-Time PP Counter */}
        <PpCounter />

        {/* Widget 4: Now Playing StreamCompanion */}
        <NowPlaying />

        {/* Widget 4: Song Queue */}
        <SongQueue />
      
      </div>

    </main>
  );
}