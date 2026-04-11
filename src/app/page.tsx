'use client';
import { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { LiveRankCard } from '@/components/LiveRankCard';
import { GoalTracker } from '@/components/GoalTracker';
import { NowPlaying } from '@/components/NowPlaying';
import { PpCounter } from '@/components/PpCounter';
import { SongQueue } from '@/components/SongQueue';

function OverlayContent() {
  const searchParams = useSearchParams();
  const overlayType = searchParams.get('overlay');

  const showAll = !overlayType;

  return (
    <main className="relative w-full min-h-screen flex flex-col items-center py-4 bg-transparent">
      <div className="flex flex-col gap-5 w-[380px] items-center">

        {/* Widget 1: Live Rank (Rank & Stats) */}
        {(showAll || overlayType === 'rank') && (
          <div className="w-[310px] relative overflow-hidden rounded-xl border-2 border-cyan-400 shadow-[0_0_15px_rgba(0,229,255,0.4)] bg-[#14141e]/85">
            <LiveRankCard />
          </div>
        )}

        {/* Widget 2: Goal Tracker */}
        {(showAll || overlayType === 'goal') && (
          <GoalTracker />
        )}

        {/* Widget 3: Real-Time PP Counter */}
        {(showAll || overlayType === 'rank' || overlayType === 'pp') && (
          <PpCounter />
        )}

        {/* Widget 4: Song Request Queue */}
        {(showAll || overlayType === 'queue') && (
          <SongQueue />
        )}

        {/* Widget 5: Now Playing */}
        {(showAll || overlayType === 'nowplaying') && (
          <NowPlaying />
        )}

      </div>
    </main>
  );
}

export default function Home() {
  return (
    <Suspense fallback={<div className="text-white text-xs p-4">Loading Overlay...</div>}>
      <OverlayContent />
    </Suspense>
  );
}