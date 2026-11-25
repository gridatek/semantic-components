import {
  Component,
  ViewEncapsulation,
  computed,
  inject,
  input,
  signal,
} from '@angular/core';
import { cn } from 'cn';
import { SC_FIELD } from '../field';

/**
 * Your warning — "Caps Lock is on" — shown while Caps Lock is on and the
 * input of the `scField` it is in has the focus (it listens to that input's
 * keys, wherever it sits in the field). A polite live region, there all
 * along, so screen readers hear the warning as it appears.
 */
@Component({
  selector: '[scPasswordCapsLock]',
  template: `
    @if (on()) {
      <ng-content />
    }
  `,
  host: {
    'data-slot': 'password-caps-lock',
    role: 'status',
    '[attr.data-on]': 'on() || null',
    '[class]': 'class()',
    '(document:keydown)': 'read($event)',
    '(document:keyup)': 'read($event)',
    '(document:focusout)': 'leave($event)',
  },
  encapsulation: ViewEncapsulation.None,
})
export class ScPasswordCapsLock {
  private readonly field = inject(SC_FIELD, { optional: true });

  readonly classInput = input<string>('', { alias: 'class' });

  /** Caps Lock on, while the field's input has the focus. */
  private readonly on = signal(false);

  private readonly class = computed(() =>
    cn(
      'text-muted-foreground flex items-center gap-1.5 text-sm empty:absolute [&_svg]:size-4 [&_svg]:shrink-0',
      this.classInput(),
    ),
  );

  /** A key on the field's input: Caps Lock's state, as the key says it. */
  private read(event: KeyboardEvent): void {
    // Synthetic events (autofill) have no modifier state.
    if (
      this.isFieldInput(event.target) &&
      typeof event.getModifierState === 'function'
    )
      this.on.set(event.getModifierState('CapsLock'));
  }

  private leave(event: FocusEvent): void {
    if (this.isFieldInput(event.target)) this.on.set(false);
  }

  private isFieldInput(target: EventTarget | null): boolean {
    const id = this.field?.id();
    return !!id && (target as Element | null)?.id === id;
  }
}
