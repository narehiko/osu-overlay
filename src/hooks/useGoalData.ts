import { useState, useEffect } from 'react';
import { GoalState } from '@/types/osu';

export const useGoalData = () => {
    const [goalData, setGoalData] = useState<GoalState | null>(null);

    const fetchGoal = async () => {
        try {
            const res = await fetch('/api/goal');
            const data = await res.json();
            setGoalData(data);
        } catch (err) {
            console.error("Failed to fetch goal data:", err);
        }
    };

    useEffect(() => {
        fetchGoal();
        const interval = setInterval(fetchGoal, 10000);
        return () => clearInterval(interval);
    }, []);

    return { goalData };
};