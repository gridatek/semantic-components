import { Component, ViewEncapsulation, signal } from '@angular/core';
import {
  ScButton,
  ScCheckbox,
  ScField,
  ScFieldDescription,
  ScFieldGroup,
  ScFieldSeparator,
  ScFieldset,
  ScInput,
  ScLabel,
  ScLegend,
  ScSelect,
  ScSelectIcon,
  ScSelectItem,
  ScSelectItemIndicator,
  ScSelectItemText,
  ScSelectLabel,
  ScSelectList,
  ScSelectPopup,
  ScSelectPortal,
  ScSelectTrigger,
  ScSelectValue,
  ScTextarea,
} from '@semantic-components/ui';
import { SiCheckIcon, SiChevronDownIcon } from '@semantic-icons/lucide-icons';

@Component({
  selector: 'app-field-usage-demo',
  imports: [
    ScButton,
    ScCheckbox,
    ScField,
    ScFieldDescription,
    ScFieldGroup,
    ScFieldSeparator,
    ScFieldset,
    ScInput,
    ScLabel,
    ScLegend,
    ScSelect,
    ScSelectIcon,
    ScSelectItem,
    ScSelectItemIndicator,
    ScSelectItemText,
    ScSelectLabel,
    ScSelectList,
    ScSelectPopup,
    ScSelectPortal,
    ScSelectTrigger,
    ScSelectValue,
    ScTextarea,
    SiCheckIcon,
    SiChevronDownIcon,
  ],
  template: `
    <div class="w-full max-w-md">
      <div scFieldGroup>
        <fieldset scFieldset>
          <legend scLegend>Payment Method</legend>
          <p scFieldDescription>All transactions are secure and encrypted</p>
          <div scFieldGroup>
            <div scField>
              <label scLabel>Name on Card</label>
              <input scInput placeholder="Evil Rabbit" />
            </div>
            <div scField>
              <label scLabel>Card Number</label>
              <input scInput placeholder="1234 5678 9012 3456" />
              <p scFieldDescription>Enter your 16-digit card number</p>
            </div>
            <div class="grid grid-cols-3 gap-4">
              <div scField>
                <div scSelect [(value)]="month" [items]="months">
                  <div scSelectLabel>Month</div>
                  <div scSelectTrigger>
                    <span scSelectValue></span>
                    <svg scSelectIcon siChevronDownIcon></svg>
                  </div>
                  <ng-template scSelectPortal>
                    <div scSelectPopup>
                      <div scSelectList>
                        @for (item of months; track item.value) {
                          <div scSelectItem [value]="item.value">
                            <span scSelectItemText>{{ item.label }}</span>
                            <span scSelectItemIndicator
                              ><svg siCheckIcon></svg
                            ></span>
                          </div>
                        }
                      </div>
                    </div>
                  </ng-template>
                </div>
              </div>
              <div scField>
                <div scSelect [(value)]="year" [items]="years">
                  <div scSelectLabel>Year</div>
                  <div scSelectTrigger>
                    <span scSelectValue></span>
                    <svg scSelectIcon siChevronDownIcon></svg>
                  </div>
                  <ng-template scSelectPortal>
                    <div scSelectPopup>
                      <div scSelectList>
                        @for (item of years; track item.value) {
                          <div scSelectItem [value]="item.value">
                            <span scSelectItemText>{{ item.label }}</span>
                            <span scSelectItemIndicator
                              ><svg siCheckIcon></svg
                            ></span>
                          </div>
                        }
                      </div>
                    </div>
                  </ng-template>
                </div>
              </div>
              <div scField>
                <label scLabel>CVV</label>
                <input scInput placeholder="123" />
              </div>
            </div>
          </div>
        </fieldset>
        <div scFieldSeparator></div>
        <fieldset scFieldset>
          <legend scLegend>Billing Address</legend>
          <p scFieldDescription>
            The billing address associated with your payment method
          </p>
          <div scFieldGroup>
            <div scField orientation="horizontal">
              <input scCheckbox [(checked)]="sameAsShipping" />
              <label scLabel class="font-normal"
                >Same as shipping address</label
              >
            </div>
          </div>
        </fieldset>
        <fieldset scFieldset>
          <div scFieldGroup>
            <div scField>
              <label scLabel>Comments</label>
              <textarea
                scTextarea
                placeholder="Add any additional comments"
                class="resize-none"
              ></textarea>
            </div>
          </div>
        </fieldset>
        <div scField orientation="horizontal">
          <button scButton type="button">Submit</button>
          <button scButton type="button" variant="outline">Cancel</button>
        </div>
      </div>
    </div>
  `,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class FieldUsageDemo {
  protected readonly months = [
    '01',
    '02',
    '03',
    '04',
    '05',
    '06',
    '07',
    '08',
    '09',
    '10',
    '11',
    '12',
  ].map((value) => ({
    value,
    label: value,
  }));
  protected readonly years = Array.from({ length: 10 }, (_, i) => ({
    value: String(2026 + i),
    label: String(2026 + i),
  }));
  protected readonly month = signal('');
  protected readonly year = signal('');
  protected readonly sameAsShipping = signal(true);
}
