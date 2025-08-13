'use client';

import { supportedLanguages, type LanguageCode } from '@/lib/config';

interface LanguageSelectorProps {
  sourceLang: LanguageCode;
  targetLang: LanguageCode;
  onLanguageChange: (type: 'source' | 'target', lang: LanguageCode) => void;
}

export function LanguageSelector({ sourceLang, targetLang, onLanguageChange }: LanguageSelectorProps) {
  const baseSelect =
    'w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-blue-600 bg-white text-gray-900 text-base';

  return (
    <div className="bg-white rounded-lg shadow-sm border p-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Source Language */}
        <div>
          <label htmlFor="source-lang" className="block text-sm font-medium text-gray-900 mb-2">
            From Language
          </label>
          <select
            id="source-lang"
            value={sourceLang}
            onChange={(e) => onLanguageChange('source', e.target.value as LanguageCode)}
            className={baseSelect}
          >
            {supportedLanguages.map((lang) => (
              <option key={lang.code} value={lang.code} className="text-gray-900">
                {lang.name} ({lang.nativeName})
              </option>
            ))}
          </select>
        </div>

        {/* Target Language */}
        <div>
          <label htmlFor="target-lang" className="block text-sm font-medium text-gray-900 mb-2">
            To Language
          </label>
          <select
            id="target-lang"
            value={targetLang}
            onChange={(e) => onLanguageChange('target', e.target.value as LanguageCode)}
            className={baseSelect}
          >
            {supportedLanguages.map((lang) => (
              <option key={lang.code} value={lang.code} className="text-gray-900">
                {lang.name} ({lang.nativeName})
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Language Swap Button */}
      <div className="mt-4 flex justify-center">
        <button
          onClick={() => {
            onLanguageChange('source', targetLang);
            onLanguageChange('target', sourceLang);
          }}
          className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-900 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-600 transition-colors"
        >
          <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
          </svg>
          Swap Languages
        </button>
      </div>
    </div>
  );
}
