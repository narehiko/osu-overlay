'use client';
import { useStreamCompanion } from '@/hooks/useStreamCompanion';

export const PpCounter = () => {
    const { data, status } = useStreamCompanion();

    const isDisconnected = status === 'disconnected' || status === 'connecting';
    const isIdle = status === 'connected' && (!data?.status || data.status === "Null" || data.status === "");
    const isActive = status === 'connected' && !isIdle;

    const livePp = Math.round(data?.livePp || 0);
    const maxPp = Math.round(data?.mSimulatedPp || 0);

    return (
        <div className="relative w-[350px] h-[90px] bg-[#14141e]/85 border-l-4 border-r-4 border-cyan-400 rounded-lg shadow-[0_0_15px_rgba(0,229,255,0.2)] overflow-hidden transition-all duration-500 flex flex-col justify-center items-center">

            <div className="text-[11px] text-gray-400 font-bold tracking-[3px] uppercase mb-1">
                Live Performance
            </div>

            <div className="flex items-baseline gap-2">
                <span
                    className={`text-5xl font-black tracking-tighter transition-colors duration-300 ${isActive ? 'text-white drop-shadow-[0_0_12px_#00E5FF]' : 'text-gray-600'
                        }`}
                >
                    {isActive ? livePp : 0}
                </span>
                <span className={`text-xl font-bold transition-colors duration-300 ${isActive ? 'text-cyan-400' : 'text-gray-600'}`}>
                    pp
                </span>
            </div>

            <div
                className={`mt-1 text-[12px] font-extrabold tracking-wide transition-colors duration-300 ${isActive ? 'text-pink-500 drop-shadow-[0_0_5px_rgba(255,102,170,0.6)]' : 'text-gray-600'
                    }`}
            >
                SS: {isActive ? maxPp : 0} pp
            </div>
        </div>
    );
};