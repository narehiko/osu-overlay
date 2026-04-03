import { NextResponse } from 'next/server';

export async function GET() {
    try {
        const tokenResponse = await fetch('https://osu.ppy.sh/oauth/token', {
            method: 'POST',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            body: new URLSearchParams({
                client_id: process.env.OSU_CLIENT_ID!,
                client_secret: process.env.OSU_CLIENT_SECRET!,
                grant_type: 'client_credentials',
                scope: 'public',
            }),
        });

        const tokenData = await tokenResponse.json();
        const token = tokenData.access_token;

        if (!token) throw new Error('Failed to get access token');

        const userResponse = await fetch(`https://osu.ppy.sh/api/v2/users/${process.env.OSU_USERNAME}`, {
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
        });

        const userData = await userResponse.json();

        return NextResponse.json({
            success: true,
            global: userData.statistics.global_rank,
            country: userData.statistics.country_rank,
            avatar: userData.avatar_url,
        });
    } catch (error) {
        return NextResponse.json({ success: false, error: 'API Error' }, { status: 500 });
    }
}