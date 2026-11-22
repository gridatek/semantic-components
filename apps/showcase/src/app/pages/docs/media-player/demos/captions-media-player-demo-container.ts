import { Component, ViewEncapsulation } from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { CaptionsMediaPlayerDemo } from './captions-media-player-demo';

@Component({
  selector: 'app-captions-media-player-demo-container',
  imports: [DemoContainer, CaptionsMediaPlayerDemo],
  template: `
    <app-demo-container
      title="Captions"
      [code]="code"
      demoUrl="/demos/media-player/captions-media-player-demo"
    >
      <app-captions-media-player-demo />
    </app-demo-container>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
})
export class CaptionsMediaPlayerDemoContainer {
  private readonly code = `import { Component, ViewEncapsulation, computed, signal } from '@angular/core';
import { FormField, form } from '@angular/forms/signals';
import {
  ScField,
  ScMediaPlayer,
  ScMediaPlayerCaptions,
  ScMediaPlayerCaptionsDisplay,
  ScMediaPlayerControls,
  ScMediaPlayerMedia,
  ScMediaPlayerPlay,
  ScMediaPlayerSeek,
  ScMediaPlayerTime,
  ScRadio,
  ScRadioGroup,
} from '@semantic-components/ui';
import {
  SiCaptionsIcon,
  SiPauseIcon,
  SiPlayIcon,
} from '@semantic-icons/lucide-icons';

/** Captions, shown by the player: chosen from its tracks, here outside it too — [(captions)] is a track’s id, or null. */
@Component({
  selector: 'app-captions-media-player-demo',
  imports: [
    FormField,
    ScField,
    ScMediaPlayer,
    ScMediaPlayerCaptions,
    ScMediaPlayerCaptionsDisplay,
    ScMediaPlayerControls,
    ScMediaPlayerMedia,
    ScMediaPlayerPlay,
    ScMediaPlayerSeek,
    ScMediaPlayerTime,
    ScRadio,
    ScRadioGroup,
    SiCaptionsIcon,
    SiPauseIcon,
    SiPlayIcon,
  ],
  template: \`
    <div
      scMediaPlayer
      #player="scMediaPlayer"
      aria-label="Video: Sintel, the trailer"
      class="aspect-video w-full max-w-xl"
      [captions]="captions()"
      (captionsChange)="setCaptions($event)"
    >
      <video
        scMediaPlayerMedia
        src="/media/sintel-trailer.mp4"
        poster="/media/sintel-trailer.jpg"
        preload="metadata"
      >
        <track
          kind="captions"
          src="/media/sintel-trailer-en.vtt"
          srclang="en"
          label="English"
        />
        <track
          kind="captions"
          src="/media/sintel-trailer-fr.vtt"
          srclang="fr"
          label="Français"
        />
        <track
          kind="chapters"
          src="/media/sintel-trailer-chapters.vtt"
          srclang="en"
        />
      </video>
      <div scMediaPlayerCaptionsDisplay></div>
      <div scMediaPlayerControls>
        <input scMediaPlayerSeek aria-label="Seek" />
        <button scMediaPlayerPlay>
          @if (player.paused()) {
            <svg siPlayIcon></svg>
            <span class="sr-only">Play</span>
          } @else {
            <svg siPauseIcon></svg>
            <span class="sr-only">Pause</span>
          }
        </button>
        <time scMediaPlayerTime class="me-auto"></time>
        <button scMediaPlayerCaptions>
          <svg siCaptionsIcon></svg>
          <span class="sr-only">Captions</span>
        </button>
      </div>
    </div>

    <div class="flex items-center gap-4 text-sm">
      <span id="captions-label" class="text-muted-foreground">Captions:</span>
      <div
        scRadioGroup
        [formField]="settingsForm.captions"
        orientation="horizontal"
        aria-labelledby="captions-label"
      >
        <label scField orientation="horizontal">
          <input scRadio value="off" />
          Off
        </label>
        @for (track of player.tracks(); track track.id) {
          <label scField orientation="horizontal">
            <input scRadio [value]="track.id" />
            {{ track.label }}
          </label>
        }
      </div>
    </div>
  \`,
  host: { class: 'flex w-full flex-col items-center gap-3' },
  encapsulation: ViewEncapsulation.None,
})
export class CaptionsMediaPlayerDemo {
  private readonly settings = signal({ captions: 'off' });
  private readonly settingsForm = form(this.settings);
  private readonly captions = computed(() =>
    this.settings().captions === 'off' ? null : this.settings().captions,
  );

  private setCaptions(id: string | null): void {
    this.settings.set({ captions: id ?? 'off' });
  }
}`;
}
