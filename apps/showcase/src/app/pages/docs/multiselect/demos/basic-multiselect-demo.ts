import {
  Combobox,
  ComboboxPopup,
  ComboboxPopupContainer,
} from '@angular/aria/combobox';
import { Listbox, Option } from '@angular/aria/listbox';
import { OverlayModule } from '@angular/cdk/overlay';
import { NgTemplateOutlet } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
  afterRenderEffect,
  computed,
  viewChild,
  viewChildren,
} from '@angular/core';
import { ScMultiselectTrigger } from '@semantic-components/ui-lab';
import {
  SiBookOpenIcon,
  SiBriefcaseIcon,
  SiCheckIcon,
  SiChevronDownIcon,
  SiClockIcon,
  SiListChecksIcon,
  SiPlaneIcon,
  SiStarIcon,
  SiTagIcon,
  SiUserIcon,
} from '@semantic-icons/lucide-icons';

@Component({
  selector: 'app-basic-multiselect-demo',
  imports: [
    Combobox,
    ComboboxPopup,
    ComboboxPopupContainer,
    Listbox,
    Option,
    OverlayModule,
    ScMultiselectTrigger,
    SiBookOpenIcon,
    SiBriefcaseIcon,
    SiCheckIcon,
    SiChevronDownIcon,
    SiClockIcon,
    SiListChecksIcon,
    SiPlaneIcon,
    SiStarIcon,
    SiTagIcon,
    SiUserIcon,
    NgTemplateOutlet,
  ],
  template: `
    <div ngCombobox readonly class="flex justify-center">
      <div scMultiselectTrigger #trigger="scMultiselectTrigger">
        <span
          class="pointer-events-none absolute start-3 flex items-center gap-2 [&_svg]:size-4"
        >
          @if (displayIcon(); as icon) {
            <ng-container
              *ngTemplateOutlet="iconTmpl; context: { icon: icon }"
            ></ng-container>
          }
          <span class="text-sm">{{ displayValue() }}</span>
        </span>
        <svg
          siChevronDownIcon
          class="text-muted-foreground pointer-events-none absolute end-3 size-4 transition-transform duration-150"
        ></svg>
      </div>
      <ng-template ngComboboxPopupContainer>
        <ng-template
          [cdkConnectedOverlay]="{
            origin: trigger.elementRef,
            usePopover: 'inline',
            matchWidth: true,
          }"
          [cdkConnectedOverlayOpen]="true"
        >
          <div
            [class.invisible]="!combobox()?.expanded()"
            [class.max-h-0]="!combobox()?.expanded()"
            [class.overflow-hidden]="!combobox()?.expanded()"
            class="bg-popover text-popover-foreground mt-2 w-full rounded-lg border p-1 shadow-md transition-all duration-150"
          >
            <div
              ngListbox
              multi
              class="flex max-h-44 flex-col gap-0.5 overflow-auto"
            >
              @for (option of options; track option.value) {
                <div
                  ngOption
                  [value]="option.value"
                  [label]="option.value"
                  class="hover:bg-accent data-[active=true]:bg-accent aria-selected:bg-primary/10 aria-selected:text-primary flex cursor-pointer items-center gap-2 rounded-md px-2 py-1.5 text-sm outline-none [&_svg]:size-4"
                >
                  <ng-container
                    *ngTemplateOutlet="iconTmpl; context: { icon: option.icon }"
                  ></ng-container>
                  <span class="flex-1">{{ option.value }}</span>
                  <svg
                    siCheckIcon
                    class="[[ngOption]:not([aria-selected='true'])_&]:hidden"
                  ></svg>
                </div>
              }
            </div>
          </div>
        </ng-template>
      </ng-template>
    </div>

    <ng-template #iconTmpl let-icon="icon">
      @switch (icon) {
        @case ('tag') {
          <svg siTagIcon></svg>
        }
        @case ('star') {
          <svg siStarIcon></svg>
        }
        @case ('briefcase') {
          <svg siBriefcaseIcon></svg>
        }
        @case ('user') {
          <svg siUserIcon></svg>
        }
        @case ('list-checks') {
          <svg siListChecksIcon></svg>
        }
        @case ('clock') {
          <svg siClockIcon></svg>
        }
        @case ('book-open') {
          <svg siBookOpenIcon></svg>
        }
        @case ('plane') {
          <svg siPlaneIcon></svg>
        }
      }
    </ng-template>
  `,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BasicMultiselectDemo {
  /** The combobox listbox popup. */
  listbox = viewChild<Listbox<string>>(Listbox);
  /** The options available in the listbox. */
  optionElements = viewChildren<Option<string>>(Option);
  /** A reference to the ng aria combobox. */
  combobox = viewChild<Combobox<string>>(Combobox);

  /** The icon that is displayed in the combobox. */
  displayIcon = computed(() => {
    const values = this.listbox()?.values() || [];
    const option = this.options.find((option) => option.value === values[0]);
    return option ? option.icon : '';
  });

  /** The string that is displayed in the combobox. */
  displayValue = computed(() => {
    const values = this.listbox()?.values() || [];
    if (values.length === 0) {
      return 'Select a label';
    }
    if (values.length === 1) {
      return values[0];
    }
    return `${values[0]} + ${values.length - 1} more`;
  });

  /** The options that are available for selection. */
  options = [
    { value: 'important', label: 'Important', icon: 'tag' },
    { value: 'starred', label: 'Starred', icon: 'star' },
    { value: 'work', label: 'Work', icon: 'briefcase' },
    { value: 'personal', label: 'Personal', icon: 'user' },
    { value: 'todo', label: 'To Do', icon: 'list-checks' },
    { value: 'later', label: 'Later', icon: 'clock' },
    { value: 'read', label: 'Read', icon: 'book-open' },
    { value: 'travel', label: 'Travel', icon: 'plane' },
  ];

  constructor() {
    // Scrolls to the active item when the active option changes.
    // The slight delay here is to ensure animations are done before scrolling.
    afterRenderEffect(() => {
      const active = this.optionElements().find((opt) => opt.active());
      setTimeout(
        () => active?.element.scrollIntoView({ block: 'nearest' }),
        50,
      );
    });
    // Resets the listbox scroll position when the combobox is closed.
    afterRenderEffect(() => {
      if (!this.combobox()?.expanded()) {
        setTimeout(() => this.listbox()?.element.scrollTo(0, 0), 150);
      }
    });
  }
}
