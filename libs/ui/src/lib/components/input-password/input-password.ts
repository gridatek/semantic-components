import { _IdGenerator } from '@angular/cdk/a11y';
import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
  computed,
  inject,
  input,
  signal,
} from '@angular/core';

import { cn } from '@semantic-components/utils';

import { ScLabel } from '../label';
import { ScInputPasswordDescription } from './input-password-description';
import { ScInputPasswordField } from './input-password-field';
import { PasswordRequirement, ScInputPasswordRequirements } from './input-password-requirements';
import { ScInputPasswordStrength } from './input-password-strength';
import { ScInputPasswordToggle } from './input-password-toggle';

@Component({
  selector: 'div[sc-input-password]',
  imports: [
    ScLabel,
    ScInputPasswordField,
    ScInputPasswordToggle,
    ScInputPasswordStrength,
    ScInputPasswordDescription,
    ScInputPasswordRequirements,
  ],
  template: `
    <ng-content />
  `,
  host: {
    '[class]': 'class()',
  },
  styles: ``,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ScInputPassword {
  protected readonly id = inject(_IdGenerator).getId('sc-input-password-');

  readonly classInput = input<string>('', {
    alias: 'class',
  });

  protected readonly class = computed(() => cn('block w-full', this.classInput()));

  readonly password = signal<string>('');
  readonly isVisible = signal<boolean>(false);

  readonly requirements = [
    { regex: /.{8,}/, text: 'At least 8 characters' },
    { regex: /\d/, text: 'At least 1 number' },
    { regex: /[a-z]/, text: 'At least 1 lowercase letter' },
    { regex: /[A-Z]/, text: 'At least 1 uppercase letter' },
    { regex: /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/, text: 'At least 1 special character' },
  ];

  readonly strength = computed(() =>
    this.requirements.map((req) => ({
      met: req.regex.test(this.password()),
      text: req.text,
    })),
  );

  readonly strengthScore = computed(() => this.strength().filter((req) => req.met).length);

  onPasswordChange(password: string) {
    this.password.set(password);
  }

  onVisibilityChange(visible: boolean) {
    this.isVisible.set(visible);
  }
}
