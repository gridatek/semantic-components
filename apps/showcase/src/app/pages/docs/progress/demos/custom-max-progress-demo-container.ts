import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { CustomMaxProgressDemo } from './custom-max-progress-demo';

@Component({
  selector: 'app-custom-max-progress-demo-container',
  imports: [DemoContainer, CustomMaxProgressDemo],
  template: `
    <app-demo-container title="Custom Max" [code]="code">
      <app-custom-max-progress-demo />
    </app-demo-container>
  `,
  host: { class: 'block' },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CustomMaxProgressDemoContainer {
  readonly code = `import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { ScProgress } from '@semantic-components/ui-lab';

@Component({
  selector: 'app-custom-max-progress-demo',
  imports: [ScProgress],
  template: \`
    <div sc-progress [value]="50" [max]="200" class="w-[60%]"></div>
  \`,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CustomMaxProgressDemo {}`;
}
