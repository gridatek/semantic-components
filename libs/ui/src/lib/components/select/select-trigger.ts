import { Combobox } from '@angular/aria/combobox';
import { Directive, ElementRef, computed, inject, input } from '@angular/core';
import { bindInput, cn } from '../../utils';
import { SC_SELECT, SC_SELECT_TRIGGER } from './select-tokens';

@Directive({
  selector: '[scSelectTrigger]',
  hostDirectives: [Combobox],
  providers: [{ provide: SC_SELECT_TRIGGER, useExisting: ScSelectTrigger }],
  host: {
    'data-slot': 'select-trigger',
    '[attr.data-size]': 'size()',
    '[attr.data-placeholder]': '!select.hasValue() || null',
    '[attr.aria-invalid]': 'select.invalid() || null',
    '[attr.aria-required]': 'select.required() || null',
    '[class]': 'class()',
    '(focusout)': 'select.touch.emit()',
  },
})
export class ScSelectTrigger {
  protected readonly select = inject(SC_SELECT);
  readonly combobox = inject(Combobox);
  readonly elementRef = inject<ElementRef<HTMLElement>>(ElementRef);

  readonly classInput = input<string>('', { alias: 'class' });
  readonly size = input<'default' | 'sm'>('default');

  protected readonly class = computed(() =>
    cn(
      'border-input data-placeholder:text-muted-foreground dark:bg-input/30 dark:hover:bg-input/50 focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive dark:aria-invalid:border-destructive/50 gap-1.5 rounded-lg border bg-transparent py-2 pe-2 ps-2.5 text-sm transition-colors select-none focus-visible:ring-3 aria-invalid:ring-3 data-[size=default]:h-8 data-[size=sm]:h-7 data-[size=sm]:rounded-[min(var(--radius-md),10px)] *:data-[slot=select-value]:flex *:data-[slot=select-value]:gap-1.5 [&_svg:not([class*=size-])]:size-4',
      'flex w-full items-center justify-between whitespace-nowrap outline-none aria-disabled:cursor-not-allowed aria-disabled:opacity-50 *:data-[slot=select-value]:line-clamp-1 *:data-[slot=select-value]:flex *:data-[slot=select-value]:items-center [&_svg]:pointer-events-none [&_svg]:shrink-0',
      this.classInput(),
    ),
  );

  constructor() {
    bindInput(this.combobox.disabled, this.select.disabled);
    bindInput(this.combobox.readonly, this.select.readonly);
  }
}
