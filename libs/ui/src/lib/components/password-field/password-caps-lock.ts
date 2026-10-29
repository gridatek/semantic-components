import {
  Component,
  ViewEncapsulation,
  computed,
  inject,
  input,
} from '@angular/core';
import { cn } from '../../utils';
import { ScPasswordField } from './password-field';

/**
 * Your warning — "Caps Lock is on" — shown while Caps Lock is on and the
 * input has the focus. A polite live region, there all along, so screen
 * readers hear the warning as it appears.
 */
@Component({
  selector: '[scPasswordCapsLock]',
  template: `
    @if (password.capsLock()) {
      <ng-content />
    }
  `,
  host: {
    'data-slot': 'password-caps-lock',
    role: 'status',
    '[attr.data-on]': 'password.capsLock() || null',
    '[class]': 'class()',
  },
  encapsulation: ViewEncapsulation.None,
})
export class ScPasswordCapsLock {
  protected readonly password = inject(ScPasswordField);

  readonly classInput = input<string>('', { alias: 'class' });

  protected readonly class = computed(() =>
    cn(
      'text-muted-foreground flex items-center gap-1.5 text-sm empty:absolute [&_svg]:size-4 [&_svg]:shrink-0',
      this.classInput(),
    ),
  );
}
