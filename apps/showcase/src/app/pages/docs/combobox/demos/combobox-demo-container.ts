import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { ComboboxDemo } from './combobox-demo';

@Component({
  selector: 'app-combobox-demo-container',
  imports: [DemoContainer, ComboboxDemo],
  template: `
    <app-demo-container
      title="Basic"
      [code]="code"
      demoUrl="/demos/combobox/combobox-demo"
    >
      <app-combobox-demo />
    </app-demo-container>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ComboboxDemoContainer {
  readonly code = `import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
  computed,
  signal,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import {
  ScCombobox,
  ScComboboxClear,
  ScComboboxDialog,
  ScComboboxDisplayValue,
  ScComboboxEmpty,
  ScComboboxIcon,
  ScComboboxInput,
  ScComboboxInputGroup,
  ScComboboxItem,
  ScComboboxItemIndicator,
  ScComboboxItemLabel,
  ScComboboxList,
  ScComboboxListContainer,
  ScComboboxPopupContainer,
  ScComboboxSearchInput,
  ScComboboxSearchInputGroup,
  ScComboboxSearchInputIcon,
  ScComboboxSearchPanel,
} from '@semantic-components/ui';
import {
  SiCheckIcon,
  SiChevronsUpDownIcon,
  SiSearchIcon,
  SiXIcon,
} from '@semantic-icons/lucide-icons';

@Component({
  selector: 'app-combobox-demo',
  imports: [
    ScCombobox,
    ScComboboxClear,
    ScComboboxSearchPanel,
    ScComboboxListContainer,
    ScComboboxDialog,
    ScComboboxDisplayValue,
    ScComboboxEmpty,
    ScComboboxSearchInputIcon,
    ScComboboxItem,
    ScComboboxItemIndicator,
    ScComboboxItemLabel,
    ScComboboxSearchInput,
    ScComboboxSearchInputGroup,
    ScComboboxInputGroup,
    ScComboboxIcon,
    ScComboboxList,
    ScComboboxPopupContainer,
    ScComboboxInput,
    FormsModule,
    SiCheckIcon,
    SiChevronsUpDownIcon,
    SiSearchIcon,
    SiXIcon,
  ],
  host: { class: 'block w-full' },
  template: \`
    <div scCombobox [readonly]="true" class="w-60">
      <div scComboboxInputGroup>
        <span scComboboxDisplayValue></span>
        <input
          scComboboxInput
          placeholder="Select a country..."
          [value]="value()"
        />
        <button scComboboxClear aria-label="Clear selection">
          <svg siXIcon></svg>
        </button>
        <svg siChevronsUpDownIcon scComboboxIcon></svg>
      </div>
      <ng-template scComboboxPopupContainer>
        <dialog scComboboxDialog>
          <div scComboboxSearchPanel>
            <div scComboboxSearchInputGroup>
              <svg siSearchIcon scComboboxSearchInputIcon></svg>
              <input
                scComboboxSearchInput
                placeholder="Search..."
                [(value)]="searchString"
              />
            </div>
            <ng-template scComboboxListContainer>
              @if (options().length === 0) {
                <div scComboboxEmpty>No results found</div>
              }
              <div scComboboxList [(values)]="selectedCountries">
                @for (option of options(); track option.value) {
                  <div
                    scComboboxItem
                    [value]="option.value"
                    [label]="option.label"
                  >
                    <span scComboboxItemLabel>{{ option.label }}</span>
                    <svg siCheckIcon scComboboxItemIndicator></svg>
                  </div>
                }
              </div>
            </ng-template>
          </div>
        </dialog>
      </ng-template>
    </div>
  \`,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ComboboxDemo {
  value = signal('');
  searchString = signal('');
  selectedCountries = signal<string[]>([]);
  options = computed(() =>
    ALL_COUNTRIES.filter((country) =>
      country.label.toLowerCase().startsWith(this.searchString().toLowerCase()),
    ),
  );
}

const ALL_COUNTRIES = [
  { value: 'AF', label: 'Afghanistan' },
  { value: 'AL', label: 'Albania' },
  { value: 'DZ', label: 'Algeria' },
  // ... 193 more countries with ISO codes
];`;
}
