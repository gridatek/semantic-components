import { Component, ViewEncapsulation, signal } from '@angular/core';
import {
  ScProgress,
  ScProgressRange,
  ScProgressTrack,
  ScSlider,
} from '@semantic-components/ui';

/** Its value from your state: here, a slider's. */
@Component({
  selector: 'app-controlled-progress-demo',
  imports: [ScProgress, ScProgressRange, ScProgressTrack, ScSlider],
  template: `
    <div class="flex w-full max-w-sm flex-col gap-4">
      <div scProgress [value]="value()" aria-label="Progress" class="w-full">
        <div scProgressTrack><div scProgressRange></div></div>
      </div>
      <input scSlider [(value)]="value" aria-label="Progress" />
    </div>
  `,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class ControlledProgressDemo {
  protected readonly value = signal(50);
}
