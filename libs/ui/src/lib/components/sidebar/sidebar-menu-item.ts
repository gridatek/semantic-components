import { Directive, computed, input } from '@angular/core';
import { cn } from '../../utils';

@Directive({
  selector: 'li[scSidebarMenuItem]',
  host: {
    '[class]': 'class()',
  },
})
export class ScSidebarMenuItem {
  readonly classInput = input<string>('', { alias: 'class' });

  protected readonly class = computed(() =>
    cn('group/menu-item relative', this.classInput()),
  );
}
