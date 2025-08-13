import { NextRequest, NextResponse } from 'next/server';
import Groq from 'groq-sdk';

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

function toIso6391(lang: string): string {
  return (lang || 'en').split('-')[0];
}

async function translateViaLibre(text: string, srcLang: string, tgtLang: string) {
  const source = toIso6391(srcLang);
  const target = toIso6391(tgtLang);
  const endpoint = process.env.LIBRETRANSLATE_URL || 'https://libretranslate.com/translate';
  const apiKey = process.env.LIBRETRANSLATE_API_KEY;

  const body: Record<string, unknown> = { q: text, source, target, format: 'text' };
  if (apiKey) body.api_key = apiKey;

  const res = await fetch(endpoint, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });

  if (!res.ok) {
    throw new Error(`LibreTranslate error: ${res.status}`);
  }

  const data = await res.json();
  return (data.translatedText || data.translated_text || '').toString();
}

async function translateViaMyMemory(text: string, srcLang: string, tgtLang: string) {
  const source = toIso6391(srcLang);
  const target = toIso6391(tgtLang);
  const url = `https://api.mymemory.translated.net/get?q=${encodeURIComponent(text)}&langpair=${source}|${target}`;
  const res = await fetch(url);
  if (!res.ok) throw new Error(`MyMemory error: ${res.status}`);
  const data = await res.json();
  return data?.responseData?.translatedText?.toString() || '';
}

export async function POST(request: NextRequest) {
  try {
    const { text, srcLang, tgtLang } = await request.json();

    if (!text || !srcLang || !tgtLang) {
      return NextResponse.json(
        { error: 'Missing required fields: text, srcLang, tgtLang' },
        { status: 400 }
      );
    }

    const provider = (process.env.TRANSLATION_PROVIDER || '').toLowerCase();

    // 1) Forced provider (for debugging or constraints)
    if (provider === 'mymemory') {
      const translatedText = await translateViaMyMemory(text, srcLang, tgtLang);
      return NextResponse.json({ translatedText, sourceLanguage: srcLang, targetLanguage: tgtLang, provider: 'mymemory' });
    }
    if (provider === 'libre') {
      const translatedText = await translateViaLibre(text, srcLang, tgtLang);
      return NextResponse.json({ translatedText, sourceLanguage: srcLang, targetLanguage: tgtLang, provider: 'libretranslate' });
    }
    if (provider === 'groq') {
      if (!process.env.GROQ_API_KEY) {
        return NextResponse.json({ error: 'GROQ_API_KEY missing' }, { status: 500 });
      }
      const completion = await groq.chat.completions.create({
        model: process.env.GROQ_MODEL || 'llama-3.1-70b-versatile',
        temperature: parseFloat(process.env.GROQ_TEMPERATURE || '0.1'),
        max_tokens: parseInt(process.env.GROQ_MAX_TOKENS || '500'),
        messages: [
          { role: 'system', content: 'You are a professional healthcare translator. Provide accurate, clear translations while preserving medical terminology and context.' },
          { role: 'user', content: `Translate the following text from ${srcLang} to ${tgtLang}. Keep it medically accurate and professional.\n\nText: ${text}` },
        ],
      });
      const translatedText = completion.choices?.[0]?.message?.content?.trim() || '';
      return NextResponse.json({ translatedText, sourceLanguage: srcLang, targetLanguage: tgtLang, provider: 'groq' });
    }

    // 2) Try Groq when available
    if (process.env.GROQ_API_KEY) {
      try {
        const completion = await groq.chat.completions.create({
          model: process.env.GROQ_MODEL || 'llama-3.1-70b-versatile',
          temperature: parseFloat(process.env.GROQ_TEMPERATURE || '0.1'),
          max_tokens: parseInt(process.env.GROQ_MAX_TOKENS || '500'),
          messages: [
            { role: 'system', content: 'You are a professional healthcare translator. Provide accurate, clear translations while preserving medical terminology and context.' },
            { role: 'user', content: `Translate the following text from ${srcLang} to ${tgtLang}. Keep it medically accurate and professional.\n\nText: ${text}` },
          ],
        });
        const translatedText = completion.choices?.[0]?.message?.content?.trim();
        if (translatedText) {
          return NextResponse.json({ translatedText, sourceLanguage: srcLang, targetLanguage: tgtLang, provider: 'groq' });
        }
      } catch (err) {
        console.warn('Groq translate failed; will try other providers:', err);
      }
    }

    // 3) Try Libre only if an API key or custom endpoint is explicitly provided
    if (process.env.LIBRETRANSLATE_API_KEY || process.env.LIBRETRANSLATE_URL) {
      try {
        const ltText = await translateViaLibre(text, srcLang, tgtLang);
        if (ltText) {
          return NextResponse.json({ translatedText: ltText, sourceLanguage: srcLang, targetLanguage: tgtLang, provider: 'libretranslate' });
        }
      } catch (err) {
        console.warn('LibreTranslate failed, will try MyMemory:', err);
      }
    }

    // 4) Final fallback: MyMemory (free)
    const mmText = await translateViaMyMemory(text, srcLang, tgtLang);
    if (mmText) {
      return NextResponse.json({ translatedText: mmText, sourceLanguage: srcLang, targetLanguage: tgtLang, provider: 'mymemory' });
    }

    return NextResponse.json(
      { error: 'Translation failed via all providers' },
      { status: 502 }
    );
  } catch (error) {
    console.error('Translation API error:', error);
    return NextResponse.json(
      { error: 'Translation service temporarily unavailable. Please try again.' },
      { status: 500 }
    );
  }
}
