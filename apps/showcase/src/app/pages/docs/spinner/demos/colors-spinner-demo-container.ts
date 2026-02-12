import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { ColorsSpinnerDemo } from './colors-spinner-demo';

@Component({
  selector: 'app-colors-spinner-demo-container',
  imports: [DemoContainer, ColorsSpinnerDemo],
  template: `
    <app-demo-container title="Colors" [code]="code">
      <app-colors-spinner-demo />
    </app-demo-container>
  `,
  host: { class: 'block' },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ColorsSpinnerDemoContainer {
  readonly code = `import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { ScSpinner } from '@semantic-components/ui-lab';
import { SiLoader2Icon } from '@semantic-icons/lucide-icons';

@Component({
  selector: 'app-colors-spinner-demo',
  imports: [ScSpinner, SiLoader2Icon],
  template: \`
    <div class="flex items-center gap-6">
      <svg sc-spinner si-loader-2-icon class="text-primary"></svg>
      <svg sc-spinner si-loader-2-icon class="text-blue-500"></svg>
      <svg sc-spinner si-loader-2-icon class="text-green-500"></svg>
      <svg sc-spinner si-loader-2-icon class="text-yellow-500"></svg>
      <svg sc-spinner si-loader-2-icon class="text-red-500"></svg>
      <svg sc-spinner si-loader-2-icon class="text-purple-500"></svg>
    </div>
  \`,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ColorsSpinnerDemo {}`;
}
