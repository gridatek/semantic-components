import { Component, ViewEncapsulation } from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { AvatarSkeletonDemo } from './avatar-skeleton-demo';

@Component({
  selector: 'app-avatar-skeleton-demo-container',
  imports: [DemoContainer, AvatarSkeletonDemo],
  template: `
    <app-demo-container
      title="Avatar"
      demoUrl="/demos/skeleton/avatar-skeleton-demo"
      [code]="code"
    >
      <app-avatar-skeleton-demo />
    </app-demo-container>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
})
export class AvatarSkeletonDemoContainer {
  readonly code = `import { Component, ViewEncapsulation } from '@angular/core';
import { ScSkeleton } from '@semantic-components/ui';

/** A person while they load: a round picture and two lines. */
@Component({
  selector: 'app-avatar-skeleton-demo',
  imports: [ScSkeleton],
  template: \`
    <div class="flex w-fit items-center gap-4">
      <div scSkeleton class="size-10 shrink-0 rounded-full"></div>
      <div class="grid gap-2">
        <div scSkeleton class="h-4 w-[150px]"></div>
        <div scSkeleton class="h-4 w-[100px]"></div>
      </div>
    </div>
  \`,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class AvatarSkeletonDemo {}`;
}
