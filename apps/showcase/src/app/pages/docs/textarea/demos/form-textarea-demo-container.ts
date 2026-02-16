import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { FormTextareaDemo } from './form-textarea-demo';

@Component({
  selector: 'app-form-textarea-demo-container',
  imports: [DemoContainer, FormTextareaDemo],
  template: `
    <app-demo-container
      title="Form Example"
      demoUrl="/demos/textarea/form-textarea-demo"
      [code]="code"
    >
      <app-form-textarea-demo />
    </app-demo-container>
  `,
  host: { class: 'block' },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FormTextareaDemoContainer {
  readonly code = `import {
  ChangeDetectionStrategy,
  Component,
  signal,
  ViewEncapsulation,
} from '@angular/core';
import { form, FormField, required, email } from '@angular/forms/signals';
import {
  ScField,
  ScCard,
  ScCardBody,
  ScCardHeader,
  ScCardTitle,
  ScInput,
  ScLabel,
  ScTextarea,
} from '@semantic-components/ui';

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
    ScCardBody,
    ScCardHeader,
    ScCardTitle,
    ScField,
    ScInput,
    ScLabel,
    ScTextarea,
  ],
  template: \`
    <div scCard class="max-w-lg">
      <div scCardHeader>
        <h4 scCardTitle class="text-base">Contact Us</h4>
      </div>
      <div scCardBody class="grid gap-4">
        <div class="grid grid-cols-2 gap-4">
          <div scField>
            <label scLabel>Name</label>
            <input
              scInput
              type="text"
              [formField]="contactForm.name"
              placeholder="Your name"
            />
          </div>
          <div scField>
            <label scLabel>Email</label>
            <input
              scInput
              type="email"
              [formField]="contactForm.email"
              placeholder="your&#64;email.com"
            />
          </div>
        </div>
        <div scField>
          <label scLabel>Subject</label>
          <input
            scInput
            type="text"
            [formField]="contactForm.subject"
            placeholder="How can we help?"
          />
        </div>
        <div scField>
          <label scLabel>Message</label>
          <textarea
            scTextarea
            rows="4"
            [formField]="contactForm.message"
            placeholder="Please describe your inquiry in detail..."
          ></textarea>
        </div>
      </div>
    </div>
  \`,
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
}`;
}
