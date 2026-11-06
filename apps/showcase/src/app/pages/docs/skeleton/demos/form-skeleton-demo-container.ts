import { Component, ViewEncapsulation } from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { FormSkeletonDemo } from './form-skeleton-demo';

@Component({
  selector: 'app-form-skeleton-demo-container',
  imports: [DemoContainer, FormSkeletonDemo],
  template: `
    <app-demo-container
      title="Form"
      demoUrl="/demos/skeleton/form-skeleton-demo"
      [code]="code"
    >
      <app-form-skeleton-demo />
    </app-demo-container>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
})
export class FormSkeletonDemoContainer {
  readonly code = `import { Component, ViewEncapsulation } from '@angular/core';
import { ScSkeleton } from '@semantic-components/ui';

/** A form: each field’s label and input, then its button. */
@Component({
  selector: 'app-form-skeleton-demo',
  imports: [ScSkeleton],
  template: \`
    <div class="flex w-full max-w-xs flex-col gap-7">
      <div class="flex flex-col gap-3">
        <div scSkeleton class="h-4 w-20"></div>
        <div scSkeleton class="h-8 w-full"></div>
      </div>
      <div class="flex flex-col gap-3">
        <div scSkeleton class="h-4 w-24"></div>
        <div scSkeleton class="h-8 w-full"></div>
      </div>
      <div scSkeleton class="h-8 w-24"></div>
    </div>
  \`,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class FormSkeletonDemo {}`;
}
