import { Component, ViewEncapsulation } from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { OptingOutScrollbarsDemo } from './opting-out-scrollbars-demo';

@Component({
  selector: 'app-opting-out-scrollbars-demo-container',
  imports: [DemoContainer, OptingOutScrollbarsDemo],
  template: `
    <app-demo-container
      title="Opting out"
      demoUrl="/demos/scrollbars/opting-out-scrollbars-demo"
      [code]="code"
    >
      <app-opting-out-scrollbars-demo />
    </app-demo-container>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
})
export class OptingOutScrollbarsDemoContainer {
  readonly code = `import { Component, ViewEncapsulation } from '@angular/core';

/**
 * Utilities on a box: no scrollbar, its room kept, or the browser's own bar
 * back (scrollbar-thin, or any scrollbar-color, does that in Chromium).
 */
@Component({
  selector: 'app-opting-out-scrollbars-demo',
  template: \`
    <div class="flex flex-wrap justify-center gap-6">
      @for (box of boxes; track box.label) {
        <div
          tabindex="0"
          role="region"
          [attr.aria-label]="box.label"
          class="h-48 w-40 overflow-auto rounded-md border p-4 text-sm"
          [class]="box.class"
        >
          <p class="mb-2 font-medium">{{ box.label }}</p>
          @for (line of lines; track line) {
            <p class="py-1">Line {{ line }}</p>
          }
        </div>
      }
    </div>
  \`,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
})
export class OptingOutScrollbarsDemo {
  protected readonly lines = Array.from({ length: 20 }, (_, i) => i + 1);
  protected readonly boxes = [
    { label: 'Hidden', class: 'no-scrollbar' },
    { label: 'Room kept', class: 'scrollbar-gutter-stable' },
    { label: "The browser's, thin", class: 'scrollbar-thin' },
  ];
}`;
}
