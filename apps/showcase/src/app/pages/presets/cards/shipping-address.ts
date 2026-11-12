import { Component, ViewEncapsulation, signal } from '@angular/core';
import { FormField, form } from '@angular/forms/signals';
import {
  ScButton,
  ScCard,
  ScCardContent,
  ScCardDescription,
  ScCardFooter,
  ScCardHeader,
  ScCardTitle,
  ScCheckbox,
  ScField,
  ScFieldGroup,
  ScInput,
  ScLabel,
  ScSelect,
  ScSelectGroup,
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
} from '@semantic-components/ui';
import { SiCheckIcon, SiChevronDownIcon } from '@semantic-icons/lucide-icons';

interface ScShippingOption {
  label: string;
  value: string;
}

/** An address form: fields in rows of two, two selects, a checkbox. */
@Component({
  selector: 'app-preview-shipping-address',
  imports: [
    FormField,
    ScButton,
    ScCard,
    ScCardContent,
    ScCardDescription,
    ScCardFooter,
    ScCardHeader,
    ScCardTitle,
    ScCheckbox,
    ScField,
    ScFieldGroup,
    ScInput,
    ScLabel,
    ScSelect,
    ScSelectGroup,
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
    SiCheckIcon,
    SiChevronDownIcon,
  ],
  template: `
    <div scCard>
      <div scCardHeader>
        <h2 scCardTitle>Shipping Address</h2>
        <p scCardDescription>Where should we deliver?</p>
      </div>
      <div scCardContent>
        <div scFieldGroup>
          <div scField>
            <label scLabel>Street address</label>
            <input
              scInput
              placeholder="123 Main Street"
              [formField]="address.street"
            />
          </div>
          <div scField>
            <label scLabel>Apt / Suite</label>
            <input scInput placeholder="Apt 4B" [formField]="address.apt" />
          </div>
          <div scFieldGroup class="grid grid-cols-2">
            <div scField>
              <label scLabel>City</label>
              <input
                scInput
                placeholder="San Francisco"
                [formField]="address.city"
              />
            </div>
            <div scField>
              <div
                scSelect
                class="w-full"
                [items]="states"
                [formField]="address.state"
              >
                <label scSelectLabel>State</label>
                <div scSelectTrigger class="w-full">
                  <span scSelectValue></span>
                  <svg scSelectIcon siChevronDownIcon></svg>
                </div>
                <ng-template scSelectPortal>
                  <div scSelectPopup>
                    <div scSelectList>
                      <div scSelectGroup>
                        @for (item of states; track item.value) {
                          <div scSelectItem [value]="item.value">
                            <span scSelectItemText>{{ item.label }}</span>
                            <span scSelectItemIndicator>
                              <svg siCheckIcon></svg>
                            </span>
                          </div>
                        }
                      </div>
                    </div>
                  </div>
                </ng-template>
              </div>
            </div>
          </div>
          <div scFieldGroup class="grid grid-cols-2">
            <div scField>
              <label scLabel>ZIP Code</label>
              <input scInput placeholder="94102" [formField]="address.zip" />
            </div>
            <div scField>
              <div
                scSelect
                class="w-full"
                [items]="countries"
                [formField]="address.country"
              >
                <label scSelectLabel>Country</label>
                <div scSelectTrigger class="w-full">
                  <span scSelectValue></span>
                  <svg scSelectIcon siChevronDownIcon></svg>
                </div>
                <ng-template scSelectPortal>
                  <div scSelectPopup>
                    <div scSelectList>
                      <div scSelectGroup>
                        @for (item of countries; track item.value) {
                          <div scSelectItem [value]="item.value">
                            <span scSelectItemText>{{ item.label }}</span>
                            <span scSelectItemIndicator>
                              <svg siCheckIcon></svg>
                            </span>
                          </div>
                        }
                      </div>
                    </div>
                  </div>
                </ng-template>
              </div>
            </div>
          </div>
          <div scField orientation="horizontal">
            <input scCheckbox [formField]="address.save" />
            <label scLabel class="font-normal">Save as default address</label>
          </div>
        </div>
      </div>
      <div scCardFooter>
        <button scButton variant="outline" size="sm">Cancel</button>
        <button scButton size="sm" class="ms-auto">Save Address</button>
      </div>
    </div>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
})
export class PreviewShippingAddress {
  protected readonly states: ScShippingOption[] = [
    { label: 'California', value: 'CA' },
    { label: 'New York', value: 'NY' },
    { label: 'Texas', value: 'TX' },
  ];
  protected readonly countries: ScShippingOption[] = [
    { label: 'United States', value: 'US' },
    { label: 'Canada', value: 'CA' },
    { label: 'United Kingdom', value: 'UK' },
  ];
  protected readonly address = form(
    signal({
      street: '',
      apt: '',
      city: '',
      state: 'CA',
      zip: '',
      country: 'US',
      save: true,
    }),
  );
}
