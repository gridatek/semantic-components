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
    <div scSelect placeholder="Select a label">
      <div scSelectTrigger aria-label="Label dropdown">
        <span scSelectValue>
          @if (displayIcon(); as icon) {
            @switch (icon) {
              @case ('tag') {
                <svg
                  class="text-muted-foreground size-4"
                  siTagIcon
                  aria-hidden="true"
                ></svg>
              }
              @case ('star') {
                <svg
                  class="text-muted-foreground size-4"
                  siStarIcon
                  aria-hidden="true"
                ></svg>
              }
              @case ('briefcase') {
                <svg
                  class="text-muted-foreground size-4"
                  siBriefcaseIcon
                  aria-hidden="true"
                ></svg>
              }
              @case ('user') {
                <svg
                  class="text-muted-foreground size-4"
                  siUserIcon
                  aria-hidden="true"
                ></svg>
              }
              @case ('square-check') {
                <svg
                  class="text-muted-foreground size-4"
                  siSquareCheckIcon
                  aria-hidden="true"
                ></svg>
              }
              @case ('clock') {
                <svg
                  class="text-muted-foreground size-4"
                  siClockIcon
                  aria-hidden="true"
                ></svg>
              }
              @case ('book') {
                <svg
                  class="text-muted-foreground size-4"
                  siBookIcon
                  aria-hidden="true"
                ></svg>
              }
              @case ('plane') {
                <svg
                  class="text-muted-foreground size-4"
                  siPlaneIcon
                  aria-hidden="true"
                ></svg>
              }
            }
          }
          <span class="truncate">{{ displayValue() }}</span>
        </span>
      </div>
      <ng-template scSelectPortal>
        <div scSelectList>
          @for (label of labels; track label.value) {
            <div scSelectItem [value]="label.value" [label]="label.value">
              @switch (label.icon) {
                @case ('tag') {
                  <svg
                    class="text-muted-foreground size-4 shrink-0"
                    siTagIcon
                    aria-hidden="true"
                  ></svg>
                }
                @case ('star') {
                  <svg
                    class="text-muted-foreground size-4 shrink-0"
                    siStarIcon
                    aria-hidden="true"
                  ></svg>
                }
                @case ('briefcase') {
                  <svg
                    class="text-muted-foreground size-4 shrink-0"
                    siBriefcaseIcon
                    aria-hidden="true"
                  ></svg>
                }
                @case ('user') {
                  <svg
                    class="text-muted-foreground size-4 shrink-0"
                    siUserIcon
                    aria-hidden="true"
                  ></svg>
                }
                @case ('square-check') {
                  <svg
                    class="text-muted-foreground size-4 shrink-0"
                    siSquareCheckIcon
                    aria-hidden="true"
                  ></svg>
                }
                @case ('clock') {
                  <svg
                    class="text-muted-foreground size-4 shrink-0"
                    siClockIcon
                    aria-hidden="true"
                  ></svg>
                }
                @case ('book') {
                  <svg
                    class="text-muted-foreground size-4 shrink-0"
                    siBookIcon
                    aria-hidden="true"
                  ></svg>
                }
                @case ('plane') {
                  <svg
                    class="text-muted-foreground size-4 shrink-0"
                    siPlaneIcon
                    aria-hidden="true"
                  ></svg>
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
    const values = this.select().values();
    const label = this.labels.find((label) => label.value === values[0]);
    return label ? label.icon : '';
  });

  displayValue = computed(() => {
    const values = this.select().values();
    return values.length ? values[0] : 'Select a label';
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
