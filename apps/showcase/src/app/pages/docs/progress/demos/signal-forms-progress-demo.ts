import { JsonPipe } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
  computed,
  signal,
} from '@angular/core';
import { FormField, form } from '@angular/forms/signals';
import { minLength, required } from '@angular/forms/signals';
import {
  ScField,
  ScFieldDescription,
  ScInput,
  ScLabel,
  ScProgress,
  ScTextarea,
} from '@semantic-components/ui';

interface UserFormModel {
  name: string;
  email: string;
  bio: string;
}

@Component({
  selector: 'app-signal-forms-progress-demo',
  imports: [
    ScField,
    ScFieldDescription,
    ScProgress,
    ScLabel,
    ScInput,
    ScTextarea,
    JsonPipe,
    FormField,
  ],
  template: `
    <form>
      <div class="space-y-4">
        <div scField>
          <label scLabel>Form Completion</label>
          <div
            scProgress
            aria-label="Form completion"
            [value]="formCompletionPercentage()"
          ></div>
          <p scFieldDescription>{{ formCompletionPercentage() }}% complete</p>
        </div>

        <div scField>
          <label scLabel>Name</label>
          <input
            scInput
            type="text"
            [formField]="userForm.name"
            placeholder="Enter your name"
          />
        </div>

        <div scField>
          <label scLabel>Email</label>
          <input
            scInput
            type="email"
            [formField]="userForm.email"
            placeholder="Enter your email"
          />
        </div>

        <div scField>
          <label scLabel>Bio</label>
          <textarea
            scTextarea
            [formField]="userForm.bio"
            placeholder="Tell us about yourself"
          ></textarea>
        </div>
      </div>

      <div class="bg-muted mt-6 rounded-md p-4">
        <p class="text-sm font-medium">Form Values:</p>
        <pre class="mt-2 text-xs">{{ formModel() | json }}</pre>
      </div>
    </form>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SignalFormsProgressDemo {
  readonly formModel = signal<UserFormModel>({
    name: '',
    email: '',
    bio: '',
  });

  readonly userForm = form(this.formModel, (schemaPath) => {
    required(schemaPath.name);
    required(schemaPath.email);
    required(schemaPath.bio);
    minLength(schemaPath.bio, 10);
  });

  // Calculate completion percentage based on filled fields
  readonly formCompletionPercentage = computed(() => {
    const data = this.formModel();
    const fields = [data.name, data.email, data.bio];
    const filledFields = fields.filter(
      (field) => field && field.trim().length > 0,
    ).length;
    return Math.round((filledFields / fields.length) * 100);
  });
}
