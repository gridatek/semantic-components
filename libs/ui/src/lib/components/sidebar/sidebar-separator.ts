import { Directive, computed, input } from '@angular/core';
import { cn } from '../../utils';

/** A line between groups. */
@Directive({
  selector: 'div[scSidebarSeparator]',
  host: {
    'data-slot': 'sidebar-separator',
    role: 'separator',
    '[class]': 'class()',
  },
})
export class ScSidebarSeparator {
  readonly classInput = input<string>('', { alias: 'class' });

  protected readonly class = computed(() =>
    cn('mx-2 h-px w-auto shrink-0 bg-sidebar-border', this.classInput()),
  );
}
