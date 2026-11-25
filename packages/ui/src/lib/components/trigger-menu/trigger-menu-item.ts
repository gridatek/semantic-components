import {
  DestroyRef,
  Directive,
  ElementRef,
  afterRenderEffect,
  computed,
  inject,
  input,
} from '@angular/core';
import { cn } from 'cn';
import { injectStyle } from '../../config/style';
import { ScTriggerMenu } from './trigger-menu';
import type { ScTriggerItem } from './trigger-menu-types';

let nextId = 0;

/** A suggestion (an option): clicked, or Enter while highlighted, it becomes a token. */
@Directive({
  selector: 'div[scTriggerMenuItem]',
  host: {
    'data-slot': 'trigger-menu-item',
    role: 'option',
    '[attr.id]': 'id',
    '[attr.aria-selected]': 'active()',
    '[attr.aria-disabled]': 'item().disabled || null',
    '[attr.data-active]': 'active() || null',
    '[class]': 'class()',
    '(pointermove)': 'onPointerMove()',
    '(click)': 'menu.pick(item())',
  },
})
export class ScTriggerMenuItem {
  private readonly styles = injectStyle().combobox;
  private readonly menu = inject(ScTriggerMenu);
  private readonly element =
    inject<ElementRef<HTMLElement>>(ElementRef).nativeElement;

  readonly classInput = input<string>('', { alias: 'class' });
  /** The item it shows: one of the menu's `items()`. */
  readonly item = input.required<ScTriggerItem>();

  readonly id = `sc-trigger-menu-item-${nextId++}`;
  private readonly active = computed(() => this.menu.active() === this.item());

  private readonly class = computed(() =>
    cn(this.styles.item, 'pe-1.5', this.classInput()),
  );

  constructor() {
    this.menu.ɵitemParts.update((parts) => [...parts, this]);
    inject(DestroyRef).onDestroy(() =>
      this.menu.ɵitemParts.update((parts) => parts.filter((p) => p !== this)),
    );
    afterRenderEffect(() => {
      if (this.active()) this.element.scrollIntoView?.({ block: 'nearest' });
    });
  }

  private onPointerMove(): void {
    if (!this.item().disabled) this.menu.active.set(this.item());
  }
}
