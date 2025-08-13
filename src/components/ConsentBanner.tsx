'use client';

interface ConsentBannerProps {
  onConsent: () => void;
}

export function ConsentBanner({ onConsent }: ConsentBannerProps) {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-6">
        <div className="text-center mb-6">
          <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Welcome to Healthcare Translation</h2>
          <p className="text-gray-600">Real-time multilingual communication for healthcare</p>
        </div>

        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
          <h3 className="font-semibold text-blue-900 mb-2">Privacy & Consent</h3>
          <p className="text-sm text-blue-800 mb-3">
            This application processes your voice and text input to provide real-time translation services.
          </p>
          <ul className="text-sm text-blue-800 space-y-1">
            <li>• <strong>No data is stored</strong> on our servers</li>
            <li>• <strong>No personal health information</strong> is logged</li>
            <li>• <strong>Audio processing</strong> happens on your device</li>
            <li>• <strong>Translation requests</strong> are sent to Groq API and not stored</li>
          </ul>
        </div>

        <button
          onClick={onConsent}
          className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          I Understand and Consent
        </button>

        <p className="text-xs text-gray-500 text-center mt-4">
          By continuing, you agree to our privacy practices and consent to audio processing.
        </p>
      </div>
    </div>
  );
}
