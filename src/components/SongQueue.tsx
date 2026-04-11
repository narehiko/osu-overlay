'use client';
import { useSongQueue } from '@/hooks/useSongQueue';

export const SongQueue = () => {
    const { queue } = useSongQueue();

    const displayedQueue = queue.slice(0, 3);
    const remainingCount = Math.max(0, queue.length - 3);

    return (
        <div className={`w-[350px] transition-all duration-500 rounded-lg overflow-hidden flex flex-col p-4 
      ${queue.length > 0
                ? 'bg-[#0f0f15]/95 border-2 border-pink-500 shadow-[0_0_20px_rgba(255,102,170,0.4)]'
                : 'bg-[#0f0f15]/70 border-2 border-dashed border-gray-600'
            }`}>

            {/* Header dengan kontras lebih tinggi */}
            <div className="flex flex-col border-b border-gray-700 pb-2 mb-2">
                <div className="flex justify-between items-center">
                    <span className={`text-[13px] font-black uppercase tracking-[2px] ${queue.length > 0 ? 'text-pink-500' : 'text-gray-300'}`}>
                        🎧 Song Request
                    </span>
                    {queue.length > 0 && (
                        <span className="text-black bg-cyan-400 px-2 py-0.5 rounded font-black text-[10px]">
                            {queue.length} QUEUE
                        </span>
                    )}
                </div>

                {/* Instruksi & Example dengan warna yang lebih 'Jreng' */}
                <div className="mt-2 flex flex-col gap-1">
                    <div className="text-[11px] text-white font-bold leading-tight">
                        Type <span className="text-cyan-400">!req [ID]</span> to add a song
                    </div>
                    <div className="text-[10px] text-yellow-400 font-medium italic">
                        Example: <span className="underline">!req 923245</span>
                    </div>
                </div>
            </div>

            {/* Konten Antrean */}
            {queue.length > 0 ? (
                <div className="flex flex-col gap-2">
                    {displayedQueue.map((song, index) => (
                        <div
                            key={`${song.id}-${index}`}
                            className={`relative p-3 rounded border-l-4 ${index === 0 ? 'border-cyan-400 bg-cyan-400/10' : 'border-gray-500 bg-white/5'}`}
                        >
                            <div className="text-[10px] text-gray-400 font-bold uppercase mb-1">
                                From: <span className="text-cyan-300">@{song.requester}</span>
                            </div>
                            <div className="text-[15px] font-black text-white truncate leading-none mb-1">
                                {song.title}
                            </div>
                            <div className="text-[12px] text-gray-300 font-semibold truncate">
                                {song.artist} <span className="text-yellow-400">[{song.diff}]</span>
                            </div>
                        </div>
                    ))}

                    {remainingCount > 0 && (
                        <div className="mt-1 text-center text-[11px] text-pink-400 font-black animate-pulse">
                            + {remainingCount} MORE IN QUEUE
                        </div>
                    )}
                </div>
            ) : (
                <div className="py-4 text-center">
                    <p className="text-[11px] text-gray-500 font-bold uppercase tracking-widest">
                        Queue is empty...
                    </p>
                </div>
            )}
        </div>
    );
};