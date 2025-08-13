'use client';

import { useState, useEffect, useCallback, useRef } from 'react';

interface UseSpeechRecognitionReturn {
  isSupported: boolean;
  isRecording: boolean;
  transcript: string;
  startRecording: () => Promise<void> | void;
  stopRecording: () => void;
  resetTranscript: () => void;
  error: string | null;
  updateLanguage: (lang: string) => void;
}

export function useSpeechRecognition(): UseSpeechRecognitionReturn {
  const [isSupported, setIsSupported] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [recognition, setRecognition] = useState<SpeechRecognition | null>(null);

  const isStartingRef = useRef(false);
  const isStoppingRef = useRef(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const SpeechRecognition = window.SpeechRecognition || (window as any).webkitSpeechRecognition;
      if (SpeechRecognition) {
        setIsSupported(true);
        const r: SpeechRecognition = new SpeechRecognition();
        r.continuous = true;
        r.interimResults = true;
        r.maxAlternatives = 1;
        r.lang = 'en-US';

        r.onstart = () => {
          isStartingRef.current = false;
          setIsRecording(true);
          setError(null);
          setTranscript('');
        };

        r.onend = () => {
          isStoppingRef.current = false;
          setIsRecording(false);
        };

        r.onresult = (event) => {
          // Reconstruct the full transcript from all results to avoid missing finals
          let combined = '';
          for (let i = 0; i < event.results.length; i++) {
            combined += event.results[i][0].transcript;
            if (event.results[i].isFinal) combined += ' ';
          }
          // Clean up excessive spaces and normalize whitespace
          const cleaned = combined.replace(/\s+/g, ' ').trim();
          setTranscript(cleaned);
        };

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        r.onerror = (event: any) => {
          isStartingRef.current = false;
          isStoppingRef.current = false;
          setIsRecording(false);
          const err = String(event?.error || 'unknown');

          if (err === 'aborted') {
            console.info('Speech recognition aborted (expected when stopping).');
            return;
          }

          console.error('Speech recognition error:', err);

          if (err === 'not-allowed' || err === 'permission-denied') {
            setError('Microphone access denied. Enable mic permission and reload.');
            return;
          }
          if (err === 'no-speech') {
            setError('No speech detected. Please try again.');
            return;
          }
          if (err === 'audio-capture') {
            setError('Audio capture failed. Check your microphone.');
            return;
          }
          if (err === 'network') {
            setError('Network error. Disable ad/tracker blockers (e.g., Brave Shields), ensure HTTPS/localhost, and try again.');
            return;
          }
          setError('Speech recognition error. Please try again.');
        };

        setRecognition(r);
      } else {
        setIsSupported(false);
        setError('Speech recognition is not supported in this browser.');
      }
    }
  }, []);

  const startRecording = useCallback(async () => {
    if (!recognition || !isSupported) return;
    if (isStartingRef.current || isRecording) return;
    try {
      isStartingRef.current = true;
      setError(null);
      if (navigator.mediaDevices?.getUserMedia) {
        await navigator.mediaDevices.getUserMedia({ audio: true });
      }
      recognition.start();
    } catch (e) {
      isStartingRef.current = false;
      console.error('Failed to start recording:', e);
      setError('Failed to start recording. Check mic permission and try again.');
    }
  }, [recognition, isSupported, isRecording]);

  const stopRecording = useCallback(() => {
    if (!recognition || isStoppingRef.current || !isRecording) return;
    try {
      isStoppingRef.current = true;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      if ((recognition as any).abort) (recognition as any).abort();
      recognition.stop();
    } catch (e) {
      isStoppingRef.current = false;
      console.error('Failed to stop recording:', e);
    }
  }, [recognition, isRecording]);

  const resetTranscript = useCallback(() => {
    setTranscript('');
    setError(null);
  }, []);

  const updateLanguage = useCallback(
    (lang: string) => {
      if (recognition) recognition.lang = lang || 'en-US';
    },
    [recognition]
  );

  return {
    isSupported,
    isRecording,
    transcript,
    startRecording,
    stopRecording,
    resetTranscript,
    error,
    updateLanguage,
  };
}
