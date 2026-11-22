import { Component, ViewEncapsulation, signal } from '@angular/core';
import {
  ScListbox,
  ScListboxItem,
  ScListboxItemIndicator,
} from '@semantic-components/ui';
import { SiCheckIcon } from '@semantic-icons/lucide-icons';

/** deselectable: the chosen option, pressed again, is no longer chosen. */
@Component({
  selector: 'app-deselectable-listbox-demo',
  imports: [ScListbox, ScListboxItem, ScListboxItemIndicator, SiCheckIcon],
  template: `
    <div class="grid w-56 gap-2">
      <div scListbox deselectable aria-label="Framework" [(value)]="framework">
        @for (item of items; track item.value) {
          <div scListboxItem [value]="item.value">
            {{ item.label }}
            <span scListboxItemIndicator><svg siCheckIcon></svg></span>
          </div>
        }
      </div>
      <p class="text-muted-foreground text-sm" data-testid="picked">
        {{ framework() ?? 'None' }}
      </p>
    </div>
  `,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class DeselectableListboxDemo {
  private readonly framework = signal<string | null>('astro');
  private readonly items = [
    { value: 'angular', label: 'Angular' },
    { value: 'astro', label: 'Astro' },
    { value: 'next', label: 'Next.js' },
    { value: 'nuxt', label: 'Nuxt' },
    { value: 'svelte', label: 'SvelteKit' },
  ];
}
