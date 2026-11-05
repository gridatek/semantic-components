import { Component, ViewEncapsulation } from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { DropdownItemDemo } from './dropdown-item-demo';

@Component({
  selector: 'app-dropdown-item-demo-container',
  imports: [DemoContainer, DropdownItemDemo],
  template: `
    <app-demo-container
      title="Dropdown"
      demoUrl="/demos/item/dropdown-item-demo"
      [code]="code"
    >
      <app-dropdown-item-demo />
    </app-demo-container>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
})
export class DropdownItemDemoContainer {
  readonly code = `import { Component, ViewEncapsulation } from '@angular/core';
import {
  ScAvatar,
  ScAvatarFallback,
  ScButton,
  ScItem,
  ScItemBody,
  ScItemDescription,
  ScItemMedia,
  ScItemTitle,
  ScMenu,
  ScMenuContent,
  ScMenuItem,
  ScMenuPortal,
  ScMenuProvider,
  ScMenuTrigger,
} from '@semantic-components/ui';
import { SiChevronDownIcon } from '@semantic-icons/lucide-icons';

/** Items in a Menu’s items: size xs, no padding of their own inside a menu. */
@Component({
  selector: 'app-dropdown-item-demo',
  imports: [
    ScAvatar,
    ScAvatarFallback,
    ScButton,
    ScItem,
    ScItemBody,
    ScItemDescription,
    ScItemMedia,
    ScItemTitle,
    ScMenu,
    ScMenuContent,
    ScMenuItem,
    ScMenuPortal,
    ScMenuProvider,
    ScMenuTrigger,
    SiChevronDownIcon,
  ],
  template: \`
    <div scMenuProvider>
      <button scButton scMenuTrigger variant="outline">
        Select <svg siChevronDownIcon></svg>
      </button>
      <ng-template scMenuPortal>
        <div scMenu class="w-56">
          <ng-template scMenuContent>
            <div scMenuItem value="shadcn">
              <div scItem size="xs" class="w-full p-2">
                <div scItemMedia>
                  <span scAvatar class="size-[--spacing(6.5)]"
                    ><span scAvatarFallback>S</span></span
                  >
                </div>
                <div scItemBody class="gap-0">
                  <div scItemTitle>shadcn</div>
                  <p scItemDescription class="leading-none">
                    shadcn@vercel.com
                  </p>
                </div>
              </div>
            </div>
            <div scMenuItem value="maxleiter">
              <div scItem size="xs" class="w-full p-2">
                <div scItemMedia>
                  <span scAvatar class="size-[--spacing(6.5)]"
                    ><span scAvatarFallback>M</span></span
                  >
                </div>
                <div scItemBody class="gap-0">
                  <div scItemTitle>maxleiter</div>
                  <p scItemDescription class="leading-none">
                    maxleiter@vercel.com
                  </p>
                </div>
              </div>
            </div>
            <div scMenuItem value="evilrabbit">
              <div scItem size="xs" class="w-full p-2">
                <div scItemMedia>
                  <span scAvatar class="size-[--spacing(6.5)]"
                    ><span scAvatarFallback>E</span></span
                  >
                </div>
                <div scItemBody class="gap-0">
                  <div scItemTitle>evilrabbit</div>
                  <p scItemDescription class="leading-none">
                    evilrabbit@vercel.com
                  </p>
                </div>
              </div>
            </div>
          </ng-template>
        </div>
      </ng-template>
    </div>
  \`,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class DropdownItemDemo {}`;
}
