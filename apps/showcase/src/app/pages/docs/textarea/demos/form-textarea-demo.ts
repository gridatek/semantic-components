import {
  ChangeDetectionStrategy,
  Component,
  signal,
  ViewEncapsulation,
} from '@angular/core';
import { form, FormField, required, email } from '@angular/forms/signals';
import {
  ScCard,
  ScCardContent,
  ScCardHeader,
  ScCardTitle,
  ScField,
  ScInput,
  ScLabel,
  ScTextarea,
} from '@semantic-components/ui-lab';

interface ContactForm {
  name: string;
  email: string;
  subject: string;
  message: string;
}

@Component({
  selector: 'app-form-textarea-demo',
  imports: [
    FormField,
    ScCard,
    ScCardContent,
    ScCardHeader,
    ScCardTitle,
    ScField,
    ScInput,
    ScLabel,
    ScTextarea,
  ],
  template: `
    <div sc-card class="max-w-lg">
      <div sc-card-header>
        <h4 sc-card-title class="text-base">Contact Us</h4>
      </div>
      <div sc-card-content class="grid gap-4">
        <div class="grid grid-cols-2 gap-4">
          <div sc-field>
            <label sc-label>Name</label>
            <input
              sc-input
              type="text"
              [formField]="contactForm.name"
              placeholder="Your name"
            />
          </div>
          <div sc-field>
            <label sc-label>Email</label>
            <input
              sc-input
              type="email"
              [formField]="contactForm.email"
              placeholder="your&#64;email.com"
            />
          </div>
        </div>
        <div sc-field>
          <label sc-label>Subject</label>
          <input
            sc-input
            type="text"
            [formField]="contactForm.subject"
            placeholder="How can we help?"
          />
        </div>
        <div sc-field>
          <label sc-label>Message</label>
          <textarea
            sc-textarea
            rows="4"
            [formField]="contactForm.message"
            placeholder="Please describe your inquiry in detail..."
          ></textarea>
        </div>
      </div>
    </div>
  `,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FormTextareaDemo {
  readonly formModel = signal<ContactForm>({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  readonly contactForm = form(this.formModel, (s) => {
    required(s.name);
    required(s.email);
    email(s.email);
    required(s.message);
  });
}
