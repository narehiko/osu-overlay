import { NextRequest } from 'next/server';
import { WebcastPushConnection } from 'tiktok-live-connector';

export const dynamic = 'force-dynamic';

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

        if (!mapRes.ok) return null;
        return await mapRes.json();
    } catch (err) {
        console.error("Gagal fetch osu! API:", err);
        return null;
    }
}

export async function GET(req: NextRequest) {
    const username = req.nextUrl.searchParams.get('username');

    if (!username) {
        return new Response('Username TikTok diperlukan', { status: 400 });
    }

    const stream = new ReadableStream({
        start(controller) {
            const tiktokConnection = new WebcastPushConnection(username);

            tiktokConnection.connect().then(state => {
                console.info(`✅ Terhubung ke TikTok LIVE kamar: ${state.roomId}`);
            }).catch(err => {
                console.error('❌ Gagal connect ke TikTok:', err);
                controller.error(err);
            });

            tiktokConnection.on('chat', async (data) => {
                const match = data.comment.match(/^!req\s+(\d+)/i);

                if (match) {
                    const beatmapId = match[1];
                    const requester = data.uniqueId;

                    const beatmapData = await fetchBeatmapData(beatmapId);

                    if (beatmapData) {
                        const payload = {
                            id: beatmapId,
                            requester: requester,
                            title: beatmapData.beatmapset.title,
                            artist: beatmapData.beatmapset.artist,
                            diff: beatmapData.version
                        };

                        controller.enqueue(`data: ${JSON.stringify(payload)}\n\n`);
                    }
                }
            });

            req.signal.addEventListener('abort', () => {
                tiktokConnection.disconnect();
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