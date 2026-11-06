import { Component, ViewEncapsulation } from '@angular/core';
import { ScFrame, ScScrollAreaNext2 } from '@semantic-components/ui';

/** Content wider and taller than the box: it scrolls both ways. */
@Component({
  selector: 'app-both-scroll-area-next2-demo',
  imports: [ScFrame, ScScrollAreaNext2],
  template: `
    <div scScrollAreaNext2 scFrame class="h-64 w-80 max-w-full">
      <div class="grid w-max grid-cols-10 gap-3 p-4">
        @for (cell of cells; track cell) {
          <div
            class="bg-muted text-muted-foreground flex size-16 items-center justify-center rounded-md text-sm"
          >
            {{ cell }}
          </div>
        }
      </div>
    </div>
  `,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class BothScrollAreaNext2Demo {
  protected readonly cells = Array.from({ length: 100 }, (_, i) => i + 1);
}
