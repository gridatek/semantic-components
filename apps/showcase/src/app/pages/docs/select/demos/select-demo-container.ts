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
import { SiCheckIcon, SiChevronDownIcon } from '@semantic-icons/lucide-icons';
import {
  ScSelect,
  ScSelectList,
  ScSelectIcon,
  ScSelectInput,
  ScSelectItem,
  ScSelectItemIndicator,
  ScSelectPortal,
  ScSelectTrigger,
  ScSelectValue,
} from '@semantic-components/ui-lab';

@Component({
  selector: 'app-select-demo',
  imports: [
    ScSelect,
    ScSelectList,
    ScSelectIcon,
    ScSelectInput,
    ScSelectItem,
    ScSelectItemIndicator,
    ScSelectPortal,
    ScSelectTrigger,
    ScSelectValue,
    SiCheckIcon,
    SiChevronDownIcon,
  ],
  template: \`
    <div sc-select>
      <div sc-select-trigger>
        <span sc-select-value>
          @if (displayIcon(); as icon) {
            <svg
              class="text-muted-foreground size-4"
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              aria-hidden="true"
            >
              @switch (icon) {
                @case ('label') {
                  <path
                    d="M12 2H2v10l9.29 9.29c.94.94 2.48.94 3.42 0l6.58-6.58c.94-.94.94-2.48 0-3.42L12 2Z"
                  />
                  <path d="M7 7h.01" />
                }
                @case ('star') {
                  <polygon
                    points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"
                  />
                }
                @case ('work') {
                  <rect width="20" height="14" x="2" y="7" rx="2" ry="2" />
                  <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
                }
                @case ('person') {
                  <circle cx="12" cy="8" r="5" />
                  <path d="M20 21a8 8 0 1 0-16 0" />
                }
                @case ('checklist') {
                  <rect width="18" height="18" x="3" y="3" rx="2" />
                  <path d="m9 12 2 2 4-4" />
                }
                @case ('schedule') {
                  <circle cx="12" cy="12" r="10" />
                  <polyline points="12 6 12 12 16 14" />
                }
                @case ('menu_book') {
                  <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
                  <path
                    d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"
                  />
                }
                @case ('flight') {
                  <path
                    d="M17.8 19.2 16 11l3.5-3.5C21 6 21.5 4 21 3c-1-.5-3 0-4.5 1.5L13 8 4.8 6.2c-.5-.1-.9.1-1.1.5l-.3.5c-.2.5-.1 1 .3 1.3L9 12l-2 3H4l-1 1 3 2 2 3 1-1v-3l3-2 3.5 5.3c.3.4.8.5 1.3.3l.5-.2c.4-.3.6-.7.5-1.2z"
                  />
                }
              }
            </svg>
          }
          <span class="truncate">{{ displayValue() }}</span>
        </span>
        <input
          sc-select-input
          aria-label="Label dropdown"
          placeholder="Select a label"
        />
        <svg sc-select-icon si-chevron-down-icon aria-hidden="true"></svg>
      </div>
      <div sc-select-portal>
        <div sc-select-list>
          @for (label of labels; track label.value) {
            <div sc-select-item [value]="label.value" [label]="label.value">
              <svg
                class="text-muted-foreground size-4 shrink-0"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                aria-hidden="true"
              >
                @switch (label.icon) {
                  @case ('label') {
                    <path
                      d="M12 2H2v10l9.29 9.29c.94.94 2.48.94 3.42 0l6.58-6.58c.94-.94.94-2.48 0-3.42L12 2Z"
                    />
                    <path d="M7 7h.01" />
                  }
                  @case ('star') {
                    <polygon
                      points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"
                    />
                  }
                  @case ('work') {
                    <rect width="20" height="14" x="2" y="7" rx="2" ry="2" />
                    <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
                  }
                  @case ('person') {
                    <circle cx="12" cy="8" r="5" />
                    <path d="M20 21a8 8 0 1 0-16 0" />
                  }
                  @case ('checklist') {
                    <rect width="18" height="18" x="3" y="3" rx="2" />
                    <path d="m9 12 2 2 4-4" />
                  }
                  @case ('schedule') {
                    <circle cx="12" cy="12" r="10" />
                    <polyline points="12 6 12 12 16 14" />
                  }
                  @case ('menu_book') {
                    <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
                    <path
                      d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"
                    />
                  }
                  @case ('flight') {
                    <path
                      d="M17.8 19.2 16 11l3.5-3.5C21 6 21.5 4 21 3c-1-.5-3 0-4.5 1.5L13 8 4.8 6.2c-.5-.1-.9.1-1.1.5l-.3.5c-.2.5-.1 1 .3 1.3L9 12l-2 3H4l-1 1 3 2 2 3 1-1v-3l3-2 3.5 5.3c.3.4.8.5 1.3.3l.5-.2c.4-.3.6-.7.5-1.2z"
                    />
                  }
                }
              </svg>
              <span class="flex-1">{{ label.value }}</span>
              <svg
                sc-select-item-indicator
                si-check-icon
                aria-hidden="true"
              ></svg>
            </div>
          }
        </div>
      </div>
    </div>
  \`,
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
    { value: 'Important', icon: 'label' },
    { value: 'Starred', icon: 'star' },
    { value: 'Work', icon: 'work' },
    { value: 'Personal', icon: 'person' },
    { value: 'To Do', icon: 'checklist' },
    { value: 'Later', icon: 'schedule' },
    { value: 'Read', icon: 'menu_book' },
    { value: 'Travel', icon: 'flight' },
  ];
}`;
}
