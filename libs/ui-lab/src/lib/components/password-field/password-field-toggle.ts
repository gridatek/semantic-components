import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
  computed,
  inject,
  input,
} from '@angular/core';
import { cn } from '@semantic-components/ui';
import { SiEyeIcon, SiEyeOffIcon } from '@semantic-icons/lucide-icons';
import { SC_PASSWORD_FIELD } from './password-field';

@Component({
  selector: 'button[scPasswordFieldToggle]',
  imports: [SiEyeIcon, SiEyeOffIcon],
  template: `
    <ng-content>
      @if (passwordField.visible()) {
        <svg siEyeOffIcon class="size-4"></svg>
      } @else {
        <svg siEyeIcon class="size-4"></svg>
      }
    </ng-content>
  `,
  host: {
    'data-slot': 'password-field-toggle',
    type: 'button',
    '[class]': 'class()',
    '[disabled]': 'passwordField.disabled()',
    '[attr.aria-label]':
      'passwordField.visible() ? "Hide password" : "Show password"',
    '[attr.aria-pressed]': 'passwordField.visible()',
    '(click)': 'onClick()',
  },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ScPasswordFieldToggle {
  readonly passwordField = inject(SC_PASSWORD_FIELD);
  readonly classInput = input<string>('', { alias: 'class' });

  protected readonly class = computed(() =>
    cn(
      'absolute right-0 top-0 h-full px-3 py-2',
      'text-muted-foreground hover:text-foreground',
      'focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring focus-visible:ring-offset-1',
      'disabled:pointer-events-none disabled:opacity-50',
      'transition-colors',
      this.classInput(),
    ),
  );

  onClick(): void {
    this.passwordField.toggle();
  }
}
