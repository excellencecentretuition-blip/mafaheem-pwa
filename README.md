# Mafaheem Master – PWA

Progressive Web App version of the Mafaheem word drills (Books 1, 2 & 3 combined).

## Requirements

- **HTTPS or localhost** – PWAs (including Service Workers) need a secure context. `file://` will not work.

## Quick Start

1. **Build** (copies app from Combination 3 books, adds PWA features):
   ```bash
   node build-pwa.js
   ```

2. **Icons** (PNG icons for install prompt):
   ```bash
   npm run icons
   ```

3. **Serve locally**:
   ```bash
   npm run serve
   ```
   Then open http://localhost:3000

4. **Install** – In Chrome, use "Install app" or the install icon in the address bar when criteria are met.

## QA Checklist

- [x] manifest.json – name, short_name, icons, theme_color, display
- [x] Service Worker – install, activate, fetch with offline fallback
- [x] SW only registers on https/http (skips file://)
- [x] PWA meta tags – theme-color, apple-mobile-web-app-*
- [x] Icons 192×192 and 512×512 PNG
- [x] Standalone display mode

## Files

| File | Purpose |
|------|---------|
| `index.html` | Built app (run `build-pwa.js` to regenerate) |
| `manifest.json` | Web app manifest |
| `sw.js` | Service Worker (caches app + fonts, offline fallback) |
| `icons/` | 192 and 512 PNG icons |
| `build-pwa.js` | Copies from Combination 3 books and injects PWA bits |
