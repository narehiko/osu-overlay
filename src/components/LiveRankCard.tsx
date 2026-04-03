'use client';
import { useOsuData } from '@/hooks/useOsuData';
import { useEffect, useState } from 'react';

export const LiveRankCard = () => {
    const { userData } = useOsuData();
    const [animate, setAnimate] = useState(false);

    useEffect(() => {
        if (userData?.global) {
            setAnimate(true);
            const timer = setTimeout(() => setAnimate(false), 1000);
            return () => clearTimeout(timer);
        }
    }, [userData?.global]);

    if (!userData) return <div className="text-white">Loading Rank...</div>;

    return (
        <div className="flex items-center w-[310px] bg-slate-900/90 border-2 border-cyan-400 rounded-xl p-3 shadow-[0_0_15px_rgba(0,229,255,0.4)]">
            <img
                src={userData.avatar}
                alt="Avatar"
                className="w-20 h-20 rounded-full border-2 border-white shadow-lg mr-4"
            />
            <div className="flex flex-col text-white">
                <span className="text-[12px] font-bold text-gray-400 tracking-widest">GLOBAL</span>
                <div className={`text-3xl font-black leading-none ${animate ? 'animate-[rankUpGlow_1s_ease-out]' : ''}`}>
                    <span className="text-gray-500 text-xl mr-1">#</span>
                    {userData.global.toLocaleString()}
                </div>

                <div className="mt-2 text-[12px] font-bold text-gray-400 tracking-widest uppercase">INDONESIA</div>
                <div className="text-xl font-bold leading-none text-cyan-400">
                    <span className="text-gray-500 text-sm mr-1">#</span>
                    {userData.country.toLocaleString()}
                </div>
            </div>
        </div>
    );
};