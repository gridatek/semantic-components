import { Component, ViewEncapsulation } from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { AvatarGroupEmptyDemo } from './avatar-group-empty-demo';

@Component({
  selector: 'app-avatar-group-empty-demo-container',
  imports: [DemoContainer, AvatarGroupEmptyDemo],
  template: `
    <app-demo-container
      title="Avatar group"
      demoUrl="/demos/empty/avatar-group-empty-demo"
      [code]="code"
    >
      <app-avatar-group-empty-demo />
    </app-demo-container>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
})
export class AvatarGroupEmptyDemoContainer {
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
import { SiPlusIcon } from '@semantic-icons/lucide-icons';

/** A stack of avatars as the media. */
@Component({
  selector: 'app-avatar-group-empty-demo',
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
    SiPlusIcon,
  ],
  template: \`
    <div scEmpty>
      <div scEmptyHeader>
        <div scEmptyMedia>
          <div
            class="*:data-[slot=avatar]:ring-background flex -space-x-2 *:data-[slot=avatar]:size-12 *:data-[slot=avatar]:ring-2"
          >
            <span scAvatar><span scAvatarFallback>CN</span></span>
            <span scAvatar><span scAvatarFallback>LR</span></span>
            <span scAvatar><span scAvatarFallback>ER</span></span>
          </div>
        </div>
        <h2 scEmptyTitle>No Team Members</h2>
        <div scEmptyDescription>
          Invite your team to collaborate on this project.
        </div>
      </div>
      <div scEmptyBody>
        <button scButton size="sm">
          <svg siPlusIcon></svg>
          Invite Members
        </button>
      </div>
    </div>
  \`,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class AvatarGroupEmptyDemo {}`;
}
