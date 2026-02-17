import { computed, Directive, input } from '@angular/core';
import { cn } from '../../utils';

@Directive({
  selector: 'div[scAvatarGroup]',
  host: {
    'data-slot': 'avatar-group',
    '[class]': 'class()',
  },
})
export class ScAvatarGroup {
  readonly classInput = input<string>('', { alias: 'class' });

  protected readonly class = computed(() =>
    cn(
      '*:data-[slot=avatar]:ring-background group/avatar-group flex -space-x-2 *:data-[slot=avatar]:ring-2',
      this.classInput(),
    ),
  );
}
