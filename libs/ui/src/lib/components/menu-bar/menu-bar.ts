import { MenuBar } from '@angular/aria/menu';
import { Directive, computed, inject, input, signal } from '@angular/core';
import { cn } from '../../utils';

@Directive({
  selector: '[scMenuBar]',
  hostDirectives: [MenuBar],
  host: {
    '[class]': 'class()',
    '(focusin)': 'onFocusIn()',
    '(keydown.escape)': 'onEscape($event)',
  },
})
export class ScMenuBar {
  private readonly menuBar = inject(MenuBar);

  readonly classInput = input<string>('', { alias: 'class' });

  rendered = signal(false);

  protected readonly class = computed(() =>
    cn(
      'flex h-8 items-center gap-0.5 rounded-lg border p-[3px]',
      this.classInput(),
    ),
  );

  onFocusIn() {
    this.rendered.set(true);
  }

  /**
   * Escape on a menubar item closes its open menu. `@angular/aria`'s menubar
   * has no Escape handling of its own; Escape inside a menu is handled by that
   * menu (it closes one level), so ignore it here.
   */
  protected onEscape(event: Event): void {
    if ((event.target as HTMLElement).closest('[role=menu]')) return;
    this.menuBar.close();
  }
}
