import { Combobox } from '@angular/aria/combobox';
import { _IdGenerator } from '@angular/cdk/a11y';
import {
  Directive,
  ElementRef,
  Injector,
  computed,
  inject,
  input,
} from '@angular/core';
import { injectPreset } from '../../config/preset';
import { bindInput, cn } from '../../utils';
import { SC_FIELD } from '../field';
import { openOnTypeahead } from '../select/select-typeahead';
import { SC_SELECT_NEXT, SC_SELECT_NEXT_TRIGGER } from './select-next-tokens';

/**
 * The select's button: a combobox showing the value. Named by the select's
 * label (`scSelectNextLabel`), or by `aria-label`.
 */
@Directive({
  selector: 'div[scSelectNextTrigger], button[scSelectNextTrigger]',
  hostDirectives: [Combobox],
  providers: [
    { provide: SC_SELECT_NEXT_TRIGGER, useExisting: ScSelectNextTrigger },
  ],
  host: {
    // Read by the control group and the input group (its focus ring).
    'data-slot': 'select-trigger',
    '[id]': 'id()',
    '[attr.aria-labelledby]': 'select.labelId()',
    '[attr.aria-describedby]': 'describedBy()',
    '[attr.data-size]': 'size()',
    '[attr.data-placeholder]': '!select.hasValue() || null',
    '[attr.aria-invalid]': 'select.invalid() || null',
    '[attr.aria-required]': 'select.required() || null',
    '[class]': 'class()',
    '(focusout)': 'select.touch.emit()',
    '(keydown)': 'onKeydown($event)',
    '(pointerdown)': 'onPointerDown($event)',
  },
})
export class ScSelectNextTrigger {
  protected readonly select = inject(SC_SELECT_NEXT);
  readonly combobox = inject(Combobox);
  readonly elementRef = inject<ElementRef<HTMLElement>>(ElementRef);
  private readonly injector = inject(Injector);
  private readonly styles = injectPreset().select;
  private readonly field = inject(SC_FIELD, { optional: true });

  readonly classInput = input<string>('', { alias: 'class' });
  readonly idInput = input(inject(_IdGenerator).getId('sc-select-trigger-'), {
    alias: 'id',
  });
  readonly size = input<'default' | 'sm'>('default');

  readonly id = computed(() => this.idInput());
  /** In a field, its description and errors. */
  protected readonly describedBy = computed(
    () => this.field?.descriptionIds().join(' ') || null,
  );

  protected readonly class = computed(() =>
    cn(this.styles.trigger, this.classInput()),
  );

  constructor() {
    bindInput(this.combobox.disabled, this.select.disabled);
    bindInput(this.combobox.readonly, this.select.readonly);
  }

  /** Opened by touch: below the trigger, never over it (Base UI). */
  protected onPointerDown(event: Event): void {
    this.select.openedByTouch.set(
      (event as PointerEvent).pointerType === 'touch',
    );
  }

  /** Type-ahead while closed opens the list at the first match. */
  protected onKeydown(event: Event): void {
    // Opened by the keyboard: over the trigger, as with a mouse.
    this.select.openedByTouch.set(false);
    openOnTypeahead(
      event as KeyboardEvent,
      this.combobox,
      this.elementRef.nativeElement,
      this.injector,
    );
  }
}
