import { Component, ViewEncapsulation } from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { IconItemDemo } from './icon-item-demo';

@Component({
  selector: 'app-icon-item-demo-container',
  imports: [DemoContainer, IconItemDemo],
  template: `
    <app-demo-container
      title="Icon"
      demoUrl="/demos/item/icon-item-demo"
      [code]="code"
    >
      <app-icon-item-demo />
    </app-demo-container>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
})
export class IconItemDemoContainer {
  readonly code = `import { Component, ViewEncapsulation } from '@angular/core';
import {
  ScButton,
  ScItem,
  ScItemActions,
  ScItemBody,
  ScItemDescription,
  ScItemMedia,
  ScItemTitle,
} from '@semantic-components/ui';
import { SiShieldAlertIcon } from '@semantic-icons/lucide-icons';

/** scItemMedia variant="icon": your icon at the item’s start. */
@Component({
  selector: 'app-icon-item-demo',
  imports: [
    ScButton,
    ScItem,
    ScItemActions,
    ScItemBody,
    ScItemDescription,
    ScItemMedia,
    ScItemTitle,
    SiShieldAlertIcon,
  ],
  template: \`
    <div class="flex w-full max-w-lg flex-col gap-6">
      <div scItem variant="outline">
        <div scItemMedia variant="icon"><svg siShieldAlertIcon></svg></div>
        <div scItemBody>
          <div scItemTitle>Security Alert</div>
          <p scItemDescription>New login detected from unknown device.</p>
        </div>
        <div scItemActions>
          <button scButton size="sm" variant="outline">Review</button>
        </div>
      </div>
    </div>
  \`,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class IconItemDemo {}`;
}
