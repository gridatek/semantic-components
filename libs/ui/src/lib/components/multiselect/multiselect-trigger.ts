import { Combobox } from '@angular/aria/combobox';
import {
  Directive,
  ElementRef,
  Injector,
  computed,
  inject,
  input,
} from '@angular/core';
import { bindInput, cn } from '../../utils';
import { selectTriggerStyles } from '../select/select-trigger';
import { openOnTypeahead } from '../select/select-typeahead';
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
    '(keydown)': 'onKeydown($event)',
  },
})
export class ScMultiselectTrigger {
  protected readonly multiselect = inject(SC_MULTISELECT);
  readonly combobox = inject(Combobox);
  readonly elementRef = inject<ElementRef<HTMLElement>>(ElementRef);
  private readonly injector = inject(Injector);

  readonly classInput = input<string>('', { alias: 'class' });
  readonly size = input<'default' | 'sm'>('default');

  protected readonly class = computed(() =>
    cn(selectTriggerStyles, this.classInput()),
  );

  constructor() {
    bindInput(this.combobox.disabled, this.multiselect.disabled);
    bindInput(this.combobox.readonly, this.multiselect.readonly);
  }

  /** Type-ahead while closed opens the list at the first match. */
  protected onKeydown(event: KeyboardEvent): void {
    openOnTypeahead(
      event,
      this.combobox,
      this.elementRef.nativeElement,
      this.injector,
    );
  }
}
