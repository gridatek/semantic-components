import { Component, ViewEncapsulation, signal } from '@angular/core';
import {
  ScComboboxNextChip,
  ScComboboxNextChipRemove,
  ScComboboxNextChips,
  ScComboboxNextEmpty,
  ScComboboxNextInput,
  ScComboboxNextItem,
  ScComboboxNextItemIndicator,
  ScComboboxNextList,
  ScComboboxNextMultiple,
  ScComboboxNextPopup,
  ScComboboxNextPortal,
  scComboboxNextMatches,
} from '@semantic-components/ui';
import { SiCheckIcon, SiXIcon } from '@semantic-icons/lucide-icons';

/** Several values (multiple): a chip for each, then the input. Picking adds or removes and keeps the list open; Backspace removes the last chip. */
@Component({
  selector: 'app-multiple-combobox-next-demo',
  imports: [
    ScComboboxNextChip,
    ScComboboxNextChipRemove,
    ScComboboxNextChips,
    ScComboboxNextEmpty,
    ScComboboxNextInput,
    ScComboboxNextItem,
    ScComboboxNextItemIndicator,
    ScComboboxNextList,
    ScComboboxNextMultiple,
    ScComboboxNextPopup,
    ScComboboxNextPortal,
    SiCheckIcon,
    SiXIcon,
  ],
  template: `
    <div
      scComboboxNext
      multiple
      autoHighlight
      #cb="scComboboxNext"
      [(value)]="selected"
      class="w-full max-w-xs"
    >
      <div scComboboxNextChips>
        @for (framework of selected(); track framework) {
          <span scComboboxNextChip [value]="framework">
            {{ framework }}
            <button scComboboxNextChipRemove>
              <svg siXIcon></svg>
              <span class="sr-only">Remove {{ framework }}</span>
            </button>
          </span>
        }
        <input scComboboxNextInput aria-label="Frameworks" />
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
export class MultipleComboboxNextDemo {
  protected readonly selected = signal(['Next.js']);

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
