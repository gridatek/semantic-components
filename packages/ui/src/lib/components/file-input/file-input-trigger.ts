import { _IdGenerator } from '@angular/cdk/a11y';
import {
  DestroyRef,
  Directive,
  ElementRef,
  HostAttributeToken,
  computed,
  effect,
  inject,
  input,
} from '@angular/core';
import { cn } from 'cn';
import { injectStyle } from '../../config/style';
import { type ScButtonVariants } from '../button/button';
import { SC_FIELD } from '../field';
import { ScFileInput } from './file-input';

/**
 * Opens the file picker: the way in, by pointer and keyboard. In a field, the
 * first trigger takes the field's id — its label opens the picker — and is
 * named by the label and its own text ("Proof of address, Browse files").
 * The first trigger also names the hidden native picker (`aria-labelledby`):
 * a form control with no label is one to WAVE, hidden or not — as Zag's
 * file upload names its hidden input.
 */
@Directive({
  selector: 'button[scFileInputTrigger]',
  host: {
    'data-slot': 'file-input-trigger',
    type: 'button',
    '[attr.id]': 'id()',
    '[attr.aria-labelledby]': 'labelledBy()',
    '[attr.aria-describedby]': 'describedBy()',
    '[attr.aria-invalid]': 'root.showInvalid() || null',
    '[disabled]': 'root.disabled()',
    '[class]': 'class()',
    '(click)': 'root.open()',
  },
})
export class ScFileInputTrigger {
  private readonly buttonStyles = injectStyle().button;
  private readonly root = inject(ScFileInput);
  private readonly field = inject(SC_FIELD, { optional: true });
  private readonly ariaLabel = inject(new HostAttributeToken('aria-label'), {
    optional: true,
  });
  private readonly element =
    inject<ElementRef<HTMLButtonElement>>(ElementRef).nativeElement;

  readonly classInput = input<string>('', { alias: 'class' });
  readonly variant = input<ScButtonVariants['variant']>('outline');
  readonly size = input<ScButtonVariants['size']>('default');

  /** The field's trigger: the first one. */
  private readonly first = computed(
    () => !!this.field && this.root.ɵtrigger() === this.element,
  );
  private readonly ownId = inject(_IdGenerator).getId('sc-file-input-trigger-');
  /** In a field, the first one: the field's id (its label's `for`). */
  private readonly id = computed(() =>
    this.first() ? (this.field?.id() ?? this.ownId) : this.ownId,
  );
  private readonly labelledBy = computed(() => {
    if (!this.first()) return null;
    const id = this.id();
    return !this.ariaLabel ? `${id}-label ${id}` : null;
  });
  private readonly describedBy = computed(() =>
    this.first() ? this.field?.descriptionIds().join(' ') || null : null,
  );

  private readonly class = computed(() =>
    cn(
      this.buttonStyles({ variant: this.variant(), size: this.size() }),
      this.classInput(),
    ),
  );

  constructor() {
    if (!this.root.ɵtrigger()) this.root.ɵtrigger.set(this.element);
    // The first one names the picker.
    effect(() => {
      if (this.root.ɵtrigger() === this.element)
        this.root.ɵtriggerId.set(this.id());
    });
    inject(DestroyRef).onDestroy(() => {
      if (this.root.ɵtrigger() === this.element) {
        this.root.ɵtrigger.set(undefined);
        this.root.ɵtriggerId.set(null);
      }
    });
  }
}
