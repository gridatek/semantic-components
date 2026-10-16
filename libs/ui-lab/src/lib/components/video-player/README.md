# Video Player

Your `<video>` and its tracks, controls as parts, its state two ways — with captions shown by the player, chapters and a preview on the seek bar, keyboard shortcuts, and the system's media controls.

## Architecture

```
scVideoPlayer (paused, currentTime, volume, muted, playbackRate, captions — two-way;
│                  duration, buffered, waiting, ended, fullscreen, pictureInPicture, tracks, chapters, chapter, cues, preview)
├── video[scVideoPlayerMedia] — yours: src / <source>s, poster, <track>s
├── scVideoPlayerCaptionsDisplay — the captions, above the controls
└── scVideoPlayerControls — hides while playing untouched
    ├── scVideoPlayerProgress → input[scVideoPlayerSeek], scVideoPlayerPreview
    └── buttons: Play, Skip, Mute, Captions, Rate, PictureInPicture, Fullscreen;
        input[scVideoPlayerVolume]; time[scVideoPlayerTime]
```

## Usage

```html
<div scVideoPlayer #player="scVideoPlayer" aria-label="Video: Sintel, the trailer" class="aspect-video">
  <video scVideoPlayerMedia src="/sintel-trailer.mp4" poster="/sintel-trailer.jpg">
    <track kind="captions" src="/sintel-trailer.en.vtt" srclang="en" label="English" />
    <track kind="chapters" src="/sintel-trailer.chapters.vtt" srclang="en" />
  </video>
  <div scVideoPlayerCaptionsDisplay></div>

  <div scVideoPlayerControls>
    <div scVideoPlayerProgress>
      <input scVideoPlayerSeek aria-label="Seek" [attr.aria-valuetext]="player.formatTime(player.currentTime()) + ' of ' + player.formatTime(player.duration())" />
      @if (player.preview(); as preview) {
      <div scVideoPlayerPreview>{{ player.chapterAt(preview.time)?.title }} {{ player.formatTime(preview.time) }}</div>
      }
    </div>
    <div class="flex items-center gap-1">
      <button scVideoPlayerPlay><svg siPlayIcon></svg><span class="sr-only">{{ player.paused() ? 'Play' : 'Pause' }}</span></button>
      <time scVideoPlayerTime="current"></time> / <time scVideoPlayerTime="duration"></time>
      <button scVideoPlayerCaptions><svg siCaptionsIcon></svg><span class="sr-only">Captions</span></button>
      <button scVideoPlayerFullscreen><svg siMaximizeIcon></svg><span class="sr-only">Fullscreen</span></button>
    </div>
  </div>
</div>
```

## State

Two-way: `paused`, `currentTime`, `volume`, `muted`, `playbackRate`, `captions` (a track's id, or `null`). Read: `duration`, `buffered`, `waiting`, `ended`, `fullscreen`, `pictureInPicture`, `idle`, `tracks()` (captions and subtitles), `chapters()`, `chapter()` (the one playing), `cues()`, `preview()`. Methods: `toggle()`, `seekTo()`, `seekBy()`, `volumeBy()`, `toggleCaptions()`, `toggleFullscreen()`, `togglePictureInPicture()`, `formatTime()` (a time in the app's language), `chapterAt()`. `metadata` (`MediaMetadataInit`) shows in the system's media controls, whose keys play, pause and seek.

## Keyboard

Focused in the player (never page-wide): Space or K play / pause, J / L ±10 s, ← / → ±5 s, ↑ / ↓ volume, M mute, F fullscreen, C captions, 0–9 jump to that tenth, Home / End. Fields keep their keys; buttons keep Space and Enter.

## Accessibility

- Name the player (`aria-label`), every button (visually hidden text) and the sliders; write the seek slider's `aria-valuetext` with `formatTime()`.
- Captions are shown by the player — a polite live region, above the controls, never hidden by them; the browser's own rendering is off.
- Toggles (mute, captions, a speed, fullscreen, picture-in-picture) are `aria-pressed`.
- The controls hide only while playing untouched — never while focused in them, or paused.

## Styling

Over the video, the parts are white: buttons from `buttonVariants()` (`ghost`, `icon-sm`), sliders recoloured. Restyle from their classes.

## Not here

Streaming (HLS, DASH: bring hls.js or shaka-player and attach it to the video), ads, quality switching, YouTube or Vimeo embeds.
