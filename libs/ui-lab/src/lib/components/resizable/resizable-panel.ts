import { computed, Directive, inject, input, signal } from '@angular/core';
import { cn } from '../../utils';
import { ResizableDirection } from './resizable.types';
import { ScResizablePanelGroup } from './resizable-panel-group';

@Directive({
  selector: '[sc-resizable-panel]',
  host: {
    'data-slot': 'resizable-panel',
    'data-panel': '',
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
  readonly minSize = input<number>(10);
  readonly maxSize = input<number>(90);

  readonly size = signal<number>(this.defaultSize());

  protected readonly class = computed(() =>
    cn('overflow-hidden', this.classInput()),
  );

  protected readonly minSizePx = computed(() => `${this.minSize()}%`);
  protected readonly maxSizePx = computed(() => `${this.maxSize()}%`);

  constructor() {
    // Initialize size from defaultSize
    this.size.set(this.defaultSize());
  }

  setSize(newSize: number): void {
    const clamped = Math.max(this.minSize(), Math.min(this.maxSize(), newSize));
    this.size.set(clamped);
  }
}
