import { useState, useEffect } from 'react';
import { OsuUserData } from '@/types/osu';

export const useOsuData = () => {
    const [userData, setUserData] = useState<OsuUserData | null>(null);

    const fetchData = async () => {
        try {
            const res = await fetch('/api/osu');
            const data = await res.json();
            if (data.success) setUserData(data);
        } catch (err) {
            console.error("Fetch error:", err);
        }
    };

    useEffect(() => {
        fetchData();
        const interval = setInterval(fetchData, 20000);
        return () => clearInterval(interval);
    }, []);

    return { userData };
};