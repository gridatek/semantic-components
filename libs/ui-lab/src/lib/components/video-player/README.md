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
    <div scVideoPlayer class="relative bg-black rounded-lg overflow-hidden">
      <video
        scVideoPlayerVideo
        [src]="'video.mp4'"
        [poster]="'poster.jpg'"
      ></video>

      <div scVideoPlayerControls>
        <div scVideoPlayerProgress></div>
        <div class="flex items-center gap-2 mt-2">
          <button scVideoPlayerPlay>
            <!-- Play/pause icon -->
          </button>
          <span scVideoPlayerTime></span>
          <button scVideoPlayerFullscreen>
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
- **Selector**: `[scVideoPlayer]`
- Manages playback state, volume, fullscreen, etc.

**`ScVideoPlayerVideo` (Component)**

- Video element for playback
- **Selector**: `video[scVideoPlayerVideo]`
- **Inputs**: `src`, `sources`, `tracks`, `poster`, `autoplay`, `loop`, `muted`, `playsInline`, `aspectRatio`
- **Outputs**: `ended`, `timeUpdate`

**`ScVideoPlayerControls` (Component)**

- Container for control elements (uses `<ng-content>`)
- **Selector**: `div[scVideoPlayerControls]`
- **Default position**: Absolute bottom with gradient overlay

**`ScVideoPlayerPlayButton` (Component)**

- Play/pause toggle button
- **Selector**: `button[scVideoPlayerPlay]`
- **Auto state**: Reflects playing/paused state

**`ScVideoPlayerProgress` (Component)**

- Seek bar with buffering indicator
- **Selector**: `div[scVideoPlayerProgress]`
- Shows buffered ranges and current progress

**`ScVideoPlayerVolume` (Component)**

- Volume control with mute button and slider
- **Selector**: `div[scVideoPlayerVolume]`
- Requires `[volume-icon]` selector for icon content

**`ScVideoPlayerTime` (Component)**

- Current time / duration display
- **Selector**: `span[scVideoPlayerTime]`
- Automatically formats time

**`ScVideoPlayerSkipButton` (Component)**

- Skip forward/back button
- **Selector**: `button[scVideoPlayerSkip]`
- **Inputs**: `seconds` (required), `ariaLabel`

**`ScVideoPlayerSpeedButton` (Component)**

- Playback speed menu
- **Selector**: `div[scVideoPlayerSpeed]`
- **Inputs**: `speeds` (default: `[0.25, 0.5, 0.75, 1, 1.25, 1.5, 1.75, 2]`)

**`ScVideoPlayerFullscreenButton` (Component)**

- Fullscreen toggle
- **Selector**: `button[scVideoPlayerFullscreen]`

**`ScVideoPlayerPipButton` (Component)**

- Picture-in-picture toggle
- **Selector**: `button[scVideoPlayerPip]`

**`ScVideoPlayerBigPlayButton` (Component)**

- Large centered play button overlay
- **Selector**: `button[scVideoPlayerBigPlay]`

**`ScVideoPlayerBuffering` (Component)**

- Buffering indicator (auto-shows when buffering)
- **Selector**: `div[scVideoPlayerBuffering]`
- Uses `<ng-content>` for custom spinner

### Flexible Examples

#### Minimal Player

```html
<div scVideoPlayer class="relative">
  <video scVideoPlayerVideo [src]="video"></video>

  <div scVideoPlayerControls>
    <button scVideoPlayerPlay>Play</button>
  </div>
</div>
```

#### With Progress and Time

```html
<div scVideoPlayer class="relative">
  <video scVideoPlayerVideo [src]="video"></video>

  <div scVideoPlayerControls>
    <div scVideoPlayerProgress class="mb-2"></div>
    <div class="flex items-center gap-2">
      <button scVideoPlayerPlay>⏯</button>
      <span scVideoPlayerTime></span>
    </div>
  </div>
</div>
```

#### Full-Featured Player

```html
<div scVideoPlayer class="relative bg-black rounded-lg overflow-hidden">
  <!-- Buffering Indicator -->
  <div scVideoPlayerBuffering>
    <div class="size-12 border-4 border-white/30 border-t-white rounded-full animate-spin"></div>
  </div>

  <!-- Video -->
  <video scVideoPlayerVideo [src]="video" [poster]="poster"></video>

  <!-- Big Play Button -->
  @if (!player.isPlaying()) {
  <button scVideoPlayerBigPlay #player="scVideoPlayer">
    <div class="size-20 rounded-full bg-white/90 flex items-center justify-center">
      <!-- Play icon -->
    </div>
  </button>
  }

  <!-- Controls -->
  <div scVideoPlayerControls>
    <div scVideoPlayerProgress class="mb-2"></div>

    <div class="flex items-center gap-2">
      <button scVideoPlayerPlay>⏯</button>
      <button scVideoPlayerSkip [seconds]="-10">⏪</button>
      <button scVideoPlayerSkip [seconds]="10">⏩</button>

      <div scVideoPlayerVolume>
        <svg volume-icon><!-- Volume icon --></svg>
      </div>

      <span scVideoPlayerTime class="ml-2"></span>

      <div class="flex-1"></div>

      <div scVideoPlayerSpeed></div>
      <button scVideoPlayerPip>PiP</button>
      <button scVideoPlayerFullscreen>⛶</button>
    </div>
  </div>
</div>
```

#### Multiple Video Sources

```html
<video
  scVideoPlayerVideo
  [sources]="[
    { src: 'video.webm', type: 'video/webm' },
    { src: 'video.mp4', type: 'video/mp4' }
  ]"
></video>
```

#### With Subtitles

```html
<video
  scVideoPlayerVideo
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
