import {
  DestroyRef,
  Directive,
  ElementRef,
  booleanAttribute,
  computed,
  inject,
  input,
} from '@angular/core';
import { injectPreset } from '../../config/preset';
import { cn } from '../../utils';
import type { ScToggleVariants } from '../toggle/toggle';
import { ScToggleGroup, type ScToggleGroupItemRef } from './toggle-group';

/**
 * A toggle in a toggle group: pressed when the group's value includes its
 * value. In the preset's toggle look, placed by the group's (joined when its
 * spacing is 0).
 */
@Directive({
  selector: 'button[scToggleGroupItem]',
  host: {
    type: 'button',
    'data-slot': 'toggle-group-item',
    '[attr.data-variant]': 'group.variant() || variant()',
    '[attr.data-size]': 'group.size() || size()',
    '[attr.data-spacing]': 'group.spacing()',
    '[attr.aria-pressed]': 'isPressed()',
    '[attr.data-state]': 'isPressed() ? "on" : "off"',
    '[attr.tabindex]': 'group.tabStop() === this ? 0 : -1',
    '[disabled]': 'isDisabled()',
    '[class]': 'class()',
    '(click)': 'onClick()',
  },
})
export class ScToggleGroupItem implements ScToggleGroupItemRef {
  private readonly toggleStyles = injectPreset().toggle;
  private readonly styles = injectPreset().toggleGroup;
  protected readonly group = inject(ScToggleGroup);
  readonly element =
    inject<ElementRef<HTMLButtonElement>>(ElementRef).nativeElement;

  readonly classInput = input<string>('', { alias: 'class' });
  /** This item's value: pressed when the group's value includes it. */
  // Not required: the group reads every item's value (its Tab stop) while
  // later items are still being set up.
  readonly value = input<unknown>(undefined);
  readonly disabledInput = input(false, {
    alias: 'disabled',
    transform: booleanAttribute,
  });
  readonly variant = input<ScToggleVariants['variant']>('default');
  readonly size = input<ScToggleVariants['size']>('default');

  protected readonly isPressed = computed(() => this.group.has(this.value()));

  readonly isDisabled = computed(
    () => this.disabledInput() || this.group.disabled(),
  );

  protected readonly class = computed(() =>
    cn(
      this.styles.item,
      this.toggleStyles({
        variant: this.group.variant() || this.variant(),
        size: this.group.size() || this.size(),
      }),
      this.classInput(),
    ),
  );

  constructor() {
    this.group.register(this);
    inject(DestroyRef).onDestroy(() => this.group.unregister(this));
  }

  focus(): void {
    this.element.focus();
  }

  protected onClick(): void {
    if (!this.isDisabled()) this.group.toggle(this.value());
  }
}
