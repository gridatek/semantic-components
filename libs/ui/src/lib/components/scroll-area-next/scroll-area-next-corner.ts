import { Directive, computed, inject, input } from '@angular/core';
import { cn } from 'cn';
import { ScScrollAreaNext } from './scroll-area-next';

/**
 * The square where the two scrollbars meet: shown while both axes overflow.
 * As Base UI's ScrollArea.Corner.
 */
@Directive({
  selector: 'div[scScrollAreaNextCorner]',
  host: {
    '[attr.hidden]': 'area.bothOverflow() ? null : ""',
    '[class]': 'class()',
  },
})
export class ScScrollAreaNextCorner {
  protected readonly area = inject(ScScrollAreaNext);
  readonly classInput = input<string>('', { alias: 'class' });

  protected readonly class = computed(() =>
    cn(
      'absolute end-0 bottom-0 size-(--scroll-area-corner-size)',
      this.classInput(),
    ),
  );
}
