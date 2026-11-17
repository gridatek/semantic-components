import { Directive, computed, inject, input } from '@angular/core';
import { cn } from 'cn';
import { ScScrollArea } from './scroll-area';

/**
 * The square where the two scrollbars meet: shown while both axes overflow.
 * As Base UI's ScrollArea.Corner.
 */
@Directive({
  selector: 'div[scScrollAreaCorner]',
  host: {
    '[attr.hidden]': 'area.bothOverflow() ? null : ""',
    '[class]': 'class()',
  },
})
export class ScScrollAreaCorner {
  private readonly area = inject(ScScrollArea);
  readonly classInput = input<string>('', { alias: 'class' });

  private readonly class = computed(() =>
    cn(
      'absolute end-0 bottom-0 size-(--sc-scroll-area-corner-size)',
      this.classInput(),
    ),
  );
}
