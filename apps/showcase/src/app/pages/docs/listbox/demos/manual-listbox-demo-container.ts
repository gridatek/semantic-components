import { Component, ViewEncapsulation } from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { ManualListboxDemo } from './manual-listbox-demo';

@Component({
  selector: 'app-manual-listbox-demo-container',
  imports: [DemoContainer, ManualListboxDemo],
  template: `
    <app-demo-container
      title="Manual activation"
      [code]="code"
      demoUrl="/demos/listbox/manual-listbox-demo"
    >
      <app-manual-listbox-demo />
    </app-demo-container>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
})
export class ManualListboxDemoContainer {
  private readonly code = `import { Component, ViewEncapsulation, signal } from '@angular/core';
import {
  ScListbox,
  ScListboxItem,
  ScListboxItemIndicator,
} from '@semantic-components/ui';
import { SiCheckIcon } from '@semantic-icons/lucide-icons';

/** activation="manual": the arrows only move — Space, Enter or a click chooses. Nothing chosen at first. */
@Component({
  selector: 'app-manual-listbox-demo',
  imports: [ScListbox, ScListboxItem, ScListboxItemIndicator, SiCheckIcon],
  template: \`
    <div class="grid w-56 gap-2">
      <div
        scListbox
        activation="manual"
        aria-label="Framework"
        [(value)]="framework"
      >
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
  \`,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class ManualListboxDemo {
  private readonly framework = signal<string | null>(null);
  private readonly items = [
    { value: 'angular', label: 'Angular' },
    { value: 'astro', label: 'Astro' },
    { value: 'next', label: 'Next.js' },
    { value: 'nuxt', label: 'Nuxt' },
    { value: 'svelte', label: 'SvelteKit' },
  ];
}`;
}
