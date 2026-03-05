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
  ComboboxPopupContainer,
} from '@angular/aria/combobox';
import { Listbox, Option } from '@angular/aria/listbox';
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
  ScComboboxInput,
  ScComboboxTrigger,
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
    ComboboxDialog,
    Combobox,
    ComboboxPopupContainer,
    ScComboboxInput,
    ScComboboxTrigger,
    ScComboboxTriggerInput,
    Listbox,
    Option,
    FormsModule,
    SiCheckIcon,
    SiChevronsUpDownIcon,
    SiSearchIcon,
  ],
  host: { class: 'block' },
  template: \`
    <div
      ngCombobox
      #combobox="ngCombobox"
      [readonly]="true"
      class="border-border relative flex w-60 flex-col rounded-md border"
    >
      <div scComboboxTrigger>
        <input
          scComboboxTriggerInput
          placeholder="Select a country..."
          [value]="value()"
        />
        <svg
          siChevronsUpDownIcon
          class="pointer-events-none absolute right-2 size-4 shrink-0 opacity-50"
        ></svg>
      </div>
      <ng-template ngComboboxPopupContainer>
        <dialog
          ngComboboxDialog
          class="border-border bg-popover text-popover-foreground absolute rounded-md border p-0 shadow-md backdrop:bg-transparent"
        >
          <div
            ngCombobox
            #combobox="ngCombobox"
            filterMode="manual"
            [alwaysExpanded]="true"
            class="relative flex w-full flex-col rounded-md border-none"
          >
            <div class="border-border relative flex items-center border-b">
              <svg
                siSearchIcon
                class="pointer-events-none absolute left-2.5 size-4 shrink-0 opacity-50"
              ></svg>
              <input
                scComboboxInput
                placeholder="Search..."
                [(value)]="searchString"
              />
            </div>
            <ng-template ngComboboxPopupContainer>
              @if (options().length === 0) {
                <div class="text-muted-foreground p-4 text-center text-sm">
                  No results found
                </div>
              }
              <div
                ngListbox
                [(values)]="selectedCountries"
                class="flex max-h-52 flex-col gap-0.5 overflow-auto p-1"
              >
                @for (option of options(); track option) {
                  <div
                    ngOption
                    [value]="option"
                    [label]="option"
                    class="data-[active=true]:bg-accent data-[active=true]:text-accent-foreground aria-selected:text-primary flex cursor-pointer items-center rounded-sm px-2 py-1.5 text-sm outline-none"
                  >
                    <span class="flex-1">{{ option }}</span>
                    <svg siCheckIcon class="size-4 shrink-0"></svg>
                  </div>
                }
              </div>
            </ng-template>
          </div>
        </dialog>
      </ng-template>
    </div>
  \`,
  styles: \`
    [ngOption][aria-selected='true'] svg[siCheckIcon] {
      display: block;
    }
    [ngOption]:not([aria-selected='true']) svg[siCheckIcon] {
      display: none;
    }
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
