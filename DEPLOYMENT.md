# Deployment Guide - Healthcare Translation App

## 🚀 Quick Deploy to Vercel (5 minutes)

### ✅ Pre-Deployment Checklist
- [x] App works locally (voice, translation, TTS)
- [x] GROQ_API_KEY added to .env.local
- [x] All tests passing
- [x] Ready for production

### 1. Prepare Your Repository

1. **Commit and push your code**:
   ```bash
   git add .
   git commit -m "Production ready: Healthcare Translation App with voice, translation, and TTS"
   git push origin main
   ```

2. **Verify .env.local has GROQ_API_KEY** (don't commit this file)

### 2. Deploy to Vercel

#### Option A: Vercel CLI (Recommended)

1. **Install Vercel CLI**:
   ```bash
   npm i -g vercel
   ```

2. **Login to Vercel**:
   ```bash
   vercel login
   ```

3. **Deploy**:
   ```bash
   vercel
   ```

4. **Follow the prompts**:
   - Link to existing project or create new
   - Set project name: `healthcare-translation-app`
   - Confirm deployment settings
   - **Important**: Set environment variables when prompted

#### Option B: Vercel Dashboard

1. Go to [vercel.com](https://vercel.com)
2. Click "New Project"
3. Import your GitHub repository
4. Configure project settings:
   - Framework Preset: Next.js
   - Root Directory: `./` (default)
   - Build Command: `npm run build` (default)
   - Output Directory: `.next` (default)

### 3. Environment Variables Setup (CRITICAL)

1. **In Vercel Dashboard**:
   - Go to your project → Settings → Environment Variables
   - Add: `GROQ_API_KEY` = `your_actual_groq_api_key`
   - Set to "Production" environment
   - **Redeploy** after adding environment variables

2. **Verify in Vercel**:
   - Project → Settings → Environment Variables
   - Should show: `GROQ_API_KEY` (Production)

### 4. Test Your Live Deployment

1. **Visit your live URL** (e.g., `https://your-app.vercel.app`)
2. **Test Core Features**:
   - Language selection
   - Voice input and recording
   - Translation (should work with GROQ_API_KEY)
   - Text-to-speech playback
   - Privacy consent flow

3. **Browser Testing**:
   - Chrome: Full voice features
   - iOS Safari: Text input + TTS (voice input fallback)

## 🎯 Post-Deployment Checklist

- [ ] App loads without errors
- [ ] Language selection works
- [ ] Voice recording works (Chrome)
- [ ] Translation works (Groq API)
- [ ] Text-to-speech works
- [ ] Privacy consent appears
- [ ] Help and Privacy pages accessible
- [ ] Mobile responsive design

## 🚨 Troubleshooting

### Common Issues

1. **"GROQ_API_KEY not configured"**:
   - Check environment variables in Vercel
   - Redeploy after adding the key

2. **Build failures**:
   - Check for TypeScript errors locally first
   - Run `npm run build` locally to test

3. **Voice input not working**:
   - Ensure HTTPS (Vercel provides this)
   - Check browser permissions
   - Test on Chrome/Edge

4. **Translation API errors**:
   - Verify Groq API key is valid in Vercel
   - Check Groq API quotas/limits

## 🎉 Success!

Once deployed and tested, you'll have:
- ✅ Live production URL
- ✅ Working voice-to-text
- ✅ AI-powered translation
- ✅ Text-to-speech
- ✅ Mobile-first design
- ✅ Privacy-compliant

**Share your live link as your project deliverable!**

---

## 📱 Final App Features

- **Voice Input**: Real-time speech recognition (Chrome/Edge)
- **Translation**: 15+ languages via Groq LLM
- **Audio Output**: Text-to-speech playback
- **Mobile-First**: Responsive design for all devices
- **Privacy**: No data storage, client-side processing
- **Security**: HTTPS, environment variables, no exposed keys

**Your Healthcare Translation App is ready for production!** 🚀
