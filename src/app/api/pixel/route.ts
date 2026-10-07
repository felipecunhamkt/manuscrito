import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { FB_PIXEL_ID, FB_PIXEL_ID_2, OFFICIAL_DOMAIN, formatCapiEventPayload } from '@/lib/pixel';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { eventName, eventId, customPath, userData, customData } = body;

    if (!eventName) {
      return NextResponse.json({ error: 'eventName is required' }, { status: 400 });
    }

    const payload = formatCapiEventPayload({
      eventName,
      eventId,
      customPath,
      userData: {
        client_ip_address: request.headers.get('x-forwarded-for') || undefined,
        client_user_agent: request.headers.get('user-agent') || undefined,
        ...userData,
      },
      customData,
    });

    const accessToken = process.env.FB_ACCESS_TOKEN;
    if (accessToken) {
      const response = await fetch(
        `https://graph.facebook.com/v19.0/${FB_PIXEL_ID}/events?access_token=${accessToken}`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        }
      );

      const result = await response.json();
      return NextResponse.json({ success: true, metaResponse: result });
    }

    // Retorna payload sanitizado caso execute sem access token (simulação/validação)
    return NextResponse.json({
      success: true,
      message: 'CAPI payload generated with sanitized event_source_url',
      domain: OFFICIAL_DOMAIN,
      payload,
    });
  } catch (error: any) {
    return NextResponse.json(
      { error: error?.message || 'Internal server error' },
      { status: 500 }
    );
  }
}
