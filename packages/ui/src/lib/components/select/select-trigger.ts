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
import { cn } from 'cn';
import { injectStyle } from '../../config/style';
import { bindInput } from '../../utils';
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
  private readonly select = inject(SC_SELECT);
  private readonly combobox = inject(Combobox);
  private readonly elementRef = inject<ElementRef<HTMLElement>>(ElementRef);
  private readonly injector = inject(Injector);
  private readonly styles = injectStyle().select;
  private readonly field = inject(SC_FIELD, { optional: true });

  readonly classInput = input<string>('', { alias: 'class' });
  readonly idInput = input(inject(_IdGenerator).getId('sc-select-trigger-'), {
    alias: 'id',
  });
  readonly size = input<'default' | 'sm'>('default');

  private readonly id = computed(() => this.idInput());
  /** In a field, its description and errors. */
  private readonly describedBy = computed(
    () => this.field?.descriptionIds().join(' ') || null,
  );

  private readonly class = computed(() =>
    // As wide as the select (its root sets the width).
    cn(this.styles.trigger, 'w-full', this.classInput()),
  );

  constructor() {
    bindInput(this.combobox.disabled, this.select.disabled);
    bindInput(this.combobox.readonly, this.select.readonly);
  }

  /** Type-ahead while closed opens the list at the first match. */
  private onKeydown(event: Event): void {
    openOnTypeahead(
      event as KeyboardEvent,
      this.combobox,
      this.elementRef.nativeElement,
      this.injector,
    );
  }
}
