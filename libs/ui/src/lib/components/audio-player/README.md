# Audio Player

Your `<audio>`, a playlist of your own tracks, controls as parts, its state two ways — with a waveform, shuffle and repeat, keyboard shortcuts, and the system's media controls.

## Architecture

```
scAudioPlayer (paused, currentTime, volume, muted, playbackRate, track, shuffle, repeat — two-way;
│                  tracks, metadata — in; duration, buffered, waiting, ended, current, upcoming — read)
├── audio[scAudioPlayerMedia] — yours: the player gives it each track's file (or give it a src)
├── div[scAudioPlayerWaveform] — the track as bars: a slider that seeks
├── input[scAudioPlayerSeek], input[scAudioPlayerVolume] — sliders
├── time[scAudioPlayerTime] — "current", "duration" or "remaining"
└── buttons: Play, PreviousTrack, NextTrack, Skip, Mute, Shuffle, Repeat, Rate
```

## Usage

```html
<div scAudioPlayer #player="scAudioPlayer" aria-label="Player" [tracks]="songs" [(track)]="track">
  <audio scAudioPlayerMedia preload="metadata"></audio>

  <p>{{ player.current()?.title }}</p>
  <div scAudioPlayerWaveform aria-label="Seek" [attr.aria-valuetext]="player.formatTime(player.currentTime()) + ' of ' + player.formatTime(player.duration())"></div>
  <time scAudioPlayerTime="current"></time> <time scAudioPlayerTime="remaining"></time>

  <button scAudioPlayerPreviousTrack><svg siSkipBackIcon></svg><span class="sr-only">Previous track</span></button>
  <button scAudioPlayerPlay><svg siPlayIcon></svg><span class="sr-only">{{ player.paused() ? 'Play' : 'Pause' }}</span></button>
  <button scAudioPlayerNextTrack><svg siSkipForwardIcon></svg><span class="sr-only">Next track</span></button>
  <button scAudioPlayerRepeat><svg siRepeatIcon></svg><span class="sr-only">Repeat: {{ player.repeat() }}</span></button>
</div>
```

`tracks` is your list: any objects with a `src` — `player.current()` is the one playing, with your fields (title, artist, cover…). One file needs no playlist: `<audio scAudioPlayerMedia src="/voice.mp3">`.

## State

Two-way: `paused`, `currentTime`, `volume`, `muted`, `playbackRate`, `track` (its place in `tracks`), `shuffle`, `repeat` (`'off' | 'all' | 'one'`). Read: `duration`, `buffered`, `waiting`, `ended`, `current()`, `upcoming()` (the next track, or `null`). Methods: `toggle()`, `play(index)`, `nextTrack()`, `previousTrack()` (the start, or — within 3 s of it — the track before), `seekTo()`, `seekBy()`, `volumeBy()`, `formatTime()`. `metadata` (`MediaMetadataInit`) shows in the system's media controls, whose keys play, pause, seek and change track.

At a track's end: the next plays; after the last, it stops — or starts again with `repeat: 'all'`; `repeat: 'one'` plays the track again. Shuffled, each track plays once, in a random order.

## Waveform

The track's file, read with Web Audio, drawn as `bars` (64) — the part played filled. A slider: click or drag to seek; ← → 5 s, Page Up / Down 10 s, Home, End. Without Web Audio, its bars are flat, and it still seeks.

## Keyboard

Focused in the player: Space or K play / pause, J / L ±10 s, ← / → ±5 s, ↑ / ↓ volume, M mute, N / P next / previous track, 0–9 jump to that tenth, Home / End. Fields and sliders keep their keys; buttons keep Space and Enter.

## Accessibility

- Name the player (`aria-label`), every button (visually hidden text) and the sliders; write the seek's (or the waveform's) `aria-valuetext` with `formatTime()`.
- Mute, Shuffle and a speed are `aria-pressed`. Repeat has three modes, so it isn't: write its name from `player.repeat()` ("Repeat: all"), its `data-state` is the mode.
- Next track is disabled after the last track (unless repeating them all).

## Not here

Streaming (HLS), embeds (SoundCloud, Spotify), an equalizer, gapless playback, waveforms from precomputed peaks.
