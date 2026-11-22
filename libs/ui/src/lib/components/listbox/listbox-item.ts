import { Option } from '@angular/aria/listbox';
import {
  DestroyRef,
  Directive,
  ElementRef,
  afterNextRender,
  afterRenderEffect,
  computed,
  inject,
  input,
  signal,
} from '@angular/core';
import { cn } from 'cn';
import { injectStyle } from '../../config/style';
import { bindInput, useActiveOption } from '../../utils';
import { ScListboxBase } from './listbox-base';

/**
 * An option: `[value]`, `label` for typeahead when its content isn't plain
 * text, `disabled` (skipped by the arrows, typing and ranges). Its content is
 * yours; an indicator in it shows it chosen.
 */
@Directive({
  selector: '[scListboxItem]',
  hostDirectives: [{ directive: Option, inputs: ['value', 'disabled'] }],
  host: {
    'data-slot': 'listbox-item',
    '[attr.data-selected]': 'option.selected() || null',
    '[attr.data-disabled]': 'option.disabled() || null',
    '[class]': 'class()',
    '(pointermove)': 'onPointerMove()',
    '(pointerdown)': 'onPointerDown()',
  },
})
export class ScListboxItem<T = string> {
  private readonly styles = injectStyle().combobox;
  private readonly root = inject<ScListboxBase<T>>(ScListboxBase);
  readonly option = inject<Option<T>>(Option);
  private readonly onPointerMove = useActiveOption(this.option);
  readonly classInput = input<string>('', { alias: 'class' });
  /** What typing finds it by: its text, unless given. */
  readonly label = input<string | undefined>(undefined);

  private readonly element =
    inject<ElementRef<HTMLElement>>(ElementRef).nativeElement;
  /** Its text, as shown (icons and the indicator have none). */
  private readonly text = signal('');

  private readonly class = computed(() =>
    cn(
      this.styles.item,
      this.root.orientation() === 'horizontal' && 'w-auto',
      this.classInput(),
    ),
  );

  constructor() {
    bindInput(
      this.option.label,
      computed(() => this.label() ?? this.text()),
    );
    afterRenderEffect(() => {
      this.label();
      this.text.set(this.element.textContent?.trim() ?? '');
    });
    // Listed once its value is there (an input: not yet in the constructor).
    let unregister: (() => void) | undefined;
    afterNextRender(() => {
      unregister = this.root.ɵregister({
        value: () => this.option.value(),
        disabled: () => this.option.disabled(),
      });
    });
    inject(DestroyRef).onDestroy(() => unregister?.());
  }

  /** Pressed: chosen already? (`deselectable`, after Aria's click.) */
  private onPointerDown(): void {
    this.root.ɵpressedSelected = !!this.option.selected();
  }
}
