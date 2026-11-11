import { Component, ViewEncapsulation } from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { DisabledComboboxDemo } from './disabled-combobox-demo';

@Component({
  selector: 'app-disabled-combobox-demo-container',
  imports: [DemoContainer, DisabledComboboxDemo],
  template: `
    <app-demo-container
      title="Disabled"
      demoUrl="/demos/combobox/disabled-combobox-demo"
      [code]="code"
    >
      <app-disabled-combobox-demo />
    </app-demo-container>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
})
export class DisabledComboboxDemoContainer {
  readonly code = `import { Component, ViewEncapsulation } from '@angular/core';
import {
  ScCombobox,
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
import { SiCheckIcon, SiChevronDownIcon } from '@semantic-icons/lucide-icons';

/** Disabled: its input and its chevron, out of reach. */
@Component({
  selector: 'app-disabled-combobox-demo',
  imports: [
    ScCombobox,
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
  ],
  template: \`
    <div scCombobox #cb="scCombobox" disabled class="w-56">
      <div scInputGroup>
        <input
          scInput
          scComboboxInput
          placeholder="Select a framework"
          aria-label="Framework"
          disabled
        />
        <div scInputGroupAddon align="inline-end">
          <button scComboboxTrigger>
            <svg siChevronDownIcon></svg>
            <span class="sr-only">Show the list</span>
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
export class DisabledComboboxDemo {
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
