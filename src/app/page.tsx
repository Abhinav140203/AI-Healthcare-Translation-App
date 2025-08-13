'use client';

import { useState, useEffect } from 'react';
import { type LanguageCode, config } from '@/lib/config';
import { Header } from '@/components/Header';
import { LanguageSelector } from '@/components/LanguageSelector';
import { TranscriptPane } from '@/components/TranscriptPane';
import { ControlButtons } from '@/components/ControlButtons';
import { ConsentBanner } from '@/components/ConsentBanner';
import { useSpeechRecognition } from '@/hooks/useSpeechRecognition';

export default function HomePage() {
  const [sourceLang, setSourceLang] = useState<LanguageCode>(config.languages.defaultSource as LanguageCode);
  const [targetLang, setTargetLang] = useState<LanguageCode>(config.languages.defaultTarget as LanguageCode);
  const [originalText, setOriginalText] = useState('');
  const [translatedText, setTranslatedText] = useState('');
  const [isTranslating, setIsTranslating] = useState(false);
  const [hasConsented, setHasConsented] = useState(false);
  const [showSpeechError, setShowSpeechError] = useState(false);

  const {
    isSupported: speechSupported,
    isRecording,
    transcript,
    startRecording,
    stopRecording,
    resetTranscript,
    error: speechError,
    updateLanguage,
  } = useSpeechRecognition();

  useEffect(() => {
    if (speechSupported) {
      updateLanguage(sourceLang);
    }
  }, [sourceLang, speechSupported, updateLanguage]);

  useEffect(() => {
    setOriginalText(transcript);
  }, [transcript]);

  useEffect(() => {
    if (speechError) {
      setShowSpeechError(true);
      setTimeout(() => setShowSpeechError(false), 5000);
    }
  }, [speechError]);

  const handleLanguageChange = (type: 'source' | 'target', lang: LanguageCode) => {
    if (type === 'source') {
      setSourceLang(lang);
    } else {
      setTargetLang(lang);
    }
    setTranslatedText('');
  };

  const handleTextChange = (text: string) => {
    setOriginalText(text);
    setTranslatedText('');
  };

  const handleRecordingChange = (recording: boolean) => {
    if (recording) {
      if (speechSupported) {
        startRecording();
      }
    } else {
      if (speechSupported) {
        stopRecording();
      }
    }
  };

  const handleTranslate = async () => {
    if (!originalText.trim()) return;
    
    setIsTranslating(true);
    try {
      const response = await fetch('/api/translate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          text: originalText,
          srcLang: sourceLang,
          tgtLang: targetLang,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Translation failed');
      }

      const data = await response.json();
      setTranslatedText(data.translatedText);
    } catch (error) {
      console.error('Translation error:', error);
      alert(`Translation failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
    } finally {
      setIsTranslating(false);
    }
  };

  const handleClear = () => {
    setOriginalText('');
    setTranslatedText('');
    resetTranscript();
  };

  if (!hasConsented) {
    return <ConsentBanner onConsent={() => setHasConsented(true)} />;
  }

  return (
    <main className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="container mx-auto px-4 py-6 max-w-6xl">
        {showSpeechError && (
          <div className="mb-4 bg-red-50 border border-red-200 rounded-lg p-4">
            <div className="flex items-center">
              <svg className="w-5 h-5 text-red-400 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span className="text-red-800">{speechError}</span>
            </div>
          </div>
        )}

        <div className="mb-6">
          <LanguageSelector
            sourceLang={sourceLang}
            targetLang={targetLang}
            onLanguageChange={handleLanguageChange}
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          <TranscriptPane
            title="Original Text"
            language={sourceLang}
            text={originalText}
            onTextChange={handleTextChange}
            placeholder="Speak or type your message here..."
            isInput={true}
          />

          <TranscriptPane
            title="Translation"
            language={targetLang}
            text={translatedText}
            onTextChange={() => {}}
            placeholder="Translation will appear here..."
            isInput={false}
            isLoading={isTranslating}
          />
        </div>

        <ControlButtons
          isRecording={isRecording}
          onRecordingChange={handleRecordingChange}
          onTranslate={handleTranslate}
          hasText={!!originalText.trim()}
          isTranslating={isTranslating}
        />

        {originalText.trim() && (
          <div className="mt-4 text-center">
            <button
              onClick={handleClear}
              className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
            >
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
              Clear All
            </button>
          </div>
        )}

        {!speechSupported && (
          <div className="mt-6 bg-yellow-50 border border-yellow-200 rounded-lg p-4">
            <div className="flex items-center">
              <svg className="w-5 h-5 text-yellow-400 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.34 16.5c-.77.833.192 2.5 1.732 2.5z" />
              </svg>
              <span className="text-yellow-800">
                Your browser does not support real-time speech recognition. Please type your message instead.
              </span>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
