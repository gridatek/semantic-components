import { NgTemplateOutlet } from '@angular/common';
import { Component, ViewEncapsulation, computed, signal } from '@angular/core';
import { FormField, FormRoot, form } from '@angular/forms/signals';
import {
  ScSelect,
  ScSelectIcon,
  ScSelectItem,
  ScSelectItemIcon,
  ScSelectItemIndicator,
  ScSelectItemLabel,
  ScSelectList,
  ScSelectPopup,
  ScSelectPortal,
  ScSelectTrigger,
  ScSelectValue,
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
  category: string;
}

@Component({
  selector: 'app-select-demo',
  imports: [
    ScSelect,
    ScSelectPopup,
    ScSelectItemIcon,
    ScSelectList,
    ScSelectItem,
    ScSelectPortal,
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
    ScSelectTrigger,
    ScSelectValue,
    ScSelectItemIndicator,
    ScSelectItemLabel,
    SiChevronDownIcon,
    SiCheckIcon,
    FormField,
    FormRoot,
  ],
  template: `
    <form [formRoot]="selectForm">
      <div
        scSelect
        class="w-48"
        [formField]="selectForm.category"
        placeholder="Select a category"
      >
        <div scSelectTrigger aria-label="Category">
          <span scSelectValue>
            @if (selectedOption(); as option) {
              <ng-container
                *ngTemplateOutlet="iconTmpl; context: { icon: option.icon }"
              ></ng-container>
              {{ option.label }}
            }
          </span>
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
      <p class="text-sm">Selected value: {{ selectForm.category().value() }}</p>
      <p class="text-sm">Display value: {{ selectedOption()?.label }}</p>
    </div>
  `,
  host: { class: 'flex w-full flex-col items-center' },
  encapsulation: ViewEncapsulation.None,
})
export class SelectDemo {
  readonly formModel = signal<FormModel>({ category: '' });
  readonly selectForm = form(this.formModel);

  readonly selectedOption = computed(() =>
    this.options.find((o) => o.value === this.selectForm.category().value()),
  );

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
