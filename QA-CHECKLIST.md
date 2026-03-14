# PWA QA Checklist – Mafaheem Beta 1.1

Synced from Combined file. Verify the following:

## ✓ Applied changes (from Combined)

- [x] Mode dropdown (Learn by doing / First learn then test)
- [x] Study screen for "First learn then test" when new words exist
- [x] Start Test button flow
- [x] Answer check: exact match only, parenthetical variants, user meanings
- [x] Multi-word Arabic display (smaller font for long/multi-form entries)
- [x] How-to popover centered, direction: ltr
- [x] Mobile progress panel (no horizontal overflow, media query ≤420px)
- [x] Footer: Beta 1.1, WhatsApp +923220578898, excellencecentretuition@gmail.com
- [x] Styling: palette, gradients, stats bar, buttons, study items
- [x] Session complete screen
- [x] Admin panel, reset link
- [x] Storage keys: mafaheem_combined_mode, mafaheem_learn_mode

## Manual QA

### Desktop
- [ ] Start session – 10 words shown
- [ ] Check Answer – exact match accepted
- [ ] Incorrect answer – "I am right" button appears
- [ ] Mode: "First learn then test" + new words → study screen → Start Test → drill
- [ ] Mode: "Learn by doing" → goes straight to drill
- [ ] Session complete → Start New Session
- [ ] How-to (ⓘ) opens and closes
- [ ] Footer links: WhatsApp, email open correctly

### Mobile (≤420px)
- [ ] Progress panel fits, no horizontal scroll
- [ ] Study items stack (Arabic above meaning)
- [ ] Drill usable
- [ ] Footer readable

### PWA-specific
- [ ] Service worker registers (when served over HTTP/HTTPS)
- [ ] manifest.json, icons load
- [ ] theme-color applied
