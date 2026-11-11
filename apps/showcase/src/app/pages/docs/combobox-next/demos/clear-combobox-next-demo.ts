import { Component, ViewEncapsulation, signal } from '@angular/core';
import {
  ScComboboxNext,
  ScComboboxNextClear,
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
import {
  SiCheckIcon,
  SiChevronDownIcon,
  SiXIcon,
} from '@semantic-icons/lucide-icons';

/** A clear button (scComboboxNextClear) while there is a value, in the chevron's place; emptying the input clears it too. */
@Component({
  selector: 'app-clear-combobox-next-demo',
  imports: [
    ScComboboxNext,
    ScComboboxNextClear,
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
    SiXIcon,
  ],
  template: `
    <div scComboboxNext #cb="scComboboxNext" [(value)]="framework" class="w-56">
      <div scInputGroup>
        <input
          scInput
          scComboboxNextInput
          placeholder="Select a framework"
          aria-label="Framework"
        />
        <div scInputGroupAddon align="inline-end">
          <button scComboboxNextTrigger>
            <svg siChevronDownIcon></svg>
            <span class="sr-only">Show the list</span>
          </button>
          <button scComboboxNextClear>
            <svg siXIcon></svg>
            <span class="sr-only">Clear</span>
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
  `,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class ClearComboboxNextDemo {
  protected readonly framework = signal<string | null>('Next.js');

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
}
