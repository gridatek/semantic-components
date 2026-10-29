import { _IdGenerator } from '@angular/cdk/a11y';
import {
  DestroyRef,
  Directive,
  ElementRef,
  computed,
  inject,
  input,
  signal,
} from '@angular/core';
import { cn } from '../../utils';
import {
  ScNavigationMenu,
  type ScNavigationMenuItemRef,
} from './navigation-menu';

/**
 * A top-level item: a link, or a trigger and its panel (`scNavigationMenuContent`,
 * written inside the item, after the trigger — the Tab order).
 */
@Directive({
  selector: 'li[scNavigationMenuItem]',
  host: {
    'data-slot': 'navigation-menu-item',
    '[class]': 'class()',
    '(mouseenter)': 'menu.hoverOpen(trigger() ? value() : null)',
  },
})
export class ScNavigationMenuItem implements ScNavigationMenuItemRef {
  protected readonly menu = inject(ScNavigationMenu);
  readonly element = inject<ElementRef<HTMLElement>>(ElementRef).nativeElement;

  readonly classInput = input<string>('', { alias: 'class' });
  /** Its name in the menu's `value`; one is made up if left out. */
  readonly valueInput = input<string | undefined>(undefined, {
    alias: 'value',
  });

  private readonly id = inject(_IdGenerator).getId('sc-navigation-menu-item-');
  readonly value = computed(() => this.valueInput() ?? this.id);
  /** Its panel's id, for its trigger's `aria-controls`. */
  readonly contentId = `${this.id}-content`;

  readonly open = computed(() => this.menu.value() === this.value());

  /** Where it is from the open item: its panel rests on that side. */
  readonly side = computed<'start' | 'end' | null>(() => {
    const open = this.menu.openIndex();
    if (open === -1) return null;
    const index = this.menu.items().indexOf(this);
    return index < open ? 'start' : index > open ? 'end' : null;
  });

  private readonly triggerElement = signal<HTMLElement | null>(null);
  private readonly contentElement = signal<HTMLElement | null>(null);
  readonly trigger = this.triggerElement.asReadonly();
  readonly content = this.contentElement.asReadonly();

  protected readonly class = computed(() => cn('relative', this.classInput()));

  constructor() {
    inject(DestroyRef).onDestroy(this.menu.register(this));
  }

  setTrigger(element: HTMLElement | null): void {
    this.triggerElement.set(element);
  }

  setContent(element: HTMLElement | null): void {
    this.contentElement.set(element);
  }
}
