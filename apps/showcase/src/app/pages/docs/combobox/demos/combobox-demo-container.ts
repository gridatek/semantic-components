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
  host: { class: 'block' },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ComboboxDemoContainer {
  readonly code = `import {
  Combobox,
  ComboboxDialog,
} from '@angular/aria/combobox';
import { Listbox } from '@angular/aria/listbox';
import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
  afterRenderEffect,
  computed,
  signal,
  untracked,
  viewChild,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import {
  ScCombobox,
  ScComboboxDialog,
  ScComboboxEmpty,
  ScComboboxListContainer,
  ScComboboxInputIcon,
  ScComboboxSearchPanel,
  ScComboboxItem,
  ScComboboxItemIndicator,
  ScComboboxItemLabel,
  ScComboboxList,
  ScComboboxPopupContainer,
  ScComboboxInput,
  ScComboboxInputGroup,
  ScComboboxTrigger,
  ScComboboxTriggerIcon,
  ScComboboxTriggerInput,
} from '@semantic-components/ui';
import {
  SiCheckIcon,
  SiChevronsUpDownIcon,
  SiSearchIcon,
} from '@semantic-icons/lucide-icons';

@Component({
  selector: 'app-combobox-demo',
  imports: [
    ScCombobox,
    ScComboboxSearchPanel,
    ScComboboxDialog,
    ScComboboxEmpty,
    ScComboboxListContainer,
    ScComboboxInputIcon,
    ScComboboxItem,
    ScComboboxItemIndicator,
    ScComboboxItemLabel,
    ScComboboxList,
    ScComboboxPopupContainer,
    ScComboboxInput,
    ScComboboxInputGroup,
    ScComboboxTrigger,
    ScComboboxTriggerIcon,
    ScComboboxTriggerInput,
    FormsModule,
    SiCheckIcon,
    SiChevronsUpDownIcon,
    SiSearchIcon,
  ],
  host: { class: 'block' },
  template: \`
    <div scCombobox [readonly]="true" class="w-60">
      <div scComboboxTrigger>
        <input
          scComboboxTriggerInput
          placeholder="Select a country..."
          [value]="value()"
        />
        <svg siChevronsUpDownIcon scComboboxTriggerIcon></svg>
      </div>
      <ng-template scComboboxPopupContainer>
        <dialog scComboboxDialog>
          <div scComboboxSearchPanel>
            <div scComboboxInputGroup>
              <svg siSearchIcon scComboboxInputIcon></svg>
              <input
                scComboboxInput
                placeholder="Search..."
                [(value)]="searchString"
              />
            </div>
            <ng-template scComboboxListContainer>
              @if (options().length === 0) {
                <div scComboboxEmpty>No results found</div>
              }
              <div scComboboxList [(values)]="selectedCountries">
                @for (option of options(); track option) {
                  <div
                    scComboboxItem
                    [value]="option"
                    [label]="option"
                  >
                    <span scComboboxItemLabel>{{ option }}</span>
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
  dialog = viewChild(ComboboxDialog);
  listbox = viewChild<Listbox<string>>(Listbox);
  combobox = viewChild<Combobox<string>>(Combobox);
  value = signal('');
  searchString = signal('');
  options = computed(() =>
    ALL_COUNTRIES.filter((country) =>
      country.toLowerCase().startsWith(this.searchString().toLowerCase()),
    ),
  );
  selectedCountries = signal<string[]>([]);
  constructor() {
    afterRenderEffect(() => {
      if (this.dialog() && this.combobox()?.expanded()) {
        untracked(() => this.listbox()?.gotoFirst());
        this.positionDialog();
      }
    });
    afterRenderEffect(() => {
      if (this.selectedCountries().length > 0) {
        untracked(() => this.dialog()?.close());
        this.value.set(this.selectedCountries()[0]);
        this.searchString.set('');
      }
    });
    afterRenderEffect(() => this.listbox()?.scrollActiveItemIntoView());
  }
  // TODO(wagnermaciel): Switch to using the CDK for positioning.
  positionDialog() {
    const dialog = this.dialog()!;
    const combobox = this.combobox()!;
    const comboboxRect = combobox.inputElement()?.getBoundingClientRect();
    const scrollY = window.scrollY;
    if (comboboxRect) {
      dialog.element.style.width = \`\${comboboxRect.width}px\`;
      dialog.element.style.top = \`\${comboboxRect.bottom + scrollY + 4}px\`;
      dialog.element.style.left = \`\${comboboxRect.left - 1}px\`;
    }
  }
}`;
}
