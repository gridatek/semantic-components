import {
  DestroyRef,
  Directive,
  ElementRef,
  computed,
  inject,
  input,
} from '@angular/core';
import { injectPreset } from '../../config/preset';
import { cn } from '../../utils';
import { ScComboboxBase } from './combobox-base';

/**
 * The field of several values: a chip for each, then the input. The popup
 * hangs from it. One tab stop: from the input, the arrow towards the chips
 * reaches their remove buttons, the arrows move between them, Backspace or
 * Delete removes one.
 */
@Directive({
  selector: 'div[scComboboxChips]',
  host: {
    'data-slot': 'combobox-chips',
    '[class]': 'class()',
    '(click)': 'onClick($event)',
    '(keydown)': 'onKeydown($event)',
  },
})
export class ScComboboxChips {
  private readonly styles = injectPreset().combobox;
  private readonly root = inject(ScComboboxBase);
  private readonly element =
    inject<ElementRef<HTMLElement>>(ElementRef).nativeElement;

  readonly classInput = input<string>('', { alias: 'class' });

  protected readonly class = computed(() =>
    cn(this.styles.chips, this.classInput()),
  );

  constructor() {
    this.root.chipsElement.set(this.element);
    inject(DestroyRef).onDestroy(() => this.root.chipsElement.set(undefined));
  }

  /** A click beside the chips: into the input. */
  protected onClick(event: Event): void {
    if (event.target === this.element) this.root.focus();
  }

  /** On a chip's remove button: the arrows move, Backspace and Delete remove. */
  protected onKeydown(event: KeyboardEvent): void {
    const target = event.target as HTMLElement;
    if (target.dataset['slot'] !== 'combobox-chip-remove') return;
    const buttons = Array.from(
      this.element.querySelectorAll<HTMLElement>(
        '[data-slot=combobox-chip-remove]',
      ),
    );
    const index = buttons.indexOf(target);
    if (event.key === 'Backspace' || event.key === 'Delete') {
      event.preventDefault();
      target.click();
      return;
    }
    if (event.key !== 'ArrowLeft' && event.key !== 'ArrowRight') return;
    event.preventDefault();
    const rtl = getComputedStyle(this.element).direction === 'rtl';
    const step = (event.key === 'ArrowRight') === rtl ? -1 : 1;
    const next = buttons[index + step];
    if (next) next.focus();
    // Past the last chip: back in the input.
    else if (step === 1) this.root.focus();
  }
}
