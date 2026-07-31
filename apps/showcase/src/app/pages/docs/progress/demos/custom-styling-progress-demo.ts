import { Component, ViewEncapsulation } from '@angular/core';
import { ScProgress } from '@semantic-components/ui';

@Component({
  selector: 'app-custom-styling-progress-demo',
  imports: [ScProgress],
  template: `
    <div
      scProgress
      aria-label="Custom styled progress"
      [value]="66"
      class="h-4 w-80"
    ></div>
  `,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class CustomStylingProgressDemo {}
