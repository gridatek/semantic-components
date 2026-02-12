# Video Player

Full-featured HTML5 video player with composable controls, keyboard shortcuts, and fullscreen support.

## Composable Architecture

The video player uses a **composable architecture** that gives you full control over layout and functionality.

### Basic Usage

```typescript
import {
  ScVideoPlayer,
  ScVideoPlayerVideo,
  ScVideoPlayerControls,
  ScVideoPlayerPlayButton,
  ScVideoPlayerProgress,
  ScVideoPlayerTime,
  ScVideoPlayerFullscreenButton,
} from '@semantic-components/ui-lab';

@Component({
  imports: [
    ScVideoPlayer,
    ScVideoPlayerVideo,
    ScVideoPlayerControls,
    ScVideoPlayerPlayButton,
    ScVideoPlayerProgress,
    ScVideoPlayerTime,
    ScVideoPlayerFullscreenButton,
  ],
  template: `
    <div sc-video-player class="relative bg-black rounded-lg overflow-hidden">
      <video
        sc-video-player-video
        [src]="'video.mp4'"
        [poster]="'poster.jpg'"
      ></video>

      <div sc-video-player-controls>
        <div sc-video-player-progress></div>
        <div class="flex items-center gap-2 mt-2">
          <button sc-video-player-play>
            <!-- Play/pause icon -->
          </button>
          <span sc-video-player-time></span>
          <button sc-video-player-fullscreen>
            <!-- Fullscreen icon -->
          </button>
        </div>
      </div>
    </div>
  `,
})
```

### Composable Components

**`ScVideoPlayer` (Directive)**

- Root directive that provides context
- **Selector**: `[sc-video-player]`
- Manages playback state, volume, fullscreen, etc.

**`ScVideoPlayerVideo` (Component)**

- Video element for playback
- **Selector**: `video[sc-video-player-video]`
- **Inputs**: `src`, `sources`, `tracks`, `poster`, `autoplay`, `loop`, `muted`, `playsInline`, `aspectRatio`
- **Outputs**: `ended`, `timeUpdate`

**`ScVideoPlayerControls` (Component)**

- Container for control elements (uses `<ng-content>`)
- **Selector**: `div[sc-video-player-controls]`
- **Default position**: Absolute bottom with gradient overlay

**`ScVideoPlayerPlayButton` (Component)**

- Play/pause toggle button
- **Selector**: `button[sc-video-player-play]`
- **Auto state**: Reflects playing/paused state

**`ScVideoPlayerProgress` (Component)**

- Seek bar with buffering indicator
- **Selector**: `div[sc-video-player-progress]`
- Shows buffered ranges and current progress

**`ScVideoPlayerVolume` (Component)**

- Volume control with mute button and slider
- **Selector**: `div[sc-video-player-volume]`
- Requires `[volume-icon]` selector for icon content

**`ScVideoPlayerTime` (Component)**

- Current time / duration display
- **Selector**: `span[sc-video-player-time]`
- Automatically formats time

**`ScVideoPlayerSkipButton` (Component)**

- Skip forward/back button
- **Selector**: `button[sc-video-player-skip]`
- **Inputs**: `seconds` (required), `ariaLabel`

**`ScVideoPlayerSpeedButton` (Component)**

- Playback speed menu
- **Selector**: `div[sc-video-player-speed]`
- **Inputs**: `speeds` (default: `[0.25, 0.5, 0.75, 1, 1.25, 1.5, 1.75, 2]`)

**`ScVideoPlayerFullscreenButton` (Component)**

- Fullscreen toggle
- **Selector**: `button[sc-video-player-fullscreen]`

**`ScVideoPlayerPipButton` (Component)**

- Picture-in-picture toggle
- **Selector**: `button[sc-video-player-pip]`

**`ScVideoPlayerBigPlayButton` (Component)**

- Large centered play button overlay
- **Selector**: `button[sc-video-player-big-play]`

**`ScVideoPlayerBuffering` (Component)**

- Buffering indicator (auto-shows when buffering)
- **Selector**: `div[sc-video-player-buffering]`
- Uses `<ng-content>` for custom spinner

### Flexible Examples

#### Minimal Player

```html
<div sc-video-player class="relative">
  <video sc-video-player-video [src]="video"></video>

  <div sc-video-player-controls>
    <button sc-video-player-play>Play</button>
  </div>
</div>
```

#### With Progress and Time

```html
<div sc-video-player class="relative">
  <video sc-video-player-video [src]="video"></video>

  <div sc-video-player-controls>
    <div sc-video-player-progress class="mb-2"></div>
    <div class="flex items-center gap-2">
      <button sc-video-player-play>⏯</button>
      <span sc-video-player-time></span>
    </div>
  </div>
</div>
```

#### Full-Featured Player

```html
<div sc-video-player class="relative bg-black rounded-lg overflow-hidden">
  <!-- Buffering Indicator -->
  <div sc-video-player-buffering>
    <div class="size-12 border-4 border-white/30 border-t-white rounded-full animate-spin"></div>
  </div>

  <!-- Video -->
  <video sc-video-player-video [src]="video" [poster]="poster"></video>

  <!-- Big Play Button -->
  @if (!player.isPlaying()) {
  <button sc-video-player-big-play #player="scVideoPlayer">
    <div class="size-20 rounded-full bg-white/90 flex items-center justify-center">
      <!-- Play icon -->
    </div>
  </button>
  }

  <!-- Controls -->
  <div sc-video-player-controls>
    <div sc-video-player-progress class="mb-2"></div>

    <div class="flex items-center gap-2">
      <button sc-video-player-play>⏯</button>
      <button sc-video-player-skip [seconds]="-10">⏪</button>
      <button sc-video-player-skip [seconds]="10">⏩</button>

      <div sc-video-player-volume>
        <svg volume-icon><!-- Volume icon --></svg>
      </div>

      <span sc-video-player-time class="ml-2"></span>

      <div class="flex-1"></div>

      <div sc-video-player-speed></div>
      <button sc-video-player-pip>PiP</button>
      <button sc-video-player-fullscreen>⛶</button>
    </div>
  </div>
</div>
```

#### Multiple Video Sources

```html
<video
  sc-video-player-video
  [sources]="[
    { src: 'video.webm', type: 'video/webm' },
    { src: 'video.mp4', type: 'video/mp4' }
  ]"
></video>
```

#### With Subtitles

```html
<video
  sc-video-player-video
  [src]="video"
  [tracks]="[
    { src: 'en.vtt', kind: 'subtitles', srclang: 'en', label: 'English', default: true },
    { src: 'es.vtt', kind: 'subtitles', srclang: 'es', label: 'Spanish' }
  ]"
></video>
```

## Types

```typescript
interface ScVideoSource {
  src: string;
  type?: string;
  label?: string;
}

interface ScVideoTrack {
  src: string;
  kind: 'subtitles' | 'captions' | 'descriptions' | 'chapters' | 'metadata';
  srclang: string;
  label: string;
  default?: boolean;
}
```

## Features

- ✅ Composable architecture for maximum flexibility
- ✅ Progress bar with buffering indicator
- ✅ Volume slider with mute toggle
- ✅ Playback speed selection
- ✅ Skip forward/back buttons
- ✅ Picture-in-picture support
- ✅ Fullscreen mode
- ✅ Keyboard navigation
- ✅ Multiple video sources
- ✅ Subtitle/caption support
- ✅ Buffering indicator
- ✅ Customizable controls layout

## Accessibility

- ARIA labels on all controls
- Keyboard navigable
- Screen reader friendly
- Focus indicators
- Semantic HTML structure
