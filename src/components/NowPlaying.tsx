'use client';
import { useStreamCompanion } from '@/hooks/useStreamCompanion';

export const NowPlaying = () => {
    const { data, status } = useStreamCompanion();
// LOGIC 3 STATE
  const isDisconnected = status === 'disconnected' || status === 'connecting';
  
  const isIdle = status === 'connected' && (!data?.status || data.status === "Null" || data.status === "");
  
  const isActive = status === 'connected' && !isIdle;

  return (
    <div className="relative w-[350px] h-[100px] bg-[#14141e]/85 border-l-4 border-[#00E5FF] border-r-4 border-[#ff66aa] rounded-lg shadow-[0_0_10px_rgba(0,229,255,0.3)] overflow-hidden transition-all duration-500 flex flex-col justify-center">
      
      {/* --- STATE 1: DISCONNECTED --- */}
      {isDisconnected && (
        <div className="flex flex-col items-center justify-center h-full w-full opacity-60 animate-in fade-in duration-500">
          <div className="text-[#ff4444] font-bold text-sm tracking-widest uppercase mb-1 flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-[#ff4444] animate-pulse shadow-[0_0_5px_#ff4444]"></div>
            Offline
          </div>
          <div className="text-gray-400 text-[11px] font-semibold text-center px-4">
            StreamCompanion Offline.
          </div>
        </div>
      )}

      {/* --- STATE 2: IDLE --- */}
      {isIdle && (
        <div className="flex flex-col items-center justify-center h-full w-full opacity-60 animate-in fade-in duration-500">
          <div className="text-[#00E5FF] font-bold text-sm tracking-widest uppercase mb-1 flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-[#00E5FF] animate-pulse shadow-[0_0_5px_#00E5FF]"></div>
            Idle
          </div>
          <div className="text-gray-400 text-[11px] font-semibold text-center px-4">
            Waiting for osu!... <br /> Open the game or play a beatmap.
          </div>
        </div>
      )}

      {/* --- STATE 3: ACTIVE (NORMAL UI) --- */}
      {isActive && (
        <div className="h-full w-full animate-in fade-in duration-500">
          {/* Background Image Layer */}
          <div 
            className="absolute top-0 left-0 w-full h-full bg-cover bg-center opacity-35 blur-[1px] transition-all duration-500 z-0"
            style={{ 
              backgroundImage: data?.titleRoman 
                ? `url(http://localhost:20727/backgroundImage?t=${Date.now()})` 
                : 'none' 
            }}
          />
          
          {/* Content Layer */}
          <div className="relative z-10 px-[15px] flex flex-col justify-center h-full">
            <div className="text-[12px] text-[#00E5FF] font-bold uppercase tracking-[1px] mb-[2px] flex items-center gap-[5px] drop-shadow-[0_1px_3px_rgba(0,0,0,0.8)]">
              <div className="w-[8px] h-[8px] rounded-full animate-[pulse_1s_infinite] shadow-[0_0_5px_#ff66aa] bg-[#ff66aa]" />
              NOW PLAYING 
              <span className="text-[#ddd] text-[10px] ml-[5px]">
                ({data?.status || 'Active'})
              </span>
            </div>
            
            <div className="text-[19px] font-[800] text-white whitespace-nowrap overflow-hidden text-ellipsis drop-shadow-[1px_1px_4px_rgba(0,0,0,0.9)]">
              {data?.titleRoman || "Unknown Title"}
            </div>
            <div className="text-[13px] text-[#ddd] whitespace-nowrap overflow-hidden text-ellipsis drop-shadow-[1px_1px_3px_rgba(0,0,0,0.9)]">
              {data?.artistRoman || "Unknown Artist"}
            </div>
            
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
      )}
    </div>
  );
};