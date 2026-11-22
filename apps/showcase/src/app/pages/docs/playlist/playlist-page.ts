import { Component, ViewEncapsulation } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ScLink, ScTypeset } from '@semantic-components/ui';
import { Anatomy } from '../../../components/anatomy/anatomy';
import { TocHeading } from '../../../components/toc/toc-heading';
import { PlaylistUsageDemoContainer } from './demos/playlist-usage-demo-container';
import { RtlPlaylistDemoContainer } from './demos/rtl-playlist-demo-container';

@Component({
  selector: 'app-playlist-page',
  imports: [
    RouterLink,
    ScLink,
    ScTypeset,
    Anatomy,
    TocHeading,
    PlaylistUsageDemoContainer,
    RtlPlaylistDemoContainer,
  ],
  template: `
    <div class="space-y-12">
      <div class="space-y-2">
        <h1 scTypeset>Playlist</h1>
        <p class="text-muted-foreground">
          A recipe: songs one after another, on a
          <a scLink routerLink="/docs/components/media-player">Media Player</a>
          — its waveform, next and previous, shuffle and repeat, the list to
          choose from. No component of its own.
        </p>
      </div>

      <section class="space-y-4">
        <h2 scTypeset appToc>Usage</h2>
        <app-playlist-usage-demo-container />
      </section>

      <section class="space-y-4">
        <h2 scTypeset appToc>How it is made</h2>
        <p>
          The player plays the file you give it: the songs, the one playing (a
          signal of yours), shuffle and repeat are your state. The
          <code scTypeset>&lt;audio&gt;</code> takes the song&apos;s
          <code scTypeset>src</code>; its <code scTypeset>(ended)</code> moves
          on. Another song chosen while one plays plays at once (the
          audio&apos;s <code scTypeset>autoplay</code>, set as you change it).
        </p>
        <ul class="list-disc space-y-2 ps-6">
          <li>
            Next: the following song in the order — after the last, the first
            with repeat all, or it stops. Previous: the song&apos;s start, or
            within three seconds of it, the one before.
          </li>
          <li>
            Repeat one is the player&apos;s <code scTypeset>loop</code> (its
            <kbd>R</kbd> key too); shuffle, an order made once, every song in it
            once, the one playing first.
          </li>
          <li>
            The waveform (<code scTypeset>scMediaPlayerWaveform</code>) is the
            seek bar; the list is Items (<code scTypeset>button[scItem]</code>),
            the one playing <code scTypeset>aria-current</code>. The
            system&apos;s media controls get next and previous from you (<code
              scTypeset
              >navigator.mediaSession</code
            >).
          </li>
        </ul>
        <app-anatomy [imports]="anatomy.imports" [markup]="anatomy.markup" />
      </section>

      <section class="space-y-4">
        <h2 scTypeset appToc>Accessibility</h2>
        <ul class="list-disc space-y-2 ps-6">
          <li>
            Name the player and every button. Shuffle is a toggle (a fixed name,
            pressed); repeat has three states, so its name says which
            (&quot;Repeat: all&quot;), never pressed.
          </li>
          <li>
            The waveform is a slider reading the time (&quot;0:15&quot;); the
            song playing is <code scTypeset>aria-current</code> in the named
            list.
          </li>
          <li>
            Focused in the player, its keys work: <kbd>Space</kbd> plays,
            <kbd>R</kbd> repeats the song.
          </li>
        </ul>
      </section>

      <section class="space-y-8">
        <h2 scTypeset appToc>Examples</h2>
        <app-rtl-playlist-demo-container />
      </section>
    </div>
  `,
  encapsulation: ViewEncapsulation.None,
})
export default class PlaylistPage {
  private readonly anatomy = {
    imports:
      "import { ScItem, ScMediaPlayer, ScMediaPlayerMedia, ScMediaPlayerPlay, ScMediaPlayerTime, ScMediaPlayerWaveform, ScToggle } from '@semantic-components/ui';",
    markup: [
      '<div scMediaPlayer #player="scMediaPlayer" aria-label="Player" [loop]="repeat() === \'one\'">',
      '  <audio scMediaPlayerMedia [autoplay]="autoplay()" [src]="song().src" (ended)="next()"></audio>',
      '  <div scMediaPlayerWaveform aria-label="Seek"></div>',
      '  <time scMediaPlayerTime></time> <time scMediaPlayerTime="remaining"></time>',
      '  <button scToggle [(pressed)]="shuffle">…</button>',
      '  <button scButton (click)="previous()">…</button>',
      '  <button scMediaPlayerPlay>…</button>',
      '  <button scButton (click)="next()">…</button>',
      '  <div scItemGroup role="list" aria-label="Playlist">',
      '    <div role="listitem"><button scItem (click)="choose(i)">…</button></div>',
      '  </div>',
      '</div>',
    ].join('\n'),
  };
}
