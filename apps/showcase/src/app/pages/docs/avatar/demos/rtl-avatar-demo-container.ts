import { Component, ViewEncapsulation } from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { RtlAvatarDemo } from './rtl-avatar-demo';

@Component({
  selector: 'app-rtl-avatar-demo-container',
  imports: [DemoContainer, RtlAvatarDemo],
  template: `
    <app-demo-container
      title="RTL"
      demoUrl="/demos/avatar/rtl-avatar-demo"
      [code]="code"
    >
      <app-rtl-avatar-demo />
    </app-demo-container>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
})
export class RtlAvatarDemoContainer {
  readonly code = `import { Component, ViewEncapsulation } from '@angular/core';
import {
  ScAvatar,
  ScAvatarBadge,
  ScAvatarFallback,
  ScAvatarGroup,
  ScAvatarGroupCount,
  ScAvatarImage,
} from '@semantic-components/ui';

/** Right to left: the group overlaps from the right, the badge at the end (left). */
@Component({
  selector: 'app-rtl-avatar-demo',
  imports: [
    ScAvatar,
    ScAvatarBadge,
    ScAvatarFallback,
    ScAvatarGroup,
    ScAvatarGroupCount,
    ScAvatarImage,
  ],
  template: \`
    <div dir="rtl" lang="ar" class="flex items-center gap-6">
      <span scAvatar>
        <img scAvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
        <span scAvatarFallback>ش</span>
        <span scAvatarBadge class="bg-green-600 dark:bg-green-800"></span>
      </span>
      <div scAvatarGroup class="grayscale">
        <span scAvatar>
          <img
            scAvatarImage
            src="https://github.com/shadcn.png"
            alt="@shadcn"
          />
          <span scAvatarFallback>ش</span>
        </span>
        <span scAvatar>
          <img
            scAvatarImage
            src="https://github.com/maxleiter.png"
            alt="@maxleiter"
          />
          <span scAvatarFallback>م</span>
        </span>
        <div scAvatarGroupCount>+٣</div>
      </div>
    </div>
  \`,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class RtlAvatarDemo {}`;
}
