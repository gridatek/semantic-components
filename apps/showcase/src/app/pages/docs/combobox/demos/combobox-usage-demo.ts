import { Component, ViewEncapsulation } from '@angular/core';
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

/** A select to filter: type to narrow the frameworks, the arrows and Enter (or a click) pick one. */
@Component({
  selector: 'app-combobox-usage-demo',
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
  template: `
    <div scCombobox #cb="scCombobox" class="w-56">
      <div scInputGroup>
        <input
          scInput
          scComboboxInput
          placeholder="Select a framework"
          aria-label="Framework"
        />
        <div scInputGroupAddon side="inline-end">
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
  `,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class ComboboxUsageDemo {
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
}
