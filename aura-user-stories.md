# Aura — User Stories (Current Implementation)

## Guided Sessions & Timer

### 1. Browse available meditation sessions
Status: Not Built

As a user, I want to browse Aura's meditation sessions, so that I can find
one that fits how I'm feeling.

The original acceptance criteria (duration selection, auto-matched track,
pause/resume) don't apply here because there is no session playback of any
kind. Tapping "Start Session" or "Begin Session" doesn't do anything yet.
Sessions currently exist only as static cards (title, category, duration,
description) with no audio, no timer, and no way to actually meditate
through the app.

What actually works:
- User can view a list of available sessions on the Home screen (Popular
  Quick Starts, Today's Daily Breath)
- Each session shows title, category, duration, and a description
- Tapping a session opens a detail screen with the same info plus a
  numbered instructions list

### 2. Set a custom silent timer with interval bells
Status: Not Built

No timer, no bells, no audio engine of any kind exists in the app yet.

### 3. Play ambient background sounds during a session
Status: Not Built

No audio playback exists at all, ambient or otherwise.



## Progress & Streaks

### 4. Track a daily meditation streak
Status: Not Built

There's no concept of "completing" a session (since sessions can't be
played yet), so there's nothing to count toward a streak.

### 5. View meditation history and stats
Status: Not Built

No history is recorded and no stats screen exists.



## Reminders & Habit-Building

### 6. Schedule a daily reminder
Status: Partial

As a user, I want to schedule a reminder for a specific date and time, so
that I remember to make space for my practice.

This is the most complete feature in the app so far.

What actually works:
- User can pick a reminder label, a date (using a real calendar picker),
  and a time (native time picker on iOS/Android, manual HH:mm entry on
  web)
- Reminders set in the past are rejected with an inline error; same-day
  reminders with a future time are allowed
- On save, the app requests notification permission and schedules a real
  notification for that exact date and time
- Reminders persist through AsyncStorage and survive app reloads
- The reminders list is sorted chronologically and each item can be
  deleted

What's still missing from the original story:
- No recurring "daily at this time" option — each reminder is one-time,
  not a repeating daily alarm
- The notification doesn't deep-link into starting a session, since
  sessions can't be started or played at all yet
- No snooze or edit — a reminder can only be added or deleted
- On web specifically, the reminder only fires while the browser tab
  stays open, unlike a real background push

### 7. Get a gentle nudge after missed days
Status: Not Built

This needs streak or history tracking (Story 4/5), which doesn't exist
yet.



## Content Library & Personalization

### 8. Browse sessions by category
Status: Partial

As a user, I want to browse sessions by category, so that I can find
something that matches what I need right now.

What actually works:
- Home screen shows category pills (Calmness, Relaxation, Focus, Sleep)
  under "Browse by Need"
- Tapping a pill visually marks it as selected

What's still missing from the original story:
- Selecting a category doesn't actually filter the session list below it
  yet — the pills are currently visual only
- No search bar exists anywhere in the app
- No "recently played" section, since there's no play history to show
- Favoriting works independently through a heart icon on session cards
  and on the Detail screen. Favorited items are viewable on their own
  Favorites screen and persist through AsyncStorage across reloads

### 9. Download sessions for offline playback
Status: Not Built

There's no audio to download in the first place, since no session has
actual playable content yet.



## Summary

| # | Story | Status |
|---|-------|--------|
| 1 | Browse sessions | Not Built (browsing UI exists, no playback) |
| 2 | Custom silent timer | Not Built |
| 3 | Ambient sounds | Not Built |
| 4 | Daily streak | Not Built |
| 5 | History & stats | Not Built |
| 6 | Schedule reminder | Partial |
| 7 | Missed-day nudge | Not Built |
| 8 | Browse by category | Partial |
| 9 | Offline downloads | Not Built |

What's genuinely built and working: account creation and login with real
credential checks, profile editing (name, email, username, age, country),
password change, favoriting, reminders with real scheduled notifications,
a drawer navigation shell across Home, Favorites, Reminders, and Settings,
and a Home/Detail UI matching the Figma design.

The core meditation experience itself — actually playing a session — is
the biggest gap right now, and most of what's left on this list depends
on that being built first.
