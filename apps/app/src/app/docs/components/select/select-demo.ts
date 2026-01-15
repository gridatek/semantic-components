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
  ],
  template: `
    <div ngCombobox readonly>
      <div class="select" #origin>
        <span class="combobox-label">
          <span
            class="selected-label-icon material-symbols-outlined"
            translate="no"
            aria-hidden="true"
          >
            {{ displayIcon() }}
          </span>
          <span class="selected-label-text">{{ displayValue() }}</span>
        </span>
        <input aria-label="Label dropdown" placeholder="Select a label" ngComboboxInput />
        <span class="example-arrow material-symbols-outlined" translate="no" aria-hidden="true">
          arrow_drop_down
        </span>
      </div>
      <ng-template ngComboboxPopupContainer>
        <ng-template
          [cdkConnectedOverlay]="{ origin, usePopover: 'inline', matchWidth: true }"
          [cdkConnectedOverlayOpen]="true"
        >
          <div class="example-popup-container">
            <div ngListbox>
              @for (label of labels; track label.value) {
                <div [value]="label.value" [label]="label.value" ngOption>
                  <span
                    class="example-option-icon material-symbols-outlined"
                    translate="no"
                    aria-hidden="true"
                  >
                    {{ label.icon }}
                  </span>
                  <span class="example-option-text">{{ label.value }}</span>
                  <span
                    class="example-option-check material-symbols-outlined"
                    translate="no"
                    aria-hidden="true"
                  >
                    check
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
    :host {
      display: flex;
      justify-content: center;
      font-family: var(--inter-font);
    }
    .select {
      display: flex;
      position: relative;
      align-items: center;
      color: color-mix(in srgb, var(--hot-pink) 90%, var(--primary-contrast));
      background-color: color-mix(in srgb, var(--hot-pink) 5%, transparent);
      border-radius: 0.5rem;
      border: 1px solid color-mix(in srgb, var(--hot-pink) 80%, transparent);
    }
    .select:hover {
      background-color: color-mix(in srgb, var(--hot-pink) 15%, transparent);
    }
    .select:has([ngComboboxInput][aria-disabled='true']) {
      opacity: 0.6;
      cursor: default;
    }
    .selected-label-icon {
      font-size: 1.25rem;
    }
    [ngComboboxInput] {
      opacity: 0;
      cursor: pointer;
      padding: 0 3rem;
      height: 2.5rem;
      border: none;
    }
    [ngCombobox]:focus-within .select {
      outline: 2px solid color-mix(in srgb, var(--hot-pink) 50%, transparent);
    }
    .combobox-label {
      gap: 1rem;
      left: 1rem;
      display: flex;
      position: absolute;
      align-items: center;
      pointer-events: none;
    }
    .example-arrow {
      right: 1rem;
      position: absolute;
      pointer-events: none;
      transition: transform 150ms ease-in-out;
    }
    [ngComboboxInput][aria-expanded='true'] ~ .example-arrow {
      transform: rotate(180deg);
    }
    .example-popup-container {
      width: 100%;
      padding: 0.5rem;
      margin-top: 8px;
      border-radius: 0.5rem;
      background-color: var(--septenary-contrast);
      font-size: 0.9rem;
      max-height: 11rem;
      opacity: 1;
      visibility: visible;
      transition:
        max-height 150ms ease-out,
        visibility 0s,
        opacity 25ms ease-out;
    }
    [ngListbox] {
      gap: 2px;
      height: 100%;
      display: flex;
      overflow: auto;
      flex-direction: column;
    }
    [ngCombobox]:has([ngComboboxInput][aria-expanded='false']) .example-popup-container {
      max-height: 0;
      opacity: 0;
      visibility: hidden;
      transition:
        max-height 150ms ease-in,
        visibility 0s 150ms,
        opacity 150ms ease-in;
    }
    [ngCombobox]:has([ngComboboxInput][aria-expanded='true']) [ngListbox] {
      display: flex;
    }
    [ngOption] {
      display: flex;
      cursor: pointer;
      align-items: center;
      margin: 1px;
      padding: 0 1rem;
      min-height: 2.25rem;
      border-radius: 0.5rem;
    }
    [ngOption]:hover {
      background-color: color-mix(in srgb, var(--primary-contrast) 5%, transparent);
    }
    [ngOption][data-active='true'] {
      outline-offset: -2px;
      outline: 2px solid color-mix(in srgb, var(--hot-pink) 50%, transparent);
    }
    [ngOption][aria-selected='true'] {
      color: var(--hot-pink);
      background-color: color-mix(in srgb, var(--hot-pink) 5%, transparent);
    }
    .example-option-icon {
      font-size: 1.25rem;
      padding-right: 1rem;
    }
    [ngOption]:not([aria-selected='true']) .example-option-check {
      display: none;
    }
    .example-option-icon,
    .example-option-check {
      font-size: 0.9rem;
    }
    .example-option-text {
      flex: 1;
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
  /** The icon that is displayed in the combobox. */
  displayIcon = computed(() => {
    const values = this.listbox()?.values() || [];
    const label = this.labels.find((label) => label.value === values[0]);
    return label ? label.icon : '';
  });
  /** The string that is displayed in the combobox. */
  displayValue = computed(() => {
    const values = this.listbox()?.values() || [];
    return values.length ? values[0] : 'Select a label';
  });
  /** The labels that are available for selection. */
  labels = [
    { value: 'Important', icon: 'label' },
    { value: 'Starred', icon: 'star' },
    { value: 'Work', icon: 'work' },
    { value: 'Personal', icon: 'person' },
    { value: 'To Do', icon: 'checklist' },
    { value: 'Later', icon: 'schedule' },
    { value: 'Read', icon: 'menu_book' },
    { value: 'Travel', icon: 'flight' },
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
