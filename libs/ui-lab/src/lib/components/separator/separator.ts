import { computed, Directive, input } from '@angular/core';
import { cn } from '../../utils';

export type SeparatorOrientation = 'horizontal' | 'vertical';

@Directive({
  selector: 'div[sc-separator]',
  host: {
    'data-slot': 'separator',
    role: 'separator',
    '[attr.aria-orientation]': 'orientation()',
    '[attr.data-orientation]': 'orientation()',
    '[class]': 'class()',
  },
})
export class ScSeparator {
  readonly classInput = input<string>('', { alias: 'class' });
  readonly orientation = input<SeparatorOrientation>('horizontal');
  readonly decorative = input<boolean>(false);

  protected readonly class = computed(() => {
    const isHorizontal = this.orientation() === 'horizontal';
    return cn(
      'shrink-0 bg-border',
      isHorizontal ? 'h-px w-full' : 'h-full w-px',
      this.classInput(),
    );
  });
}
