# Setup Guide - Healthcare Translation App

## 🚀 Quick Setup (5 minutes)

### 1. Get Your Groq API Key

1. Go to [https://console.groq.com/](https://console.groq.com/)
2. Sign up for a free account
3. Navigate to "API Keys" in the dashboard
4. Create a new API key
5. Copy the key (it starts with `gsk_...`)

### 2. Configure Environment Variables

1. **Open `.env.local`** in your project root
2. **Replace** `your_groq_api_key_here` with your actual Groq API key:
   ```bash
   GROQ_API_KEY=gsk_your_actual_key_here
   ```
3. **Save the file**

### 3. Restart Development Server

```bash
# Stop the current server (Ctrl+C)
# Then restart:
npm run dev
```

## 🔧 What Each Environment Variable Does

| Variable | Required | Default | Description |
|----------|----------|---------|-------------|
| `GROQ_API_KEY` | ✅ **YES** | None | Your Groq API key for translation |
| `NEXT_PUBLIC_DEFAULT_SOURCE_LANG` | ❌ | `en-US` | Default input language |
| `NEXT_PUBLIC_DEFAULT_TARGET_LANG` | ❌ | `es-ES` | Default output language |
| `GROQ_MODEL` | ❌ | `llama-3.1-70b-versatile` | Groq model for translation |
| `GROQ_TEMPERATURE` | ❌ | `0.1` | Translation creativity (0.0-1.0) |
| `GROQ_MAX_TOKENS` | ❌ | `500` | Max response length |

## 🧪 Test Your Setup

### Test Translation API
1. Open your browser to `http://localhost:3000`
2. Accept the privacy consent
3. Type some text in the left pane
4. Click "Translate"
5. You should see the translation appear

### Test Voice Input (Chrome/Edge)
1. Click "Start Recording"
2. Allow microphone access
3. Speak clearly
4. Click "Stop Recording"
5. Your speech should appear as text

### Test Text-to-Speech
1. Get a translation first
2. Click the "Speak" button on the right pane
3. You should hear the translated text

## 🚨 Common Issues & Solutions

### "GROQ_API_KEY not configured"
- **Solution**: Check your `.env.local` file
- **Make sure**: No spaces around the `=` sign
- **Restart**: Your development server

### "Invalid API key"
- **Solution**: Verify your Groq API key is correct
- **Check**: The key starts with `gsk_`
- **Try**: Creating a new API key

### Voice input not working
- **Check**: Browser permissions (microphone access)
- **Try**: Chrome or Edge browser
- **Note**: iOS Safari doesn't support voice input

### Translation fails
- **Check**: Your internet connection
- **Verify**: Groq API key is valid
- **Check**: Groq dashboard for quota limits

## 📱 Browser Compatibility

| Feature | Chrome | Edge | Safari | Firefox |
|---------|--------|------|--------|---------|
| Voice Input | ✅ | ✅ | ⚠️ (macOS only) | ❌ |
| Text Input | ✅ | ✅ | ✅ | ✅ |
| Text-to-Speech | ✅ | ✅ | ✅ | ✅ |

## 🔒 Security Notes

- ✅ `.env.local` is automatically ignored by git
- ✅ API keys are never exposed to the client
- ✅ All API calls use HTTPS in production
- ✅ No user data is stored or logged

## 🚀 Next Steps

1. **Test all features** work correctly
2. **Deploy to Vercel** using the deployment guide
3. **Share your live link** as the project deliverable

---

**Need help?** Check the main README.md or create an issue in your repository.
