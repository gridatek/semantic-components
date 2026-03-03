import { NgTemplateOutlet } from '@angular/common';
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
  ScSelectLabel,
  ScSelectList,
  ScSelectPopup,
  ScSelectPortal,
  ScSelectTrigger,
} from '@semantic-components/ui';
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
    NgTemplateOutlet,
  ],
  template: `
    <div
      scSelect
      #select="scSelect"
      placeholder="Select a label"
      aria-label="Label dropdown"
    >
      <div scSelectTrigger>
        @if (displayIcon(); as icon) {
          <ng-container *ngTemplateOutlet="iconTmpl; context: { icon: icon }"></ng-container>
        }
        <span scSelectLabel></span>
      </div>
      <ng-template scSelectPortal>
        <div scSelectPopup>
          <div scSelectList>
            @for (option of options; track option.value) {
              <div scSelectItem [value]="option.value" [label]="option.label">
                <ng-container *ngTemplateOutlet="iconTmpl; context: { icon: option.icon }"></ng-container>
                <span class="flex-1">{{ option.label }}</span>
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
  `,
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
}
