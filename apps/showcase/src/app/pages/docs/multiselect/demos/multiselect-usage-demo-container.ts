import { Component, ViewEncapsulation } from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { MultiselectUsageDemo } from './multiselect-usage-demo';

@Component({
  selector: 'app-multiselect-usage-demo-container',
  imports: [DemoContainer, MultiselectUsageDemo],
  template: `
    <app-demo-container
      title="Usage"
      [code]="code"
      demoUrl="/demos/multiselect/multiselect-usage-demo"
    >
      <app-multiselect-usage-demo />
    </app-demo-container>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
})
export class MultiselectUsageDemoContainer {
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
} from '@semantic-components/ui';
import { SiCheckIcon, SiXIcon } from '@semantic-icons/lucide-icons';

/** Several values from a list: chips for the chosen, a search to narrow the list, each option checked while chosen. */
@Component({
  selector: 'app-multiselect-usage-demo',
  imports: [
    ScComboboxMultiple,
    ScComboboxChip,
    ScComboboxChipRemove,
    ScComboboxChips,
    ScComboboxEmpty,
    ScComboboxInput,
    ScComboboxItem,
    ScComboboxItemIndicator,
    ScComboboxList,
    ScComboboxPopup,
    ScComboboxPortal,
    SiCheckIcon,
    SiXIcon,
  ],
  template: \`
    <div class="w-full max-w-sm">
      <div
        scCombobox
        multiple
        autoHighlight
        #picker="scCombobox"
        [(value)]="labels"
      >
        <div scComboboxChips>
          @for (item of picker.value(); track item) {
            <span scComboboxChip [value]="item">
              {{ item }}
              <button scComboboxChipRemove>
                <svg siXIcon></svg>
                <span class="sr-only">Remove {{ item }}</span>
              </button>
            </span>
          }
          <input
            scComboboxInput
            aria-label="Labels"
            placeholder="Pick labels"
          />
        </div>
        <ng-template scComboboxPortal>
          <div scComboboxPopup>
            <div scComboboxEmpty>No labels found.</div>
            <div scComboboxList aria-label="Labels">
              @for (item of matching(picker.query()); track item) {
                <div scComboboxItem [value]="item">
                  {{ item }}
                  <span scComboboxItemIndicator><svg siCheckIcon></svg></span>
                </div>
              }
            </div>
          </div>
        </ng-template>
      </div>
    </div>
  \`,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class MultiselectUsageDemo {
  private readonly labels = signal<string[]>(['Bug']);

  private readonly options = [
    'Bug',
    'Feature',
    'Docs',
    'Design',
    'Question',
    'Help wanted',
  ];

  /** The options whose name has what is typed. */
  private matching(query: string): readonly string[] {
    const text = query.trim().toLowerCase();
    return text
      ? this.options.filter((option) => option.toLowerCase().includes(text))
      : this.options;
  }
}`;
}
