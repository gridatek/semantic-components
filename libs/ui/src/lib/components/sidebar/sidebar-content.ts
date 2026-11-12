import { Directive, booleanAttribute, computed, input } from '@angular/core';
import { cn } from 'cn';
import { injectPreset } from '../../config/preset';

/** The scrolling middle. On a `nav` with a name, only the menus are navigation — the header and footer stay outside it. */
@Directive({
  selector: 'div[scSidebarContent], nav[scSidebarContent]',
  host: {
    'data-slot': 'sidebar-content',
    '[class]': 'class()',
  },
})
export class ScSidebarContent {
  private readonly styles = injectPreset().sidebar;
  readonly classInput = input<string>('', { alias: 'class' });
  /** Hides its scrollbar (shadcn's look): nothing then shows that it scrolls. */
  readonly hideScrollbar = input(false, { transform: booleanAttribute });

  protected readonly class = computed(() =>
    cn(
      this.styles.content,
      this.hideScrollbar() ? 'no-scrollbar' : '[scrollbar-width:thin]',
      this.classInput(),
    ),
  );
}
