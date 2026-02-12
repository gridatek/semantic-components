import { Directive, computed, input } from '@angular/core';
import { cn } from '../../utils';

@Directive({
  selector: 'div[sc-sidebar-group-content]',
  host: {
    'data-slot': 'sidebar-group-content',
    '[class]': 'class()',
  },
})
export class ScSidebarGroupContent {
  readonly classInput = input<string>('', { alias: 'class' });

  protected readonly class = computed(() =>
    cn('w-full text-sm', this.classInput()),
  );
}
