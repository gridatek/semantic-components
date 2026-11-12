import {
  DestroyRef,
  Directive,
  ElementRef,
  computed,
  inject,
  input,
} from '@angular/core';
import { cn } from '../../utils';
import { ScNavigationMenu } from './navigation-menu';
import { ScNavigationMenuItem } from './navigation-menu-item';

/**
 * Opens its item's panel: on hover, or pressed (click, Enter, Space) — a
 * disclosure, `aria-expanded` and `aria-controls`. The preset's trigger. Your
 * text, then your chevron (`svg[scNavigationMenuTriggerIcon]`).
 */
@Directive({
  selector: 'button[scNavigationMenuTrigger]',
  host: {
    type: 'button',
    '[attr.aria-expanded]': 'item.open()',
    '[attr.aria-controls]': 'item.contentId',
    '[class]': 'class()',
    '(click)': 'menu.toggle(item.value())',
  },
})
export class ScNavigationMenuTrigger {
  protected readonly menu = inject(ScNavigationMenu);
  protected readonly item = inject(ScNavigationMenuItem);
  readonly classInput = input<string>('', { alias: 'class' });

  protected readonly class = computed(() =>
    cn(this.menu.styles.trigger, this.classInput()),
  );

  constructor() {
    this.item.setTrigger(inject(ElementRef).nativeElement);
    inject(DestroyRef).onDestroy(() => this.item.setTrigger(null));
  }
}
