import { Component, ViewEncapsulation } from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { AvatarEmptyDemo } from './avatar-empty-demo';

@Component({
  selector: 'app-avatar-empty-demo-container',
  imports: [DemoContainer, AvatarEmptyDemo],
  template: `
    <app-demo-container
      title="Avatar"
      demoUrl="/demos/empty/avatar-empty-demo"
      [code]="code"
    >
      <app-avatar-empty-demo />
    </app-demo-container>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
})
export class AvatarEmptyDemoContainer {
  readonly code = `import { Component, ViewEncapsulation } from '@angular/core';
import {
  ScAvatar,
  ScAvatarFallback,
  ScButton,
  ScEmpty,
  ScEmptyBody,
  ScEmptyDescription,
  ScEmptyHeader,
  ScEmptyMedia,
  ScEmptyTitle,
} from '@semantic-components/ui';

/** An avatar as the media (variant default). */
@Component({
  selector: 'app-avatar-empty-demo',
  imports: [
    ScAvatar,
    ScAvatarFallback,
    ScButton,
    ScEmpty,
    ScEmptyBody,
    ScEmptyDescription,
    ScEmptyHeader,
    ScEmptyMedia,
    ScEmptyTitle,
  ],
  template: \`
    <div scEmpty>
      <div scEmptyHeader>
        <div scEmptyMedia>
          <span scAvatar class="size-12"><span scAvatarFallback>LR</span></span>
        </div>
        <h2 scEmptyTitle>User Offline</h2>
        <div scEmptyDescription>
          This user is currently offline. You can leave a message to notify them
          or try again later.
        </div>
      </div>
      <div scEmptyBody>
        <button scButton size="sm">Leave Message</button>
      </div>
    </div>
  \`,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class AvatarEmptyDemo {}`;
}
