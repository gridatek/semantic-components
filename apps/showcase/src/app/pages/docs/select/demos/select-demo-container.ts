import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { ScSelectDemo } from './select-demo';

@Component({
  selector: 'app-select-demo-container',
  imports: [DemoContainer, ScSelectDemo],
  template: `
    <app-demo-container title="Select" [code]="code">
      <app-select-demo />
    </app-demo-container>
  `,
  host: { class: 'block' },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ScSelectDemoContainer {
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
  ScSelectContent,
  ScSelectItemIcon,
  ScSelectList,
  ScSelectItem,
  ScSelectPortal,
  ScSelectTrigger,
  ScSelectValue,
} from '@semantic-components/ui';

@Component({
  selector: 'app-select-demo',
  imports: [
    ScSelect,
    ScSelectContent,
    ScSelectItemIcon,
    ScSelectList,
    ScSelectItem,
    ScSelectPortal,
    ScSelectTrigger,
    ScSelectValue,
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
    <div scSelect #select="scSelect" placeholder="Select a label">
      <div scSelectTrigger aria-label="Label dropdown">
        <span scSelectValue>
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
          <span class="truncate">{{ select.displayValue() }}</span>
        </span>
      </div>
      <ng-template scSelectPortal>
        <div scSelectContent>
          <div scSelectList>
            @for (label of labels; track label.value) {
              <div scSelectItem [value]="label.value" [label]="label.value">
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
                <span class="flex-1">{{ label.value }}</span>
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
export class ScSelectDemo {
  private readonly select = viewChild.required(ScSelect);

  displayIcon = computed(() => {
    const value = this.select().value();
    const label = this.labels.find((label) => label.value === value);
    return label ? label.icon : '';
  });

  labels = [
    { value: 'Important', icon: 'tag' },
    { value: 'Starred', icon: 'star' },
    { value: 'Work', icon: 'briefcase' },
    { value: 'Personal', icon: 'user' },
    { value: 'To Do', icon: 'square-check' },
    { value: 'Later', icon: 'clock' },
    { value: 'Read', icon: 'book' },
    { value: 'Travel', icon: 'plane' },
  ];
}`;
}
