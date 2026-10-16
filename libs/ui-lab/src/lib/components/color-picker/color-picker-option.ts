import {
  DestroyRef,
  Directive,
  ElementRef,
  computed,
  inject,
  input,
} from '@angular/core';
import { cn, ɵwarnIfUnnamed } from '@semantic-components/ui';
import { sameRgba } from './color';
import { ScColorPicker } from './color-picker';
import { CHECKERBOARD } from './color-picker-slider';
import { ScColorPickerSwatches } from './color-picker-swatches';

/**
 * A preset colour (`[scColorPickerOption]="'#e11d48'"`, any CSS colour)
 * in `scColorPickerSwatches`: a radio, checked while it is the colour.
 * Name it ("Rose").
 */
@Directive({
  selector: 'button[scColorPickerOption]',
  host: {
    type: 'button',
    'data-slot': 'color-picker-option',
    role: 'radio',
    '[attr.aria-checked]': 'checked()',
    '[attr.tabindex]': 'reachable() ? 0 : -1',
    '[disabled]': 'picker.disabled()',
    '[style.background]': 'background()',
    '[class]': 'class()',
    '(click)': 'picker.setColor(color())',
    '(keydown)': 'onKeydown($event)',
  },
})
export class ScColorPickerOption {
  protected readonly picker = inject(ScColorPicker);
  private readonly group = inject(ScColorPickerSwatches);
  private readonly element =
    inject<ElementRef<HTMLButtonElement>>(ElementRef).nativeElement;

  /** Its colour (the group may ask before it is set: none, until then). */
  readonly color = input('', { alias: 'scColorPickerOption' });
  readonly classInput = input<string>('', { alias: 'class' });

  private readonly rgba = computed(() => this.picker.parse(this.color()));
  /** It is the colour (no colour: none is). */
  protected readonly checked = computed(
    () => !!this.picker.value() && sameRgba(this.rgba(), this.picker.rgba()),
  );

  protected readonly reachable = computed(
    () => this.group.ɵreachable() === this.element,
  );

  protected readonly background = computed(
    () => `linear-gradient(${this.color()}, ${this.color()}), ${CHECKERBOARD}`,
  );

  protected readonly class = computed(() =>
    cn(
      'size-6 shrink-0 cursor-pointer rounded-md border shadow-xs outline-none transition-shadow',
      'focus-visible:ring-3 focus-visible:ring-ring/50',
      'aria-checked:ring-2 aria-checked:ring-ring aria-checked:ring-offset-2 aria-checked:ring-offset-background',
      'disabled:pointer-events-none disabled:opacity-50',
      this.classInput(),
    ),
  );

  constructor() {
    ɵwarnIfUnnamed('scColorPickerOption');
    const self = { element: this.element, checked: this.checked };
    // In document order.
    this.group.ɵoptions.update((options) =>
      [...options, self].sort((a, b) =>
        a.element.compareDocumentPosition(b.element) &
        Node.DOCUMENT_POSITION_FOLLOWING
          ? -1
          : 1,
      ),
    );
    inject(DestroyRef).onDestroy(() =>
      this.group.ɵoptions.update((options) =>
        options.filter((option) => option !== self),
      ),
    );
  }

  protected onKeydown(event: KeyboardEvent): void {
    const options = this.group.ɵoptions().map((option) => option.element);
    const steps: Record<string, number> = {
      ArrowRight: 1,
      ArrowDown: 1,
      ArrowLeft: -1,
      ArrowUp: -1,
    };
    const step = steps[event.key];
    const at = options.indexOf(this.element);
    const next =
      event.key === 'Home'
        ? options[0]
        : event.key === 'End'
          ? options[options.length - 1]
          : step
            ? options[(at + step + options.length) % options.length]
            : null;
    if (!next) return;
    event.preventDefault();
    // A radio: moved to, chosen.
    next.focus();
    next.click();
  }
}
