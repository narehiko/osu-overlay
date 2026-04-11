import { useState, useEffect, useRef } from 'react';
import { useStreamCompanion } from './useStreamCompanion';

export interface QueuedSong {
    id: string;
    requester: string;
    title: string;
    artist: string;
    diff: string;
}

export const useSongQueue = () => {
    const [queue, setQueue] = useState<QueuedSong[]>([]);
    const [tiktokUsername, setTiktokUsername] = useState<string>('');
    const { data: scData, status: scStatus } = useStreamCompanion();

    const prevTitle = useRef<string | null>(null);

    useEffect(() => {
        const fetchConfig = async () => {
            try {
                const res = await fetch('/api/goal');
                const data = await res.json();
                if (data.tiktok_username) {
                    setTiktokUsername(data.tiktok_username);
                }
            } catch (err) {
                console.error("Gagal load config username:", err);
            }
        };

        fetchConfig();
        const interval = setInterval(fetchConfig, 10000);
        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        if (!tiktokUsername) return;

        const eventSource = new EventSource(`/api/tiktok?username=${tiktokUsername}`);

        eventSource.onmessage = (event) => {
            const newSong: QueuedSong = JSON.parse(event.data);
            setQueue(prev => [...prev, newSong]);
        };

        return () => eventSource.close();
    }, [tiktokUsername]);

    useEffect(() => {
        const currentTitle = scData?.titleRoman;
        const isPlaying = scData?.status === 'Playing';

        if (scStatus === 'connected' && isPlaying && currentTitle && currentTitle !== prevTitle.current) {
            setQueue(prev => prev.length > 0 ? prev.slice(1) : prev);
            prevTitle.current = currentTitle;
        } else if (currentTitle && currentTitle !== prevTitle.current) {
            prevTitle.current = currentTitle;
        }
    }, [scData?.titleRoman, scData?.status, scStatus]);

    return { queue };
};