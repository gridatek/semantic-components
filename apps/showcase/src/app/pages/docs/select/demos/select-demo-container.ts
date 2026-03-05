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
  host: { class: 'block' },
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
  ScSelectItem,
  ScSelectItemIcon,
  ScSelectInput,
  ScSelectItemIndicator,
  ScSelectList,
  ScSelectPopup,
  ScSelectPortal,
  ScSelectInputGroup,
  ScSelectIcon,
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
    ScSelectPopup,
    ScSelectItemIcon,
    ScSelectList,
    ScSelectItem,
    ScSelectPortal,
    ScSelectInputGroup,
    ScSelectInput,
    ScSelectIcon,
    ScSelectItemIndicator,
    SiBookIcon,
    SiBriefcaseIcon,
    SiClockIcon,
    SiPlaneIcon,
    SiSquareCheckIcon,
    SiStarIcon,
    SiTagIcon,
    SiUserIcon,
    NgTemplateOutlet,
    SiChevronDownIcon,
    SiCheckIcon,
  ],
  template: \`
    <div scSelect class="w-48">
      <div scSelectInputGroup>
        @if (displayIcon(); as icon) {
          <ng-container *ngTemplateOutlet="iconTmpl; context: { icon: icon }"></ng-container>
        }
        <input scSelectInput placeholder="Select a label" aria-label="Label dropdown" />
        <svg scSelectIcon siChevronDownIcon aria-hidden="true"></svg>
      </div>
      <ng-template scSelectPortal>
        <div scSelectPopup>
          <div scSelectList>
            @for (option of options; track option.value) {
              <div scSelectItem [value]="option.value" [label]="option.label">
                <ng-container *ngTemplateOutlet="iconTmpl; context: { icon: option.icon }"></ng-container>
                <span class="flex-1">{{ option.label }}</span>
                <svg scSelectItemIndicator siCheckIcon aria-hidden="true"></svg>
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
    { value: 'to-do', label: 'To Do', icon: 'square-check' },
    { value: 'later', label: 'Later', icon: 'clock' },
    { value: 'read', label: 'Read', icon: 'book' },
    { value: 'travel', label: 'Travel', icon: 'plane' },
  ];
}`;
}
