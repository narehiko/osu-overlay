'use client';
import { useOsuData } from '@/hooks/useOsuData';
import { useGoalData } from '@/hooks/useGoalData';

export const GoalTracker = () => {
    const { userData } = useOsuData();
    const { goalData } = useGoalData();

    if (!goalData) return <div className="text-white text-sm">Loading Goal Data...</div>;

    const currentRank = userData?.global ?? goalData.start_rank;
    const ranksLeft = currentRank - goalData.live_target;
    const totalGrind = goalData.start_rank - goalData.live_target;
    const currentProgress = goalData.start_rank - currentRank;

    let percent = (currentProgress / totalGrind) * 100;
    percent = Math.min(Math.max(percent, 0), 100);

    return (
        <div className="w-[380px] bg-slate-900/90 border-2 border-pink-500 rounded-lg p-3 shadow-[0_0_10px_rgba(255,102,170,0.3)]">
            <div className="flex justify-between text-[11px] font-black tracking-tighter mb-2 uppercase">
                <span className="text-gray-400">
                    TODAY LIVE TARGET: <span className="text-cyan-400">#{goalData.live_target.toLocaleString()}</span>
                </span>
                <span className="text-pink-500 font-black italic">
                    GOAL: #{goalData.ultimate_goal.toLocaleString()}
                </span>
            </div>

            <div className="w-full h-3 bg-black/50 rounded-full border border-white/10 overflow-hidden relative">
                <div
                    className="h-full bg-gradient-to-r from-pink-500 to-cyan-400 transition-all duration-1000 ease-out shadow-[0_0_10px_#00E5FF]"
                    style={{ width: `${percent}%` }}
                />
            </div>

            <div className="mt-2 text-right transition-colors duration-300">
                <span className={`text-sm font-black italic ${ranksLeft <= 0 ? 'text-green-400 animate-pulse' : 'text-gray-400'}`}>
                    {ranksLeft > 0
                        ? `${ranksLeft.toLocaleString()} RANKS LEFT!`
                        : "🎉 TARGET REACHED! 🎉"}
                </span>
            </div>
        </div>
    );
};