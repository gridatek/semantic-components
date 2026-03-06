import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { OutlineToggleDemo } from './outline-toggle-demo';

@Component({
  selector: 'app-outline-toggle-demo-container',
  imports: [DemoContainer, OutlineToggleDemo],
  template: `
    <app-demo-container
      title="Outline Variant"
      demoUrl="/demos/toggle/outline-toggle-demo"
      [code]="code"
    >
      <app-outline-toggle-demo />
    </app-demo-container>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OutlineToggleDemoContainer {
  readonly code = `import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
  signal,
} from '@angular/core';
import { ScToggle } from '@semantic-components/ui';
import { SiItalicIcon } from '@semantic-icons/lucide-icons';

@Component({
  selector: 'app-outline-toggle-demo',
  imports: [ScToggle, SiItalicIcon],
  template: \`
    <button
      scToggle
      variant="outline"
      [(pressed)]="italic"
      aria-label="Toggle italic"
    >
      <svg siItalicIcon></svg>
    </button>
  \`,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OutlineToggleDemo {
  readonly italic = signal(false);
}`;
}
