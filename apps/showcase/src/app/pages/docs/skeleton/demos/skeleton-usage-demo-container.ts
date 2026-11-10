import { Component, ViewEncapsulation } from '@angular/core';
import { UsageCode } from '../../../../components/usage-code/usage-code';
import { SkeletonUsageDemo } from './skeleton-usage-demo';

@Component({
  selector: 'app-skeleton-usage-demo-container',
  imports: [UsageCode, SkeletonUsageDemo],
  template: `
    <app-usage-code [code]="code">
      <ng-template><app-skeleton-usage-demo /></ng-template>
    </app-usage-code>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
})
export class SkeletonUsageDemoContainer {
  readonly code = `import { Component, ViewEncapsulation } from '@angular/core';
import { ScSkeleton } from '@semantic-components/ui';

@Component({
  selector: 'app-skeleton-usage-demo',
  imports: [ScSkeleton],
  template: \`
    <div class="flex items-center gap-4">
      <div scSkeleton class="size-12 rounded-full"></div>
      <div class="space-y-2">
        <div scSkeleton class="h-4 w-[250px]"></div>
        <div scSkeleton class="h-4 w-[200px]"></div>
      </div>
    </div>
  \`,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class SkeletonUsageDemo {}`;
}
