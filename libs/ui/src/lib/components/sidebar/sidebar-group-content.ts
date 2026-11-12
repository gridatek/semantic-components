import { Directive, computed, input } from '@angular/core';
import { cn } from 'cn';
import { injectPreset } from '../../config/preset';

/** A group's menu. */
@Directive({
  selector: 'div[scSidebarGroupContent]',
  host: {
    'data-slot': 'sidebar-group-content',
    '[class]': 'class()',
  },
})
export class ScSidebarGroupContent {
  private readonly styles = injectPreset().sidebar;
  readonly classInput = input<string>('', { alias: 'class' });

  protected readonly class = computed(() =>
    cn(this.styles.groupContent, this.classInput()),
  );
}
