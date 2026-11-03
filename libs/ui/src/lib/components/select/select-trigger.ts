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
import { SC_SELECT, SC_SELECT_TRIGGER } from './select-tokens';
import { openOnTypeahead } from './select-typeahead';

/**
 * The select's button: a combobox showing the value. Named by the select's
 * label (`scSelectLabel`), or by `aria-label`.
 */
@Directive({
  selector: 'div[scSelectTrigger], button[scSelectTrigger]',
  hostDirectives: [Combobox],
  providers: [{ provide: SC_SELECT_TRIGGER, useExisting: ScSelectTrigger }],
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
  },
})
export class ScSelectTrigger {
  protected readonly select = inject(SC_SELECT);
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
    // As wide as the select (its root sets the width).
    cn(this.styles.trigger, 'w-full', this.classInput()),
  );

  constructor() {
    bindInput(this.combobox.disabled, this.select.disabled);
    bindInput(this.combobox.readonly, this.select.readonly);
  }

  /** Type-ahead while closed opens the list at the first match. */
  protected onKeydown(event: Event): void {
    openOnTypeahead(
      event as KeyboardEvent,
      this.combobox,
      this.elementRef.nativeElement,
      this.injector,
    );
  }
}
