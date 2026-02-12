import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { WithTextToggleDemo } from './with-text-toggle-demo';

@Component({
  selector: 'app-with-text-toggle-demo-container',
  imports: [DemoContainer, WithTextToggleDemo],
  template: `
    <app-demo-container
      title="With Text"
      demoUrl="/demos/toggle/with-text-toggle-demo"
      [code]="code"
    >
      <app-with-text-toggle-demo />
    </app-demo-container>
  `,
  host: { class: 'block' },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WithTextToggleDemoContainer {
  readonly code = `import {
  ChangeDetectionStrategy,
  Component,
  signal,
  ViewEncapsulation,
} from '@angular/core';
import { ScToggle } from '@semantic-components/ui-lab';

@Component({
  selector: 'app-with-text-toggle-demo',
  imports: [ScToggle],
  template: \`
    <button sc-toggle [(pressed)]="underline" aria-label="Toggle underline">
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
        class="mr-2 size-4"
      >
        <path d="M6 4v6a6 6 0 0 0 12 0V4" />
        <line x1="4" x2="20" y1="20" y2="20" />
      </svg>
      Underline
    </button>
  \`,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WithTextToggleDemo {
  readonly underline = signal(false);
}`;
}
