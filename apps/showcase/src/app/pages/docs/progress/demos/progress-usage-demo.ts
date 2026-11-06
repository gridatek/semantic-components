import {
  Component,
  DestroyRef,
  ViewEncapsulation,
  afterNextRender,
  inject,
  signal,
} from '@angular/core';
import {
  ScProgress,
  ScProgressRange,
  ScProgressTrack,
} from '@semantic-components/ui';

@Component({
  selector: 'app-progress-usage-demo',
  imports: [ScProgress, ScProgressRange, ScProgressTrack],
  template: `
    <div scProgress [value]="value()" aria-label="Loading" class="w-[60%]">
      <div scProgressTrack><div scProgressRange></div></div>
    </div>
  `,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class ProgressUsageDemo {
  protected readonly value = signal(13);

  constructor() {
    // A moment after it appears: further along.
    let timer: ReturnType<typeof setTimeout> | undefined;
    afterNextRender(() => {
      timer = setTimeout(() => this.value.set(66), 500);
    });
    inject(DestroyRef).onDestroy(() => clearTimeout(timer));
  }
}
