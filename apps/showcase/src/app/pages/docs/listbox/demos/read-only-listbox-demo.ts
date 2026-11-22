import { Component, ViewEncapsulation, signal } from '@angular/core';
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
  template: `
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
  `,
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
}
