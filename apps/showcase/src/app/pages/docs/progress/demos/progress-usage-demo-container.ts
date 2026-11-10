import { Component, ViewEncapsulation } from '@angular/core';
import { UsageCode } from '../../../../components/usage-code/usage-code';
import { ProgressUsageDemo } from './progress-usage-demo';

@Component({
  selector: 'app-progress-usage-demo-container',
  imports: [UsageCode, ProgressUsageDemo],
  template: `
    <app-usage-code [code]="code">
      <ng-template><app-progress-usage-demo /></ng-template>
    </app-usage-code>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
})
export class ProgressUsageDemoContainer {
  readonly code = `import {
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
  template: \`
    <div scProgress [value]="value()" aria-label="Loading" class="w-[60%]">
      <div scProgressTrack><div scProgressRange></div></div>
    </div>
  \`,
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
}`;
}
