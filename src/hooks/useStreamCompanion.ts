import { useState, useEffect, useCallback } from 'react';
import { SCTokens } from '@/types/osu';

export const useStreamCompanion = () => {
    const [data, setData] = useState<SCTokens | null>(null);
    const [status, setStatus] = useState<'connected' | 'disconnected' | 'connecting'>('connecting');

    const connect = useCallback(() => {
        const socket = new WebSocket("ws://localhost:20727/tokens");

        socket.onopen = () => {
            console.log("✅ Connected to StreamCompanion!");
            setStatus('connected');
            socket.send(JSON.stringify(["titleRoman", "artistRoman", "diffName", "mStars", "status", "mods", "livePp", "mSimulatedPp"]));
        };

        socket.onmessage = (event) => {
            const msg = JSON.parse(event.data);
            setData((prev) => ({ ...prev, ...msg }));
        };

        socket.onclose = () => {
            console.log("❌ SC Connection lost. Reconnecting...");
            setStatus('disconnected');
            setTimeout(connect, 3000);
        };

        socket.onerror = () => {
        };

        return socket;
    }, []);

    useEffect(() => {
        const socket = connect();
        return () => socket.close();
    }, [connect]);

    return { data, status };
};