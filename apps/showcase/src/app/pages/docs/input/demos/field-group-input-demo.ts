import { Component, ViewEncapsulation, signal } from '@angular/core';
import { FormField, FormRoot, form } from '@angular/forms/signals';
import {
  ScButton,
  ScField,
  ScFieldDescription,
  ScFieldGroup,
  ScInput,
  ScLabel,
} from '@semantic-components/ui';

@Component({
  selector: 'app-field-group-input-demo',
  imports: [
    FormField,
    FormRoot,
    ScButton,
    ScField,
    ScFieldDescription,
    ScFieldGroup,
    ScInput,
    ScLabel,
  ],
  template: `
    <form [formRoot]="profileForm" class="w-full max-w-xs">
      <div scFieldGroup>
        <div scField>
          <label scLabel>Name</label>
          <input
            scInput
            [formField]="profileForm.name"
            placeholder="Jordan Lee"
          />
        </div>
        <div scField>
          <label scLabel>Email</label>
          <input
            scInput
            type="email"
            [formField]="profileForm.email"
            placeholder="name&#64;example.com"
          />
          <p scFieldDescription>We'll send updates to this address.</p>
        </div>
        <div scField orientation="horizontal">
          <button scButton variant="outline" (click)="reset()">Reset</button>
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
export class FieldGroupInputDemo {
  private readonly model = signal({ name: '', email: '' });
  protected readonly status = signal('');
  protected readonly profileForm = form(this.model, () => undefined, {
    submission: {
      action: async () => {
        this.status.set(`Submitted: ${this.model().name}`);
      },
    },
  });

  protected reset(): void {
    this.model.set({ name: '', email: '' });
    this.profileForm().reset();
    this.status.set('');
  }
}
