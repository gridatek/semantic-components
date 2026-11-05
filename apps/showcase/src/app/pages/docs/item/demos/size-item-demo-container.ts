import { Component, ViewEncapsulation } from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { SizeItemDemo } from './size-item-demo';

@Component({
  selector: 'app-size-item-demo-container',
  imports: [DemoContainer, SizeItemDemo],
  template: `
    <app-demo-container
      title="Size"
      demoUrl="/demos/item/size-item-demo"
      [code]="code"
    >
      <app-size-item-demo />
    </app-demo-container>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
})
export class SizeItemDemoContainer {
  readonly code = `import { Component, ViewEncapsulation } from '@angular/core';
import {
  ScItem,
  ScItemBody,
  ScItemDescription,
  ScItemMedia,
  ScItemTitle,
} from '@semantic-components/ui';
import { SiInboxIcon } from '@semantic-icons/lucide-icons';

/** size: default, sm, xs. */
@Component({
  selector: 'app-size-item-demo',
  imports: [
    ScItem,
    ScItemBody,
    ScItemDescription,
    ScItemMedia,
    ScItemTitle,
    SiInboxIcon,
  ],
  template: \`
    <div class="flex w-full max-w-md flex-col gap-6">
      <div scItem variant="outline">
        <div scItemMedia variant="icon"><svg siInboxIcon></svg></div>
        <div scItemBody>
          <div scItemTitle>Default Size</div>
          <p scItemDescription>The standard size for most use cases.</p>
        </div>
      </div>
      <div scItem variant="outline" size="sm">
        <div scItemMedia variant="icon"><svg siInboxIcon></svg></div>
        <div scItemBody>
          <div scItemTitle>Small Size</div>
          <p scItemDescription>A compact size for dense layouts.</p>
        </div>
      </div>
      <div scItem variant="outline" size="xs">
        <div scItemMedia variant="icon"><svg siInboxIcon></svg></div>
        <div scItemBody>
          <div scItemTitle>Extra Small Size</div>
          <p scItemDescription>The most compact size available.</p>
        </div>
      </div>
    </div>
  \`,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class SizeItemDemo {}`;
}
