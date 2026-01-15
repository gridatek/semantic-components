import {
  Combobox,
  ComboboxInput,
  ComboboxPopup,
  ComboboxPopupContainer,
} from '@angular/aria/combobox';
import { Listbox, Option } from '@angular/aria/listbox';
import { OverlayModule } from '@angular/cdk/overlay';
import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
  afterRenderEffect,
  computed,
  signal,
  viewChild,
  viewChildren,
} from '@angular/core';

import { SiCheckIcon, SiChevronDownIcon } from '@semantic-icons/lucide-icons';

@Component({
  selector: 'app-select-demo',
  imports: [
    Combobox,
    ComboboxInput,
    ComboboxPopup,
    ComboboxPopupContainer,
    Listbox,
    Option,
    OverlayModule,
    SiChevronDownIcon,
    SiCheckIcon,
  ],
  template: `
    <div ngCombobox readonly>
      <div
        class="border-input focus-within:border-ring focus-within:ring-ring/50 flex h-9 w-full items-center relative rounded-md border bg-transparent text-sm shadow-xs transition-[color,box-shadow] focus-within:ring-[3px] [&:has(input[aria-disabled=true])]:cursor-not-allowed [&:has(input[aria-disabled=true])]:opacity-50"
        #origin
        data-slot="select-trigger"
      >
        <span
          class="line-clamp-1 flex flex-1 items-center gap-2 pointer-events-none left-3 absolute"
        >
          {{ displayValue() }}
        </span>
        <input
          class="absolute inset-0 cursor-pointer opacity-0 px-9 h-full border-none"
          aria-label="Select dropdown"
          placeholder="Select an option"
          ngComboboxInput
        />
        <svg
          class="size-4 opacity-50 text-muted-foreground transition-transform duration-150 pointer-events-none absolute right-3"
          si-chevron-down-icon
        ></svg>
      </div>
      <ng-template ngComboboxPopupContainer>
        <ng-template
          [cdkConnectedOverlay]="{ origin, usePopover: 'inline', matchWidth: true }"
          [cdkConnectedOverlayOpen]="true"
        >
          <div
            class="bg-popover text-popover-foreground relative z-50 min-w-[8rem] rounded-md border shadow-md mt-1 p-1"
            data-slot="select-content"
          >
            <div class="flex flex-col gap-0.5 overflow-y-auto max-h-60" ngListbox>
              @for (label of labels; track label.value) {
                <div
                  class="data-[active=true]:bg-accent data-[active=true]:text-accent-foreground [&[aria-selected=true]]:bg-accent [&[aria-selected=true]]:text-accent-foreground relative flex w-full cursor-default items-center rounded-sm py-1.5 pr-8 pl-2 text-sm outline-none select-none data-[disabled]:pointer-events-none data-[disabled]:opacity-50"
                  [value]="label.value"
                  [label]="label.value"
                  data-slot="select-item"
                  ngOption
                >
                  <span class="flex-1">{{ label.value }}</span>
                  <span
                    class="absolute right-2 flex size-3.5 items-center justify-center [div:not([aria-selected=true])_&]:hidden"
                    data-slot="select-item-indicator"
                  >
                    <svg class="size-4" si-check-icon></svg>
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
  styles: `
    /* Hide popup when combobox is closed */
    [ngCombobox]:has([ngComboboxInput][aria-expanded='false']) [data-slot='select-content'] {
      max-height: 0;
      opacity: 0;
      visibility: hidden;
      overflow: hidden;
      transition:
        max-height 150ms ease-in,
        visibility 0s 150ms,
        opacity 150ms ease-in;
    }
    /* Show popup when combobox is open */
    [ngCombobox]:has([ngComboboxInput][aria-expanded='true']) [data-slot='select-content'] {
      max-height: 24rem;
      opacity: 1;
      visibility: visible;
      transition:
        max-height 150ms ease-out,
        visibility 0s,
        opacity 25ms ease-out;
    }
    /* Rotate arrow when expanded */
    [ngComboboxInput][aria-expanded='true'] ~ svg {
      transform: rotate(180deg);
    }
  `,
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
    // The slight delay here is to ensure animations are done before scrolling.
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
