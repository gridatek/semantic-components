import { Combobox } from '@angular/aria/combobox';
import {
  Directive,
  ElementRef,
  HostAttributeToken,
  computed,
  inject,
  input,
} from '@angular/core';
import { injectPreset } from '../../config/preset';
import { bindInput, cn } from '../../utils';
import { SC_COMBOBOX, SC_COMBOBOX_TRIGGER } from './combobox-tokens';

@Directive({
  selector: '[scComboboxTrigger]',
  hostDirectives: [Combobox],
  providers: [{ provide: SC_COMBOBOX_TRIGGER, useExisting: ScComboboxTrigger }],
  host: {
    'data-slot': 'combobox-trigger',
    '[attr.data-size]': 'size()',
    '[attr.data-placeholder]': '!root.hasValue() || null',
    '[attr.aria-invalid]': 'root.invalid() || null',
    '[attr.aria-required]': 'root.required() || null',
    '[class]': 'class()',
    '(focusout)': 'root.touch.emit()',
  },
})
export class ScComboboxTrigger {
  // The select's trigger, in the app's preset; as wide as its container.
  private readonly triggerStyles = injectPreset().select.trigger;
  protected readonly root = inject(SC_COMBOBOX);
  /** The trigger's static `aria-label`, reused to name the popup. */
  readonly label = inject(new HostAttributeToken('aria-label'), {
    optional: true,
  });
  readonly combobox = inject(Combobox);
  readonly elementRef = inject<ElementRef<HTMLElement>>(ElementRef);

  readonly classInput = input<string>('', { alias: 'class' });
  readonly size = input<'default' | 'sm'>('default');

  protected readonly class = computed(() =>
    cn(this.triggerStyles, 'w-full', this.classInput()),
  );

  constructor() {
    bindInput(this.combobox.disabled, this.root.disabled);
    bindInput(this.combobox.readonly, this.root.readonly);
  }
}
