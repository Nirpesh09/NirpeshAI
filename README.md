# Nirpesh Chat (Telegram-style Starter)

A modern messaging app starter with smooth animations and a professional chat UX inspired by Telegram.

## Quick preview (local)

> You need Node.js 20+ installed.

```bash
# 1) Install dependencies
npm install

# 2) Start development server
npm run dev
```

Then open the URL printed in terminal (usually `http://localhost:5173`).

## Production preview

```bash
# Build optimized app
npm run build

# Preview production build
npm run preview
```

Then open the preview URL shown in terminal (usually `http://localhost:4173`).

## If preview does not open

1. Check Node version:
   ```bash
   node -v
   ```
2. Delete and reinstall dependencies:
   ```bash
   rm -rf node_modules package-lock.json
   npm install
   ```
3. Try another port:
   ```bash
   npm run dev -- --port 3000
   ```

## What is included

- Smooth micro-interactions with `framer-motion`
- Chat list with search and unread badges
- Animated message bubbles
- Light/dark theme toggle
- Message composer with emoji/attachment/mic/send actions
- Read-state UI using double-check marks
- Responsive layout for desktop/mobile

## Suggested next features to become truly Telegram-level

1. Real-time backend (WebSockets / Socket.IO)
2. Authentication + OTP + session/device management
3. End-to-end encryption and secret chats
4. Cloud media storage + CDN + streaming
5. Voice/video calls (WebRTC)
6. Channels, groups, bots, and admin moderation tools
7. Push notifications and offline sync
8. Message reactions, replies, edits, and pinning
9. Anti-spam + abuse reporting + rate-limits
10. Production observability (logs, metrics, tracing)
