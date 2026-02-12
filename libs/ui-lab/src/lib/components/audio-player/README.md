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
| `ScAudioPlayer`           | `[sc-audio-player]`                   | Root directive (state manager) |
| `ScAudioPlayerAudio`      | `audio[sc-audio-player-audio]`        | Hidden audio element           |
| `ScAudioPlayerCover`      | `div[sc-audio-player-cover]`          | Album artwork display          |
| `ScAudioPlayerInfo`       | `div[sc-audio-player-info]`           | Track title and artist         |
| `ScAudioPlayerProgress`   | `div[sc-audio-player-progress]`       | Progress bar with seek         |
| `ScAudioPlayerPlayButton` | `button[sc-audio-player-play-button]` | Play/pause button              |
| `ScAudioPlayerPrevious`   | `button[sc-audio-player-previous]`    | Previous track button          |
| `ScAudioPlayerNext`       | `button[sc-audio-player-next]`        | Next track button              |
| `ScAudioPlayerShuffle`    | `button[sc-audio-player-shuffle]`     | Shuffle toggle                 |
| `ScAudioPlayerRepeat`     | `button[sc-audio-player-repeat]`      | Repeat cycle button            |
| `ScAudioPlayerVolume`     | `div[sc-audio-player-volume]`         | Volume slider + mute           |

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
<div sc-audio-player [tracks]="tracks" class="flex flex-col gap-3 p-4 bg-card border rounded-lg">
  <!-- Cover -->
  <div sc-audio-player-cover class="w-full aspect-square max-w-[200px] mx-auto"></div>

  <!-- Track Info -->
  <div sc-audio-player-info class="text-center"></div>

  <!-- Progress -->
  <div sc-audio-player-progress></div>

  <!-- Controls -->
  <div class="flex items-center justify-center gap-2">
    <button sc-audio-player-shuffle></button>
    <button sc-audio-player-previous></button>
    <button sc-audio-player-play-button></button>
    <button sc-audio-player-next></button>
    <button sc-audio-player-repeat></button>
  </div>

  <!-- Volume -->
  <div sc-audio-player-volume class="justify-center"></div>

  <!-- Hidden Audio Element -->
  <audio sc-audio-player-audio></audio>
</div>
```

### Compact Layout

Horizontal layout for sidebars:

```html
<div sc-audio-player [tracks]="tracks" class="flex items-center gap-4 p-4 bg-card border rounded-lg">
  <div sc-audio-player-cover class="size-16"></div>
  <div sc-audio-player-info class="flex-1 min-w-0"></div>
  <div class="flex items-center gap-2">
    <button sc-audio-player-previous></button>
    <button sc-audio-player-play-button></button>
    <button sc-audio-player-next></button>
  </div>
  <audio sc-audio-player-audio></audio>
</div>
```

### Minimal Player

Simple player without extra controls:

```html
<div sc-audio-player [tracks]="tracks" class="flex items-center gap-2 p-2 bg-card border rounded-lg">
  <div sc-audio-player-cover class="size-10"></div>
  <div sc-audio-player-info class="flex-1 min-w-0"></div>
  <button sc-audio-player-previous></button>
  <button sc-audio-player-play-button></button>
  <button sc-audio-player-next></button>
  <audio sc-audio-player-audio></audio>
</div>
```

### Only Essential Controls

```html
<div sc-audio-player [tracks]="tracks" class="flex flex-col gap-3 p-4 bg-card border rounded-lg">
  <div sc-audio-player-progress></div>
  <div class="flex items-center justify-center gap-2">
    <button sc-audio-player-play-button></button>
  </div>
  <audio sc-audio-player-audio></audio>
</div>
```

### Custom Layout

Create any layout you want:

```html
<div sc-audio-player [tracks]="tracks" [(volume)]="volume">
  <div class="grid grid-cols-2 gap-4 p-6 bg-card border rounded-lg">
    <!-- Left Column -->
    <div class="space-y-4">
      <div sc-audio-player-cover class="w-full aspect-square"></div>
      <div sc-audio-player-info></div>
    </div>

    <!-- Right Column -->
    <div class="flex flex-col justify-between">
      <div sc-audio-player-volume></div>

      <div class="space-y-4">
        <div sc-audio-player-progress></div>
        <div class="flex justify-center gap-2">
          <button sc-audio-player-shuffle></button>
          <button sc-audio-player-previous></button>
          <button sc-audio-player-play-button></button>
          <button sc-audio-player-next></button>
          <button sc-audio-player-repeat></button>
        </div>
      </div>
    </div>
  </div>

  <audio sc-audio-player-audio></audio>
</div>
```

### Custom Styling

Each component accepts a `class` input:

```html
<button sc-audio-player-play-button class="size-16 bg-blue-500"></button>
<div sc-audio-player-cover class="rounded-full size-32"></div>
<div sc-audio-player-progress class="gap-4"></div>
```

### Controlled State

```html
<div sc-audio-player [tracks]="tracks" [(currentIndex)]="currentIndex" [(volume)]="volume" [(shuffle)]="shuffle" [(repeat)]="repeat" (trackChange)="onTrackChange($event)" (play)="onPlay()" (pause)="onPause()">
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
- All sub-components require the parent `[sc-audio-player]` directive
- Components can be reordered and styled freely
