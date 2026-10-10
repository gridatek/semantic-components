import { JsonPipe, NgTemplateOutlet } from '@angular/common';
import { Component, ViewEncapsulation, computed, signal } from '@angular/core';
import { FormField, FormRoot, form } from '@angular/forms/signals';
import {
  ScField,
  ScLabel,
  ScMultiselect,
  ScMultiselectIcon,
  ScMultiselectItem,
  ScMultiselectItemIndicator,
  ScMultiselectItemLabel,
  ScMultiselectList,
  ScMultiselectPopup,
  ScMultiselectPortal,
  ScMultiselectTrigger,
  ScMultiselectValue,
} from '@semantic-components/ui';
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

interface FormModel {
  labels: string[];
}

@Component({
  selector: 'app-basic-multiselect-demo',
  imports: [
    ScField,
    ScLabel,
    ScMultiselect,
    ScMultiselectIcon,
    ScMultiselectItem,
    ScMultiselectItemIndicator,
    ScMultiselectItemLabel,
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
    JsonPipe,
    FormField,
    FormRoot,
  ],
  template: `
    <form [formRoot]="labelsForm" class="w-full max-w-sm space-y-6">
      <div class="space-y-4">
        <div scField>
          <label scLabel>Labels</label>
          <div
            scMultiselect
            class="w-full"
            [formField]="labelsForm.labels"
            placeholder="Select labels"
          >
            <div scMultiselectTrigger aria-label="Labels">
              <span scMultiselectValue>
                @if (firstOption(); as option) {
                  <ng-container
                    *ngTemplateOutlet="iconTmpl; context: { icon: option.icon }"
                  ></ng-container>
                  {{ summary() }}
                }
              </span>
              <svg scMultiselectIcon siChevronDownIcon></svg>
            </div>
            <ng-template scMultiselectPortal>
              <div scMultiselectPopup>
                <div scMultiselectList>
                  @for (option of options; track option.value) {
                    <div
                      scMultiselectItem
                      [value]="option.value"
                      [label]="option.label"
                    >
                      <ng-container
                        *ngTemplateOutlet="
                          iconTmpl;
                          context: { icon: option.icon }
                        "
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
        </div>
      </div>

      <div class="bg-muted rounded-md p-4">
        <p class="text-sm font-medium">Form Values:</p>
        <pre class="mt-2 text-xs">{{ formModel() | json }}</pre>
      </div>
    </form>

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
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class BasicMultiselectDemo {
  readonly formModel = signal<FormModel>({
    labels: [],
  });

  readonly labelsForm = form(this.formModel);

  readonly firstOption = computed(() =>
    this.options.find((o) => o.value === this.labelsForm.labels().value()[0]),
  );

  readonly summary = computed(() => {
    const count = this.labelsForm.labels().value().length;
    const label = this.firstOption()?.label ?? '';
    return count > 1 ? `${label} + ${count - 1} more` : label;
  });

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
}
