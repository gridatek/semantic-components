import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
  model,
  ViewEncapsulation,
} from '@angular/core';
import type { FormCheckboxControl } from '@angular/forms/signals';
import { cn } from '../../utils';

@Component({
  selector: 'button[sc-switch]',
  host: {
    'data-slot': 'switch',
    type: 'button',
    role: 'switch',
    '[class]': 'class()',
    '[attr.aria-checked]': 'checked()',
    '[attr.data-state]': 'checked() ? "checked" : "unchecked"',
    '[disabled]': 'disabled()',
    '(click)': 'toggle()',
    '(keydown.space)': 'toggle(); $event.preventDefault()',
  },
  template: `
    <span data-slot="switch-thumb" [class]="thumbClass()"></span>
  `,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ScSwitch implements FormCheckboxControl {
  readonly classInput = input<string>('', { alias: 'class' });
  readonly checked = model<boolean>(false);
  readonly disabled = input<boolean>(false);

  protected readonly class = computed(() =>
    cn(
      'peer inline-flex h-6 w-11 shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:cursor-not-allowed disabled:opacity-50',
      this.checked() ? 'bg-primary' : 'bg-input',
      this.classInput(),
    ),
  );

  protected readonly thumbClass = computed(() =>
    cn(
      'pointer-events-none block size-5 rounded-full bg-background shadow-lg ring-0 transition-transform',
      this.checked() ? 'translate-x-5' : 'translate-x-0',
    ),
  );

  protected toggle(): void {
    if (!this.disabled()) {
      this.checked.update((v) => !v);
    }
  }
}
