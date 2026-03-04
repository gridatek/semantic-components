import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { DotSeparatorOptFieldDemo } from './dot-separator-opt-field-demo';

@Component({
  selector: 'app-dot-separator-opt-field-demo-container',
  imports: [DemoContainer, DotSeparatorOptFieldDemo],
  template: `
    <app-demo-container
      title="With Dot Separator"
      demoUrl="/demos/opt-field/dot-separator-opt-field-demo"
      [code]="code"
    >
      <app-dot-separator-opt-field-demo />
    </app-demo-container>
  `,
  host: { class: 'block' },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DotSeparatorOptFieldDemoContainer {
  readonly code = `import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
  signal,
} from '@angular/core';
import {
  ScOptField,
  ScOptFieldSeparator,
  ScOptFieldSlot,
  ScOptFieldSlotGroup,
} from '@semantic-components/ui';

@Component({
  selector: 'app-dot-separator-opt-field-demo',
  imports: [
    ScOptField,
    ScOptFieldSlotGroup,
    ScOptFieldSeparator,
    ScOptFieldSlot,
  ],
  template: \`
    <div scOptField [(value)]="otp">
      <div scOptFieldSlotGroup>
        <div scOptFieldSlot></div>
        <div scOptFieldSlot></div>
      </div>
      <div scOptFieldSeparator>
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
          <circle cx="12" cy="12" r="1" />
        </svg>
      </div>
      <div scOptFieldSlotGroup>
        <div scOptFieldSlot></div>
        <div scOptFieldSlot></div>
      </div>
      <div scOptFieldSeparator>
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
          <circle cx="12" cy="12" r="1" />
        </svg>
      </div>
      <div scOptFieldSlotGroup>
        <div scOptFieldSlot></div>
        <div scOptFieldSlot></div>
      </div>
    </div>
    <p class="text-muted-foreground mt-4 text-sm">
      Value: {{ otp() || 'empty' }}
    </p>
  \`,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DotSeparatorOptFieldDemo {
  readonly otp = signal('');
}`;
}
