import {
  DestroyRef,
  Directive,
  ElementRef,
  HostAttributeToken,
  afterNextRender,
  computed,
  effect,
  inject,
  input,
} from '@angular/core';
import { injectPreset } from '../../config/preset';
import { cn } from '../../utils';
import { type ScButtonVariants } from '../button/button';
import { ScComboboxBase } from './combobox-base';

/**
 * Opens and closes the list: the preset's button. Beside the input, the
 * chevron at its end (ghost, icon-xs; not a tab stop — the input is). With no
 * input in the field, it is the field (outline, as wide as the combobox): it
 * shows the value and opens a popup with the search inside; in a `scField`,
 * named by the field's label and its value.
 */
@Directive({
  selector: 'button[scComboboxTrigger]',
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
export class ScComboboxTrigger {
  private readonly preset = injectPreset();
  protected readonly root = inject(ScComboboxBase);

  readonly classInput = input<string>('', { alias: 'class' });
  /** Ghost beside the input, outline as the field. */
  readonly variant = input<ScButtonVariants['variant']>();
  /** icon-xs beside the input, default as the field. */
  readonly size = input<ScButtonVariants['size']>();

  /** The input is the field: this is the chevron at its end. */
  protected readonly besideInput = computed(() => !!this.root.field());

  protected readonly class = computed(() =>
    cn(
      this.preset.button({
        variant: this.variant() ?? (this.besideInput() ? 'ghost' : 'outline'),
        size: this.size() ?? (this.besideInput() ? 'icon-xs' : 'default'),
      }),
      this.besideInput()
        ? this.preset.inputGroupButton({ size: 'icon-xs' })
        : // The field: as wide as the combobox, its value at the start.
          'w-full justify-between font-normal',
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
    const label = inject(new HostAttributeToken('aria-label'), {
      optional: true,
    });
    const labelledBy = inject(new HostAttributeToken('aria-labelledby'), {
      optional: true,
    });
    this.root.triggerLabel.set(label);

    // The field itself, in a scField, not named by you: a name made of the
    // field's label and the value it shows — the label alone would leave its
    // text out of its name.
    effect(() => {
      if (this.besideInput()) return;
      const description = this.root.descriptionIds();
      if (description) element.setAttribute('aria-describedby', description);
      else element.removeAttribute('aria-describedby');
      if (label || labelledBy) return;
      const name = [this.root.labelId(), this.root.valueId()]
        .filter(Boolean)
        .join(' ');
      if (this.root.labelId()) element.setAttribute('aria-labelledby', name);
    });

    // A click on that label focuses it without opening it (it is not the
    // label's `for`: a label's click would press the button).
    const destroyRef = inject(DestroyRef);
    afterNextRender(() => {
      const labelId = this.besideInput() ? null : this.root.labelId();
      const labelElement = labelId ? document.getElementById(labelId) : null;
      if (!labelElement) return;
      const focus = () => element.focus();
      labelElement.addEventListener('click', focus);
      destroyRef.onDestroy(() =>
        labelElement.removeEventListener('click', focus),
      );
    });
    destroyRef.onDestroy(() => this.root.triggerElement.set(undefined));
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
