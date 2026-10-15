# Audio Player

Feature-rich composable audio player with playlist support, shuffle, repeat, and volume controls.

## Architecture

The audio player follows the composable architecture pattern, allowing full customization of layout and controls.

```
ScAudioPlayer (state: tracks, playing, time, volume)
    ├── ScAudioPlayerAudio (the audio element)
    ├── ScAudioPlayerCover → ScAudioPlayerCoverImage (your img, your alt)
    ├── ScAudioPlayerTrackInfo → ScAudioPlayerTitle, ScAudioPlayerArtist (your text)
    ├── ScAudioPlayerProgress → ScAudioPlayerCurrentTime, ScAudioPlayerSeekBar → ScAudioPlayerSeek, ScAudioPlayerDuration
    ├── ScAudioPlayerControls → ScAudioPlayerShuffle, …Previous, …Play, …Next, …Repeat
    └── ScAudioPlayerVolume → ScAudioPlayerMute, ScAudioPlayerVolumeSlider, ScAudioPlayerMaxVolume
```

You write every element, icon and name; the parts add the behaviour and the styles. Buttons and sliders are named by you (`aria-label`) — in development, an unnamed one warns.

## Parts

| Part                        | Selector                           | Does                                                             |
| --------------------------- | ---------------------------------- | ---------------------------------------------------------------- |
| `ScAudioPlayer`             | `[scAudioPlayer]`                  | The state (`exportAs: 'scAudioPlayer'`)                          |
| `ScAudioPlayerAudio`        | `audio[scAudioPlayerAudio]`        | The audio element                                                |
| `ScAudioPlayerCover`        | `div[scAudioPlayerCover]`          | The cover's frame                                                |
| `ScAudioPlayerCoverImage`   | `img[scAudioPlayerCoverImage]`     | The current track's cover (hidden without one): write its `alt`  |
| `ScAudioPlayerTrackInfo`    | `div[scAudioPlayerTrackInfo]`      | The title and artist, from `player.currentTrack()`               |
| `ScAudioPlayerTitle`        | `[scAudioPlayerTitle]`             | The title                                                        |
| `ScAudioPlayerArtist`       | `[scAudioPlayerArtist]`            | The artist                                                       |
| `ScAudioPlayerProgress`     | `div[scAudioPlayerProgress]`       | The progress row                                                 |
| `ScAudioPlayerCurrentTime`  | `span[scAudioPlayerCurrentTime]`   | How far it has played                                            |
| `ScAudioPlayerSeekBar`      | `div[scAudioPlayerSeekBar]`        | The bar: what is buffered, under the seek slider                 |
| `ScAudioPlayerSeek`         | `input[scAudioPlayerSeek]`         | Seeks (a slider)                                                 |
| `ScAudioPlayerDuration`     | `span[scAudioPlayerDuration]`      | How long the track is                                            |
| `ScAudioPlayerControls`     | `div[scAudioPlayerControls]`       | The buttons' row                                                 |
| `ScAudioPlayerPlay`         | `button[scAudioPlayerPlay]`        | Plays and pauses                                                 |
| `ScAudioPlayerPrevious`     | `button[scAudioPlayerPrevious]`    | The previous track                                               |
| `ScAudioPlayerNext`         | `button[scAudioPlayerNext]`        | The next track                                                   |
| `ScAudioPlayerShuffle`      | `button[scAudioPlayerShuffle]`     | Shuffle on and off                                               |
| `ScAudioPlayerRepeat`       | `button[scAudioPlayerRepeat]`      | Repeat: none, all, one                                           |
| `ScAudioPlayerVolume`       | `div[scAudioPlayerVolume]`         | The volume row                                                   |
| `ScAudioPlayerMute`         | `button[scAudioPlayerMute]`        | Mutes and unmutes: `aria-pressed` while muted, one name ("Mute") |
| `ScAudioPlayerVolumeSlider` | `input[scAudioPlayerVolumeSlider]` | The volume, 0 to 1 (a slider; disabled while muted)              |
| `ScAudioPlayerMaxVolume`    | `button[scAudioPlayerMaxVolume]`   | Full volume                                                      |

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
<div scAudioPlayer #player="scAudioPlayer" [tracks]="tracks" class="bg-card flex flex-col gap-3 rounded-lg border p-4">
  <!-- Cover -->
  <div scAudioPlayerCover class="mx-auto aspect-square w-full max-w-[200px]">
    <img scAudioPlayerCoverImage alt="" />
  </div>

  <!-- Track Info -->
  <div scAudioPlayerInfo class="text-center"></div>

  <!-- Progress -->
  <div scAudioPlayerProgress>
    <span scAudioPlayerCurrentTime></span>
    <div scAudioPlayerSeekBar><input scAudioPlayerSeek aria-label="Seek" /></div>
    <span scAudioPlayerDuration></span>
  </div>

  <!-- Controls -->
  <div class="flex items-center justify-center gap-2">
    <button scAudioPlayerShuffle aria-label="Shuffle"></button>
    <button scAudioPlayerPrevious aria-label="Previous track"></button>
    <button scAudioPlayerPlayButton></button>
    <button scAudioPlayerNext aria-label="Next track"></button>
    <button scAudioPlayerRepeat [attr.aria-label]="'Repeat: ' + player.repeat()"></button>
  </div>

  <!-- Volume -->
  <div scAudioPlayerVolume class="justify-center">
    <button scAudioPlayerMute aria-label="Mute"><svg siVolume1Icon></svg></button>
    <input scAudioPlayerVolumeSlider aria-label="Volume" class="w-24" />
    <button scAudioPlayerMaxVolume aria-label="Full volume"><svg siVolume2Icon></svg></button>
  </div>

  <!-- Hidden Audio Element -->
  <audio scAudioPlayerAudio></audio>
