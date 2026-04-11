'use client';
import { useSongQueue } from '@/hooks/useSongQueue';

export const SongQueue = () => {
    const { queue } = useSongQueue();

    const displayedQueue = queue.slice(0, 3);
    const remainingCount = Math.max(0, queue.length - 3);

    if (queue.length === 0) return null;

    return (
        <div className="w-[350px] bg-[#14141e]/85 border-2 border-pink-500 rounded-lg shadow-[0_0_15px_rgba(255,102,170,0.3)] overflow-hidden flex flex-col p-3 transition-all duration-500">
            <div className="text-[12px] text-pink-500 font-bold uppercase tracking-[2px] mb-2 flex justify-between items-center drop-shadow-[0_0_5px_rgba(255,102,170,0.6)]">
                <span>🎧 Song Request Queue</span>
                <span className="text-cyan-400 bg-cyan-400/20 px-2 py-0.5 rounded-full text-[10px]">
                    {queue.length} Total
                </span>
            </div>

            <div className="flex flex-col gap-2">
                {displayedQueue.map((song, index) => (
                    <div
                        key={`${song.id}-${index}`}
                        className={`relative p-2 rounded-md border-l-4 ${index === 0 ? 'border-cyan-400 bg-cyan-400/10' : 'border-gray-600 bg-black/40'}`}
                    >
                        <div className="text-[10px] text-gray-400 uppercase tracking-wider mb-1">
                            Req by: <span className="text-white font-bold">@{song.requester}</span>
                        </div>
                        <div className="text-[14px] font-black text-white whitespace-nowrap overflow-hidden text-ellipsis leading-tight drop-shadow-md">
                            {song.title}
                        </div>
                        <div className="text-[11px] text-gray-300 font-medium whitespace-nowrap overflow-hidden text-ellipsis">
                            {song.artist} <span className="text-yellow-400">[{song.diff}]</span>
                        </div>
                    </div>
                ))}
            </div>

            {remainingCount > 0 && (
                <div className="mt-2 text-center text-[10px] text-gray-400 font-bold italic animate-pulse">
                    + {remainingCount} more song(s) in queue...
                </div>
            )}
        </div>
    );
};