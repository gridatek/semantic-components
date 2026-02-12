import {
  ChangeDetectionStrategy,
  Component,
  computed,
  signal,
  ViewEncapsulation,
} from '@angular/core';
import { form, FormField } from '@angular/forms/signals';
import { required, minLength } from '@angular/forms/signals';
import { ScProgress } from '@semantic-components/ui-lab';
import { ScLabel } from '@semantic-components/ui-lab';
import { JsonPipe } from '@angular/common';

interface UserFormModel {
  name: string;
  email: string;
  bio: string;
}

@Component({
  selector: 'app-signal-forms-progress-demo',
  imports: [ScProgress, ScLabel, JsonPipe, FormField],
  template: `
    <form>
      <div class="space-y-4">
        <div class="space-y-2">
          <label sc-label>Form Completion</label>
          <div
            sc-progress
            [value]="formCompletionPercentage()"
            class="w-full"
          ></div>
          <p class="text-xs text-muted-foreground">
            {{ formCompletionPercentage() }}% complete
          </p>
        </div>

        <div class="space-y-2">
          <label sc-label for="name">Name</label>
          <input
            type="text"
            id="name"
            [formField]="userForm.name"
            class="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
            placeholder="Enter your name"
          />
        </div>

        <div class="space-y-2">
          <label sc-label for="email">Email</label>
          <input
            type="email"
            id="email"
            [formField]="userForm.email"
            class="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
            placeholder="Enter your email"
          />
        </div>

        <div class="space-y-2">
          <label sc-label for="bio">Bio</label>
          <textarea
            id="bio"
            [formField]="userForm.bio"
            class="flex min-h-[80px] w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
            placeholder="Tell us about yourself"
          ></textarea>
        </div>
      </div>

      <div class="mt-6 p-4 bg-muted rounded-md">
        <p class="text-sm font-medium">Form Values:</p>
        <pre class="text-xs mt-2">{{ formModel() | json }}</pre>
      </div>
    </form>
  `,
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
