import {
  DestroyRef,
  Directive,
  ElementRef,
  afterNextRender,
  booleanAttribute,
  computed,
  inject,
  input,
} from '@angular/core';
import { cn } from 'cn';
import { injectStyle } from '../../config/style';
import {
  ScSegmentedControl,
  type ScSegmentedControlItemRef,
} from './segmented-control';

/**
 * An item: a radio button — `value`, `disabled` (skipped by the arrows, not
 * focused, not checked). Its content is yours: text, or an icon with
 * `sr-only` text.
 */
@Directive({
  selector: 'button[scSegmentedControlItem]',
  host: {
    'data-slot': 'segmented-control-item',
    type: 'button',
    role: 'radio',
    '[attr.aria-checked]': 'checked()',
    '[attr.tabindex]': 'control.tabStop() === this ? 0 : -1',
    '[disabled]': 'isDisabled()',
    '[attr.data-checked]': 'checked() || null',
    '[attr.data-unchecked]': 'checked() ? null : ""',
    '[attr.data-disabled]': 'isDisabled() || null',
    '[attr.data-readonly]': 'control.readonly() || null',
    '[attr.data-required]': 'control.required() || null',
    '[class]': 'class()',
    '(click)': 'control.check(value())',
  },
})
export class ScSegmentedControlItem<
  T = string,
> implements ScSegmentedControlItemRef<T> {
  private readonly styles = injectStyle().segmentedControl;
  private readonly control = inject<ScSegmentedControl<T>>(ScSegmentedControl);
  readonly element = inject<ElementRef<HTMLElement>>(ElementRef).nativeElement;

  readonly classInput = input<string>('', { alias: 'class' });
  /** Its value: the control's, when checked. */
  readonly value = input.required<T>();
  readonly disabled = input(false, { transform: booleanAttribute });

  private readonly checked = computed(() =>
    Object.is(this.control.value(), this.value()),
  );
  readonly isDisabled = computed(
    () => this.disabled() || this.control.disabled(),
  );

  private readonly class = computed(() =>
    cn(this.styles.item, 'z-10', this.classInput()),
  );

  constructor() {
    // Listed once its value is there (an input: not yet in the constructor).
    let unregister: (() => void) | undefined;
    afterNextRender(() => (unregister = this.control.register(this)));
    inject(DestroyRef).onDestroy(() => unregister?.());
  }

  focus(): void {
    this.element.focus();
  }
}
