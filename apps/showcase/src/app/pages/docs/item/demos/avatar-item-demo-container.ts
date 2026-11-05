import { Component, ViewEncapsulation } from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { AvatarItemDemo } from './avatar-item-demo';

@Component({
  selector: 'app-avatar-item-demo-container',
  imports: [DemoContainer, AvatarItemDemo],
  template: `
    <app-demo-container
      title="Avatar"
      demoUrl="/demos/item/avatar-item-demo"
      [code]="code"
    >
      <app-avatar-item-demo />
    </app-demo-container>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
})
export class AvatarItemDemoContainer {
  readonly code = `import { Component, ViewEncapsulation } from '@angular/core';
import {
  ScAvatar,
  ScAvatarFallback,
  ScButton,
  ScItem,
  ScItemActions,
  ScItemBody,
  ScItemDescription,
  ScItemMedia,
  ScItemTitle,
} from '@semantic-components/ui';
import { SiPlusIcon } from '@semantic-icons/lucide-icons';

/** An avatar, or a stack of them, as the media. */
@Component({
  selector: 'app-avatar-item-demo',
  imports: [
    ScAvatar,
    ScAvatarFallback,
    ScButton,
    ScItem,
    ScItemActions,
    ScItemBody,
    ScItemDescription,
    ScItemMedia,
    ScItemTitle,
    SiPlusIcon,
  ],
  template: \`
    <div class="flex w-full max-w-lg flex-col gap-6">
      <div scItem variant="outline">
        <div scItemMedia>
          <span scAvatar class="size-10"><span scAvatarFallback>ER</span></span>
        </div>
        <div scItemBody>
          <div scItemTitle>Evil Rabbit</div>
          <p scItemDescription>Last seen 5 months ago</p>
        </div>
        <div scItemActions>
          <button
            scButton
            size="icon-sm"
            variant="outline"
            class="rounded-full"
          >
            <svg siPlusIcon></svg>
            <span class="sr-only">Invite Evil Rabbit</span>
          </button>
        </div>
      </div>
      <div scItem variant="outline">
        <div scItemMedia>
          <div
            class="*:data-[slot=avatar]:ring-background flex -space-x-2 *:data-[slot=avatar]:ring-2"
          >
            <span scAvatar class="hidden sm:flex"
              ><span scAvatarFallback>CN</span></span
            >
            <span scAvatar class="hidden sm:flex"
              ><span scAvatarFallback>LR</span></span
            >
            <span scAvatar><span scAvatarFallback>ER</span></span>
          </div>
        </div>
        <div scItemBody>
          <div scItemTitle>No Team Members</div>
          <p scItemDescription>
            Invite your team to collaborate on this project.
          </p>
        </div>
        <div scItemActions>
          <button scButton size="sm" variant="outline">Invite</button>
        </div>
      </div>
    </div>
  \`,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class AvatarItemDemo {}`;
}
