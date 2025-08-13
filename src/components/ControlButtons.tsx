'use client';

import { useRef, useState } from 'react';

interface ControlButtonsProps {
  isRecording: boolean;
  onRecordingChange: (recording: boolean) => void;
  onTranslate: () => void;
  hasText: boolean;
  isTranslating: boolean;
  onTranscriptFromStt?: (text: string) => void;
  speechSupported?: boolean;
  sourceLang?: string;
  forceFallback?: boolean;
}

export function ControlButtons({ 
  isRecording, 
  onRecordingChange, 
  onTranslate, 
  hasText, 
  isTranslating,
  onTranscriptFromStt,
  speechSupported = true,
  sourceLang = 'en-US',
  forceFallback = false,
}: ControlButtonsProps) {
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const chunksRef = useRef<Blob[]>([]);
  const [recError, setRecError] = useState<string | null>(null);

  const startFallbackRecording = async () => {
    try {
      setRecError(null);
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mr = new MediaRecorder(stream, { mimeType: 'audio/webm' });
      chunksRef.current = [];

      mr.ondataavailable = (e) => {
        if (e.data && e.data.size > 0) chunksRef.current.push(e.data);
      };

      mr.onstop = async () => {
        try {
          const blob = new Blob(chunksRef.current, { type: 'audio/webm' });
          const file = new File([blob], 'recording.webm', { type: 'audio/webm' });
          const form = new FormData();
          form.append('audio', file);
          form.append('language', sourceLang.split('-')[0]);

          const res = await fetch('/api/stt', { method: 'POST', body: form });
          if (!res.ok) throw new Error(await res.text());
          const data = await res.json();
          const text = data?.transcript || '';
          if (text && onTranscriptFromStt) onTranscriptFromStt(text);
        } catch (err) {
          console.error('Fallback STT failed:', err);
          setRecError('Transcription failed. Ensure GROQ_API_KEY is set and try again.');
        }
      };

      mediaRecorderRef.current = mr;
      mr.start();
    } catch (e) {
      console.error('Fallback recording failed:', e);
      setRecError('Microphone access failed.');
    }
  };

  const stopFallbackRecording = () => {
    try {
      mediaRecorderRef.current?.stop();
      mediaRecorderRef.current?.stream.getTracks().forEach((t) => t.stop());
    } catch (e) {
      console.error('Failed to stop fallback recorder:', e);
    }
  };

  const handleRecordToggle = async () => {
    const shouldUseFallback = forceFallback || !speechSupported;
    if (isRecording) {
      onRecordingChange(false);
      if (shouldUseFallback) stopFallbackRecording();
    } else {
      onRecordingChange(true);
      if (shouldUseFallback) await startFallbackRecording();
    }
  };

  return (
    <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
      {/* Record/Stop Button */}
      <button
        onClick={handleRecordToggle}
        className={`inline-flex items-center px-6 py-3 rounded-full text-lg font-medium transition-all transform hover:scale-105 ${
          isRecording
            ? 'bg-red-600 text-white hover:bg-red-700 shadow-lg'
            : 'bg-blue-600 text-white hover:bg-blue-700 shadow-lg'
        }`}
      >
        {isRecording ? (
          <>
            <svg className="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <rect x="6" y="6" width="12" height="12" rx="2" ry="2" />
            </svg>
            Stop Recording
          </>
        ) : (
          <>
            <svg className="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
            </svg>
            Start Recording
          </>
        )}
      </button>

      {/* Translate Button */}
      <button
        onClick={onTranslate}
        disabled={!hasText || isTranslating}
        className={`inline-flex items-center px-6 py-3 rounded-full text-lg font-medium transition-all transform hover:scale-105 ${
          hasText && !isTranslating
            ? 'bg-green-600 text-white hover:bg-green-700 shadow-lg'
            : 'bg-gray-400 text-gray-200 cursor-not-allowed'
        }`}
      >
        {isTranslating ? (
          <>
            <div className="animate-spin rounded-full h-6 w-6 mr-2 border-b-2 border-white"></div>
            Translating...
          </>
        ) : (
          <>
            <svg className="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129" />
            </svg>
            Translate
          </>
        )}
      </button>

      {recError && (
        <div className="text-sm text-red-700 bg-red-50 border border-red-200 rounded px-3 py-2">
          {recError}
        </div>
      )}
    </div>
  );
}
