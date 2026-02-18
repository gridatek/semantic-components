import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { CardSkeletonDemo } from './card-skeleton-demo';

@Component({
  selector: 'app-card-skeleton-demo-container',
  imports: [DemoContainer, CardSkeletonDemo],
  template: `
    <app-demo-container title="Card" [code]="code">
      <app-card-skeleton-demo />
    </app-demo-container>
  `,
  host: { class: 'block' },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CardSkeletonDemoContainer {
  readonly code = `import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { ScSkeleton } from '@semantic-components/ui';

@Component({
  selector: 'app-card-skeleton-demo',
  imports: [ScSkeleton],
  template: \`
    <div class="flex items-center space-x-4">
      <div scSkeleton class="size-12 rounded-full"></div>
      <div class="space-y-2">
        <div scSkeleton class="h-4 w-[250px]"></div>
        <div scSkeleton class="h-4 w-[200px]"></div>
      </div>
    </div>
  \`,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CardSkeletonDemo {}`;
}
