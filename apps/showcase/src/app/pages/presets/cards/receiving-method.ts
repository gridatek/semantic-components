import { Component, ViewEncapsulation, signal } from '@angular/core';
import { FormField, form } from '@angular/forms/signals';
import {
  ScButton,
  ScCard,
  ScCardAction,
  ScCardBody,
  ScCardDescription,
  ScCardFooter,
  ScCardHeader,
  ScCardTitle,
  ScField,
  ScFieldContentWrapper,
  ScFieldDescription,
  ScFieldGroup,
  ScFieldTitle,
  ScFieldset,
  ScInput,
  ScLabel,
  ScLegend,
  ScRadio,
  ScRadioGroup,
} from '@semantic-components/ui';
import { SiXIcon } from '@semantic-icons/lucide-icons';

/** Payout settings: the account holder, a method as choice cards, an IBAN. */
@Component({
  selector: 'app-preview-receiving-method',
  imports: [
    FormField,
    ScButton,
    ScCard,
    ScCardAction,
    ScCardBody,
    ScCardDescription,
    ScCardFooter,
    ScCardHeader,
    ScCardTitle,
    ScField,
    ScFieldContentWrapper,
    ScFieldDescription,
    ScFieldGroup,
    ScFieldTitle,
    ScFieldset,
    ScInput,
    ScLabel,
    ScLegend,
    ScRadio,
    ScRadioGroup,
    SiXIcon,
  ],
  template: `
    <div scCard>
      <div scCardHeader>
        <p scCardDescription>Payout Preferences</p>
        <h2 scCardTitle>Receiving Method</h2>
        <div scCardAction>
          <button scButton variant="ghost" size="icon-sm" class="bg-muted">
            <svg siXIcon></svg>
            <span class="sr-only">Dismiss receiving method</span>
          </button>
        </div>
      </div>
      <div scCardBody>
        <div scFieldGroup>
          <div scField>
            <label scLabel>Account Holder Name</label>
            <input scInput [formField]="payout.holder" />
          </div>
          <fieldset scFieldset>
            <legend scLegend variant="label">Receiving Method</legend>
            <div
              scRadioGroup
              [formField]="payout.method"
              class="grid grid-cols-1 items-start gap-3 md:grid-cols-2"
            >
              <label scLabel>
                <div scField orientation="horizontal" class="pb-2.5">
                  <div scField orientation="horizontal">
                    <input scRadio value="bank" />
                  </div>
                  <div scFieldContentWrapper>
                    <div scFieldTitle>Bank Transfer</div>
                    <p scFieldDescription>SWIFT / IBAN</p>
                  </div>
                </div>
              </label>
              <label scLabel>
                <div scField orientation="horizontal" class="pb-2.5">
                  <div scField orientation="horizontal">
                    <input scRadio value="paypal" />
                  </div>
                  <div scFieldContentWrapper>
                    <div scFieldTitle>PayPal</div>
                    <p scFieldDescription class="line-clamp-1">
                      Instant Payout
                    </p>
                  </div>
                </div>
              </label>
            </div>
          </fieldset>
          <div scField>
            <label scLabel>IBAN / Account Number</label>
            <input
              scInput
              placeholder="DE89 3704 0044 ...."
              [formField]="payout.iban"
            />
          </div>
        </div>
      </div>
      <div scCardFooter>
        <button scButton class="w-full" disabled>Save Payout Settings</button>
      </div>
    </div>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
})
export class PreviewReceivingMethod {
  protected readonly payout = form(
    signal({
      holder: 'Synthetic Horizons Music LLC',
      method: 'bank',
      iban: '',
    }),
  );
}
