import { Injectable, computed, signal } from '@angular/core';

import {
  DEFAULT_PASSWORD_RULES,
  PasswordRule,
  PasswordStrength,
  validatePassword,
} from './password-validation.types';

@Injectable({
  providedIn: 'root',
})
export class PasswordValidationService {
  private readonly _password = signal<string>('');
  private readonly _rules = signal<PasswordRule[]>(DEFAULT_PASSWORD_RULES);

  readonly password = this._password.asReadonly();
  readonly rules = this._rules.asReadonly();

  readonly validation = computed(() => validatePassword(this._password(), this._rules()));

  updatePassword(password: string): void {
    this._password.set(password);
  }

  updateRules(rules: PasswordRule[]): void {
    this._rules.set(rules.length > 0 ? rules : DEFAULT_PASSWORD_RULES);
  }

  reset(): void {
    this._password.set('');
  }

  isValid(): boolean {
    return this.validation().level === 'strong';
  }

  getStrengthColor(): string {
    const level = this.validation().level;
    switch (level) {
      case 'none':
        return 'bg-border';
      case 'weak':
        return 'bg-red-500';
      case 'fair':
        return 'bg-orange-500';
      case 'good':
        return 'bg-amber-500';
      case 'strong':
        return 'bg-emerald-500';
      default:
        return 'bg-border';
    }
  }

  getStrengthColorClass(): string {
    const level = this.validation().level;
    switch (level) {
      case 'none':
        return '*:data-[slot=indicator]:bg-border';
      case 'weak':
        return '*:data-[slot=indicator]:bg-red-500';
      case 'fair':
        return '*:data-[slot=indicator]:bg-orange-500';
      case 'good':
        return '*:data-[slot=indicator]:bg-amber-500';
      case 'strong':
        return '*:data-[slot=indicator]:bg-emerald-500';
      default:
        return '*:data-[slot=indicator]:bg-border';
    }
  }
}
