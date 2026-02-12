import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { DisabledToggleDemo } from './disabled-toggle-demo';

@Component({
  selector: 'app-disabled-toggle-demo-container',
  imports: [DemoContainer, DisabledToggleDemo],
  template: `
    <app-demo-container
      title="Disabled"
      demoUrl="/demos/toggle/disabled-toggle-demo"
      [code]="code"
    >
      <app-disabled-toggle-demo />
    </app-demo-container>
  `,
  host: { class: 'block' },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DisabledToggleDemoContainer {
  readonly code = `import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { ScToggle } from '@semantic-components/ui-lab';

@Component({
  selector: 'app-disabled-toggle-demo',
  imports: [ScToggle],
  template: \`
    <div class="flex items-center gap-2">
      <button sc-toggle [disabled]="true" aria-label="Toggle disabled">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
          class="size-4"
        >
          <path d="M14 12a4 4 0 0 0 0-8H6v8" />
          <path d="M15 20a4 4 0 0 0 0-8H6v8" />
        </svg>
      </button>
      <button
        sc-toggle
        [pressed]="true"
        [disabled]="true"
        aria-label="Toggle disabled pressed"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
          class="size-4"
        >
          <path d="M14 12a4 4 0 0 0 0-8H6v8" />
          <path d="M15 20a4 4 0 0 0 0-8H6v8" />
        </svg>
      </button>
    </div>
  \`,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DisabledToggleDemo {}`;
}
