# Healthcare Translation Web App

A real-time, multilingual translation application designed for healthcare communication between patients and providers. Built with Next.js, TypeScript, and Tailwind CSS, featuring voice-to-text, AI-powered translation, and text-to-speech capabilities.

## Features

- 🎤 **Voice-to-Text**: Real-time speech recognition using Web Speech API (Chrome/Edge)
- 🌐 **AI Translation**: Medical-accurate translations powered by Groq LLM
- 🔊 **Text-to-Speech**: Audio playback of translated text
- 📱 **Mobile-First Design**: Responsive interface optimized for all devices
- 🔒 **Privacy-First**: No data storage, client-side audio processing
- 🌍 **Multi-Language Support**: 12+ languages with native names

## Tech Stack

- **Frontend**: Next.js 14, React 18, TypeScript
- **Styling**: Tailwind CSS
- **AI Translation**: Groq API (Llama 3 70B)
- **Speech**: Web Speech API (STT & TTS)
- **Deployment**: Vercel

## Prerequisites

- Node.js 18+ 
- npm or yarn
- Groq API key ([Get one here](https://console.groq.com/))

## Quick Start

### 1. Clone and Install

```bash
git clone <your-repo-url>
cd healthcare-translation-app
npm install
```

### 2. Environment Setup

Create a `.env.local` file in the root directory:

```bash
# Required: Your Groq API key
GROQ_API_KEY=your_actual_groq_api_key_here

# Optional: Default language settings
NEXT_PUBLIC_DEFAULT_SOURCE_LANG=en
NEXT_PUBLIC_DEFAULT_TARGET_LANG=es
```

### 3. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Usage

### Basic Workflow

1. **Select Languages**: Choose source and target languages from dropdowns
2. **Input Text**: Either speak into your microphone or type your message
3. **Translate**: Click "Translate" to get AI-powered translation
4. **Listen**: Use "Speak" button to hear translated text aloud

### Voice Input (Chrome/Edge)

- Click "Start Recording" and speak clearly
- Click "Stop Recording" when finished
- Speech is converted to text in real-time

### Text Input (All Browsers)

- Type directly in the text area
- Works on all browsers and devices
- Ideal for longer messages or when voice isn't available

## Browser Support

| Feature | Chrome | Edge | Safari | Firefox |
|---------|--------|------|--------|---------|
| Voice Input | ✅ | ✅ | ⚠️ (macOS only) | ❌ |
| Text Input | ✅ | ✅ | ✅ | ✅ |
| Text-to-Speech | ✅ | ✅ | ✅ | ✅ |

## Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Add environment variables in Vercel dashboard:
   - `GROQ_API_KEY`: Your Groq API key
4. Deploy!

### Environment Variables

Ensure these are set in your deployment platform:

- `GROQ_API_KEY`: Required for translation service
- `NEXT_PUBLIC_DEFAULT_SOURCE_LANG`: Default source language (optional)
- `NEXT_PUBLIC_DEFAULT_TARGET_LANG`: Default target language (optional)

## Project Structure

```
src/
├── app/                    # Next.js app router
│   ├── api/              # API routes
│   │   └── translate/    # Translation endpoint
│   ├── help/             # Help page
│   ├── privacy/          # Privacy policy
│   └── page.tsx          # Main app page
├── components/            # React components
│   ├── Header.tsx        # App header
│   ├── LanguageSelector.tsx # Language dropdowns
│   ├── TranscriptPane.tsx   # Text input/display
│   ├── ControlButtons.tsx   # Record/translate buttons
│   └── ConsentBanner.tsx    # Privacy consent
├── hooks/                 # Custom React hooks
│   └── useSpeechRecognition.ts # Speech API wrapper
└── lib/                   # Utilities
    └── config.ts         # App configuration
```

## API Endpoints

### POST /api/translate

Translates text using Groq LLM with medical context.

**Request Body:**
```json
{
  "text": "Hello, I have a headache",
  "srcLang": "en",
  "tgtLang": "es"
}
```

**Response:**
```json
{
  "translatedText": "Hola, tengo dolor de cabeza",
  "sourceLanguage": "en",
  "targetLanguage": "es",
  "originalText": "Hello, I have a headache"
}
```

## Privacy & Security

- **No Data Storage**: Audio, text, and translations are never stored
- **Client-Side Processing**: Voice recognition happens in your browser
- **Secure API Calls**: HTTPS-only communication with Groq
- **No Logging**: Translation requests are processed in memory and discarded

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Support

For issues or questions:
1. Check the Help page in the app
2. Review browser compatibility notes
3. Ensure your Groq API key is valid
4. Check network connectivity for translation requests

## Roadmap

- [ ] iOS Safari voice input support
- [ ] Offline translation capabilities
- [ ] Medical terminology glossary
- [ ] Conversation history (client-side only)
- [ ] Additional language models
- [ ] Accessibility improvements

---

Built with ❤️ for better healthcare communication across language barriers.
