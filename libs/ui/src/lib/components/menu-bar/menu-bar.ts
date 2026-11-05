import { MenuBar } from '@angular/aria/menu';
import {
  Directive,
  ElementRef,
  afterNextRender,
  computed,
  inject,
  input,
  signal,
} from '@angular/core';
import { injectPreset } from '../../config/preset';
import { cn, elementDirection } from '../../utils';

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
  private readonly styles = injectPreset().menuBar;

  readonly classInput = input<string>('', { alias: 'class' });

  rendered = signal(false);

  protected readonly class = computed(() =>
    cn(this.styles.bar, this.classInput()),
  );

  constructor() {
    // Aria reads the document's direction; the bar's area may differ (a
    // right-to-left section): its arrows then follow the area.
    const host = inject<ElementRef<HTMLElement>>(ElementRef).nativeElement;
    afterNextRender(() =>
      this.menuBar.textDirection.set(elementDirection(host)),
    );
  }

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
