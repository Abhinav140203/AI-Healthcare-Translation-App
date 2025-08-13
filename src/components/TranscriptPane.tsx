'use client';

import { useState } from 'react';
import { supportedLanguages } from '@/lib/config';

interface TranscriptPaneProps {
  title: string;
  language: string;
  text: string;
  onTextChange: (text: string) => void;
  placeholder: string;
  isInput: boolean;
  isLoading?: boolean;
}

export function TranscriptPane({ 
  title, 
  language, 
  text, 
  onTextChange, 
  placeholder, 
  isInput, 
  isLoading = false 
}: TranscriptPaneProps) {
  const [isSpeaking, setIsSpeaking] = useState(false);
  
  const currentLanguage = supportedLanguages.find(lang => lang.code === language);
  
  const handleSpeak = () => {
    if (!text.trim() || isSpeaking) return;
    
    setIsSpeaking(true);
    
    // Use Web Speech Synthesis API
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = language;
    utterance.rate = 0.9; // Slightly slower for clarity
    utterance.pitch = 1.0;
    
    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);
    
    speechSynthesis.speak(utterance);
  };
  
  const stopSpeaking = () => {
    speechSynthesis.cancel();
    setIsSpeaking(false);
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border p-4 h-80 flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between mb-3">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
          <p className="text-sm text-gray-600">
            {currentLanguage?.name} ({currentLanguage?.nativeName})
          </p>
        </div>
        
        {/* Speak Button (only for translated text) */}
        {!isInput && text.trim() && (
          <button
            onClick={isSpeaking ? stopSpeaking : handleSpeak}
            className={`inline-flex items-center px-3 py-2 rounded-md text-sm font-medium transition-colors ${
              isSpeaking
                ? 'bg-red-100 text-red-700 hover:bg-red-200'
                : 'bg-blue-100 text-blue-700 hover:bg-blue-200'
            }`}
          >
            {isSpeaking ? (
              <>
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
                Stop
              </>
            ) : (
              <>
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
                </svg>
                Speak
              </>
            )}
          </button>
        )}
      </div>

      {/* Content Area */}
      <div className="flex-1 relative">
        {isInput ? (
          // Input textarea
          <textarea
            value={text}
            onChange={(e) => onTextChange(e.target.value)}
            placeholder={placeholder}
            className="w-full h-full p-3 border border-gray-300 rounded-md resize-none focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-blue-600 text-gray-900 placeholder-gray-400 text-base leading-relaxed caret-blue-600"
            disabled={isLoading}
            spellCheck={true}
          />
        ) : (
          // Display translated text
          <div className="w-full h-full p-3 border border-gray-300 rounded-md bg-gray-50 overflow-y-auto">
            {isLoading ? (
              <div className="flex items-center justify-center h-full">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                <span className="ml-3 text-gray-600">Translating...</span>
              </div>
            ) : text.trim() ? (
              <p className="text-gray-900 leading-relaxed whitespace-pre-wrap text-base">{text}</p>
            ) : (
              <p className="text-gray-400 italic">{placeholder}</p>
            )}
          </div>
        )}
      </div>

      {/* Character Count */}
      <div className="mt-2 text-right">
        <span className="text-xs text-gray-500">
          {text.length} characters
        </span>
      </div>
    </div>
  );
}
