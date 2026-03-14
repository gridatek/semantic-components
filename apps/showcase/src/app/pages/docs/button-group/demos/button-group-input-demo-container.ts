import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { ButtonGroupInputDemo } from './button-group-input-demo';

@Component({
  selector: 'app-button-group-input-demo-container',
  imports: [DemoContainer, ButtonGroupInputDemo],
  encapsulation: ViewEncapsulation.None,
  template: `
    <app-demo-container
      title="Input Integration"
      demoUrl="/demos/button-group/button-group-input-demo"
      [code]="code"
    >
      <app-button-group-input-demo />
    </app-demo-container>
  `,
  host: { class: 'block w-full' },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ButtonGroupInputDemoContainer {
  readonly code = `import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { ScButton, ScButtonGroup } from '@semantic-components/ui';
import { SiMinusIcon, SiPlusIcon } from '@semantic-icons/lucide-icons';

@Component({
  selector: 'app-button-group-input-demo',
  imports: [ScButton, ScButtonGroup, SiMinusIcon, SiPlusIcon],
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
  template: \`
    <div scButtonGroup>
      <button scButton variant="outline" size="icon" aria-label="Decrease">
        <svg siMinusIcon></svg>
      </button>
      <input
        class="h-8 w-16 border border-l-0 border-r-0 border-input bg-background text-center text-sm outline-none"
        type="text"
        value="5"
        aria-label="Quantity"
      />
      <button scButton variant="outline" size="icon" aria-label="Increase">
        <svg siPlusIcon></svg>
      </button>
    </div>
  \`,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ButtonGroupInputDemo {}`;
}
