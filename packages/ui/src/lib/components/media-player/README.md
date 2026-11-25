# Media Player

Your `<video>` or `<audio>`, with controls as parts that fit the player's width — its state two ways, captions, chapters, a preview on the seek bar, keyboard shortcuts, and the system's media controls. The name and the loop and speed keys after Dice UI's Media Player; the small layout after Vidstack's. It replaced the Video Player (2026-11-22).

## Architecture

```
[scMediaPlayer] (paused, currentTime, volume, muted, playbackRate, loop, captions — two-way;
│                metadata — in; kind, duration, buffered, waiting, ended, error, started,
│                fullscreen, pictureInPicture, idle, tracks, chapters, chapter, cues, preview — read)
├── video[scMediaPlayerMedia] / audio[scMediaPlayerMedia] — yours: src / <source>s, poster, <track>s
├── div[scMediaPlayerCaptionsDisplay] — the captions, over the video
├── button[scMediaPlayerPlay] — outside the controls: in the middle of the video
└── [scMediaPlayerControls] — one row that wraps; over a video, hides while it plays untouched
    ├── input[scMediaPlayerSeek] — a row of its own; loaded and chapters on its track
    ├── [scMediaPlayerPreview] — your text above it, where the pointer is
    ├── div[scMediaPlayerWaveform] — or the media as bars: a seek bar for audio
    ├── buttons: Play, Skip ([scMediaPlayerSkip]="-10"), Mute, Rate ([scMediaPlayerRate]="1.5"),
    │   Loop, Captions, PictureInPicture, Fullscreen
    ├── input[scMediaPlayerVolume]
    └── time[scMediaPlayerTime] — current (default), "duration", "remaining"
```

What isn't a part is your markup, from the player's state: a spinner (`@if (player.waiting())`), an error and its way out (`@if (player.error())`, `player.reload()`), the length before the first play (`@if (!player.started())`), the separator between two times, a spacer (`class="flex-1"`), a download link (`<a download>`).

## Usage

```html
<div scMediaPlayer #player="scMediaPlayer" aria-label="Video: Sintel" class="aspect-video">
  <video scMediaPlayerMedia src="/sintel.mp4" poster="/sintel.jpg">
    <track kind="captions" src="/sintel-en.vtt" srclang="en" label="English" />
    <track kind="chapters" src="/sintel-chapters.vtt" srclang="en" />
  </video>
  <div scMediaPlayerCaptionsDisplay></div>
  <button scMediaPlayerPlay><svg siPlayIcon></svg><span class="sr-only">Play</span></button>
  <div scMediaPlayerControls>
    <input scMediaPlayerSeek aria-label="Seek" />
    <button scMediaPlayerPlay><svg siPlayIcon></svg><span class="sr-only">Play</span></button>
    <button scMediaPlayerMute><svg siVolume2Icon></svg><span class="sr-only">Mute</span></button>
    <input scMediaPlayerVolume aria-label="Volume" />
    <time scMediaPlayerTime class="me-auto"></time>
    <button scMediaPlayerCaptions><svg siCaptionsIcon></svg><span class="sr-only">Captions</span></button>
    <button scMediaPlayerFullscreen><svg siMaximizeIcon></svg><span class="sr-only">Fullscreen</span></button>
  </div>
</div>
```

## Waveform

`div[scMediaPlayerWaveform]`: the file playing (`player.src()`), read with Web Audio and drawn as `bars` (64), the part played filled — read again when another file plays. A slider: click or drag to seek; ← / → five seconds (as the text reads), Page Up / Page Down ten, Home, End; its value reads as the time. Without Web Audio (or a file it can't read, as another origin without CORS), its bars are flat and it still seeks. Its corners are the style's (`mediaPlayer.waveform`). Songs one after another: the [Playlist recipe](../../../../../../apps/showcase/src/app/pages/docs/playlist/playlist-page.ts).

## Small players

The player is a container (`@container/media`), and the parts fit themselves to its width — one template, no script measuring it (the server's render is already right). In two steps: under 42rem (a video) or 28rem (an audio bar) the speeds and loop step aside; under 36rem or 24rem, the small layout:

- A play outside the controls sits in the middle of the video; the controls' play steps aside. Wide, the middle play shows only while paused. With one, the controls wait for the first play.
- The seek bar goes to the video's bottom edge.
- The skips, picture-in-picture, the volume and — over a video — mute step aside too. The time, captions and fullscreen stay; the controls' row never overflows (checked in every style, from 300px).

## State

Two-way: `paused`, `currentTime`, `volume`, `muted`, `playbackRate`, `loop`, `captions` (a track's id, or `null`). Read: `kind`, `src`, `duration`, `buffered`, `waiting`, `ended`, `error`, `started`, `fullscreen`, `pictureInPicture`, `idle`, `tracks()`, `chapters()`, `chapter()`, `cues()`, `preview()`. Methods: `toggle()`, `seekTo()`, `seekBy()`, `volumeBy()`, `rateBy()`, `toggleCaptions()`, `toggleFullscreen()`, `togglePictureInPicture()`, `toggleControls()`, `reload()`, `formatTime()` (in the app's language), `chapterAt()`. `metadata` shows in the system's media controls, whose keys play, pause and seek.

## Keyboard

Focused in the player (never page-wide): Space or K play / pause, J / L ±10 s, ← / → ±5 s, ↑ / ↓ volume, M mute, R loop, < / > speed, C captions, F fullscreen, P picture-in-picture, 0–9 jump to that tenth, Home / End. Fields keep their keys; buttons keep Space and Enter. On the seek bar the arrows move five seconds (as the text reads), Page Up / Page Down ten.

## Accessibility

- Name the player, every button (visually hidden text) and the sliders. The seek bar reads its time ("0:15"); your words in `aria-valuetext`.
- Toggles (mute, loop, captions, a speed, fullscreen, picture-in-picture) are `aria-pressed`.
- Captions are shown by the player — a polite live region above the controls; the browser's own are off.
- The controls hide only while a video plays untouched — never while focused in them, or paused. On a touch screen, once played, a tap on the video shows or hides them; a mouse click plays or pauses.

## Styling

The style's `mediaPlayer` key: the frame (as its Card's: corners, ring, shadow), an audio card's padding and text (the Card's at size sm), the controls' padding (clear of the frame's corner), the preview's corners (its Tooltip's), a caption's (frameXs). Over a video the parts are white: the style's buttons (`ghost`, `icon-sm`; the middle play with the button's corners), its sliders recoloured; the preview is its Tooltip's look. Restyle from their classes; `--sc-media-player-track` holds the seek bar's layers.

## Not here

Streaming (HLS, DASH: attach hls.js or shaka-player to the video), quality switching, a settings menu (your Menu with Rate buttons in it), thumbnails on the seek bar, ads, YouTube or Vimeo embeds, a playlist (your state: the Playlist recipe).

## References

What it took from Vidstack, Media Chrome and Dice UI, and what is still open: [docs/reference-libraries.md](../../../../../../docs/reference-libraries.md#media-player).
