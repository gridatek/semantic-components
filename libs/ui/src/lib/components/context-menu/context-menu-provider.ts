import {
  Component,
  ElementRef,
  ViewEncapsulation,
  computed,
  contentChild,
  inject,
  input,
} from '@angular/core';
import { cn } from '../../utils';
import { ScMenu } from '../menu';
import { ScContextMenuTrigger } from './context-menu-trigger';

@Component({
  selector: 'div[scContextMenuProvider]',
  template: `
    <ng-content />
  `,
  styles: `
    [data-slot='context-menu-provider'] > [data-slot='menu'] {
      visibility: hidden;
      position: fixed;
    }
  `,
  host: {
    'data-slot': 'context-menu-provider',
    '[class]': 'class()',
    '(contextmenu)': 'onContextMenu($event)',
    '(focusout)': 'onFocusOut($event)',
  },
  encapsulation: ViewEncapsulation.None,
})
export class ScContextMenuProvider {
  readonly classInput = input<string>('', { alias: 'class' });

  private readonly elementRef = inject(ElementRef<HTMLElement>);
  private readonly trigger = contentChild(ScContextMenuTrigger);
  private readonly scMenu = contentChild(ScMenu);

  protected readonly class = computed(() => cn('block', this.classInput()));

  onContextMenu(event: MouseEvent) {
    const triggerEl = this.trigger();
    if (!triggerEl) {
      return;
    }

    event.preventDefault();

    const menu = this.scMenu()?.menu;
    if (!menu) {
      return;
    }

    menu._pattern.closeAll();
    menu.element.style.visibility = 'visible';
    menu.element.style.top = `${event.clientY}px`;
    menu.element.style.left = `${event.clientX}px`;
    setTimeout(() => menu._pattern.first());
  }

  onFocusOut(event: FocusEvent) {
    const menu = this.scMenu()?.menu;
    if (!menu) {
      return;
    }

    const relatedTarget = event.relatedTarget as HTMLElement | null;
    if (!this.elementRef.nativeElement.contains(relatedTarget)) {
      menu.close();
      menu.element.style.visibility = 'hidden';
    }
  }
}
