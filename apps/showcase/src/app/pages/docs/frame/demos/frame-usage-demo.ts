import { Component, ViewEncapsulation } from '@angular/core';
import { ScFrame } from '@semantic-components/ui';

@Component({
  selector: 'app-frame-usage-demo',
  imports: [ScFrame],
  template: `
    <div scFrame class="w-full max-w-sm p-6">
      <p class="text-sm font-medium">Framed</p>
      <p class="text-muted-foreground text-sm">
        The style's card corners, ring and shadow, round any box.
      </p>
    </div>
  `,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class FrameUsageDemo {}
