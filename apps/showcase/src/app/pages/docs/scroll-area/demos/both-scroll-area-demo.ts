import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { ScScrollArea } from '@semantic-components/ui';

@Component({
  selector: 'app-both-scroll-area-demo',
  imports: [ScScrollArea],
  template: `
    <div scScrollArea class="h-72 w-72 rounded-md border">
      <div class="p-4" style="width: 500px;">
        <h4 class="mb-4 text-sm leading-none font-medium">
          Content with both scrollbars
        </h4>
        <p class="text-muted-foreground text-sm leading-relaxed">
          This content is wider and taller than the container, so both
          scrollbars are visible. You can scroll both horizontally and
          vertically to see all the content.
        </p>
        <div class="mt-4 space-y-2">
          @for (i of numbers; track i) {
            <div class="text-sm whitespace-nowrap">
              Row {{ i }}: Lorem ipsum dolor sit amet, consectetur adipiscing
              elit. Sed do eiusmod tempor incididunt ut labore et dolore magna
              aliqua.
            </div>
          }
        </div>
      </div>
    </div>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BothScrollAreaDemo {
  readonly numbers = Array.from({ length: 20 }, (_, i) => i + 1);
}
