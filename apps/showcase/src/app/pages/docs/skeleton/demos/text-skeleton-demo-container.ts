import { Component, ViewEncapsulation } from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { TextSkeletonDemo } from './text-skeleton-demo';

@Component({
  selector: 'app-text-skeleton-demo-container',
  imports: [DemoContainer, TextSkeletonDemo],
  template: `
    <app-demo-container
      title="Text"
      demoUrl="/demos/skeleton/text-skeleton-demo"
      [code]="code"
    >
      <app-text-skeleton-demo />
    </app-demo-container>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
})
export class TextSkeletonDemoContainer {
  readonly code = `import { Component, ViewEncapsulation } from '@angular/core';
import { ScSkeleton } from '@semantic-components/ui';

/** A paragraph: full lines, the last one shorter. */
@Component({
  selector: 'app-text-skeleton-demo',
  imports: [ScSkeleton],
  template: \`
    <div class="flex w-full max-w-xs flex-col gap-2">
      <div scSkeleton class="h-4 w-full"></div>
      <div scSkeleton class="h-4 w-full"></div>
      <div scSkeleton class="h-4 w-3/4"></div>
    </div>
  \`,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class TextSkeletonDemo {}`;
}
