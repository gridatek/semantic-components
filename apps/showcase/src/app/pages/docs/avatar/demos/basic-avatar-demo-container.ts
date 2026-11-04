import { Component, ViewEncapsulation } from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { BasicAvatarDemo } from './basic-avatar-demo';

@Component({
  selector: 'app-basic-avatar-demo-container',
  imports: [DemoContainer, BasicAvatarDemo],
  template: `
    <app-demo-container
      title="Basic"
      demoUrl="/demos/avatar/basic-avatar-demo"
      [code]="code"
    >
      <app-basic-avatar-demo />
    </app-demo-container>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
})
export class BasicAvatarDemoContainer {
  readonly code = `import { Component, ViewEncapsulation } from '@angular/core';
import {
  ScAvatar,
  ScAvatarFallback,
  ScAvatarImage,
} from '@semantic-components/ui';

/** An image over its fallback; loaded lazily, it still shows (it is hidden by visibility, not display, while it loads). */
@Component({
  selector: 'app-basic-avatar-demo',
  imports: [ScAvatar, ScAvatarFallback, ScAvatarImage],
  template: \`
    <span scAvatar>
      <img
        scAvatarImage
        src="/images/gallery/cafe-thumb.jpg"
        alt="Jordan Lee"
        loading="lazy"
        class="grayscale"
      />
      <span scAvatarFallback>JL</span>
    </span>
  \`,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class BasicAvatarDemo {}`;
}
