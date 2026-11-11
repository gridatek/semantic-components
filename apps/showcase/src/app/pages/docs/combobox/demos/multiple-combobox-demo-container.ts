import { Component, ViewEncapsulation } from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { MultipleComboboxDemo } from './multiple-combobox-demo';

@Component({
  selector: 'app-multiple-combobox-demo-container',
  imports: [DemoContainer, MultipleComboboxDemo],
  template: `
    <app-demo-container
      title="Multiple"
      demoUrl="/demos/combobox/multiple-combobox-demo"
      [code]="code"
    >
      <app-multiple-combobox-demo />
    </app-demo-container>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
})
export class MultipleComboboxDemoContainer {
  readonly code = `import { Component, ViewEncapsulation, signal } from '@angular/core';
import {
  ScComboboxChip,
  ScComboboxChipRemove,
  ScComboboxChips,
  ScComboboxEmpty,
  ScComboboxInput,
  ScComboboxItem,
  ScComboboxItemIndicator,
  ScComboboxList,
  ScComboboxMultiple,
  ScComboboxPopup,
  ScComboboxPortal,
  scComboboxMatches,
} from '@semantic-components/ui';
import { SiCheckIcon, SiXIcon } from '@semantic-icons/lucide-icons';

/** Several values (multiple): a chip for each, then the input. Picking adds or removes and keeps the list open; Backspace removes the last chip. */
@Component({
  selector: 'app-multiple-combobox-demo',
  imports: [
    ScComboboxChip,
    ScComboboxChipRemove,
    ScComboboxChips,
    ScComboboxEmpty,
    ScComboboxInput,
    ScComboboxItem,
    ScComboboxItemIndicator,
    ScComboboxList,
    ScComboboxMultiple,
    ScComboboxPopup,
    ScComboboxPortal,
    SiCheckIcon,
    SiXIcon,
  ],
  template: \`
    <div
      scCombobox
      multiple
      autoHighlight
      #cb="scCombobox"
      [(value)]="selected"
      class="w-full max-w-xs"
    >
      <div scComboboxChips>
        @for (framework of selected(); track framework) {
          <span scComboboxChip [value]="framework">
            {{ framework }}
            <button scComboboxChipRemove>
              <svg siXIcon></svg>
              <span class="sr-only">Remove {{ framework }}</span>
            </button>
          </span>
        }
        <input scComboboxInput aria-label="Frameworks" />
      </div>
      <ng-template scComboboxPortal>
        <div scComboboxPopup>
          <div scComboboxEmpty>No items found.</div>
          <div scComboboxList aria-label="Frameworks">
            @for (framework of matching(cb.query()); track framework) {
              <div scComboboxItem [value]="framework">
                {{ framework }}
                <span scComboboxItemIndicator><svg siCheckIcon></svg></span>
              </div>
            }
          </div>
        </div>
      </ng-template>
    </div>
  \`,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class MultipleComboboxDemo {
  protected readonly selected = signal(['Next.js']);

  protected readonly frameworks = [
    'Next.js',
    'SvelteKit',
    'Nuxt.js',
    'Remix',
    'Astro',
  ];

  protected matching(query: string): string[] {
    return this.frameworks.filter((name) => scComboboxMatches(name, query));
  }
}`;
}
