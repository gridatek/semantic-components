import { Component, ViewEncapsulation, signal } from '@angular/core';
import {
  ScButton,
  ScCard,
  ScCardBody,
  ScCardDescription,
  ScCardFooter,
  ScCardHeader,
  ScCardTitle,
} from '@semantic-components/ui';
import { LiveWaveformCanvas } from './live-waveform-canvas';

/** A live waveform and its three switches: listen, process, mode. */
@Component({
  selector: 'app-preview-live-waveform',
  imports: [
    LiveWaveformCanvas,
    ScButton,
    ScCard,
    ScCardBody,
    ScCardDescription,
    ScCardFooter,
    ScCardHeader,
    ScCardTitle,
  ],
  template: `
    <div scCard>
      <div scCardHeader>
        <h2 scCardTitle>Live Audio Waveform</h2>
        <p scCardDescription>
          Real-time microphone input visualization with audio reactivity
        </p>
      </div>
      <div scCardBody>
        <app-live-waveform-canvas
          [active]="active()"
          [processing]="processing()"
          [mode]="mode()"
          (micError)="active.set(false)"
        />
      </div>
      <div scCardFooter class="flex-wrap gap-2">
        <button
          scButton
          size="sm"
          [variant]="active() ? 'default' : 'outline'"
          (click)="toggleActive()"
        >
          {{ active() ? 'Stop' : 'Start' }} Listening
        </button>
        <button
          scButton
          size="sm"
          [variant]="processing() ? 'default' : 'outline'"
          (click)="toggleProcessing()"
        >
          {{ processing() ? 'Stop' : 'Start' }} Processing
        </button>
        <button
          scButton
          size="sm"
          variant="outline"
          (click)="mode.set(mode() === 'static' ? 'scrolling' : 'static')"
        >
          {{ mode() === 'static' ? 'Static' : 'Scrolling' }}
        </button>
      </div>
    </div>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
})
export class PreviewLiveWaveform {
  private readonly active = signal(false);
  private readonly processing = signal(true);
  private readonly mode = signal<'static' | 'scrolling'>('static');

  private toggleActive(): void {
    this.active.update((on) => !on);
    if (this.active()) this.processing.set(false);
  }

  private toggleProcessing(): void {
    this.processing.update((on) => !on);
    if (this.processing()) this.active.set(false);
  }
}
