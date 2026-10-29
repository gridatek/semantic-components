import { Directive, computed, input } from '@angular/core';
import { cn } from '../../utils';

/** A group's menu. */
@Directive({
  selector: 'div[scSidebarNextGroupContent]',
  host: {
    'data-slot': 'sidebar-group-content',
    '[class]': 'class()',
  },
})
export class ScSidebarNextGroupContent {
  readonly classInput = input<string>('', { alias: 'class' });

  protected readonly class = computed(() =>
    cn('w-full text-sm', this.classInput()),
  );
}
