import { NextRequest } from 'next/server';
import { TikTokLiveConnection } from 'tiktok-live-connector';
import { EventEmitter } from 'events';

interface TikTokChatEvent {
    comment: string;
    uniqueId: string;
}

export const dynamic = 'force-dynamic';

const simulatorEmitter = new EventEmitter();

export function sendSimulationToSSE(data: any) {
    simulatorEmitter.emit('mock_request', data);
}

async function fetchBeatmapData(beatmapId: string) {
    try {
        const tokenRes = await fetch('https://osu.ppy.sh/oauth/token', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                client_id: process.env.OSU_CLIENT_ID,
                client_secret: process.env.OSU_CLIENT_SECRET,
                grant_type: 'client_credentials',
                scope: 'public'
            })
        });
        const tokenData = await tokenRes.json();
        const mapRes = await fetch(`https://osu.ppy.sh/api/v2/beatmaps/${beatmapId}`, {
            headers: { Authorization: `Bearer ${tokenData.access_token}` }
        });
        return mapRes.ok ? await mapRes.json() : null;
    } catch (err) {
        return null;
    }
}

export async function GET(req: NextRequest) {
    const username = req.nextUrl.searchParams.get('username');
    if (!username) return new Response('Username TikTok diperlukan', { status: 400 });

    const stream = new ReadableStream({
        start(controller) {
            const tiktokConnection = new TikTokLiveConnection(username);

            // Handler 1: Chat asli dari TikTok
            (tiktokConnection as EventEmitter).on('chat', async (data: TikTokChatEvent) => {
                const match = data.comment.match(/^!req\s+(\d+)/i);
                if (match) {
                    const beatmapId = match[1];
                    const beatmapData = await fetchBeatmapData(beatmapId);
                    if (beatmapData) {
                        const payload = {
                            id: beatmapId,
                            requester: data.uniqueId,
                            title: beatmapData.beatmapset.title,
                            artist: beatmapData.beatmapset.artist,
                            diff: beatmapData.version
                        };
                        controller.enqueue(`data: ${JSON.stringify(payload)}\n\n`);
                    }
                }
            });

            const onMockRequest = (data: any) => {
                controller.enqueue(`data: ${JSON.stringify(data)}\n\n`);
            };
            simulatorEmitter.on('mock_request', onMockRequest);

            tiktokConnection.connect().catch(err => console.error('TikTok Connect Error:', err));

            req.signal.addEventListener('abort', () => {
                tiktokConnection.disconnect();
                simulatorEmitter.off('mock_request', onMockRequest);
                controller.close();
            });
        }
    });

    return new Response(stream, {
        headers: {
            'Content-Type': 'text/event-stream',
            'Cache-Control': 'no-cache',
            'Connection': 'keep-alive'
        }
    });
}