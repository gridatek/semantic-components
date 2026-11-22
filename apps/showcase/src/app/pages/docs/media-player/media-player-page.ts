import { Component, ViewEncapsulation } from '@angular/core';
import {
  ScKbd,
  ScTable,
  ScTableBody,
  ScTableCell,
  ScTableContainer,
  ScTableHeader,
  ScTableHeaderCell,
  ScTableRow,
  ScTypeset,
} from '@semantic-components/ui';
import { Anatomy } from '../../../components/anatomy/anatomy';
import {
  type ApiInput,
  ApiTable,
} from '../../../components/api-table/api-table';
import { ComponentBadges } from '../../../components/component-badges/component-badges';
import { PartsTable } from '../../../components/parts-table/parts-table';
import { TocHeading } from '../../../components/toc/toc-heading';
import { AudioMediaPlayerDemoContainer } from './demos/audio-media-player-demo-container';
import { CaptionsMediaPlayerDemoContainer } from './demos/captions-media-player-demo-container';
import { ControlledMediaPlayerDemoContainer } from './demos/controlled-media-player-demo-container';
import { ErrorMediaPlayerDemoContainer } from './demos/error-media-player-demo-container';
import { MediaPlayerUsageDemoContainer } from './demos/media-player-usage-demo-container';
import { MinimalMediaPlayerDemoContainer } from './demos/minimal-media-player-demo-container';
import { ResponsiveMediaPlayerDemoContainer } from './demos/responsive-media-player-demo-container';
import { RtlMediaPlayerDemoContainer } from './demos/rtl-media-player-demo-container';

