import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  input,
  ViewEncapsulation,
} from '@angular/core';
import { cn } from '../../utils';
import { SC_PASSWORD_FIELD } from './password-field';

export interface ScPasswordRequirement {
  label: string;
  test: (value: string) => boolean;
}

const DEFAULT_REQUIREMENTS: ScPasswordRequirement[] = [
  { label: 'At least 8 characters', test: (v: string) => v.length >= 8 },
  { label: 'Contains uppercase letter', test: (v: string) => /[A-Z]/.test(v) },
  { label: 'Contains lowercase letter', test: (v: string) => /[a-z]/.test(v) },
  { label: 'Contains number', test: (v: string) => /\d/.test(v) },
  {
    label: 'Contains special character',
    test: (v: string) => /[!@#$%^&*(),.?":{}|<>]/.test(v),
  },
];

@Component({
  selector: '[sc-password-field-requirements]',
  template: `
    @if (passwordField.value()) {
      <ul class="mt-2 space-y-1 text-xs">
        @for (req of requirements(); track req.label) {
          <li [class]="requirementClass(req.test(passwordField.value()))">
            @if (req.test(passwordField.value())) {
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                class="inline size-3 mr-1"
                aria-hidden="true"
              >
                <path d="M20 6 9 17l-5-5" />
              </svg>
            } @else {
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                class="inline size-3 mr-1"
                aria-hidden="true"
              >
                <circle cx="12" cy="12" r="10" />
              </svg>
            }
            {{ req.label }}
          </li>
        }
      </ul>
    }
  `,
  host: {
    'data-slot': 'password-field-requirements',
    '[class]': 'class()',
  },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ScPasswordFieldRequirements {
  readonly passwordField = inject(SC_PASSWORD_FIELD);
  readonly classInput = input<string>('', { alias: 'class' });
  readonly requirements = input<ScPasswordRequirement[]>(DEFAULT_REQUIREMENTS);

  protected readonly class = computed(() => cn(this.classInput()));

  protected requirementClass(met: boolean): string {
    return cn(
      'flex items-center',
      met ? 'text-green-600' : 'text-muted-foreground',
    );
  }
}
