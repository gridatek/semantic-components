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
import { ɵregisterFieldControl } from '../field';
import { SC_SELECT, SC_SELECT_TRIGGER } from './select-tokens';
import { openOnTypeahead } from './select-typeahead';

/**
 * The select's button — a native one, which the field's label (`scLabel`)
 * ties to by `for` — a combobox showing the value. Named by that label, or
 * by `aria-label`. In a field, the field's id.
 */
@Directive({
  selector: 'button[scSelectTrigger]',
  hostDirectives: [Combobox],
  providers: [{ provide: SC_SELECT_TRIGGER, useExisting: ScSelectTrigger }],
  host: {
    // Read by the control group and the input group (its focus ring).
    'data-slot': 'select-trigger',
    type: 'button',
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
  private readonly field = ɵregisterFieldControl({
    labelFor: () => this.field?.id() ?? null,
  });

  readonly classInput = input<string>('', { alias: 'class' });
  readonly idInput = input(inject(_IdGenerator).getId('sc-select-trigger-'), {
    alias: 'id',
  });
  readonly size = input<'default' | 'sm'>('default');

  /** In a field, the field's: its label's `for`. */
  private readonly id = computed(() => this.field?.id() ?? this.idInput());
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
