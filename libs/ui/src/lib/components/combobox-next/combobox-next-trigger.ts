import {
  DestroyRef,
  Directive,
  ElementRef,
  HostAttributeToken,
  computed,
  inject,
  input,
} from '@angular/core';
import { injectPreset } from '../../config/preset';
import { cn } from '../../utils';
import { type ScButtonVariants } from '../button/button';
import { ScComboboxNextBase } from './combobox-next-base';

/**
 * Opens and closes the list: the preset's button. Beside the input, the
 * chevron at its end (ghost, icon-xs; not a tab stop — the input is). With no
 * input in the field, it is the field (`variant="outline"`): it shows the
 * value and opens a popup with the search inside.
 */
@Directive({
  selector: 'button[scComboboxNextTrigger]',
  host: {
    'data-slot': 'combobox-trigger',
    type: 'button',
    '[attr.tabindex]': 'besideInput() ? -1 : null',
    '[attr.aria-haspopup]': 'besideInput() ? null : "dialog"',
    '[attr.aria-expanded]': 'besideInput() ? null : root.open()',
    '[attr.aria-invalid]': '(!besideInput() && root.showInvalid()) || null',
    '[attr.data-placeholder]': 'root.hasValue() ? null : ""',
    '[disabled]': 'root.disabled()',
    '[class]': 'class()',
    '(mousedown)': 'besideInput() && $event.preventDefault()',
    '(click)': 'root.toggle()',
    '(keydown.arrowdown)': 'onArrowDown($event)',
    '(focusout)': 'onFocusout()',
  },
})
export class ScComboboxNextTrigger {
  private readonly preset = injectPreset();
  protected readonly root = inject(ScComboboxNextBase);

  readonly classInput = input<string>('', { alias: 'class' });
  readonly variant = input<ScButtonVariants['variant']>('ghost');
  readonly size = input<ScButtonVariants['size']>('icon-xs');

  /** The input is the field: this is the chevron at its end. */
  protected readonly besideInput = computed(() => !!this.root.field());

  protected readonly class = computed(() =>
    cn(
      this.preset.button({ variant: this.variant(), size: this.size() }),
      this.besideInput() && this.preset.inputGroupButton({ size: 'icon-xs' }),
      this.preset.combobox.trigger,
      this.preset.combobox.triggerIcon,
      // A clear button showing takes its place.
      this.besideInput() && this.root.clearVisible() && 'hidden',
      this.classInput(),
    ),
  );

  constructor() {
    const element = inject<ElementRef<HTMLElement>>(ElementRef).nativeElement;
    this.root.triggerElement.set(element);
    this.root.triggerLabel.set(
      inject(new HostAttributeToken('aria-label'), { optional: true }),
    );
    inject(DestroyRef).onDestroy(() => this.root.triggerElement.set(undefined));
  }

  protected onArrowDown(event: Event): void {
    if (this.besideInput() || this.root.open()) return;
    event.preventDefault();
    this.root.show();
  }

  /** The field itself: touched when left, unless for its popup. */
  protected onFocusout(): void {
    if (!this.besideInput() && !this.root.open()) this.root.touch.emit();
  }
}
