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
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WithTextToggleDemoContainer {
  readonly code = `import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
  signal,
} from '@angular/core';
import { ScToggle } from '@semantic-components/ui';
import { SiUnderlineIcon } from '@semantic-icons/lucide-icons';

@Component({
  selector: 'app-with-text-toggle-demo',
  imports: [ScToggle, SiUnderlineIcon],
  template: \`
    <button scToggle [(pressed)]="underline" aria-label="Toggle underline">
      <svg siUnderlineIcon></svg>
      Underline
    </button>
  \`,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WithTextToggleDemo {
  readonly underline = signal(false);
}`;
}
