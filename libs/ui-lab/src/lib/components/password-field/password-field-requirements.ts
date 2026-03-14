import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
  computed,
  inject,
  input,
} from '@angular/core';
import { cn } from '@semantic-components/ui';
import { SiCheckIcon, SiCircleIcon } from '@semantic-icons/lucide-icons';
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
  selector: '[scPasswordFieldRequirements]',
  imports: [SiCheckIcon, SiCircleIcon],
  template: `
    <ul class="mt-2 space-y-1 text-xs">
      @for (req of requirements(); track req.label) {
        <li [class]="requirementClass(req.test(passwordField.value()))">
          @if (req.test(passwordField.value())) {
            <svg
              siCheckIcon
              class="mr-1 inline size-3"
              aria-hidden="true"
            ></svg>
          } @else {
            <svg
              siCircleIcon
              class="mr-1 inline size-3"
              aria-hidden="true"
            ></svg>
          }
          {{ req.label }}
        </li>
      }
    </ul>
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
