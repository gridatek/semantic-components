import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { BasicSkeletonDemo } from './basic-skeleton-demo';

@Component({
  selector: 'app-basic-skeleton-demo-container',
  imports: [DemoContainer, BasicSkeletonDemo],
  template: `
    <app-demo-container title="Basic" [code]="code">
      <app-basic-skeleton-demo />
    </app-demo-container>
  `,
  host: { class: 'block' },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BasicSkeletonDemoContainer {
  readonly code = `import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { ScSkeleton } from '@semantic-components/ui-lab';

@Component({
  selector: 'app-basic-skeleton-demo',
  imports: [ScSkeleton],
  template: \`
    <div class="space-y-2">
      <div sc-skeleton class="h-4 w-[250px]"></div>
      <div sc-skeleton class="h-4 w-[200px]"></div>
    </div>
  \`,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BasicSkeletonDemo {}`;
}
