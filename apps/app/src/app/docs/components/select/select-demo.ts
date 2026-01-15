import {
  Combobox,
  ComboboxInput,
  ComboboxPopup,
  ComboboxPopupContainer,
} from '@angular/aria/combobox';
import { Listbox, Option } from '@angular/aria/listbox';
import { CdkConnectedOverlay } from '@angular/cdk/overlay';
import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
  afterRenderEffect,
  computed,
  viewChild,
  viewChildren,
} from '@angular/core';

import { SiCheckIcon, SiChevronDownIcon } from '@semantic-icons/lucide-icons';

@Component({
  selector: 'app-select-demo',
  imports: [
    Combobox,
    ComboboxInput,
    ComboboxPopupContainer,
    Listbox,
    Option,
    CdkConnectedOverlay,
    SiChevronDownIcon,
    SiCheckIcon,
  ],
  template: `
    <div ngCombobox readonly>
      <button
        class="border-input data-[placeholder]:text-muted-foreground focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive dark:bg-input/30 dark:hover:bg-input/50 flex w-full items-center justify-between gap-2 rounded-md border bg-transparent px-3 py-2 text-sm whitespace-nowrap shadow-xs transition-[color,box-shadow] outline-none focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50 h-9 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg]:size-4"
        #origin
        type="button"
      >
        <span
          class="line-clamp-1 flex items-center gap-2 pointer-events-none"
          data-slot="select-value"
        >
          {{ displayValue() }}
        </span>
        <input
          class="sr-only"
          aria-label="Select dropdown"
          placeholder="Select an option"
          ngComboboxInput
        />
        <svg
          class="size-4 opacity-50 text-muted-foreground transition-transform duration-150"
          [class.rotate-180]="combobox()?.expanded()"
          si-chevron-down-icon
        ></svg>
      </button>
      <ng-template ngComboboxPopupContainer>
        <ng-template
          [cdkConnectedOverlayOrigin]="origin"
          [cdkConnectedOverlayOpen]="true"
          [cdkConnectedOverlayWidth]="origin.offsetWidth"
          cdkConnectedOverlay
        >
          <div
            class="bg-popover text-popover-foreground data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 relative z-50 max-h-96 min-w-[8rem] overflow-hidden rounded-md border shadow-md mt-1"
            [attr.data-state]="combobox()?.expanded() ? 'open' : 'closed'"
            data-slot="select-content"
          >
            <div class="p-1 overflow-y-auto max-h-60" ngListbox>
              @for (label of labels; track label.value) {
                <div
                  class="focus:bg-accent focus:text-accent-foreground data-[active=true]:bg-accent data-[active=true]:text-accent-foreground relative flex w-full cursor-default items-center gap-2 rounded-sm py-1.5 pr-8 pl-2 text-sm outline-none select-none data-[disabled]:pointer-events-none data-[disabled]:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg]:size-4"
                  [value]="label.value"
                  [label]="label.value"
                  data-slot="select-item"
                  ngOption
                >
                  <span class="flex-1">{{ label.value }}</span>
                  <span
                    class="absolute right-2 flex size-3.5 items-center justify-center"
                    data-slot="select-item-indicator"
                  >
                    @if (isSelected(label.value)) {
                      <svg class="size-4" si-check-icon></svg>
                    }
                  </span>
                </div>
              }
            </div>
          </div>
        </ng-template>
      </ng-template>
    </div>
  `,
  host: {
    class: 'block w-[180px]',
  },
  styles: ``,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SelectDemo {
  /** The combobox listbox popup. */
  listbox = viewChild<Listbox<string>>(Listbox);
  /** The options available in the listbox. */
  options = viewChildren<Option<string>>(Option);
  /** A reference to the ng aria combobox. */
  combobox = viewChild<Combobox<string>>(Combobox);

  /** The string that is displayed in the combobox. */
  displayValue = computed(() => {
    const values = this.listbox()?.values() || [];
    return values.length ? values[0] : 'Select an option';
  });

  /** Check if a value is selected */
  isSelected(value: string): boolean {
    const values = this.listbox()?.values() || [];
    return values.includes(value);
  }

  /** The options that are available for selection. */
  labels = [
    { value: 'Apple' },
    { value: 'Banana' },
    { value: 'Blueberry' },
    { value: 'Grapes' },
    { value: 'Pineapple' },
  ];

  constructor() {
    // Scrolls to the active item when the active option changes.
    afterRenderEffect(() => {
      const option = this.options().find((opt) => opt.active());
      setTimeout(() => option?.element.scrollIntoView({ block: 'nearest' }), 50);
    });
    // Resets the listbox scroll position when the combobox is closed.
    afterRenderEffect(() => {
      if (!this.combobox()?.expanded()) {
        setTimeout(() => this.listbox()?.element.scrollTo(0, 0), 150);
      }
    });
  }
}
