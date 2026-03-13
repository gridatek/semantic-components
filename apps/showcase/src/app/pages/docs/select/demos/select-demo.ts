import { NgTemplateOutlet } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
  computed,
  signal,
} from '@angular/core';
import { FormField, FormRoot, form } from '@angular/forms/signals';
import {
  ScSelect,
  ScSelectDisplayValue,
  ScSelectIcon,
  ScSelectInput,
  ScSelectItem,
  ScSelectItemIcon,
  ScSelectItemIndicator,
  ScSelectItemLabel,
  ScSelectList,
  ScSelectOrigin,
  ScSelectPopup,
  ScSelectPortal,
} from '@semantic-components/ui';
import {
  SiBookIcon,
  SiBriefcaseIcon,
  SiCheckIcon,
  SiChevronDownIcon,
  SiClockIcon,
  SiPlaneIcon,
  SiSquareCheckIcon,
  SiStarIcon,
  SiTagIcon,
  SiUserIcon,
} from '@semantic-icons/lucide-icons';

interface FormModel {
  label: string;
}

@Component({
  selector: 'app-select-demo',
  imports: [
    ScSelect,
    ScSelectDisplayValue,
    ScSelectPopup,
    ScSelectItemIcon,
    ScSelectList,
    ScSelectItem,
    ScSelectPortal,
    ScSelectOrigin,
    ScSelectInput,
    SiBookIcon,
    SiBriefcaseIcon,
    SiClockIcon,
    SiPlaneIcon,
    SiSquareCheckIcon,
    SiStarIcon,
    SiTagIcon,
    SiUserIcon,
    NgTemplateOutlet,
    ScSelectIcon,
    ScSelectItemIndicator,
    ScSelectItemLabel,
    SiChevronDownIcon,
    SiCheckIcon,
    FormField,
    FormRoot,
  ],
  template: `
    <form [formRoot]="labelForm">
      <div scSelect class="w-48">
        <div scSelectOrigin>
          @if (displayIcon(); as icon) {
            <ng-container
              *ngTemplateOutlet="iconTmpl; context: { icon: icon }"
            ></ng-container>
          }
          <span scSelectDisplayValue>{{ displayValue() }}</span>
          <input
            scSelectInput
            [formField]="labelForm.label"
            placeholder="Select a label"
            aria-label="Label dropdown"
          />
          <svg scSelectIcon siChevronDownIcon></svg>
        </div>
        <ng-template scSelectPortal>
          <div scSelectPopup>
            <div scSelectList>
              @for (option of options; track option.value) {
                <div scSelectItem [value]="option.value" [label]="option.label">
                  <ng-container
                    *ngTemplateOutlet="iconTmpl; context: { icon: option.icon }"
                  ></ng-container>
                  <span scSelectItemLabel>{{ option.label }}</span>
                  <svg scSelectItemIndicator siCheckIcon></svg>
                </div>
              }
            </div>
          </div>
        </ng-template>
      </div>
    </form>

    <ng-template #iconTmpl let-icon="icon">
      @switch (icon) {
        @case ('tag') {
          <svg scSelectItemIcon siTagIcon></svg>
        }
        @case ('star') {
          <svg scSelectItemIcon siStarIcon></svg>
        }
        @case ('briefcase') {
          <svg scSelectItemIcon siBriefcaseIcon></svg>
        }
        @case ('user') {
          <svg scSelectItemIcon siUserIcon></svg>
        }
        @case ('square-check') {
          <svg scSelectItemIcon siSquareCheckIcon></svg>
        }
        @case ('clock') {
          <svg scSelectItemIcon siClockIcon></svg>
        }
        @case ('book') {
          <svg scSelectItemIcon siBookIcon></svg>
        }
        @case ('plane') {
          <svg scSelectItemIcon siPlaneIcon></svg>
        }
      }
    </ng-template>

    <div class="bg-muted mt-4 w-48 rounded-md p-4">
      <p class="text-sm">Selected value: {{ labelForm.label().value() }}</p>
      <p class="text-sm">Display value: {{ displayValue() }}</p>
    </div>
  `,
  host: { class: 'flex w-full flex-col items-center' },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SelectDemo {
  readonly formModel = signal<FormModel>({ label: '' });
  readonly labelForm = form(this.formModel);

  displayValue = computed(() => this.labelForm.label().value());

  displayIcon = computed(() => {
    const label = this.labelForm.label().value();
    const option = this.options.find((o) => o.label === label);
    return option ? option.icon : '';
  });

  options = [
    { value: 'important', label: 'Important', icon: 'tag' },
    { value: 'starred', label: 'Starred', icon: 'star' },
    { value: 'work', label: 'Work', icon: 'briefcase' },
    { value: 'personal', label: 'Personal', icon: 'user' },
    { value: 'todo', label: 'To Do', icon: 'square-check' },
    { value: 'later', label: 'Later', icon: 'clock' },
    { value: 'read', label: 'Read', icon: 'book' },
    { value: 'travel', label: 'Travel', icon: 'plane' },
  ];
}
