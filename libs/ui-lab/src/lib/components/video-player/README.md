# Video Player

Full-featured HTML5 video player with composable controls, keyboard shortcuts, and fullscreen support.

## Composable Architecture

The video player uses a **composable architecture** that gives you full control over layout and functionality.

### Basic Usage

```typescript
import {
  ScVideoPlayer,
  ScVideoPlayerControls,
  ScVideoPlayerPlayPause,
  ScVideoPlayerProgress,
  ScVideoPlayerTime,
  ScVideoPlayerFullscreen,
} from '@semantic-components/ui-lab';

@Component({
  imports: [
    ScVideoPlayer,
    ScVideoPlayerControls,
    ScVideoPlayerPlayPause,
    ScVideoPlayerProgress,
    ScVideoPlayerTime,
    ScVideoPlayerFullscreen,
  ],
  template: `
    <div scVideoPlayer aria-label="Video player" #player="scVideoPlayer" [src]="'video.mp4'" [poster]="'poster.jpg'">
      <div scVideoPlayerControls>
        <div scVideoPlayerProgress>
      <input scVideoPlayerSeek aria-label="Video progress" />
    </div>
        <div scVideoPlayerToolbar>
          <button scVideoPlayerPlayPause [attr.aria-label]="player.isPlaying() ? 'Pause' : 'Play'">
            <!-- Play/pause icon -->
          </button>
          <span scVideoPlayerTime></span>
          <button scVideoPlayerFullscreen [attr.aria-label]="player.isFullscreen() ? 'Exit fullscreen' : 'Enter fullscreen'">
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

- Root component that renders the video and provides context
- **Selector**: `[scVideoPlayer]`
- **Inputs**: `src`, `poster`
- Manages playback state, volume, fullscreen, etc.

**`ScVideoPlayerControls`**

- Container for control elements (uses `<ng-content>`)
- **Selector**: `div[scVideoPlayerControls]`
- **Default position**: Absolute bottom with gradient overlay

**`ScVideoPlayerToolbar`**

- Flex container for control buttons
- **Selector**: `div[scVideoPlayerToolbar]`

**`ScVideoPlayerPlayPause`**

- Play/pause toggle button
- **Selector**: `button[scVideoPlayerPlayPause]`
- **Auto state**: Reflects playing/paused state

**`ScVideoPlayerProgress`**

- Seek bar with buffering indicator
- **Selector**: `div[scVideoPlayerProgress]`
- Shows what is buffered, under your `input[scVideoPlayerSeek]` (the seek slider: name it)

You write every control and name it (`aria-label`, or `[attr.aria-label]` from the player's state); the parts add the behaviour and styles.

**`ScVideoPlayerVolume`**

- The volume: holds `button[scVideoPlayerMute]` (mutes and unmutes, `aria-pressed` while muted — one name, "Mute") and `input[scVideoPlayerVolumeSlider]` (the volume, shown on hover or focus)
- **Selector**: `div[scVideoPlayerVolume]`

**`ScVideoPlayerTime`**

- Current time / duration display
- **Selector**: `span[scVideoPlayerTime]`
- Automatically formats time

**`ScVideoPlayerSkip`**

- Skip forward/back button
- **Selector**: `button[scVideoPlayerSkip]`
- **Inputs**: `seconds` (required) — name it with `aria-label`

**`ScVideoPlayerSpeedOption`**

- A playback speed in your menu (a popover of yours): `[scVideoPlayerSpeedOption]="1.5"` sets it, `aria-pressed` when it is the player's
- **Selector**: `button[scVideoPlayerSpeedOption]`

**`ScVideoPlayerFullscreen`**

- Fullscreen toggle
- **Selector**: `button[scVideoPlayerFullscreen]`

**`ScVideoPlayerPip`**

- Picture-in-picture toggle
- **Selector**: `button[scVideoPlayerPip]`

**`ScVideoPlayerBigPlay`**

- Large centered play button overlay
- **Selector**: `button[scVideoPlayerBigPlay]`
- Auto-hides when playing or buffering

**`ScVideoPlayerBufferingIndicator`**

- Buffering indicator directive
- **Selector**: `svg[scVideoPlayerBufferingIndicator]`
- Auto-hides when not buffering

**`ScVideoPlayerSpacer`**

- Flexible spacer for toolbar layout
- **Selector**: `div[scVideoPlayerSpacer]`

### Flexible Examples

#### Minimal Player

```html
<div scVideoPlayer aria-label="Video player" [src]="video">
  <div scVideoPlayerControls>
    <button scVideoPlayerPlayPause [attr.aria-label]="player.isPlaying() ? 'Pause' : 'Play'">Play</button>
  </div>
</div>
```

#### With Progress and Time

```html
<div scVideoPlayer aria-label="Video player" [src]="video">
  <div scVideoPlayerControls>
    <div scVideoPlayerProgress>
      <input scVideoPlayerSeek aria-label="Video progress" />
    </div>
    <div scVideoPlayerToolbar>
      <button scVideoPlayerPlayPause [attr.aria-label]="player.isPlaying() ? 'Pause' : 'Play'">⏯</button>
      <span scVideoPlayerTime></span>
    </div>
  </div>
</div>
```

#### Full-Featured Player

```html
<div scVideoPlayer aria-label="Video player" #player="scVideoPlayer" [src]="video" [poster]="poster">
  <svg scVideoPlayerBufferingIndicator siLoaderIcon></svg>

  <button scVideoPlayerBigPlay aria-label="Play video">
    <!-- Play icon -->
  </button>

  <div scVideoPlayerControls>
    <div scVideoPlayerProgress>
      <input scVideoPlayerSeek aria-label="Video progress" />
    </div>

    <div scVideoPlayerToolbar>
      <button scVideoPlayerPlayPause [attr.aria-label]="player.isPlaying() ? 'Pause' : 'Play'">⏯</button>
      <button scVideoPlayerSkip [seconds]="-10">⏪</button>
      <button scVideoPlayerSkip [seconds]="10">⏩</button>

      <div scVideoPlayerVolume>
        <button scVideoPlayerMute aria-label="Mute"><!-- your icon, from player.isMuted() --></button>
        <input scVideoPlayerVolumeSlider aria-label="Volume" />
      </div>

      <span scVideoPlayerTime class="ml-2"></span>

      <div scVideoPlayerSpacer></div>

      <div scPopoverProvider side="top">
        <button scButton scPopoverTrigger variant="ghost" size="icon" aria-label="Playback speed">{{ player.playbackRate() }}×</button>
        <ng-template scPopoverPortal>
          <div scPopover aria-label="Playback speed">
            @for (speed of [0.5, 1, 1.5, 2]; track speed) {
            <button [scVideoPlayerSpeedOption]="speed">{{ speed }}×</button>
            }
          </div>
        </ng-template>
      </div>
      <button scVideoPlayerPip aria-label="Picture in picture">PiP</button>
      <button scVideoPlayerFullscreen [attr.aria-label]="player.isFullscreen() ? 'Exit fullscreen' : 'Enter fullscreen'">⛶</button>
    </div>
  </div>
</div>
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

- Composable architecture for maximum flexibility
- Progress bar with buffering indicator
- Volume slider with mute toggle
- Playback speed selection
- Skip forward/back buttons
- Picture-in-picture support
- Fullscreen mode
- Keyboard navigation
- Multiple video sources
- Subtitle/caption support
- Buffering indicator
- Customizable controls layout

## Accessibility

- ARIA labels on all controls
- Keyboard navigable
- Screen reader friendly
- Focus indicators
- Semantic HTML structure
