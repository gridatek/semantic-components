import { Directive, computed, input } from '@angular/core';
import { cn } from 'cn';
import { injectPreset } from '../../config/preset';

/** A group's title (a `button`, to open and close a collapsible group). Fades out when collapsed to icons. */
@Directive({
  selector: 'div[scSidebarGroupLabel], button[scSidebarGroupLabel]',
  host: {
    'data-slot': 'sidebar-group-label',
    '[class]': 'class()',
  },
})
export class ScSidebarGroupLabel {
  private readonly styles = injectPreset().sidebar;
  readonly classInput = input<string>('', { alias: 'class' });

  protected readonly class = computed(() =>
    cn(this.styles.groupLabel, this.classInput()),
  );
}