@Component({
  selector: 'app-media-player-page',
  imports: [
    ScKbd,
    ScTable,
    ScTableBody,
    ScTableCell,
    ScTableContainer,
    ScTableHeader,
    ScTableHeaderCell,
    ScTableRow,
    ScTypeset,
    Anatomy,
    ApiTable,
    PartsTable,
    TocHeading,
    ComponentBadges,
    MediaPlayerUsageDemoContainer,
    ResponsiveMediaPlayerDemoContainer,
    MinimalMediaPlayerDemoContainer,
    CaptionsMediaPlayerDemoContainer,
    ControlledMediaPlayerDemoContainer,
    AudioMediaPlayerDemoContainer,
    ErrorMediaPlayerDemoContainer,
    RtlMediaPlayerDemoContainer,
  ],
  template: `
    <div class="space-y-12">
      <div class="space-y-2">
        <h1 scTypeset>Media Player</h1>
        <p class="text-muted-foreground">
          Your video or audio, with controls as parts that fit the player&apos;s
          width — its state two ways, captions, chapters, keyboard shortcuts and
          the system&apos;s media controls.
        </p>
        <app-component-badges path="media-player" />
      </div>

      <section class="space-y-4">
        <h2 scTypeset appToc>Usage</h2>
        <app-media-player-usage-demo-container />
      </section>

      <section class="space-y-4">
        <h2 scTypeset appToc>Anatomy</h2>
        <p>
          The player, your media, and the controls you want — in one row that
          wraps. Everything else (a spinner, an error, the length before the
          first play, a spacer) is your markup, from the player&apos;s state.
        </p>
        <app-anatomy [imports]="anatomy.imports" [markup]="anatomy.markup" />
      </section>

      <section class="space-y-4">
        <h2 scTypeset appToc>Small players</h2>
        <p>
          The player is a container (<code scTypeset>@container/media</code>),
          and its parts fit themselves to its width — the template stays the
          same, and no script measures it (the server&apos;s render is right).
          Under 672px (an audio bar: 448px) the speeds and loop step aside;
          under 576px (384px), the small layout:
        </p>
        <ul class="list-disc space-y-2 ps-6">
          <li>
            A play outside the controls sits in the middle, and the
            controls&apos; play steps aside. Wide, the middle play shows only
            while paused.
          </li>
          <li>
            The seek bar goes to the bottom edge; the skips, picture-in-picture,
            the volume and (over a video) mute step aside too. The time,
            captions and fullscreen stay.
          </li>
          <li>
            With a play in the middle, the controls wait for the first play: the
            poster, its play and your length show first.
          </li>
        </ul>
      </section>

      <section class="space-y-4">
        <h2 scTypeset appToc>Keyboard</h2>
        <p>Focused in the player (never page-wide):</p>
        <div
          scTableContainer
          tabindex="0"
          role="region"
          aria-label="Media Player keys"
        >
          <table scTable>
            <thead scTableHeader>
              <tr scTableRow>
                <th scTableHeaderCell>Key</th>
                <th scTableHeaderCell>Does</th>
              </tr>
            </thead>
            <tbody scTableBody>
              @for (row of keys; track row.does) {
                <tr scTableRow>
                  <td scTableCell>
                    @for (key of row.keys; track key; let last = $last) {
                      <kbd scKbd>{{ key }}</kbd>
                      @if (!last) {
                        /
                      }
                    }
                  </td>
                  <td scTableCell>{{ row.does }}</td>
                </tr>
              }
            </tbody>
          </table>
        </div>
        <p>
          Fields keep their keys; buttons keep <kbd scKbd>Space</kbd> and
          <kbd scKbd>Enter</kbd>. On the seek bar, the arrows move five seconds.
        </p>
      </section>

      <section class="space-y-4">
        <h2 scTypeset appToc>Accessibility</h2>
        <ul class="list-disc space-y-2 ps-6">
          <li>
            Name the player (<code scTypeset>aria-label</code>), every button
            (visually hidden text) and the sliders. The seek bar reads its time
            (&quot;0:15&quot;); add your words in
            <code scTypeset>aria-valuetext</code>.
          </li>
          <li>
            Toggles (mute, loop, captions, a speed, fullscreen,
            picture-in-picture) are <code scTypeset>aria-pressed</code>.
          </li>
          <li>
            Captions are shown by the player, in a polite live region above the
            controls; the browser&apos;s own are off.
          </li>
          <li>
            The controls hide only while a video plays untouched — never while
            focused in them, or paused. On a touch screen, once played, a tap on
            the video shows or hides them; a mouse click plays or pauses.
          </li>
        </ul>
      </section>

      <section class="space-y-8">
        <h2 scTypeset appToc>Examples</h2>
        <app-responsive-media-player-demo-container />
        <app-minimal-media-player-demo-container />
        <app-captions-media-player-demo-container />
        <app-controlled-media-player-demo-container />
        <app-audio-media-player-demo-container />
        <app-error-media-player-demo-container />
        <app-rtl-media-player-demo-container />
      </section>

      <section class="space-y-4">
        <h2 scTypeset appToc>API reference</h2>
        <p>
          Each part takes <code scTypeset>class</code>, merged over its own (cn:
          a later class wins). The buttons are the style&apos;s (<code scTypeset
            >variant</code
          >, <code scTypeset>size</code>: ghost, icon-sm); over a video, white.
          The frame, an audio card, the controls&apos; padding and the
          preview&apos;s corners are the style&apos;s (<code scTypeset
            >mediaPlayer</code
          >), after its Card and Tooltip.
        </p>
        <app-parts-table label="Media Player parts" [parts]="parts" />
        <app-api-table label="ScMediaPlayer inputs" [inputs]="inputs" />
      </section>
    </div>
  `,
  encapsulation: ViewEncapsulation.None,
})
export default class MediaPlayerPage {
  private readonly anatomy = {
    imports:
      "import { ScMediaPlayer, ScMediaPlayerCaptions, ScMediaPlayerCaptionsDisplay, ScMediaPlayerControls, ScMediaPlayerFullscreen, ScMediaPlayerLoop, ScMediaPlayerMedia, ScMediaPlayerMute, ScMediaPlayerPictureInPicture, ScMediaPlayerPlay, ScMediaPlayerPreview, ScMediaPlayerRate, ScMediaPlayerSeek, ScMediaPlayerSkip, ScMediaPlayerTime, ScMediaPlayerVolume, ScMediaPlayerWaveform } from '@semantic-components/ui';",
    markup: [
      '<div scMediaPlayer #player="scMediaPlayer" aria-label="Video: Sintel">',
      '  <video scMediaPlayerMedia src="…" poster="…"><track kind="captions" … /></video>',
      '  <div scMediaPlayerCaptionsDisplay></div>',
      '  <button scMediaPlayerPlay>…</button>',
      '  <div scMediaPlayerControls>',
      '    <input scMediaPlayerSeek aria-label="Seek" />',
      '    <div scMediaPlayerPreview>…</div>',
      '    <button scMediaPlayerPlay>…</button>',
      '    <button [scMediaPlayerSkip]="-10">…</button>',
      '    <button scMediaPlayerMute>…</button>',
      '    <input scMediaPlayerVolume aria-label="Volume" />',
      '    <time scMediaPlayerTime></time> / <time scMediaPlayerTime="duration"></time>',
      '    <button [scMediaPlayerRate]="1.5">1.5×</button>',
      '    <button scMediaPlayerLoop>…</button>',
      '    <button scMediaPlayerCaptions>…</button>',
      '    <button scMediaPlayerPictureInPicture>…</button>',
      '    <button scMediaPlayerFullscreen>…</button>',
      '  </div>',
      '</div>',
    ].join('\n'),
  };

