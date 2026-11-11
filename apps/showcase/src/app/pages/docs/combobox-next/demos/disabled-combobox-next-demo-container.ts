import { Component, ViewEncapsulation } from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { DisabledComboboxNextDemo } from './disabled-combobox-next-demo';

@Component({
  selector: 'app-disabled-combobox-next-demo-container',
  imports: [DemoContainer, DisabledComboboxNextDemo],
  template: `
    <app-demo-container
      title="Disabled"
      demoUrl="/demos/combobox-next/disabled-combobox-next-demo"
      [code]="code"
    >
      <app-disabled-combobox-next-demo />
    </app-demo-container>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
})
export class DisabledComboboxNextDemoContainer {
  readonly code = `import { Component, ViewEncapsulation } from '@angular/core';
import {
  ScComboboxNext,
  ScComboboxNextEmpty,
  ScComboboxNextInput,
  ScComboboxNextItem,
  ScComboboxNextItemIndicator,
  ScComboboxNextList,
  ScComboboxNextPopup,
  ScComboboxNextPortal,
  ScComboboxNextTrigger,
  ScInput,
  ScInputGroup,
  ScInputGroupAddon,
  scComboboxNextMatches,
} from '@semantic-components/ui';
import { SiCheckIcon, SiChevronDownIcon } from '@semantic-icons/lucide-icons';

/** Disabled: its input and its chevron, out of reach. */
@Component({
  selector: 'app-disabled-combobox-next-demo',
  imports: [
    ScComboboxNext,
    ScComboboxNextEmpty,
    ScComboboxNextInput,
    ScComboboxNextItem,
    ScComboboxNextItemIndicator,
    ScComboboxNextList,
    ScComboboxNextPopup,
    ScComboboxNextPortal,
    ScComboboxNextTrigger,
    ScInput,
    ScInputGroup,
    ScInputGroupAddon,
    SiCheckIcon,
    SiChevronDownIcon,
  ],
  template: \`
    <div scComboboxNext #cb="scComboboxNext" disabled class="w-56">
      <div scInputGroup>
        <input
          scInput
          scComboboxNextInput
          placeholder="Select a framework"
          aria-label="Framework"
          disabled
        />
        <div scInputGroupAddon align="inline-end">
          <button scComboboxNextTrigger>
            <svg siChevronDownIcon></svg>
            <span class="sr-only">Show the list</span>
          </button>
        </div>
      </div>
      <ng-template scComboboxNextPortal>
        <div scComboboxNextPopup>
          <div scComboboxNextEmpty>No items found.</div>
          <div scComboboxNextList aria-label="Frameworks">
            @for (framework of matching(cb.query()); track framework) {
              <div scComboboxNextItem [value]="framework">
                {{ framework }}
                <span scComboboxNextItemIndicator><svg siCheckIcon></svg></span>
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
export class DisabledComboboxNextDemo {
  protected readonly frameworks = [
    'Next.js',
    'SvelteKit',
    'Nuxt.js',
    'Remix',
    'Astro',
  ];

  protected matching(query: string): string[] {
    return this.frameworks.filter((name) => scComboboxNextMatches(name, query));
  }
}`;
}
