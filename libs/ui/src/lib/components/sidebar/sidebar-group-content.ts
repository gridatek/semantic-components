import { Directive, computed, input } from '@angular/core';
import { cn } from '../../utils';

@Directive({
  selector: 'div[scSidebarGroupContent]',
  host: {
    '[class]': 'class()',
  },
})
export class ScSidebarGroupContent {
  readonly classInput = input<string>('', { alias: 'class' });

  protected readonly class = computed(() =>
    cn('w-full text-sm', this.classInput()),
  );
}
