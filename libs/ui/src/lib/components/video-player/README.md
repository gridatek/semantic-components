# Video Player

Your `<video>` and its tracks, controls as parts, its state two ways — with captions shown by the player, chapters and a preview on the seek bar, keyboard shortcuts, and the system's media controls.

## Architecture

```
scVideoPlayer (paused, currentTime, volume, muted, playbackRate, captions — two-way;
│                  duration, buffered, waiting, ended, fullscreen, pictureInPicture, tracks, chapters, chapter, cues, preview)
├── video[scVideoPlayerMedia] — yours: src / <source>s, poster, <track>s
├── scVideoPlayerCaptionsDisplay — the captions, above the controls
├── scVideoPlayerTop — the top bar of a small player: captions
├── scVideoPlayerCenter — play over the video (small player; paused)
└── scVideoPlayerControls — hides while playing untouched
    ├── scVideoPlayerProgress → input[scVideoPlayerSeek], scVideoPlayerPreview
    └── scVideoPlayerBar → buttons: Play, Skip, Mute, Captions, Rate,
        PictureInPicture, Fullscreen; input[scVideoPlayerVolume];
        time[scVideoPlayerTime], span[scVideoPlayerTimeSeparator]
```

## Usage

```html
<div scVideoPlayer #player="scVideoPlayer" aria-label="Video: Sintel, the trailer" class="aspect-video">
  <video scVideoPlayerMedia src="/sintel-trailer.mp4" poster="/sintel-trailer.jpg">
    <track kind="captions" src="/sintel-trailer.en.vtt" srclang="en" label="English" />
    <track kind="chapters" src="/sintel-trailer.chapters.vtt" srclang="en" />
  </video>
  <div scVideoPlayerCaptionsDisplay></div>

  <div scVideoPlayerTop>
    <button scVideoPlayerCaptions><svg siCaptionsIcon></svg><span class="sr-only">Captions</span></button>
  </div>
  <div scVideoPlayerCenter>
    <button scVideoPlayerPlay><svg siPlayIcon></svg><span class="sr-only">{{ player.paused() ? 'Play' : 'Pause' }}</span></button>
  </div>

  <div scVideoPlayerControls>
    <div scVideoPlayerProgress>
      <input scVideoPlayerSeek aria-label="Seek" [attr.aria-valuetext]="player.formatTime(player.currentTime()) + ' of ' + player.formatTime(player.duration())" />
      @if (player.preview(); as preview) {
      <div scVideoPlayerPreview>{{ player.chapterAt(preview.time)?.title }} {{ player.formatTime(preview.time) }}</div>
      }
    </div>
    <div scVideoPlayerBar>
      <button scVideoPlayerPlay><svg siPlayIcon></svg><span class="sr-only">{{ player.paused() ? 'Play' : 'Pause' }}</span></button>
      <button scVideoPlayerMute><svg siVolume2Icon></svg><span class="sr-only">Mute</span></button>
      <input scVideoPlayerVolume aria-label="Volume" />
      <time scVideoPlayerTime="current"></time>
      <span scVideoPlayerTimeSeparator>/</span>
      <time scVideoPlayerTime="duration"></time>
      <button scVideoPlayerCaptions><svg siCaptionsIcon></svg><span class="sr-only">Captions</span></button>
      <button scVideoPlayerFullscreen><svg siMaximizeIcon></svg><span class="sr-only">Fullscreen</span></button>
    </div>
  </div>
</div>
```

## State

Two-way: `paused`, `currentTime`, `volume`, `muted`, `playbackRate`, `captions` (a track's id, or `null`). Read: `duration`, `buffered`, `waiting`, `ended`, `fullscreen`, `pictureInPicture`, `idle`, `tracks()` (captions and subtitles), `chapters()`, `chapter()` (the one playing), `cues()`, `preview()`. Methods: `toggle()`, `seekTo()`, `seekBy()`, `volumeBy()`, `toggleCaptions()`, `toggleFullscreen()`, `togglePictureInPicture()`, `formatTime()` (a time in the app's language), `chapterAt()`. `metadata` (`MediaMetadataInit`) shows in the system's media controls, whose keys play, pause and seek.

## Small players

The player is a container (`@container/video`), and its parts fit themselves to its width — the template stays the same. Below 576px, as in Vidstack's small layout:

- `scVideoPlayerTop` shows at the top, with captions; `scVideoPlayerCenter` shows play in the middle. On a wide player the top bar isn't there, and the center shows only while paused.
- In `scVideoPlayerBar`, play steps aside when the player has a center, captions when it has a top bar. Without them, they stay.
- The skips, mute, the volume slider, the speeds and picture-in-picture step aside: the bar keeps the time, the title and fullscreen, and the seek bar goes under it, at the player's bottom edge.

No JavaScript measures it, so the first render — and the server's — is already right. To build something only where the player is wide enough, `scResizeObserver` gives its width as a signal.

**Volume on iPhone and iPad:** Safari doesn't let a page set the volume — the device's buttons do. There the volume slider (and ↑ / ↓) has no effect; mute works.

## Keyboard

Focused in the player (never page-wide): Space or K play / pause, J / L ±10 s, ← / → ±5 s, ↑ / ↓ volume, M mute, F fullscreen, C captions, 0–9 jump to that tenth, Home / End. Fields keep their keys; buttons keep Space and Enter.

## Accessibility

- Name the player (`aria-label`), every button (visually hidden text) and the sliders; write the seek slider's `aria-valuetext` with `formatTime()`.
- Captions are shown by the player — a polite live region, above the controls, never hidden by them; the browser's own rendering is off.
- Toggles (mute, captions, a speed, fullscreen, picture-in-picture) are `aria-pressed`.
- The controls hide only while playing untouched — never while focused in them, or paused.

## Styling

Over the video, the parts are white: the preset's buttons (`ghost`, `icon-sm`), sliders recoloured. Restyle from their classes.

## Not here

Streaming (HLS, DASH: bring hls.js or shaka-player and attach it to the video), ads, quality switching, YouTube or Vimeo embeds.
