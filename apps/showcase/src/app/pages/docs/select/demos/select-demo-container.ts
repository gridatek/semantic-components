import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { SelectDemo } from './select-demo';

@Component({
  selector: 'app-select-demo-container',
  imports: [DemoContainer, SelectDemo],
  template: `
    <app-demo-container
      title="Select"
      demoUrl="/demos/select/select-demo"
      [code]="code"
    >
      <app-select-demo />
    </app-demo-container>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SelectDemoContainer {
  readonly code = `import { NgTemplateOutlet } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
  computed,
  viewChild,
} from '@angular/core';
import {
  ScSelect,
  ScSelectDisplayValue,
  ScSelectIcon,
  ScSelectInput,
  ScSelectInputGroup,
  ScSelectItem,
  ScSelectItemIcon,
  ScSelectItemIndicator,
  ScSelectList,
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
    ScSelectInputGroup,
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
    SiChevronDownIcon,
    SiCheckIcon,
  ],
  template: \`
    <div scSelect class="w-48">
      <div scSelectInputGroup>
        @if (displayIcon(); as icon) {
          <ng-container
            *ngTemplateOutlet="iconTmpl; context: { icon: icon }"
          ></ng-container>
        }
        <span scSelectDisplayValue></span>
        <input
          scSelectInput
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
                <span class="flex-1">{{ option.label }}</span>
                <svg scSelectItemIndicator siCheckIcon></svg>
              </div>
            }
          </div>
        </div>
      </ng-template>
    </div>

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
  \`,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SelectDemo {
  private readonly select = viewChild.required(ScSelect);

  displayIcon = computed(() => {
    const value = this.select().value();
    const option = this.options.find((o) => o.value === value);
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
}`;
}
