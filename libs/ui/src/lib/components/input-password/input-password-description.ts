import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
  computed,
  inject,
  input,
} from '@angular/core';

import { cn } from '@semantic-components/utils';

import { PasswordValidationService } from './password-validation.service';

@Component({
  selector: 'p[sc-input-password-description]',
  imports: [],
  template: `
    <span [class]="strengthTextClass()">{{ validation().message }}</span>
    @if (showHelp()) {
      <span class="text-muted-foreground">. Must contain:</span>
    }
  `,
  host: {
    '[id]': 'id()',
    '[class]': 'class()',
    '[attr.aria-live]': '"polite"',
    '[attr.aria-atomic]': '"true"',
  },
  styles: ``,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ScInputPasswordDescription {
  private readonly validationService = inject(PasswordValidationService);

  readonly id = input<string>('password-description');
  readonly showHelp = input<boolean>(true);
  readonly showIcon = input<boolean>(false);

  readonly classInput = input<string>('', { alias: 'class' });

  readonly validation = computed(() => this.validationService.validation());

  protected readonly class = computed(() =>
    cn('mb-2 text-sm font-medium flex items-center gap-2', this.classInput()),
  );

  protected readonly strengthTextClass = computed(() => {
    const level = this.validation().level;
    const baseClass = 'font-semibold';

    switch (level) {
      case 'none':
        return cn(baseClass, 'text-muted-foreground');
      case 'weak':
        return cn(baseClass, 'text-destructive');
      case 'fair':
        return cn(baseClass, 'text-orange-600 dark:text-orange-400');
      case 'good':
        return cn(baseClass, 'text-amber-600 dark:text-amber-400');
      case 'strong':
        return cn(baseClass, 'text-emerald-600 dark:text-emerald-400');
      default:
        return baseClass;
    }
  });
}
