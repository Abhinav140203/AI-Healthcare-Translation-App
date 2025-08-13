import Link from 'next/link';

export default function HelpPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="bg-white rounded-lg shadow-sm border p-6">
          <div className="mb-6">
            <Link href="/" className="text-blue-600 hover:text-blue-800 mb-4 inline-block">
              ← Back to App
            </Link>
            <h1 className="text-3xl font-bold text-gray-900">Help & Usage Guide</h1>
          </div>

          <div className="prose max-w-none">
            <h2>Getting Started</h2>
            <p>
              Welcome to the Healthcare Translation App! This tool helps healthcare providers 
              and patients communicate across language barriers in real-time.
            </p>

            <h3>Basic Usage</h3>
            <ol>
              <li><strong>Choose Languages:</strong> Select your source and target languages from the dropdown menus</li>
              <li><strong>Input Text:</strong> Either speak into your microphone or type your message</li>
              <li><strong>Translate:</strong> Click the &quot;Translate&quot; button to get your translation</li>
              <li><strong>Listen:</strong> Use the &quot;Speak&quot; button to hear the translated text aloud</li>
            </ol>

            <h3>Voice Input (Chrome/Edge)</h3>
            <ul>
              <li>Click &quot;Start Recording&quot; to begin voice input</li>
              <li>Speak clearly into your microphone</li>
              <li>Click &quot;Stop Recording&quot; when finished</li>
              <li>Your speech will be converted to text automatically</li>
            </ul>

            <h3>Text Input (All Browsers)</h3>
            <ul>
              <li>Simply type your message in the left text area</li>
              <li>This works on all browsers and devices</li>
              <li>Great for longer messages or when voice isn&apos;t available</li>
            </ul>

            <h3>Browser Compatibility</h3>
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 my-4">
              <h4 className="font-semibold text-yellow-800 mb-2">Voice Recognition Support</h4>
              <ul className="text-yellow-800 text-sm">
                <li><strong>Supported:</strong> Chrome, Edge, Safari (macOS)</li>
                <li><strong>Limited:</strong> Firefox, Safari (iOS) - Use text input instead</li>
              </ul>
            </div>

            <h3>Tips for Best Results</h3>
            <ul>
              <li>Speak clearly and at a moderate pace</li>
              <li>Use medical terminology when appropriate</li>
              <li>Keep sentences concise for better translation accuracy</li>
              <li>Check the translation and clarify if needed</li>
            </ul>

            <h3>Troubleshooting</h3>
            <h4>Microphone Not Working?</h4>
            <ul>
              <li>Check that your browser has microphone permission</li>
              <li>Try refreshing the page and allowing access again</li>
              <li>Use text input as an alternative</li>
            </ul>

            <h4>Translation Not Working?</h4>
            <ul>
              <li>Ensure you have text in the input field</li>
              <li>Check your internet connection</li>
              <li>Try a shorter message</li>
            </ul>

            <h3>Privacy & Security</h3>
            <p>
              Your privacy is important to us. We don&apos;t store any of your voice recordings, 
              text input, or translations. All processing happens in real-time and is immediately discarded.
            </p>

            <p className="text-sm text-gray-600 mt-6">
              Need more help? Contact us through the app&apos;s main interface.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
