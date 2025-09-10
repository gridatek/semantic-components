import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
  computed,
  inject,
  input,
} from '@angular/core';

import { cn } from '@semantic-components/utils';
import { SiCheckIcon } from '@semantic-icons/lucide-icons';

import { PasswordValidationService } from './password-validation.service';

@Component({
  selector: 'ul[sc-input-password-requirements]',
  imports: [SiCheckIcon],
  template: `
    @for (validation of validations(); track validation.rule.id) {
      <li
        class="flex items-center gap-2 transition-colors duration-200"
        [attr.data-requirement]="validation.rule.id"
        [attr.aria-describedby]="validation.rule.id + '-status'"
      >
        <span [class]="textClass(validation.isValid)" [id]="validation.rule.id + '-status'">
          {{ validation.rule.message }}
        </span>
        <div class="flex-shrink-0 ml-auto" [class]="iconClass(validation.isValid)">
          @if (hasUserInput() && validation.isValid) {
            <svg [attr.size]="iconSize()" si-check-icon strokeWidth="2" aria-hidden="true"></svg>
          }
        </div>
        <span class="sr-only">
          {{ validation.isValid ? '- Requirement met' : '- Requirement not met' }}
        </span>
      </li>
    }
  `,
  host: {
    'aria-label': 'Password requirements',
    '[class]': 'class()',
    role: 'list',
  },
  styles: ``,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ScInputPasswordRequirements {
  private readonly validationService = inject(PasswordValidationService);

  readonly compact = input<boolean>(false);
  readonly size = input<'sm' | 'md' | 'lg'>('md');
  readonly showIcons = input<boolean>(true);

  readonly classInput = input<string>('', { alias: 'class' });

  readonly validations = computed(() => this.validationService.validation().validations);
  readonly hasUserInput = computed(() => this.validationService.password().length > 0);

  protected readonly class = computed(() => {
    const spaceClass = this.compact() ? 'space-y-1' : 'space-y-1.5';
    return cn(spaceClass, this.classInput());
  });

  protected readonly iconSize = computed(() => {
    const sizes = { sm: '14', md: '16', lg: '18' };
    return sizes[this.size()];
  });

  protected iconClass(isValid: boolean): string {
    if (!this.showIcons()) return 'hidden';

    return cn(
      'transition-colors duration-200',
      isValid ? 'text-emerald-500 dark:text-emerald-400' : 'text-muted-foreground/60',
    );
  }

  protected textClass(isValid: boolean): string {
    const sizeClasses = {
      sm: 'text-xs',
      md: 'text-sm',
      lg: 'text-base',
    };

    return cn(
      sizeClasses[this.size()],
      'transition-colors duration-200',
      isValid ? 'text-emerald-600 dark:text-emerald-400 font-medium' : 'text-muted-foreground/80',
    );
  }
}
