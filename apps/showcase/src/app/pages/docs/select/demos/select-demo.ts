import {
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
  ScSelectIcon,
  ScSelectList,
  ScSelectItem,
  ScSelectPortal,
  ScSelectTrigger,
  ScSelectValue,
} from '@semantic-components/ui-lab';

@Component({
  selector: 'app-select-demo',
  imports: [
    ScSelect,
    ScSelectIcon,
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
  template: `
    <div scSelect #select="scSelect" placeholder="Select a label">
      <div scSelectTrigger aria-label="Label dropdown">
        <span scSelectValue>
          @if (displayIcon(); as icon) {
            @switch (icon) {
              @case ('tag') {
                <svg scSelectIcon siTagIcon aria-hidden="true"></svg>
              }
              @case ('star') {
                <svg scSelectIcon siStarIcon aria-hidden="true"></svg>
              }
              @case ('briefcase') {
                <svg scSelectIcon siBriefcaseIcon aria-hidden="true"></svg>
              }
              @case ('user') {
                <svg scSelectIcon siUserIcon aria-hidden="true"></svg>
              }
              @case ('square-check') {
                <svg scSelectIcon siSquareCheckIcon aria-hidden="true"></svg>
              }
              @case ('clock') {
                <svg scSelectIcon siClockIcon aria-hidden="true"></svg>
              }
              @case ('book') {
                <svg scSelectIcon siBookIcon aria-hidden="true"></svg>
              }
              @case ('plane') {
                <svg scSelectIcon siPlaneIcon aria-hidden="true"></svg>
              }
            }
          }
          <span class="truncate">{{ select.displayValue() }}</span>
        </span>
      </div>
      <ng-template scSelectPortal>
        <div scSelectList>
          @for (label of labels; track label.value) {
            <div scSelectItem [value]="label.value" [label]="label.value">
              @switch (label.icon) {
                @case ('tag') {
                  <svg scSelectIcon siTagIcon aria-hidden="true"></svg>
                }
                @case ('star') {
                  <svg scSelectIcon siStarIcon aria-hidden="true"></svg>
                }
                @case ('briefcase') {
                  <svg scSelectIcon siBriefcaseIcon aria-hidden="true"></svg>
                }
                @case ('user') {
                  <svg scSelectIcon siUserIcon aria-hidden="true"></svg>
                }
                @case ('square-check') {
                  <svg scSelectIcon siSquareCheckIcon aria-hidden="true"></svg>
                }
                @case ('clock') {
                  <svg scSelectIcon siClockIcon aria-hidden="true"></svg>
                }
                @case ('book') {
                  <svg scSelectIcon siBookIcon aria-hidden="true"></svg>
                }
                @case ('plane') {
                  <svg scSelectIcon siPlaneIcon aria-hidden="true"></svg>
                }
              }
              <span class="flex-1">{{ label.value }}</span>
            </div>
          }
        </div>
      </ng-template>
    </div>
  `,
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
}
