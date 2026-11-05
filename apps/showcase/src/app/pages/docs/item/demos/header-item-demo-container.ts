import { Component, ViewEncapsulation } from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { HeaderItemDemo } from './header-item-demo';

@Component({
  selector: 'app-header-item-demo-container',
  imports: [DemoContainer, HeaderItemDemo],
  template: `
    <app-demo-container
      title="Header"
      demoUrl="/demos/item/header-item-demo"
      [code]="code"
    >
      <app-header-item-demo />
    </app-demo-container>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
})
export class HeaderItemDemoContainer {
  readonly code = `import { NgOptimizedImage } from '@angular/common';
import { Component, ViewEncapsulation } from '@angular/core';
import {
  ScItem,
  ScItemBody,
  ScItemDescription,
  ScItemGroup,
  ScItemHeader,
  ScItemTitle,
} from '@semantic-components/ui';

/** scItemHeader across the item’s top: here an image above its text. */
@Component({
  selector: 'app-header-item-demo',
  imports: [
    NgOptimizedImage,
    ScItem,
    ScItemBody,
    ScItemDescription,
    ScItemGroup,
    ScItemHeader,
    ScItemTitle,
  ],
  template: \`
    <div class="flex w-full max-w-xl flex-col gap-6">
      <div scItemGroup class="grid grid-cols-3 gap-4">
        <div scItem variant="outline">
          <div scItemHeader>
            <img
              ngSrc="/images/gallery/mountains-thumb.jpg"
              width="128"
              height="128"
              alt=""
              priority
              class="aspect-square w-full rounded-sm object-cover"
            />
          </div>
          <div scItemBody>
            <div scItemTitle>v0-1.5-sm</div>
            <p scItemDescription>Everyday tasks and UI generation.</p>
          </div>
        </div>
        <div scItem variant="outline">
          <div scItemHeader>
            <img
              ngSrc="/images/gallery/gorge-thumb.jpg"
              width="128"
              height="128"
              alt=""
              class="aspect-square w-full rounded-sm object-cover"
            />
          </div>
          <div scItemBody>
            <div scItemTitle>v0-1.5-lg</div>
            <p scItemDescription>Advanced thinking or reasoning.</p>
          </div>
        </div>
        <div scItem variant="outline">
          <div scItemHeader>
            <img
              ngSrc="/images/gallery/coast-thumb.jpg"
              width="128"
              height="128"
              alt=""
              class="aspect-square w-full rounded-sm object-cover"
            />
          </div>
          <div scItemBody>
            <div scItemTitle>v0-2.0-mini</div>
            <p scItemDescription>Open Source model for everyone.</p>
          </div>
        </div>
      </div>
    </div>
  \`,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class HeaderItemDemo {}`;
}
