export const config = {
  groq: {
    apiKey: process.env.GROQ_API_KEY,
  },
  languages: {
    defaultSource: process.env.NEXT_PUBLIC_DEFAULT_SOURCE_LANG || 'en-US',
    defaultTarget: process.env.NEXT_PUBLIC_DEFAULT_TARGET_LANG || 'es-ES',
  },
  app: {
    name: 'Healthcare Translation App',
    description: 'Real-time multilingual translation for healthcare communication',
  },
} as const;

export const supportedLanguages = [
  { code: 'en-US', name: 'English (US)', nativeName: 'English (US)' },
  { code: 'en-GB', name: 'English (UK)', nativeName: 'English (UK)' },
  { code: 'es-ES', name: 'Spanish (Spain)', nativeName: 'Español (España)' },
  { code: 'es-MX', name: 'Spanish (Mexico)', nativeName: 'Español (México)' },
  { code: 'fr-FR', name: 'French', nativeName: 'Français' },
  { code: 'de-DE', name: 'German', nativeName: 'Deutsch' },
  { code: 'it-IT', name: 'Italian', nativeName: 'Italiano' },
  { code: 'pt-PT', name: 'Portuguese', nativeName: 'Português' },
  { code: 'pt-BR', name: 'Portuguese (Brazil)', nativeName: 'Português (Brasil)' },
  { code: 'ru-RU', name: 'Russian', nativeName: 'Русский' },
  { code: 'zh-CN', name: 'Chinese (Simplified)', nativeName: '简体中文' },
  { code: 'zh-TW', name: 'Chinese (Traditional)', nativeName: '繁體中文' },
  { code: 'ja-JP', name: 'Japanese', nativeName: '日本語' },
  { code: 'ko-KR', name: 'Korean', nativeName: '한국어' },
  { code: 'hi-IN', name: 'Hindi', nativeName: 'हिन्दी' },
  { code: 'ar-SA', name: 'Arabic', nativeName: 'العربية' },
] as const;

export type LanguageCode = typeof supportedLanguages[number]['code'];
