# Scriptable Native Widget Design

## Context

The user wants today's tasks displayed on the iPhone home screen without tapping — a true always-visible widget. PWA/web pages cannot do this; only native WidgetKit widgets can. Scriptable app bridges this gap by running JavaScript that renders WidgetKit widgets.

## Scope

Minimum viable widget: schedule display only (static data embedded in script). Dynamic data (streak, study logs) from localStorage is out of scope for v1 — would require a data sync mechanism.

## Display (Medium Widget)

- Subject icon + name (day-of-week schedule)
- Today's task content + duration (from weekly plan)
- Exam countdown (days remaining)
- Background color matching subject (amber/purple/green)

## Technical Design

### File: `self-study-widget.js`
Single Scriptable script containing:
- `SCHEDULE` — day-of-week to subject mapping
- `EXAM_DATES` — exam date constants
- `weekPlans` — full weekly plan data (ported from index.html)
- Phase logic (`currentPhase` based on date)
- Week number calculation (`weekNum`)
- Widget rendering using Scriptable's `ListWidget` API

### On-tap behavior
Opens `https://ogawakoshin.github.io/self-study-dashboard/widget.html` in Safari.

## User Setup
1. Install Scriptable from App Store
2. Create new script, paste code
3. Add Scriptable medium widget to home screen
4. Select the script in widget configuration
