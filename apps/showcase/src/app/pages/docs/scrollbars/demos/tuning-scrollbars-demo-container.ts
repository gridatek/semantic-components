import { Component, ViewEncapsulation } from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { TuningScrollbarsDemo } from './tuning-scrollbars-demo';

@Component({
  selector: 'app-tuning-scrollbars-demo-container',
  imports: [DemoContainer, TuningScrollbarsDemo],
  template: `
    <app-demo-container
      title="Tuning"
      demoUrl="/demos/scrollbars/tuning-scrollbars-demo"
      [code]="code"
    >
      <app-tuning-scrollbars-demo />
    </app-demo-container>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
})
export class TuningScrollbarsDemoContainer {
  private readonly code = `import { Component, ViewEncapsulation } from '@angular/core';

/**
 * The variables on a box: its scrollbars, and those inside it. On :root,
 * the whole page's.
 */
@Component({
  selector: 'app-tuning-scrollbars-demo',
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
export class TuningScrollbarsDemo {
  protected readonly lines = Array.from({ length: 20 }, (_, i) => i + 1);
  protected readonly boxes = [
    {
      label: 'Primary',
      class: '[--sc-scrollbar-thumb:var(--color-primary)]',
    },
    {
      label: 'Square',
      class: '[--sc-scrollbar-radius:0]',
    },
    {
      label: 'Wide, tracked',
      class:
        '[--sc-scrollbar-size:0.875rem] [--sc-scrollbar-inset:3px] [--sc-scrollbar-track:var(--color-muted)]',
    },
  ];
}`;
}
