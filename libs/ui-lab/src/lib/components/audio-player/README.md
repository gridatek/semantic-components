# Audio Player

Feature-rich composable audio player with playlist support, shuffle, repeat, and volume controls.

## Architecture

The audio player follows the composable architecture pattern, allowing full customization of layout and controls.

```
ScAudioPlayer (Root - State Management)
    ├── ScAudioPlayerAudio (Hidden audio element)
    ├── ScAudioPlayerCover (Album artwork)
    ├── ScAudioPlayerInfo (Track title/artist)
    ├── ScAudioPlayerProgress (Seekable progress bar)
    ├── ScAudioPlayerPlayButton (Play/pause)
    ├── ScAudioPlayerPrevious (Previous track)
    ├── ScAudioPlayerNext (Next track)
    ├── ScAudioPlayerShuffle (Shuffle toggle)
    ├── ScAudioPlayerRepeat (Repeat mode)
    └── ScAudioPlayerVolume (Volume slider + mute)
```

## Components

| Component                 | Selector                              | Description                    |
| ------------------------- | ------------------------------------- | ------------------------------ |
| `ScAudioPlayer`           | `[scAudioPlayer]`                   | Root directive (state manager) |
| `ScAudioPlayerAudio`      | `audio[scAudioPlayerAudio]`        | Hidden audio element           |
| `ScAudioPlayerCover`      | `div[scAudioPlayerCover]`          | Album artwork display          |
| `ScAudioPlayerInfo`       | `div[scAudioPlayerInfo]`           | Track title and artist         |
| `ScAudioPlayerProgress`   | `div[scAudioPlayerProgress]`       | Progress bar with seek         |
| `ScAudioPlayerPlayButton` | `button[scAudioPlayerPlayButton]` | Play/pause button              |
| `ScAudioPlayerPrevious`   | `button[scAudioPlayerPrevious]`    | Previous track button          |
| `ScAudioPlayerNext`       | `button[scAudioPlayerNext]`        | Next track button              |
| `ScAudioPlayerShuffle`    | `button[scAudioPlayerShuffle]`     | Shuffle toggle                 |
| `ScAudioPlayerRepeat`     | `button[scAudioPlayerRepeat]`      | Repeat cycle button            |
| `ScAudioPlayerVolume`     | `div[scAudioPlayerVolume]`         | Volume slider + mute           |

## API

### ScAudioTrack

```typescript
interface ScAudioTrack {
  src: string;
  title?: string;
  artist?: string;
  cover?: string;
  duration?: number;
}
```

### ScAudioPlayer

| Input      | Type             | Default | Description           |
| ---------- | ---------------- | ------- | --------------------- |
| `tracks`   | `ScAudioTrack[]` | `[]`    | Array of audio tracks |
| `autoplay` | `boolean`        | `false` | Auto-play on load     |

| Model          | Type                       | Default  | Description         |
| -------------- | -------------------------- | -------- | ------------------- |
| `currentIndex` | `number`                   | `0`      | Current track index |
| `volume`       | `number`                   | `1`      | Volume level (0-1)  |
| `shuffle`      | `boolean`                  | `false`  | Shuffle mode        |
| `repeat`       | `'none' \| 'one' \| 'all'` | `'none'` | Repeat mode         |

| Output        | Type           | Description                |
| ------------- | -------------- | -------------------------- |
| `trackChange` | `ScAudioTrack` | Emits when track changes   |
| `play`        | `void`         | Emits when playback starts |
| `pause`       | `void`         | Emits when playback pauses |
| `ended`       | `void`         | Emits when track ends      |

## Usage

### Basic Usage

```typescript
readonly tracks: ScAudioTrack[] = [
  {
    src: '/audio/song1.mp3',
    title: 'Song Title',
    artist: 'Artist Name',
    cover: '/images/album.jpg',
  },
  // ... more tracks
];
```

```html
<div scAudioPlayer [tracks]="tracks" class="flex flex-col gap-3 p-4 bg-card border rounded-lg">
  <!-- Cover -->
  <div scAudioPlayerCover class="w-full aspect-square max-w-[200px] mx-auto"></div>

  <!-- Track Info -->
  <div scAudioPlayerInfo class="text-center"></div>

  <!-- Progress -->
  <div scAudioPlayerProgress></div>

  <!-- Controls -->
  <div class="flex items-center justify-center gap-2">
    <button scAudioPlayerShuffle></button>
    <button scAudioPlayerPrevious></button>
    <button scAudioPlayerPlayButton></button>
    <button scAudioPlayerNext></button>
    <button scAudioPlayerRepeat></button>
  </div>

  <!-- Volume -->
  <div scAudioPlayerVolume class="justify-center"></div>

  <!-- Hidden Audio Element -->
  <audio scAudioPlayerAudio></audio>
</div>
```

