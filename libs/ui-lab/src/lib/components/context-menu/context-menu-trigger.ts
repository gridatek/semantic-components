import {
  computed,
  contentChild,
  Directive,
  inject,
  input,
  TemplateRef,
} from '@angular/core';
import { cn } from '../../utils';
import { ScContextMenu } from './context-menu';
import { ScContextMenuContent } from './context-menu-content';

@Directive({
  selector: '[sc-context-menu-trigger]',
  host: {
    'data-slot': 'context-menu-trigger',
    '[class]': 'class()',
    '(contextmenu)': 'onContextMenu($event)',
  },
})
export class ScContextMenuTrigger {
  private readonly contextMenu = inject(ScContextMenu);
  private readonly contentChild = contentChild(ScContextMenuContent);

  readonly classInput = input<string>('', { alias: 'class' });

  protected readonly class = computed(() => cn('', this.classInput()));

  onContextMenu(event: MouseEvent): void {
    event.preventDefault();
    const content = this.contentChild();
    if (content?.templateRef) {
      this.contextMenu.openAt(
        event.clientX,
        event.clientY,
        content.templateRef,
      );
    }
  }
}