</div>
```

### Compact Layout

Horizontal layout for sidebars:

```html
<div scAudioPlayer #player="scAudioPlayer" [tracks]="tracks" class="bg-card flex items-center gap-4 rounded-lg border p-4">
  <div scAudioPlayerCover class="size-16">
    <img scAudioPlayerCoverImage alt="" />
  </div>
  <div scAudioPlayerInfo class="min-w-0 flex-1"></div>
  <div class="flex items-center gap-2">
    <button scAudioPlayerPrevious aria-label="Previous track"></button>
    <button scAudioPlayerPlayButton></button>
    <button scAudioPlayerNext aria-label="Next track"></button>
  </div>
  <audio scAudioPlayerAudio></audio>
</div>
```

### Minimal Player

Simple player without extra controls:

```html
<div scAudioPlayer #player="scAudioPlayer" [tracks]="tracks" class="bg-card flex items-center gap-2 rounded-lg border p-2">
  <div scAudioPlayerCover class="size-10">
    <img scAudioPlayerCoverImage alt="" />
  </div>
  <div scAudioPlayerInfo class="min-w-0 flex-1"></div>
  <button scAudioPlayerPrevious aria-label="Previous track"></button>
  <button scAudioPlayerPlayButton></button>
  <button scAudioPlayerNext aria-label="Next track"></button>
  <audio scAudioPlayerAudio></audio>
</div>
```

### Only Essential Controls

```html
<div scAudioPlayer #player="scAudioPlayer" [tracks]="tracks" class="bg-card flex flex-col gap-3 rounded-lg border p-4">
  <div scAudioPlayerProgress>
    <span scAudioPlayerCurrentTime></span>
    <div scAudioPlayerSeekBar><input scAudioPlayerSeek aria-label="Seek" /></div>
    <span scAudioPlayerDuration></span>
  </div>
  <div class="flex items-center justify-center gap-2">
    <button scAudioPlayerPlayButton></button>
  </div>
  <audio scAudioPlayerAudio></audio>
</div>
```

### Custom Layout

Create any layout you want:

```html
<div scAudioPlayer #player="scAudioPlayer" [tracks]="tracks" [(volume)]="volume">
  <div class="bg-card grid grid-cols-2 gap-4 rounded-lg border p-6">
    <!-- Left Column -->
    <div class="space-y-4">
      <div scAudioPlayerCover class="aspect-square w-full">
        <img scAudioPlayerCoverImage alt="" />
      </div>
      <div scAudioPlayerInfo></div>
    </div>

    <!-- Right Column -->
    <div class="flex flex-col justify-between">
      <div scAudioPlayerVolume>
        <button scAudioPlayerMute aria-label="Mute"><svg siVolume1Icon></svg></button>
        <input scAudioPlayerVolumeSlider aria-label="Volume" class="w-24" />
        <button scAudioPlayerMaxVolume aria-label="Full volume"><svg siVolume2Icon></svg></button>
      </div>

      <div class="space-y-4">
        <div scAudioPlayerProgress>
          <span scAudioPlayerCurrentTime></span>
          <div scAudioPlayerSeekBar><input scAudioPlayerSeek aria-label="Seek" /></div>
          <span scAudioPlayerDuration></span>
        </div>
        <div class="flex justify-center gap-2">
          <button scAudioPlayerShuffle aria-label="Shuffle"></button>
          <button scAudioPlayerPrevious aria-label="Previous track"></button>
          <button scAudioPlayerPlayButton></button>
          <button scAudioPlayerNext aria-label="Next track"></button>
          <button scAudioPlayerRepeat [attr.aria-label]="'Repeat: ' + player.repeat()"></button>
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
<div scAudioPlayerCover class="size-32 rounded-full">
  <img scAudioPlayerCoverImage alt="" />
</div>
<div scAudioPlayerProgress class="gap-4">
  <span scAudioPlayerCurrentTime></span>
  <div scAudioPlayerSeekBar><input scAudioPlayerSeek aria-label="Seek" /></div>
  <span scAudioPlayerDuration></span>
</div>
```

### Controlled State

```html
<div scAudioPlayer #player="scAudioPlayer" [tracks]="tracks" [(currentIndex)]="currentIndex" [(volume)]="volume" [(shuffle)]="shuffle" [(repeat)]="repeat" (trackChange)="onTrackChange($event)" (play)="onPlay()" (pause)="onPause()">
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
