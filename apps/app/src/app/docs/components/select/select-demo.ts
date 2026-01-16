import { ComboboxPopupContainer } from '@angular/aria/combobox';
import { Listbox, Option } from '@angular/aria/listbox';
import { OverlayModule } from '@angular/cdk/overlay';
import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
  afterRenderEffect,
  computed,
  viewChild,
  viewChildren,
} from '@angular/core';

import {
  ScSelect,
  ScSelectContent,
  ScSelectIcon,
  ScSelectItem,
  ScSelectItemIndicator,
  ScSelectTrigger,
  ScSelectValue,
} from '@semantic-components/ui';
import { SiCheckIcon, SiChevronDownIcon } from '@semantic-icons/lucide-icons';

@Component({
  selector: 'app-select-demo',
  imports: [
    ComboboxPopupContainer,
    OverlayModule,
    ScSelect,
    ScSelectTrigger,
    ScSelectContent,
    ScSelectItem,
    ScSelectItemIndicator,
    ScSelectValue,
    ScSelectIcon,
    SiChevronDownIcon,
    SiCheckIcon,
  ],
  template: `
    <div scSelect>
      <div class="relative" #origin scSelectTrigger>
        <span class="left-3 absolute" scSelectValue>
          {{ displayValue() }}
        </span>
        <svg class="absolute right-3" scSelectIcon si-chevron-down-icon></svg>
      </div>
      <ng-template ngComboboxPopupContainer>
        <ng-template
          [cdkConnectedOverlay]="{ origin, usePopover: 'inline', matchWidth: true }"
          [cdkConnectedOverlayOpen]="true"
        >
          <div class="mt-1" scSelectContent>
            @for (label of labels; track label.value) {
              <div [value]="label.value" [label]="label.value" scSelectItem>
                <span class="flex-1">{{ label.value }}</span>
                <span scSelectItemIndicator>
                  <svg class="size-4" si-check-icon></svg>
                </span>
              </div>
            }
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
    [scSelect]:has([scSelectTrigger][aria-expanded='false']) [scSelectContent] {
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
    [scSelect]:has([scSelectTrigger][aria-expanded='true']) [scSelectContent] {
      max-height: 24rem;
      opacity: 1;
      visibility: visible;
      transition:
        max-height 150ms ease-out,
        visibility 0s,
        opacity 25ms ease-out;
    }
    /* Rotate arrow when expanded */
    [scSelectTrigger][aria-expanded='true'] [scSelectIcon] {
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
      if (!this.listbox()) return;
      setTimeout(() => this.listbox()?.element.scrollTo(0, 0), 150);
    });
  }
}
