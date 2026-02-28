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
  ScVideoPlayerPlayPause,
  ScVideoPlayerProgress,
  ScVideoPlayerTime,
  ScVideoPlayerFullscreen,
} from '@semantic-components/ui-lab';

@Component({
  imports: [
    ScVideoPlayer,
    ScVideoPlayerVideo,
    ScVideoPlayerControls,
    ScVideoPlayerPlayPause,
    ScVideoPlayerProgress,
    ScVideoPlayerTime,
    ScVideoPlayerFullscreen,
  ],
  template: `
    <div scVideoPlayer>
      <video
        scVideoPlayerVideo
        [src]="'video.mp4'"
        [poster]="'poster.jpg'"
      ></video>

      <div scVideoPlayerControls>
        <div scVideoPlayerProgress></div>
        <div class="flex items-center gap-2 mt-2">
          <button scVideoPlayerPlayPause>
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

**`ScVideoPlayer`**

- Root directive that provides context
- **Selector**: `[scVideoPlayer]`
- Manages playback state, volume, fullscreen, etc.

**`ScVideoPlayerVideo`**

- Video element for playback
- **Selector**: `video[scVideoPlayerVideo]`
- **Inputs**: `src`, `sources`, `tracks`, `poster`, `autoplay`, `loop`, `muted`, `playsInline`, `aspectRatio`
- **Outputs**: `ended`, `timeUpdate`

**`ScVideoPlayerControls`**

- Container for control elements (uses `<ng-content>`)
- **Selector**: `div[scVideoPlayerControls]`
- **Default position**: Absolute bottom with gradient overlay

**`ScVideoPlayerPlayPause`**

- Play/pause toggle button
- **Selector**: `button[scVideoPlayerPlayPause]`
- **Auto state**: Reflects playing/paused state

**`ScVideoPlayerProgress`**

- Seek bar with buffering indicator
- **Selector**: `div[scVideoPlayerProgress]`
- Shows buffered ranges and current progress

**`ScVideoPlayerVolume`**

- Volume control with mute button and slider
- **Selector**: `div[scVideoPlayerVolume]`
- Requires `[volume-icon]` selector for icon content

**`ScVideoPlayerTime`**

- Current time / duration display
- **Selector**: `span[scVideoPlayerTime]`
- Automatically formats time

**`ScVideoPlayerSkip`**

- Skip forward/back button
- **Selector**: `button[scVideoPlayerSkip]`
- **Inputs**: `seconds` (required), `ariaLabel`

**`ScVideoPlayerSpeed`**

- Playback speed menu
- **Selector**: `div[scVideoPlayerSpeed]`
- **Inputs**: `speeds` (default: `[0.25, 0.5, 0.75, 1, 1.25, 1.5, 1.75, 2]`)

**`ScVideoPlayerFullscreen`**

- Fullscreen toggle
- **Selector**: `button[scVideoPlayerFullscreen]`

**`ScVideoPlayerPip`**

- Picture-in-picture toggle
- **Selector**: `button[scVideoPlayerPip]`

**`ScVideoPlayerBigPlay`**

- Large centered play button overlay
- **Selector**: `button[scVideoPlayerBigPlay]`

**`ScVideoPlayerBufferingIndicator`**

- Buffering indicator (auto-shows when buffering)
- **Selector**: `div[scVideoPlayerBufferingIndicator]`
- Uses `<ng-content>` for custom spinner

### Flexible Examples

#### Minimal Player

```html
<div scVideoPlayer>
  <video scVideoPlayerVideo [src]="video"></video>

  <div scVideoPlayerControls>
    <button scVideoPlayerPlayPause>Play</button>
  </div>
</div>
```

#### With Progress and Time

```html
<div scVideoPlayer>
  <video scVideoPlayerVideo [src]="video"></video>

  <div scVideoPlayerControls>
    <div scVideoPlayerProgress class="mb-2"></div>
    <div class="flex items-center gap-2">
      <button scVideoPlayerPlayPause>⏯</button>
      <span scVideoPlayerTime></span>
    </div>
  </div>
</div>
```

#### Full-Featured Player

```html
<div scVideoPlayer>
  <!-- Buffering Indicator -->
  <div scVideoPlayerBufferingIndicator>
    <div class="size-12 animate-spin rounded-full border-4 border-white/30 border-t-white"></div>
  </div>

  <!-- Video -->
  <video scVideoPlayerVideo [src]="video" [poster]="poster"></video>

  <!-- Big Play Button -->
  @if (!player.isPlaying()) {
  <button scVideoPlayerBigPlay #player="scVideoPlayer">
    <!-- Play icon -->
  </button>
  }

  <!-- Controls -->
  <div scVideoPlayerControls>
    <div scVideoPlayerProgress class="mb-2"></div>

    <div class="flex items-center gap-2">
      <button scVideoPlayerPlayPause>⏯</button>
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
