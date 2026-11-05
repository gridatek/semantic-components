import { Component, ViewEncapsulation } from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { GroupItemDemo } from './group-item-demo';

@Component({
  selector: 'app-group-item-demo-container',
  imports: [DemoContainer, GroupItemDemo],
  template: `
    <app-demo-container
      title="Group"
      demoUrl="/demos/item/group-item-demo"
      [code]="code"
    >
      <app-group-item-demo />
    </app-demo-container>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
})
export class GroupItemDemoContainer {
  readonly code = `import { Component, ViewEncapsulation } from '@angular/core';
import {
  ScAvatar,
  ScAvatarFallback,
  ScButton,
  ScItem,
  ScItemActions,
  ScItemBody,
  ScItemDescription,
  ScItemGroup,
  ScItemMedia,
  ScItemTitle,
} from '@semantic-components/ui';
import { SiPlusIcon } from '@semantic-icons/lucide-icons';

/** Items together in a scItemGroup — a list: role="list" on it, role="listitem" on each item. */
@Component({
  selector: 'app-group-item-demo',
  imports: [
    ScAvatar,
    ScAvatarFallback,
    ScButton,
    ScItem,
    ScItemActions,
    ScItemBody,
    ScItemDescription,
    ScItemGroup,
    ScItemMedia,
    ScItemTitle,
    SiPlusIcon,
  ],
  template: \`
    <div scItemGroup role="list" class="max-w-sm">
      <div scItem variant="outline" role="listitem">
        <div scItemMedia>
          <span scAvatar><span scAvatarFallback>S</span></span>
        </div>
        <div scItemBody>
          <div scItemTitle>shadcn</div>
          <p scItemDescription>shadcn@vercel.com</p>
        </div>
        <div scItemActions>
          <button scButton variant="ghost" size="icon" class="rounded-full">
            <svg siPlusIcon></svg>
            <span class="sr-only">Add shadcn</span>
          </button>
        </div>
      </div>
      <div scItem variant="outline" role="listitem">
        <div scItemMedia>
          <span scAvatar><span scAvatarFallback>M</span></span>
        </div>
        <div scItemBody>
          <div scItemTitle>maxleiter</div>
          <p scItemDescription>maxleiter@vercel.com</p>
        </div>
        <div scItemActions>
          <button scButton variant="ghost" size="icon" class="rounded-full">
            <svg siPlusIcon></svg>
            <span class="sr-only">Add maxleiter</span>
          </button>
        </div>
      </div>
      <div scItem variant="outline" role="listitem">
        <div scItemMedia>
          <span scAvatar><span scAvatarFallback>E</span></span>
        </div>
        <div scItemBody>
          <div scItemTitle>evilrabbit</div>
          <p scItemDescription>evilrabbit@vercel.com</p>
        </div>
        <div scItemActions>
          <button scButton variant="ghost" size="icon" class="rounded-full">
            <svg siPlusIcon></svg>
            <span class="sr-only">Add evilrabbit</span>
          </button>
        </div>
      </div>
    </div>
  \`,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class GroupItemDemo {}`;
}
