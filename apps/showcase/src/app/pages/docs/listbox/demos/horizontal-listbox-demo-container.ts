import { Component, ViewEncapsulation } from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { HorizontalListboxDemo } from './horizontal-listbox-demo';

@Component({
  selector: 'app-horizontal-listbox-demo-container',
  imports: [DemoContainer, HorizontalListboxDemo],
  template: `
    <app-demo-container
      title="Horizontal"
      [code]="code"
      demoUrl="/demos/listbox/horizontal-listbox-demo"
    >
      <app-horizontal-listbox-demo />
    </app-demo-container>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
})
export class HorizontalListboxDemoContainer {
  private readonly code = `import { Component, ViewEncapsulation, signal } from '@angular/core';
import { ScListbox, ScListboxItem } from '@semantic-components/ui';

/** orientation="horizontal": ← → move (as the text reads); loop off — they stop at the ends; XL disabled, skipped. */
@Component({
  selector: 'app-horizontal-listbox-demo',
  imports: [ScListbox, ScListboxItem],
  template: \`
    <div class="grid gap-2">
      <div
        scListbox
        orientation="horizontal"
        [loop]="false"
        aria-label="Size"
        [(value)]="size"
      >
        @for (item of sizes; track item) {
          <div
            scListboxItem
            class="justify-center px-3"
            [value]="item"
            [disabled]="item === 'XL'"
          >
            {{ item }}
          </div>
        }
      </div>
      <p class="text-muted-foreground text-sm" data-testid="picked">
        {{ size() ?? 'None' }}
      </p>
    </div>
  \`,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class HorizontalListboxDemo {
  private readonly size = signal<string | null>('M');
  private readonly sizes = ['XS', 'S', 'M', 'L', 'XL'];
}`;
}
