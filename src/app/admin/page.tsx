'use client';
import { useState, useEffect } from 'react';

export default function AdminPage() {
    const [isUnlocked, setIsUnlocked] = useState(false);
    const [pin, setPin] = useState('');
    const [msg, setMsg] = useState('');
    const [formData, setFormData] = useState({ start_rank: 0, live_target: 0, ultimate_goal: 0 });

    const SECRET_PIN = "225";

    useEffect(() => {
        if (isUnlocked) {
            fetch('/api/goal')
                .then(res => res.json())
                .then(data => setFormData(data));
        }
    }, [isUnlocked]);

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        if (pin === SECRET_PIN) {
            setIsUnlocked(true);
            setMsg("✅ Successfully logged in! Let's grind.");
        } else {
            setMsg("❌ Incorrect PIN! Nice try.");
            setPin('');
        }
    };

    const handleUpdate = async (e: React.FormEvent) => {
        e.preventDefault();
        const res = await fetch('/api/goal', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(formData)
        });
        const result = await res.json();
        setMsg(result.success ? "✅ Awesome! Target updated." : "❌ Failed to save data.");
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-[#1a1a24] text-white font-sans p-4">
            <div className="bg-[#2a2a35] p-8 rounded-xl shadow-[0_10px_30px_rgba(0,0,0,0.5)] border-t-4 border-pink-500 w-[350px]">
                <h2 className="text-2xl font-bold text-center text-pink-500 mb-4">🎮 Stream Goal Panel</h2>

                {msg && (
                    <div className={`text-center font-bold mb-4 text-sm ${msg.includes('✅') ? 'text-green-400' : 'text-pink-500'}`}>
                        {msg}
                    </div>
                )}

                {!isUnlocked ? (
                    <form onSubmit={handleLogin} className="flex flex-col gap-4">
                        <label className="text-sm text-gray-400 text-center">Enter Secret PIN</label>
                        <input
                            type="password"
                            value={pin}
                            onChange={(e) => setPin(e.target.value)}
                            className="p-3 bg-[#111] border border-gray-700 rounded text-cyan-400 text-center tracking-widest font-bold focus:outline-none focus:border-cyan-400"
                            placeholder="***"
                            required
                        />
                        <button type="submit" className="p-3 bg-gradient-to-r from-pink-500 to-cyan-400 rounded font-bold hover:opacity-80 transition">
                            Unlock Dashboard
                        </button>
                    </form>
                ) : (
                    <form onSubmit={handleUpdate} className="flex flex-col gap-4">
                        <div>
                            <label className="text-sm text-gray-400">Start Rank (On Stream Start)</label>
                            <input
                                type="number"
                                value={formData.start_rank}
                                onChange={(e) => setFormData({ ...formData, start_rank: parseInt(e.target.value) })}
                                className="w-full p-2 mt-1 bg-[#111] border border-gray-700 rounded text-cyan-400 font-bold focus:outline-none focus:border-cyan-400"
                                required
                            />
                        </div>
                        <div>
                            <label className="text-sm text-gray-400">Today Live Target</label>
                            <input
                                type="number"
                                value={formData.live_target}
                                onChange={(e) => setFormData({ ...formData, live_target: parseInt(e.target.value) })}
                                className="w-full p-2 mt-1 bg-[#111] border border-gray-700 rounded text-cyan-400 font-bold focus:outline-none focus:border-cyan-400"
                                required
                            />
                        </div>
                        <div>
                            <label className="text-sm text-gray-400">Ultimate Goal (Dream Rank)</label>
                            <input
                                type="number"
                                value={formData.ultimate_goal}
                                onChange={(e) => setFormData({ ...formData, ultimate_goal: parseInt(e.target.value) })}
                                className="w-full p-2 mt-1 bg-[#111] border border-gray-700 rounded text-cyan-400 font-bold focus:outline-none focus:border-cyan-400"
                                required
                            />
                        </div>
                        <button type="submit" className="mt-2 p-3 bg-gradient-to-r from-pink-500 to-cyan-400 rounded font-bold hover:opacity-80 transition">
                            Update Stream Goal
                        </button>
                        <button type="button" onClick={() => { setIsUnlocked(false); setMsg(''); setPin(''); }} className="p-2 border border-red-500 text-red-500 rounded hover:bg-red-500/10 transition mt-2">
                            🔒 Lock / Logout
                        </button>
                    </form>
                )}
            </div>
        </div>
    );
}