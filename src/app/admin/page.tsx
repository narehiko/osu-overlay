'use client';
import { useState, useEffect } from 'react';

export default function AdminPage() {
    const [pin, setPin] = useState('');
    const [isUnlocked, setIsUnlocked] = useState(false);
    const [formData, setFormData] = useState({ start_rank: 0, live_target: 0, ultimate_goal: 0, tiktok_username: '' });
    const [mockId, setMockId] = useState('');

    useEffect(() => {
        if (isUnlocked) {
            fetch('/api/goal')
                .then(res => res.json())
                .then(data => setFormData(data))
                .catch(err => console.error(err));
        }
    }, [isUnlocked]);

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        if (pin === '12345') setIsUnlocked(true);
        else alert('Invalid PIN');
    };

    const updateGoal = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await fetch('/api/goal', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            });
            alert('✅ Stream Goal & Settings Updated!');
        } catch (err) {
            console.error(err);
        }
    };

    const sendMockRequest = async () => {
        if (!mockId) return;
        const mockData = {
            id: mockId,
            requester: "tester_admin",
            title: "Simulation Beatmap",
            artist: "Mock Artist",
            diff: "Insane"
        };
        try {
            const res = await fetch('/api/simulator', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(mockData)
            });
            if (res.ok) {
                setMockId('');
                console.log("✅ Mock request sent via Server!");
            }
        } catch (err) {
            console.error("Failed to send mock request:", err);
        }
    };

    const sendQueueAction = async (actionType: 'NEXT_SONG' | 'CLEAR_QUEUE') => {
        try {
            const res = await fetch('/api/simulator', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ action: actionType })
            });
            if (res.ok) console.log(`✅ Action ${actionType} sent!`);
        } catch (err) {
            console.error("Failed to send queue action:", err);
        }
    };

    // --- Login Form ---
    if (!isUnlocked) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-[#1a1a24] text-white p-4">
                <form onSubmit={handleLogin} className="bg-[#2a2a35] p-6 rounded-xl flex flex-col gap-4 w-[350px] shadow-2xl border border-gray-800">
                    <h2 className="text-center font-black text-xl mb-2 text-cyan-400 tracking-wider">🔒 ADMIN LOGIN</h2>
                    <input
                        type="password"
                        value={pin}
                        onChange={e => setPin(e.target.value)}
                        placeholder="Enter PIN"
                        className="p-3 bg-[#111] rounded border border-gray-700 focus:outline-none focus:border-cyan-400 text-center tracking-[10px] font-black text-xl"
                    />
                    <button type="submit" className="p-3 bg-cyan-500 hover:bg-cyan-400 text-black font-black uppercase tracking-widest rounded transition">
                        Unlock Dashboard
                    </button>
                </form>
            </div>
        );
    }

    // --- Dashboard Content ---
    return (
        <div className="min-h-screen flex items-center justify-center bg-[#1a1a24] text-white p-4">
            <div className="w-full max-w-4xl max-h-[90vh] overflow-y-auto bg-[#1e1e28] p-8 rounded-2xl shadow-[0_0_30px_rgba(0,0,0,0.5)] border border-gray-800 custom-scrollbar">

                {/* Header Dashboard & Logout */}
                <div className="flex flex-col sm:flex-row justify-between items-center mb-8 border-b border-gray-700 pb-4 gap-4">
                    <h1 className="text-2xl md:text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-pink-500 uppercase tracking-[3px]">
                        ⚙️ Command Center
                    </h1>
                    <button
                        onClick={() => setIsUnlocked(false)}
                        className="text-xs bg-red-500/10 text-red-400 border border-red-500/30 hover:bg-red-500 hover:text-white px-5 py-2.5 rounded font-black tracking-widest transition"
                    >
                        🔒 LOGOUT
                    </button>
                </div>

                {/* 2 Columns Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

                    {/* ================= LEFT COLUMN ================= */}
                    <form onSubmit={updateGoal} className="flex flex-col gap-5">
                        <h3 className="text-cyan-400 font-bold uppercase tracking-wider text-sm border-b border-cyan-400/30 pb-2">🎯 Stream Goals</h3>
                        <div>
                            <label className="text-xs text-gray-400 mb-1.5 block font-medium">Start Rank</label>
                            <input type="number" value={formData.start_rank} onChange={e => setFormData({ ...formData, start_rank: parseInt(e.target.value) })} className="w-full p-2.5 bg-[#111] rounded border border-gray-700 focus:border-cyan-400 outline-none text-white font-medium" />
                        </div>
                        <div>
                            <label className="text-xs text-gray-400 mb-1.5 block font-medium">Live Target</label>
                            <input type="number" value={formData.live_target} onChange={e => setFormData({ ...formData, live_target: parseInt(e.target.value) })} className="w-full p-2.5 bg-[#111] rounded border border-gray-700 focus:border-cyan-400 outline-none text-white font-medium" />
                        </div>
                        <div>
                            <label className="text-xs text-gray-400 mb-1.5 block font-medium">Ultimate Goal</label>
                            <input type="number" value={formData.ultimate_goal} onChange={e => setFormData({ ...formData, ultimate_goal: parseInt(e.target.value) })} className="w-full p-2.5 bg-[#111] rounded border border-gray-700 focus:border-cyan-400 outline-none text-white font-medium" />
                        </div>

                        <h3 className="text-pink-400 font-bold uppercase tracking-wider text-sm border-b border-pink-400/30 pb-2 mt-2">📱 TikTok Setup</h3>
                        <div>
                            <label className="text-xs text-gray-400 mb-1.5 block font-medium">TikTok Username</label>
                            <div className="flex">
                                <span className="p-2.5 bg-[#222] rounded-l border border-r-0 border-gray-700 font-bold text-gray-500">@</span>
                                <input type="text" value={formData.tiktok_username} onChange={e => setFormData({ ...formData, tiktok_username: e.target.value })} className="w-full p-2.5 bg-[#111] rounded-r border border-gray-700 focus:border-pink-500 outline-none text-pink-400 font-bold" placeholder="username" />
                            </div>
                        </div>

                        <button type="submit" className="mt-4 p-3.5 bg-gradient-to-r from-cyan-500 to-blue-600 hover:opacity-85 text-white font-black rounded-lg transition uppercase tracking-widest text-sm shadow-[0_0_15px_rgba(0,229,255,0.2)]">
                            Update Goal & Settings
                        </button>
                    </form>

                    {/* ================= RIGHT COLUMN ================= */}
                    <div className="flex flex-col gap-6">

                        {/* Box 1: Simulator */}
                        <div className="bg-[#2a2a35] p-5 rounded-xl border border-yellow-500/30 shadow-lg">
                            <h3 className="text-yellow-500 font-bold text-sm uppercase tracking-wider mb-4 flex items-center gap-2">
                                🛠️ Request Simulator
                            </h3>
                            <input
                                type="text"
                                placeholder="Enter Beatmap ID (e.g., 923245)"
                                value={mockId}
                                onChange={(e) => setMockId(e.target.value)}
                                className="w-full p-2.5 bg-[#111] rounded border border-gray-700 text-sm focus:border-yellow-500 outline-none mb-3 text-white"
                            />
                            <button
                                onClick={sendMockRequest}
                                className="w-full p-2.5 bg-yellow-600 hover:bg-yellow-500 text-black font-black rounded transition text-xs tracking-widest uppercase"
                            >
                                Send Mock Request
                            </button>
                        </div>

                        {/* Box 2: Queue Management */}
                        <div className="bg-[#2a2a35] p-5 rounded-xl border border-red-500/30 shadow-lg">
                            <h3 className="text-red-400 font-bold text-sm uppercase tracking-wider mb-3 flex items-center gap-2">
                                🎛️ Queue Management
                            </h3>
                            <p className="text-[11px] text-gray-400 mb-4 leading-relaxed font-medium">
                                Manually control the stream queue. Send execution signals directly to the overlay without refreshing the page.
                            </p>
                            <div className="flex gap-3">
                                <button
                                    onClick={() => sendQueueAction('NEXT_SONG')}
                                    className="flex-1 p-3 bg-yellow-500 hover:bg-yellow-400 text-black font-black rounded transition text-[11px] tracking-wider flex flex-col items-center justify-center gap-1 shadow-md"
                                >
                                    <span className="text-xl">⏭️</span>
                                    <span>NEXT SONG</span>
                                </button>
                                <button
                                    onClick={() => sendQueueAction('CLEAR_QUEUE')}
                                    className="flex-1 p-3 bg-red-600 hover:bg-red-500 text-white font-black rounded transition text-[11px] tracking-wider flex flex-col items-center justify-center gap-1 shadow-md"
                                >
                                    <span className="text-xl">🗑️</span>
                                    <span>CLEAR ALL</span>
                                </button>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
}