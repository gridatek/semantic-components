import { Component, ViewEncapsulation } from '@angular/core';
import {
  ScItem,
  ScItemBody,
  ScItemDescription,
  ScItemMedia,
  ScItemTitle,
} from '@semantic-components/ui';
import { SiInboxIcon } from '@semantic-icons/lucide-icons';

/** variant: default (no border), outline, muted. */
@Component({
  selector: 'app-variant-item-demo',
  imports: [
    ScItem,
    ScItemBody,
    ScItemDescription,
    ScItemMedia,
    ScItemTitle,
    SiInboxIcon,
  ],
  template: `
    <div class="flex w-full max-w-md flex-col gap-6">
      <div scItem>
        <div scItemMedia variant="icon"><svg siInboxIcon></svg></div>
        <div scItemBody>
          <div scItemTitle>Default Variant</div>
          <p scItemDescription>Transparent background with no border.</p>
        </div>
      </div>
      <div scItem variant="outline">
        <div scItemMedia variant="icon"><svg siInboxIcon></svg></div>
        <div scItemBody>
          <div scItemTitle>Outline Variant</div>
          <p scItemDescription>Outlined style with a visible border.</p>
        </div>
      </div>
      <div scItem variant="muted">
        <div scItemMedia variant="icon"><svg siInboxIcon></svg></div>
        <div scItemBody>
          <div scItemTitle>Muted Variant</div>
          <p scItemDescription>Muted background for secondary content.</p>
        </div>
      </div>
    </div>
  `,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class VariantItemDemo {}
