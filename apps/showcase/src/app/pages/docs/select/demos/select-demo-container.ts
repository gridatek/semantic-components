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
  readonly code = `import {
  ChangeDetectionStrategy,
  Component,
  computed,
  viewChild,
  ViewEncapsulation,
} from '@angular/core';
import {
  SiBookIcon,
  SiBriefcaseIcon,
  SiClockIcon,
  SiPlaneIcon,
  SiSquareCheckIcon,
  SiStarIcon,
  SiTagIcon,
  SiUserIcon,
} from '@semantic-icons/lucide-icons';
import {
  ScSelect,
  ScSelectPopup,
  ScSelectItemIcon,
  ScSelectList,
  ScSelectItem,
  ScSelectPortal,
  ScSelectTrigger,
  ScSelectLabel,
} from '@semantic-components/ui';

@Component({
  selector: 'app-select-demo',
  imports: [
    ScSelect,
    ScSelectPopup,
    ScSelectItemIcon,
    ScSelectList,
    ScSelectItem,
    ScSelectPortal,
    ScSelectTrigger,
    ScSelectLabel,
    SiBookIcon,
    SiBriefcaseIcon,
    SiClockIcon,
    SiPlaneIcon,
    SiSquareCheckIcon,
    SiStarIcon,
    SiTagIcon,
    SiUserIcon,
  ],
  template: \`
    <div
      scSelect
      #select="scSelect"
      placeholder="Select a label"
      aria-label="Label dropdown"
    >
      <div scSelectTrigger>
        @if (displayIcon(); as icon) {
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
        }
        <span scSelectLabel></span>
      </div>
      <ng-template scSelectPortal>
        <div scSelectPopup>
          <div scSelectList>
            @for (label of options; track label.value) {
              <div scSelectItem [value]="label.value" [label]="label.label">
                @switch (label.icon) {
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
                <span class="flex-1">{{ label.label }}</span>
              </div>
            }
          </div>
        </div>
      </ng-template>
    </div>
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
