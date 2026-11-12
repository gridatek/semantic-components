import { Directive, computed, input } from '@angular/core';
import { cn } from 'cn';
import { injectPreset } from '../../config/preset';

/** A button at a group's end (add…): your icon and its name (`sr-only`). */
@Directive({
  selector: 'button[scSidebarGroupAction]',
  host: {
    'data-slot': 'sidebar-group-action',
    type: 'button',
    '[class]': 'class()',
  },
})
export class ScSidebarGroupAction {
  private readonly styles = injectPreset().sidebar;
  readonly classInput = input<string>('', { alias: 'class' });

  protected readonly class = computed(() =>
    cn(this.styles.groupAction, this.classInput()),
  );
}
