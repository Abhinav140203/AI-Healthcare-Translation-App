import { NextRequest, NextResponse } from 'next/server';

export const runtime = 'nodejs';

export async function POST(request: NextRequest) {
  try {
    if (!process.env.GROQ_API_KEY) {
      return NextResponse.json({ error: 'GROQ_API_KEY not configured' }, { status: 500 });
    }

    const form = await request.formData();
    const file = form.get('audio') as File | null;
    const language = (form.get('language') as string) || 'en';

    if (!file) {
      return NextResponse.json({ error: 'Audio file is required' }, { status: 400 });
    }

    // Forward to Groq OpenAI-compatible endpoint
    const groqForm = new FormData();
    groqForm.append('file', file, file.name);
    groqForm.append('model', process.env.GROQ_WHISPER_MODEL || 'whisper-large-v3');
    groqForm.append('response_format', 'json');
    if (language) groqForm.append('language', language);

    const res = await fetch('https://api.groq.com/openai/v1/audio/transcriptions', {
      method: 'POST',
      headers: { Authorization: `Bearer ${process.env.GROQ_API_KEY}` },
      body: groqForm,
    });

    if (!res.ok) {
      const text = await res.text();
      return NextResponse.json({ error: `Groq STT failed: ${res.status} ${text}` }, { status: 502 });
    }

    const data = await res.json();
    const transcript = data?.text || data?.transcript || '';
    return NextResponse.json({ transcript });
  } catch (error) {
    console.error('STT API error:', error);
    return NextResponse.json({ error: 'Transcription service unavailable' }, { status: 500 });
  }
}
