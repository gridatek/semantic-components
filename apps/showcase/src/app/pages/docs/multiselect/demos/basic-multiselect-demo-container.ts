import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { BasicMultiselectDemo } from './basic-multiselect-demo';

@Component({
  selector: 'app-basic-multiselect-demo-container',
  imports: [DemoContainer, BasicMultiselectDemo],
  template: `
    <app-demo-container
      title="Basic"
      demoUrl="/demos/multiselect/basic-multiselect-demo"
      [code]="code"
    >
      <app-basic-multiselect-demo />
    </app-demo-container>
  `,
  host: { class: 'block' },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BasicMultiselectDemoContainer {
  readonly code = `import { NgTemplateOutlet } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
  computed,
  viewChild,
} from '@angular/core';
import {
  ScMultiselect,
  ScMultiselectIcon,
  ScMultiselectInput,
  ScMultiselectInputGroup,
  ScMultiselectItem,
  ScMultiselectItemIndicator,
  ScMultiselectItemLabel,
  ScMultiselectList,
  ScMultiselectPopup,
  ScMultiselectPortal,
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

@Component({
  selector: 'app-basic-multiselect-demo',
  imports: [
    ScMultiselect,
    ScMultiselectIcon,
    ScMultiselectInput,
    ScMultiselectInputGroup,
    ScMultiselectItem,
    ScMultiselectItemIndicator,
    ScMultiselectItemLabel,
    ScMultiselectList,
    ScMultiselectPopup,
    ScMultiselectPortal,
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
  template: \`
    <div scMultiselect class="w-52">
      <div scMultiselectInputGroup>
        @if (displayIcon(); as icon) {
          <ng-container
            *ngTemplateOutlet="iconTmpl; context: { icon: icon }"
          ></ng-container>
        }
        <input
          scMultiselectInput
          [value]="displayValue()"
          placeholder="Select a label"
          aria-label="Label dropdown"
        />
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
  \`,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BasicMultiselectDemo {
  private readonly multiselect = viewChild.required(ScMultiselect);

  displayIcon = computed(() => {
    const values = this.multiselect().values();
    const option = this.options.find((o) => o.value === values[0]);
    return option ? option.icon : '';
  });

  displayValue = computed(() => {
    const values = this.multiselect().values();
    if (values.length === 0) {
      return '';
    }
    const firstLabel =
      this.options.find((o) => o.value === values[0])?.label ?? values[0];
    if (values.length === 1) {
      return firstLabel;
    }
    return \`\${firstLabel} + \${values.length - 1} more\`;
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
}`;
}
