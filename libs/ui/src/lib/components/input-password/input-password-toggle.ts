import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
  computed,
  input,
  output,
} from '@angular/core';

import { cn } from '@semantic-components/utils';
import { SiEyeIcon, SiEyeOffIcon } from '@semantic-icons/lucide-icons';

@Component({
  selector: 'button[sc-input-password-toggle]',
  imports: [SiEyeOffIcon, SiEyeIcon],
  template: `
    @if (isVisible()) {
      <svg si-eye-off-icon size="16" strokeWidth="2" aria-hidden="true"></svg>
      <span class="sr-only">Hide password</span>
    } @else {
      <svg si-eye-icon size="16" strokeWidth="2" aria-hidden="true"></svg>
      <span class="sr-only">Show password</span>
    }
  `,
  host: {
    '[attr.aria-label]': 'ariaLabel()',
    '[attr.aria-pressed]': 'isVisible()',
    '[attr.aria-expanded]': 'isVisible()',
    '[attr.aria-controls]': 'controlsId()',
    '[tabindex]': 'disabled() ? -1 : 0',
    '[disabled]': 'disabled()',
    '(click)': 'toggleVisibility()',
    '(keydown.enter)': 'toggleVisibility()',
    '(keydown.space)': 'toggleVisibility(); $event.preventDefault()',
    type: 'button',
    role: 'switch',
    '[class]': 'class()',
  },
  styles: ``,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ScInputPasswordToggle {
  readonly isVisible = input<boolean>(false);
  readonly disabled = input<boolean>(false);
  readonly controlsId = input<string>('');
  readonly size = input<'sm' | 'md' | 'lg'>('md');

  readonly classInput = input<string>('', { alias: 'class' });

  readonly visibilityChange = output<boolean>();

  protected readonly ariaLabel = computed(() =>
    this.isVisible() ? 'Hide password' : 'Show password',
  );

  protected readonly class = computed(() => {
    const baseClasses =
      'absolute inset-y-0 end-0 flex items-center justify-center text-muted-foreground/80 outline-none transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50';

    const sizeClasses = {
      sm: 'h-full w-7 text-xs',
      md: 'h-full w-9 text-sm',
      lg: 'h-full w-11 text-base',
    };

    return cn(baseClasses, sizeClasses[this.size()], this.classInput());
  });

  protected toggleVisibility(): void {
    if (this.disabled()) return;
    this.visibilityChange.emit(!this.isVisible());
  }
}
