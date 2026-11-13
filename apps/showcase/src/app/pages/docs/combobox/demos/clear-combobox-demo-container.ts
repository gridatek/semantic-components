import { Component, ViewEncapsulation } from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { ClearComboboxDemo } from './clear-combobox-demo';

@Component({
  selector: 'app-clear-combobox-demo-container',
  imports: [DemoContainer, ClearComboboxDemo],
  template: `
    <app-demo-container
      title="Clear"
      demoUrl="/demos/combobox/clear-combobox-demo"
      [code]="code"
    >
      <app-clear-combobox-demo />
    </app-demo-container>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
})
export class ClearComboboxDemoContainer {
  readonly code = `import { Component, ViewEncapsulation, signal } from '@angular/core';
import {
  ScCombobox,
  ScComboboxClear,
  ScComboboxEmpty,
  ScComboboxInput,
  ScComboboxItem,
  ScComboboxItemIndicator,
  ScComboboxList,
  ScComboboxPopup,
  ScComboboxPortal,
  ScComboboxTrigger,
  ScInput,
  ScInputGroup,
  ScInputGroupAddon,
  scComboboxMatches,
} from '@semantic-components/ui';
import {
  SiCheckIcon,
  SiChevronDownIcon,
  SiXIcon,
} from '@semantic-icons/lucide-icons';

/** A clear button (scComboboxClear) while there is a value, in the chevron's place; emptying the input clears it too. */
@Component({
  selector: 'app-clear-combobox-demo',
  imports: [
    ScCombobox,
    ScComboboxClear,
    ScComboboxEmpty,
    ScComboboxInput,
    ScComboboxItem,
    ScComboboxItemIndicator,
    ScComboboxList,
    ScComboboxPopup,
    ScComboboxPortal,
    ScComboboxTrigger,
    ScInput,
    ScInputGroup,
    ScInputGroupAddon,
    SiCheckIcon,
    SiChevronDownIcon,
    SiXIcon,
  ],
  template: \`
    <div scCombobox #cb="scCombobox" [(value)]="framework" class="w-56">
      <div scInputGroup>
        <input
          scInput
          scComboboxInput
          placeholder="Select a framework"
          aria-label="Framework"
        />
        <div scInputGroupAddon alignment="inline-end">
          <button scComboboxTrigger>
            <svg siChevronDownIcon></svg>
            <span class="sr-only">Show the list</span>
          </button>
          <button scComboboxClear>
            <svg siXIcon></svg>
            <span class="sr-only">Clear</span>
          </button>
        </div>
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
export class ClearComboboxDemo {
  protected readonly framework = signal<string | null>('Next.js');

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
