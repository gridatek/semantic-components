import { Component, ViewEncapsulation } from '@angular/core';
import {
  ScButton,
  ScCard,
  ScCardContent,
  ScEmpty,
  ScEmptyBody,
  ScEmptyDescription,
  ScEmptyHeader,
  ScEmptyMedia,
  ScEmptyTitle,
} from '@semantic-components/ui';
import { SiCreditCardIcon } from '@semantic-icons/lucide-icons';

/** No bank yet: an empty state that sets up payouts. */
@Component({
  selector: 'app-preview-empty-connect-bank',
  imports: [
    ScButton,
    ScCard,
    ScCardContent,
    ScEmpty,
    ScEmptyBody,
    ScEmptyDescription,
    ScEmptyHeader,
    ScEmptyMedia,
    ScEmptyTitle,
    SiCreditCardIcon,
  ],
  template: `
    <div scCard>
      <div scCardContent>
        <div scEmpty class="p-4">
          <div scEmptyHeader>
            <div scEmptyMedia variant="icon">
              <svg siCreditCardIcon></svg>
            </div>
            <h2 scEmptyTitle>Connect Bank</h2>
            <div scEmptyDescription>
              Link your payout method to receive monthly royalty distributions
              automatically.
            </div>
          </div>
          <div scEmptyBody>
            <button scButton>Set Up Payouts</button>
          </div>
        </div>
      </div>
    </div>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
})
export class PreviewEmptyConnectBank {}
