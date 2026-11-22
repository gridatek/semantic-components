import { Component, ViewEncapsulation } from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { ReadOnlyListboxDemo } from './read-only-listbox-demo';

@Component({
  selector: 'app-read-only-listbox-demo-container',
  imports: [DemoContainer, ReadOnlyListboxDemo],
  template: `
    <app-demo-container
      title="Read-only"
      [code]="code"
      demoUrl="/demos/listbox/read-only-listbox-demo"
    >
      <app-read-only-listbox-demo />
    </app-demo-container>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
})
export class ReadOnlyListboxDemoContainer {
  private readonly code = `import { Component, ViewEncapsulation, signal } from '@angular/core';
import {
  ScListbox,
  ScListboxItem,
  ScListboxItemIndicator,
} from '@semantic-components/ui';
import { SiCheckIcon } from '@semantic-icons/lucide-icons';

/** readonly: focusable and browsable, its value kept — not changed. */
@Component({
  selector: 'app-read-only-listbox-demo',
  imports: [ScListbox, ScListboxItem, ScListboxItemIndicator, SiCheckIcon],
  template: \`
    <div class="w-56">
      <div scListbox readonly aria-label="Framework" [(value)]="framework">
        @for (item of items; track item.value) {
          <div scListboxItem [value]="item.value">
            {{ item.label }}
            <span scListboxItemIndicator><svg siCheckIcon></svg></span>
          </div>
        }
      </div>
    </div>
  \`,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class ReadOnlyListboxDemo {
  private readonly framework = signal<string | null>('nuxt');
  private readonly items = [
    { value: 'angular', label: 'Angular' },
    { value: 'astro', label: 'Astro' },
    { value: 'next', label: 'Next.js' },
    { value: 'nuxt', label: 'Nuxt' },
    { value: 'svelte', label: 'SvelteKit' },
  ];
}`;
}
