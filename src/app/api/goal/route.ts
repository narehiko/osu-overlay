import { NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';
import { GoalState } from '@/types/osu';

const dataFilePath = path.join(process.cwd(), 'goal_config.json');

export async function GET() {
    try {
        const fileData = await fs.readFile(dataFilePath, 'utf8');
        return NextResponse.json(JSON.parse(fileData));
    } catch (error) {
        return NextResponse.json({ start_rank: 0, live_target: 0, ultimate_goal: 0 });
    }
}

export async function POST(req: Request) {
    try {
        const body: GoalState = await req.json();
        await fs.writeFile(dataFilePath, JSON.stringify(body, null, 2), 'utf8');
        return NextResponse.json({ success: true, message: "✅ Data updated successfully!" });
    } catch (error) {
        return NextResponse.json({ success: false, message: "❌ Failed to save data." }, { status: 500 });
    }
}