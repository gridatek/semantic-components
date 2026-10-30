import { Component, ViewEncapsulation, signal } from '@angular/core';
import {
  FormField,
  FormRoot,
  email,
  form,
  required,
} from '@angular/forms/signals';
import {
  ScButton,
  ScField,
  ScFieldDescription,
  ScFieldErrors,
  ScFieldGroup,
  ScInput,
  ScLabel,
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
} from '@semantic-components/ui';
import { SiCheckIcon, SiChevronDownIcon } from '@semantic-icons/lucide-icons';

@Component({
  selector: 'app-form-input-demo',
  imports: [
    FormField,
    FormRoot,
    ScButton,
    ScField,
    ScFieldDescription,
    ScFieldErrors,
    ScFieldGroup,
    ScInput,
    ScLabel,
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
    SiCheckIcon,
    SiChevronDownIcon,
  ],
  template: `
    <form [formRoot]="contactForm" class="w-full max-w-sm">
      <div scFieldGroup>
        <div scField>
          <label scLabel>Name</label>
          <input
            scInput
            [formField]="contactForm.name"
            placeholder="Evil Rabbit"
            autocomplete="name"
          />
          <div scFieldErrors></div>
        </div>
        <div scField>
          <label scLabel>Email</label>
          <input
            scInput
            type="email"
            [formField]="contactForm.email"
            placeholder="john&#64;example.com"
            autocomplete="email"
          />
          <p scFieldDescription>We'll never share your email with anyone.</p>
          <div scFieldErrors></div>
        </div>
        <div class="grid grid-cols-2 gap-4">
          <div scField>
            <label scLabel>Phone</label>
            <input
              scInput
              type="tel"
              [formField]="contactForm.phone"
              placeholder="+1 (555) 123-4567"
              autocomplete="tel"
            />
          </div>
          <div scField>
            <div scSelect [formField]="contactForm.country">
              <div scSelectLabel>Country</div>
              <div scSelectTrigger class="w-full">
                <span scSelectValue>{{ countryLabel() }}</span>
                <svg scSelectIcon siChevronDownIcon></svg>
              </div>
              <ng-template scSelectPortal>
                <div scSelectPopup>
                  <div scSelectList>
                    @for (country of countries; track country.value) {
                      <div
                        scSelectItem
                        [value]="country.value"
                        [label]="country.label"
                      >
                        <span scSelectItemText>{{ country.label }}</span>
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
        </div>
        <div scField>
          <label scLabel>Address</label>
          <input
            scInput
            [formField]="contactForm.address"
            placeholder="123 Main St"
            autocomplete="street-address"
          />
        </div>
        <div scField orientation="horizontal">
          <button scButton variant="outline" (click)="cancel()">Cancel</button>
          <button scButton type="submit">Submit</button>
        </div>
        @if (status()) {
          <p class="text-muted-foreground text-sm" role="status">
            {{ status() }}
          </p>
        }
      </div>
    </form>
  `,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class FormInputDemo {
  protected readonly countries = [
    { value: 'us', label: 'United States' },
    { value: 'uk', label: 'United Kingdom' },
    { value: 'ma', label: 'Morocco' },
    { value: 'fr', label: 'France' },
  ];

  private readonly empty = {
    name: '',
    email: '',
    phone: '',
    country: 'us',
    address: '',
  };
  private readonly model = signal({ ...this.empty });
  protected readonly status = signal('');
  protected readonly contactForm = form(
    this.model,
    (s) => {
      required(s.name, { message: 'Enter your name.' });
      email(s.email, { message: 'Enter a valid email address.' });
    },
    {
      submission: {
        action: async () => {
          this.status.set(`Sent: ${this.model().name}`);
        },
      },
    },
  );

  protected countryLabel(): string {
    const value = this.contactForm.country().value();
    return this.countries.find((c) => c.value === value)?.label ?? '';
  }

  protected cancel(): void {
    this.model.set({ ...this.empty });
    this.contactForm().reset();
    this.status.set('');
  }
}