  private readonly keys = [
    { keys: ['Space', 'K'], does: 'Play / pause' },
    { keys: ['J', 'L'], does: '10 seconds back / forward' },
    { keys: ['←', '→'], does: '5 seconds back / forward' },
    { keys: ['↑', '↓'], does: 'Volume up / down' },
    { keys: ['M'], does: 'Mute' },
    { keys: ['R'], does: 'Loop' },
    { keys: ['<', '>'], does: 'Slower / faster' },
    { keys: ['C'], does: 'Captions' },
    { keys: ['F'], does: 'Fullscreen' },
    { keys: ['P'], does: 'Picture in picture' },
    { keys: ['0', '9'], does: 'Jump to that tenth (0 to 9)' },
    { keys: ['Home', 'End'], does: 'The start / the end' },
  ];

  private readonly parts = [
    {
      name: 'ScMediaPlayer',
      selector: '[scMediaPlayer]',
      description:
        'The state (two-way and read), the keys, a container. exportAs: toggle(), seekTo(), seekBy(), volumeBy(), rateBy(), toggleCaptions(), toggleFullscreen(), togglePictureInPicture(), reload(), formatTime(), chapterAt().',
    },
    {
      name: 'ScMediaPlayerMedia',
      selector: 'video[scMediaPlayerMedia], audio[scMediaPlayerMedia]',
      description: 'Your media element, with its sources and tracks.',
    },
    {
      name: 'ScMediaPlayerControls',
      selector: '[scMediaPlayerControls]',
      description:
        'A row that wraps; over a video, hides while it plays untouched.',
    },
    {
      name: 'ScMediaPlayerPlay',
      selector: 'button[scMediaPlayerPlay]',
      description: 'Play, pause, replay; outside the controls: in the middle.',
    },
    {
      name: 'ScMediaPlayerSkip',
      selector: 'button[scMediaPlayerSkip]',
      description: 'Jumps by its seconds (negative: back).',
    },
    {
      name: 'ScMediaPlayerSeek',
      selector: 'input[scMediaPlayerSeek]',
      description: 'The time, as a slider: loaded and chapters on its track.',
    },
    {
      name: 'ScMediaPlayerWaveform',
      selector: 'div[scMediaPlayerWaveform]',
      description:
        'The media as bars, read from its file: a seek bar for audio (bars input). See the Playlist recipe.',
    },
    {
      name: 'ScMediaPlayerPreview',
      selector: '[scMediaPlayerPreview]',
      description: 'Your text above the seek bar, where the pointer is.',
    },
    {
      name: 'ScMediaPlayerMute / Volume',
      selector: 'button[scMediaPlayerMute], input[scMediaPlayerVolume]',
      description: 'Mute, and the volume as a slider.',
    },
    {
      name: 'ScMediaPlayerTime',
      selector: 'time[scMediaPlayerTime]',
      description: 'current (default), duration or remaining.',
    },
    {
      name: 'ScMediaPlayerRate',
      selector: 'button[scMediaPlayerRate]',
      description: 'A speed, pressed while it plays at it.',
    },
    {
      name: 'ScMediaPlayerLoop / Captions',
      selector: 'button[scMediaPlayerLoop], button[scMediaPlayerCaptions]',
      description: 'Loop; captions on and off.',
    },
    {
      name: 'ScMediaPlayerCaptionsDisplay',
      selector: 'div[scMediaPlayerCaptionsDisplay]',
      description: 'The captions, over the video.',
    },
    {
      name: 'ScMediaPlayerPictureInPicture / Fullscreen',
      selector:
        'button[scMediaPlayerPictureInPicture], button[scMediaPlayerFullscreen]',
      description: 'A window of its own; full screen (video only).',
    },
  ];

  private readonly inputs: ApiInput[] = [
    {
      name: 'paused, currentTime, volume, muted, playbackRate, loop',
      type: 'boolean | number',
      default: 'true, 0, 1, false, 1, false',
      description: 'Two-way.',
    },
    {
      name: 'captions',
      type: 'string | null',
      default: 'null',
      description: 'Two-way: the captions shown, a track’s id.',
    },
    {
      name: 'metadata',
      type: 'MediaMetadataInit',
      default: '—',
      description: 'For the system’s media controls.',
    },
  ];
}
