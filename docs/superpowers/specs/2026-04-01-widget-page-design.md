# Widget Page Design — Today's Tasks at a Glance

## Context

The self-study dashboard PWA is deployed on GitHub Pages. The user wants to check today's tasks instantly from the iPhone lock screen via an iOS Shortcut widget, without opening the full app.

## Approach

Add `widget.html` — an ultra-lightweight page that reads `localStorage.selfStudy2026` and displays today's task information. An iOS Shortcut widget taps to open this page in Safari.

## Display Content

1. **Today's subject** — Determined by day-of-week schedule (Mon=takken, Tue=AP, etc.)
2. **Today's task** — From `weekPlans[currentPhase]` using current week number and day
3. **Progress indicators**:
   - Studied today? (check logs for today's date)
   - Streak (consecutive days with log entries)
   - Days until next exam

## Technical Details

### Data source
- `localStorage` key: `selfStudy2026`
- Structure: `{ checked: {}, logs: [{ date, subject, minutes, memo, id }] }`
- Shared with `index.html` and `morning.html` (same origin)

### Phase/week logic (ported from index.html)
- `currentPhase`: takken (default) → ap (after 2026-10-19) → denki (after 2026-11-15)
- `weekNum`: `Math.ceil(daysBetween(2026-03-26, today) / 7)`
- Weekly plan varies by weekNum ranges (1-2, 3-4, 5-6, 7-8, 9-14, 15+)

### Design
- Dark theme, glassmorphism (consistent with morning.html)
- iPhone SE to Pro Max responsive
- No external dependencies, all CSS/JS inline
- Target: < 0.3s render

### Navigation
- Links to morning.html and index.html at bottom

## Files Modified
- **New**: `widget.html` (standalone HTML with embedded CSS/JS)
- **Update**: `manifest.json` (optional — add widget.html as alternate start_url)

## iOS Shortcut Setup (user manual step)
1. Open Shortcuts app → New Shortcut
2. Add "Open URL" action → `https://ogawakoshin.github.io/self-study-dashboard/widget.html`
3. Add to Lock Screen / Home Screen widget
