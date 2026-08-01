import {
  Directive,
  computed,
  inject,
  input,
  linkedSignal,
} from '@angular/core';
import { cn } from '../../utils';
import { ScResizablePanelGroup } from './resizable-panel-group';

@Directive({
  selector: '[scResizablePanel]',
  host: {
    '[class]': 'class()',
    '[style.flex-grow]': 'size()',
    '[style.flex-shrink]': '1',
    '[style.flex-basis]': '"0%"',
    '[style.min-width]':
      'group.direction() === "horizontal" ? minSizePx() : undefined',
    '[style.min-height]':
      'group.direction() === "vertical" ? minSizePx() : undefined',
    '[style.max-width]':
      'group.direction() === "horizontal" ? maxSizePx() : undefined',
    '[style.max-height]':
      'group.direction() === "vertical" ? maxSizePx() : undefined',
  },
})
export class ScResizablePanel {
  readonly group = inject(ScResizablePanelGroup);

  readonly classInput = input<string>('', { alias: 'class' });
  readonly defaultSize = input<number>(50);
  readonly minSize = input<number>(0);
  readonly maxSize = input<number>(100);

  /**
   * Clamping lives in the `set` interceptor rather than in `setSize`, so a
   * direct `size.set(...)` from a consumer honours minSize/maxSize too.
   */
  readonly size = linkedSignal<number, number>({
    source: () => this.defaultSize(),
    computation: (defaultSize) => defaultSize,
    set: (value, rawSet) =>
      rawSet(Math.max(this.minSize(), Math.min(this.maxSize(), value))),
  });

  protected readonly class = computed(() =>
    cn('overflow-hidden', this.classInput()),
  );

  protected readonly minSizePx = computed(() => `${this.minSize()}%`);
  protected readonly maxSizePx = computed(() => `${this.maxSize()}%`);

  setSize(newSize: number): void {
    this.size.set(newSize);
  }
}