### Compact Layout

Horizontal layout for sidebars:

```html
<div scAudioPlayer [tracks]="tracks" class="flex items-center gap-4 p-4 bg-card border rounded-lg">
  <div scAudioPlayerCover class="size-16"></div>
  <div scAudioPlayerInfo class="flex-1 min-w-0"></div>
  <div class="flex items-center gap-2">
    <button scAudioPlayerPrevious></button>
    <button scAudioPlayerPlayButton></button>
    <button scAudioPlayerNext></button>
  </div>
  <audio scAudioPlayerAudio></audio>
</div>
```

### Minimal Player

Simple player without extra controls:

```html
<div scAudioPlayer [tracks]="tracks" class="flex items-center gap-2 p-2 bg-card border rounded-lg">
  <div scAudioPlayerCover class="size-10"></div>
  <div scAudioPlayerInfo class="flex-1 min-w-0"></div>
  <button scAudioPlayerPrevious></button>
  <button scAudioPlayerPlayButton></button>
  <button scAudioPlayerNext></button>
  <audio scAudioPlayerAudio></audio>
</div>
```

### Only Essential Controls

```html
<div scAudioPlayer [tracks]="tracks" class="flex flex-col gap-3 p-4 bg-card border rounded-lg">
  <div scAudioPlayerProgress></div>
  <div class="flex items-center justify-center gap-2">
    <button scAudioPlayerPlayButton></button>
  </div>
  <audio scAudioPlayerAudio></audio>
</div>
```

### Custom Layout

Create any layout you want:

```html
<div scAudioPlayer [tracks]="tracks" [(volume)]="volume">
  <div class="grid grid-cols-2 gap-4 p-6 bg-card border rounded-lg">
    <!-- Left Column -->
    <div class="space-y-4">
      <div scAudioPlayerCover class="w-full aspect-square"></div>
      <div scAudioPlayerInfo></div>
    </div>

    <!-- Right Column -->
    <div class="flex flex-col justify-between">
      <div scAudioPlayerVolume></div>

      <div class="space-y-4">
        <div scAudioPlayerProgress></div>
        <div class="flex justify-center gap-2">
          <button scAudioPlayerShuffle></button>
          <button scAudioPlayerPrevious></button>
          <button scAudioPlayerPlayButton></button>
          <button scAudioPlayerNext></button>
          <button scAudioPlayerRepeat></button>
        </div>
      </div>
    </div>
  </div>

  <audio scAudioPlayerAudio></audio>
</div>
```

### Custom Styling

Each component accepts a `class` input:

```html
<button scAudioPlayerPlayButton class="size-16 bg-blue-500"></button>
<div scAudioPlayerCover class="rounded-full size-32"></div>
<div scAudioPlayerProgress class="gap-4"></div>
```

### Controlled State

```html
<div scAudioPlayer [tracks]="tracks" [(currentIndex)]="currentIndex" [(volume)]="volume" [(shuffle)]="shuffle" [(repeat)]="repeat" (trackChange)="onTrackChange($event)" (play)="onPlay()" (pause)="onPause()">
  <!-- ... components ... -->
</div>
```

## Features

- ✅ **Composable**: Mix and match components
- ✅ **Flexible Layout**: Full control over structure
- ✅ **Custom Styling**: Style each component individually
- ✅ **Play/Pause**: Visual feedback
- ✅ **Track Navigation**: Previous/next with restart logic
- ✅ **Progress Bar**: Click to seek
- ✅ **Volume Control**: Slider with mute toggle
- ✅ **Shuffle Mode**: Random track order
- ✅ **Repeat Modes**: None, one, all
- ✅ **Keyboard Navigation**: Seek with arrow keys
- ✅ **Touch Friendly**: Works on all devices

## Keyboard Navigation

When focused on the progress bar:

| Key         | Action                  |
| ----------- | ----------------------- |
| `←`         | Seek back 5 seconds     |
| `→`         | Seek forward 5 seconds  |
| `Shift + ←` | Seek back 10 seconds    |
| `Shift + →` | Seek forward 10 seconds |

## Accessibility

- ARIA labels on all controls
- Keyboard navigable progress bar
- Screen reader announcements
- Focus indicators on buttons
- Proper button roles and states

## Notes

- The `<audio>` element must be included as a child
- The `#audio` template reference is handled internally
- All sub-components require the parent `[scAudioPlayer]` directive
- Components can be reordered and styled freely
