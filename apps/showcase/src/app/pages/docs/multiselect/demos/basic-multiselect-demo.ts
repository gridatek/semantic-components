import { Combobox } from '@angular/aria/combobox';
import { Listbox } from '@angular/aria/listbox';
import { NgTemplateOutlet } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
  afterRenderEffect,
  computed,
  viewChild,
} from '@angular/core';
import {
  ScMultiselect,
  ScMultiselectIcon,
  ScMultiselectItem,
  ScMultiselectItemIndicator,
  ScMultiselectItemLabel,
  ScMultiselectLabel,
  ScMultiselectList,
  ScMultiselectPopup,
  ScMultiselectPortal,
  ScMultiselectTrigger,
  ScMultiselectValue,
} from '@semantic-components/ui-lab';
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
    ScMultiselect,
    ScMultiselectIcon,
    ScMultiselectItem,
    ScMultiselectItemIndicator,
    ScMultiselectItemLabel,
    ScMultiselectLabel,
    ScMultiselectList,
    ScMultiselectPopup,
    ScMultiselectPortal,
    ScMultiselectTrigger,
    ScMultiselectValue,
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
    <div scMultiselect class="flex justify-center">
      <div scMultiselectTrigger>
        <span scMultiselectValue>
          @if (displayIcon(); as icon) {
            <ng-container
              *ngTemplateOutlet="iconTmpl; context: { icon: icon }"
            ></ng-container>
          }
          <span scMultiselectLabel>{{ displayValue() }}</span>
        </span>
        <svg scMultiselectIcon siChevronDownIcon aria-hidden="true"></svg>
      </div>
      <ng-template scMultiselectPortal>
        <div scMultiselectPopup>
          <div scMultiselectList multi>
            @for (option of options; track option.value) {
              <div
                scMultiselectItem
                [value]="option.value"
                [label]="option.label"
              >
                <ng-container
                  *ngTemplateOutlet="iconTmpl; context: { icon: option.icon }"
                ></ng-container>
                <span scMultiselectItemLabel>{{ option.label }}</span>
                <svg
                  scMultiselectItemIndicator
                  siCheckIcon
                  aria-hidden="true"
                ></svg>
              </div>
            }
          </div>
        </div>
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
    // Resets the listbox scroll position when the combobox is closed.
    afterRenderEffect(() => {
      if (!this.combobox()?.expanded()) {
        setTimeout(() => this.listbox()?.element.scrollTo(0, 0), 150);
      }
    });
  }
}
