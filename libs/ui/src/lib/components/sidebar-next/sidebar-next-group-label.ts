import { Directive, computed, input } from '@angular/core';
import { injectPreset } from '../../config/preset';
import { cn } from '../../utils';

/** A group's title (a `button`, to open and close a collapsible group). Fades out when collapsed to icons. */
@Directive({
  selector: 'div[scSidebarNextGroupLabel], button[scSidebarNextGroupLabel]',
  host: {
    'data-slot': 'sidebar-group-label',
    '[class]': 'class()',
  },
})
export class ScSidebarNextGroupLabel {
  private readonly styles = injectPreset().sidebar;
  readonly classInput = input<string>('', { alias: 'class' });

  protected readonly class = computed(() =>
    cn(this.styles.groupLabel, this.classInput()),
  );
}
