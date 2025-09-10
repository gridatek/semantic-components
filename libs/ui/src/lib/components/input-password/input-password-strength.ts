import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
  computed,
  inject,
  input,
} from '@angular/core';

import { cn } from '@semantic-components/utils';

import { ScProgress } from '../progress';
import { PasswordValidationService } from './password-validation.service';

@Component({
  selector: 'div[sc-input-password-strength]',
  imports: [ScProgress],
  template: `
    <sc-progress
      [class]="progressClass()"
      [value]="validation().percentage"
      [attr.aria-label]="strengthLabel()"
      [attr.aria-valuenow]="validation().percentage"
      [attr.aria-valuetext]="strengthText()"
      max="100"
      role="progressbar"
    />
    <ng-content />
  `,
  host: {
    '[class]': 'class()',
    '[attr.aria-live]': '"polite"',
    '[attr.aria-atomic]': '"true"',
  },
  styles: ``,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ScInputPasswordStrength {
  private readonly validationService = inject(PasswordValidationService);

  readonly showPercentage = input<boolean>(false);
  readonly animate = input<boolean>(true);
  readonly size = input<'sm' | 'md' | 'lg'>('md');

  readonly classInput = input<string>('', { alias: 'class' });

  readonly validation = computed(() => this.validationService.validation());

  protected readonly class = computed(() => cn('', this.classInput()));

  protected readonly strengthLabel = computed(
    () => `Password strength: ${this.validation().message}`,
  );

  protected readonly strengthText = computed(() => {
    const validation = this.validation();
    const percentage = this.showPercentage() ? ` (${validation.percentage}%)` : '';
    return `${validation.message}${percentage}`;
  });

  protected readonly progressClass = computed(() => {
    const sizeClasses = {
      sm: 'h-1',
      md: 'h-2',
      lg: 'h-3',
    };

    const animationClasses = this.animate()
      ? '*:data-[slot=indicator]:transition-all *:data-[slot=indicator]:duration-700 *:data-[slot=indicator]:ease-out'
      : '';

    return cn(
      'mb-4 mt-3 w-full overflow-hidden rounded-full bg-border',
      sizeClasses[this.size()],
      '*:data-[slot=indicator]:h-full',
      animationClasses,
      this.strengthColor(),
    );
  });

  readonly strengthColor = computed(() => {
    return this.validationService.getStrengthColorClass();
  });
}
