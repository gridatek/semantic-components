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
    } @else {
      <svg si-eye-icon size="16" strokeWidth="2" aria-hidden="true"></svg>
    }
  `,
  host: {
    '[attr.aria-label]': 'isVisible() ? "Hide password" : "Show password"',
    '[attr.aria-pressed]': 'isVisible()',
    '(click)': 'toggleVisibility()',
    type: 'button',
    '[class]': 'class()',
  },
  styles: ``,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ScInputPasswordToggle {
  readonly isVisible = input<boolean>(false);

  readonly classInput = input<string>('', {
    alias: 'class',
  });

  readonly visibilityChange = output<boolean>();

  protected readonly class = computed(() =>
    cn(
      'absolute inset-y-0 end-0 flex h-full w-9 items-center justify-center text-muted-foreground/80 outline-none transition hover:text-foreground',
      this.classInput(),
    ),
  );

  protected toggleVisibility() {
    this.visibilityChange.emit(!this.isVisible());
  }
}
