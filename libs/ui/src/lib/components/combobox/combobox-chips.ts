import {
  DestroyRef,
  Directive,
  ElementRef,
  computed,
  inject,
  input,
} from '@angular/core';
import { cn } from 'cn';
import { injectPreset } from '../../config/preset';
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
    '(mousedown)': 'onPress($event)',
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

  /**
   * A press on a chip or beside them, not on a control (a remove button, the
   * input): the input keeps its focus — the list stays open — and opens it, as
   * Base UI's chips do.
   */
  protected onPress(event: MouseEvent): void {
    const target = event.target as Element;
    const control = target.closest('button, a, input, select, textarea');
    if (control && this.element.contains(control)) return;
    event.preventDefault();
    if (this.root.disabled() || this.root.readonly()) return;
    this.root.focus();
    if (this.root.openOnInputClick()) this.root.show();
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
