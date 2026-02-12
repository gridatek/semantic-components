import { computed, Directive, inject, input, output } from '@angular/core';
import { cn } from '../../utils';
import { ScContextMenu } from './context-menu';

@Directive({
  selector: '[sc-context-menu-item]',
  host: {
    'data-slot': 'context-menu-item',
    role: 'menuitem',
    tabindex: '-1',
    '[class]': 'class()',
    '[attr.data-disabled]': 'disabled() || null',
    '(click)': 'onClick()',
    '(keydown.enter)': 'onClick()',
    '(keydown.space)': 'onClick()',
  },
})
export class ScContextMenuItem {
  private readonly contextMenu = inject(ScContextMenu);

  readonly classInput = input<string>('', { alias: 'class' });
  readonly disabled = input<boolean>(false);
  readonly closeOnSelect = input<boolean>(true);

  readonly select = output<void>();

  protected readonly class = computed(() =>
    cn(
      'relative flex cursor-default select-none items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-none',
      'focus:bg-accent focus:text-accent-foreground',
      'data-[disabled]:pointer-events-none data-[disabled]:opacity-50',
      '[&>svg]:size-4 [&>svg]:shrink-0',
      this.classInput(),
    ),
  );

  onClick(): void {
    if (this.disabled()) return;
    this.select.emit();
    if (this.closeOnSelect()) {
      this.contextMenu.closeMenu();
    }
  }
}
