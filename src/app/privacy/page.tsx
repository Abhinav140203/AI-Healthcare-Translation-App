import Link from 'next/link';

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="bg-white rounded-lg shadow-sm border p-6">
          <div className="mb-6">
            <Link href="/" className="text-blue-600 hover:text-blue-800 mb-4 inline-block">
              ← Back to App
            </Link>
            <h1 className="text-3xl font-bold text-gray-900">Privacy Policy</h1>
          </div>

          <div className="prose max-w-none">
            <h2>Data Collection & Usage</h2>
            <p>
              This healthcare translation application is designed with privacy and security in mind. 
              We want to be transparent about how your data is handled.
            </p>

            <h3>What We Collect</h3>
            <ul>
              <li><strong>Voice Input:</strong> Audio is processed locally on your device using browser APIs</li>
              <li><strong>Text Input:</strong> Text you type or speak is sent to Groq API for translation</li>
              <li><strong>Language Preferences:</strong> Your language selections are stored locally</li>
            </ul>

            <h3>What We Don&apos;t Store</h3>
            <ul>
              <li><strong>No Audio Files:</strong> We never store or save your voice recordings</li>
              <li><strong>No Transcripts:</strong> Original or translated text is not stored on our servers</li>
              <li><strong>No Personal Information:</strong> We don&apos;t collect names, medical details, or identifying information</li>
            </ul>

            <h3>Third-Party Services</h3>
            <p>
              We use Groq API for translation services. Groq processes your text input to provide 
              accurate medical translations but does not store this data permanently.
            </p>

            <h3>Data Security</h3>
            <ul>
              <li>All communication with our servers uses HTTPS encryption</li>
              <li>No data is logged or stored on our infrastructure</li>
              <li>Translation requests are processed in memory and immediately discarded</li>
            </ul>

            <h3>Your Rights</h3>
            <p>
              Since we don&apos;t store personal data, there&apos;s no personal information to access, 
              modify, or delete. Your data remains under your control at all times.
            </p>

            <h3>Contact</h3>
            <p>
              If you have questions about this privacy policy or our data practices, 
              please contact us through the app&apos;s help section.
            </p>

            <p className="text-sm text-gray-600 mt-6">
              Last updated: {new Date().toLocaleDateString()}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
