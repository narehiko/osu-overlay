import { NextRequest, NextResponse } from 'next/server';
import { sendSimulationToSSE } from '../tiktok/route';

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        sendSimulationToSSE(body);
        return NextResponse.json({ success: true, message: 'Payload sent to SSE!' });
    } catch (error) {
        return NextResponse.json({ success: false, error: 'Failed to send payload' }, { status: 500 });
    }
}