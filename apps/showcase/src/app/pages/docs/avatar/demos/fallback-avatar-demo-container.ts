import { Component, ViewEncapsulation } from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { FallbackAvatarDemo } from './fallback-avatar-demo';

@Component({
  selector: 'app-fallback-avatar-demo-container',
  imports: [DemoContainer, FallbackAvatarDemo],
  template: `
    <app-demo-container
      title="Fallback"
      demoUrl="/demos/avatar/fallback-avatar-demo"
      [code]="code"
    >
      <app-fallback-avatar-demo />
    </app-demo-container>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
})
export class FallbackAvatarDemoContainer {
  readonly code = `import { Component, ViewEncapsulation } from '@angular/core';
import {
  ScAvatar,
  ScAvatarFallback,
  ScAvatarImage,
} from '@semantic-components/ui';

/** The fallback while the image loads, when it fails, or with no image. */
@Component({
  selector: 'app-fallback-avatar-demo',
  imports: [ScAvatar, ScAvatarFallback, ScAvatarImage],
  template: \`
    <div class="flex items-center gap-2">
      <span scAvatar>
        <img scAvatarImage src="data:," alt="@jdoe" />
        <span scAvatarFallback>JD</span>
      </span>
      <span scAvatar>
        <span scAvatarFallback>AB</span>
      </span>
    </div>
  \`,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class FallbackAvatarDemo {}`;
}
