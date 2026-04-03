'use client';
import { useStreamCompanion } from '@/hooks/useStreamCompanion';

export const NowPlaying = () => {
    const { data, status } = useStreamCompanion();

    const isVisible = data?.status && data.status !== "Null" && data.status !== "";

    return (
        <div className={`relative w-[350px] h-[100px] bg-[#14141e]/85 border-l-4 border-[#00E5FF] border-r-4 border-[#ff66aa] rounded-lg shadow-[0_0_10px_rgba(0,229,255,0.3)] overflow-hidden transition-all duration-500 flex flex-col justify-center ${isVisible ? 'opacity-100' : 'opacity-0'}`}>

            {/* Background Image Layer from StreamCompanion [cite: 765-778, 889-890] */}
            <div
                className="absolute top-0 left-0 w-full h-full bg-cover bg-center opacity-35 blur-[1px] transition-all duration-500 z-0"
                style={{
                    backgroundImage: data?.titleRoman
                        ? `url(http://localhost:20727/backgroundImage?t=${Date.now()})`
                        : 'none'
                }}
            />

            {/* Content Layer [cite: 779-786] */}
            <div className="relative z-10 px-[15px] flex flex-col justify-center h-full">

                {/* Label NOW PLAYING & Status [cite: 787-797, 860] */}
                <div className="text-[12px] text-[#00E5FF] font-bold uppercase tracking-[1px] mb-[2px] flex items-center gap-[5px] drop-shadow-[0_1px_3px_rgba(0,0,0,0.8)]">
                    <div className={`w-[8px] h-[8px] rounded-full animate-[pulse_1s_infinite] shadow-[0_0_5px_#ff66aa] ${status === 'connected' ? 'bg-[#ff66aa]' : 'bg-[#ff4444]'}`} />
                    NOW PLAYING
                    <span className="text-[#ddd] text-[10px] ml-[5px]">
                        {status === 'connected' ? `(${data?.status || 'Idle'})` : '(Connecting...)'}
                    </span>
                </div>

                {/* Song Title & Artist */}
                <div className="text-[19px] font-[800] text-white whitespace-nowrap overflow-hidden text-ellipsis drop-shadow-[1px_1px_4px_rgba(0,0,0,0.9)]">
                    {data?.titleRoman || "Connecting to SC..."}
                </div>
                <div className="text-[13px] text-[#ddd] whitespace-nowrap overflow-hidden text-ellipsis drop-shadow-[1px_1px_3px_rgba(0,0,0,0.9)]">
                    {data?.artistRoman || "-"}
                </div>

                {/* Diff, Mods, Stars [cite: 824-837, 864-868] */}
                <div className="mt-[4px] text-[12px] text-[#ffcc22] font-bold drop-shadow-[1px_1px_3px_rgba(0,0,0,0.9)]">
                    <span>[{data?.diffName || 'Unknown'}]</span>

                    {data?.mods && data.mods !== "None" && data.mods !== "" && (
                        <span className="text-[#ff66aa] font-[900] mx-[4px] drop-shadow-[0_0_5px_rgba(255,102,170,0.5)]">
                            +{data.mods}
                        </span>
                    )}

                    <span> - ⭐ {Number(data?.mStars || 0).toFixed(2)}</span>
                </div>
            </div>
        </div>
    );
};