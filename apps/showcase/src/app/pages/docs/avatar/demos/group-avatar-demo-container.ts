import { Component, ViewEncapsulation } from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { GroupAvatarDemo } from './group-avatar-demo';

@Component({
  selector: 'app-group-avatar-demo-container',
  imports: [DemoContainer, GroupAvatarDemo],
  template: `
    <app-demo-container
      title="Avatar Group"
      demoUrl="/demos/avatar/group-avatar-demo"
      [code]="code"
    >
      <app-group-avatar-demo />
    </app-demo-container>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
})
export class GroupAvatarDemoContainer {
  readonly code = `import { Component, ViewEncapsulation } from '@angular/core';
import {
  ScAvatar,
  ScAvatarFallback,
  ScAvatarGroup,
  ScAvatarImage,
} from '@semantic-components/ui';

/** Overlapping, each ringed by the background. */
@Component({
  selector: 'app-group-avatar-demo',
  imports: [ScAvatar, ScAvatarFallback, ScAvatarGroup, ScAvatarImage],
  template: \`
    <div scAvatarGroup class="grayscale">
      <span scAvatar>
        <img scAvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
        <span scAvatarFallback>CN</span>
      </span>
      <span scAvatar>
        <img
          scAvatarImage
          src="https://github.com/maxleiter.png"
          alt="@maxleiter"
        />
        <span scAvatarFallback>LR</span>
      </span>
      <span scAvatar>
        <img
          scAvatarImage
          src="https://github.com/evilrabbit.png"
          alt="@evilrabbit"
        />
        <span scAvatarFallback>ER</span>
      </span>
    </div>
  \`,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class GroupAvatarDemo {}`;
}
