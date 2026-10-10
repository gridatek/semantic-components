import { Combobox } from '@angular/aria/combobox';
import { Directive, ElementRef, computed, inject, input } from '@angular/core';
import { bindInput, cn } from '../../utils';
import { selectTriggerStyles } from '../select/select-trigger';
import { SC_MULTISELECT, SC_MULTISELECT_TRIGGER } from './multiselect-tokens';

@Directive({
  selector: '[scMultiselectTrigger]',
  hostDirectives: [Combobox],
  providers: [
    { provide: SC_MULTISELECT_TRIGGER, useExisting: ScMultiselectTrigger },
  ],
  host: {
    'data-slot': 'multiselect-trigger',
    '[attr.data-size]': 'size()',
    '[attr.data-placeholder]': '!multiselect.hasValue() || null',
    '[attr.aria-invalid]': 'multiselect.invalid() || null',
    '[attr.aria-required]': 'multiselect.required() || null',
    '[class]': 'class()',
    '(focusout)': 'multiselect.touch.emit()',
  },
})
export class ScMultiselectTrigger {
  protected readonly multiselect = inject(SC_MULTISELECT);
  readonly combobox = inject(Combobox);
  readonly elementRef = inject<ElementRef<HTMLElement>>(ElementRef);

  readonly classInput = input<string>('', { alias: 'class' });
  readonly size = input<'default' | 'sm'>('default');

  protected readonly class = computed(() =>
    cn(selectTriggerStyles, this.classInput()),
  );

  constructor() {
    bindInput(this.combobox.disabled, this.multiselect.disabled);
    bindInput(this.combobox.readonly, this.multiselect.readonly);
  }
}
