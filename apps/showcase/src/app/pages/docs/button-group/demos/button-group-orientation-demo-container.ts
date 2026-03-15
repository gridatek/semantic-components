import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { ButtonGroupOrientationDemo } from './button-group-orientation-demo';

@Component({
  selector: 'app-button-group-orientation-demo-container',
  imports: [DemoContainer, ButtonGroupOrientationDemo],
  encapsulation: ViewEncapsulation.None,
  template: `
    <app-demo-container
      title="Orientation"
      demoUrl="/demos/button-group/button-group-orientation-demo"
      [code]="code"
    >
      <app-button-group-orientation-demo />
    </app-demo-container>
  `,
  host: { class: 'block w-full' },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ButtonGroupOrientationDemoContainer {
  readonly code = `import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { ScButton, ScButtonGroup } from '@semantic-components/ui';
import { SiMinusIcon, SiPlusIcon } from '@semantic-icons/lucide-icons';

@Component({
  selector: 'app-button-group-orientation-demo',
  imports: [ScButton, ScButtonGroup, SiMinusIcon, SiPlusIcon],
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
  template: \`
    <div scButtonGroup orientation="vertical">
      <button scButton variant="outline" size="icon" aria-label="Increase">
        <svg siPlusIcon></svg>
      </button>
      <button scButton variant="outline" size="icon" aria-label="Decrease">
        <svg siMinusIcon></svg>
      </button>
    </div>
  \`,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ButtonGroupOrientationDemo {}`;
}
