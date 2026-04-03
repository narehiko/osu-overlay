export interface OsuUserData {
    success: boolean;
    global: number;
    country: number;
    avatar: string;
    error?: string;
}

export interface SCTokens {
    titleRoman?: string;
    artistRoman?: string;
    diffName?: string;
    mStars?: string | number;
    status?: string;
    mods?: string;
}

export interface GoalState {
    start_rank: number;
    live_target: number;
    ultimate_goal: number;
}