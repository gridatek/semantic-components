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

@Component({
  selector: 'button[sc-password-field-toggle]',
  template: `
    <ng-content>
      @if (passwordField.visible()) {
        <!-- Eye off icon -->
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
          class="size-4"
        >
          <path d="M9.88 9.88a3 3 0 1 0 4.24 4.24" />
          <path
            d="M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68"
          />
          <path
            d="M6.61 6.61A13.526 13.526 0 0 0 2 12s3 7 10 7a9.74 9.74 0 0 0 5.39-1.61"
          />
          <line x1="2" x2="22" y1="2" y2="22" />
        </svg>
      } @else {
        <!-- Eye icon -->
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
          class="size-4"
        >
          <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" />
          <circle cx="12" cy="12" r="3" />
        </svg>
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
