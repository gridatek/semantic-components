import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  ElementRef,
  ViewEncapsulation,
  afterNextRender,
  computed,
  inject,
  input,
  output,
} from '@angular/core';
import { cn } from '@semantic-components/ui';

@Component({
  selector: '[scMasonryItem]',
  host: {
    '[class]': 'class()',
  },
  template: `
    <ng-content />
  `,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ScMasonryItem {
  private readonly elementRef = inject(ElementRef<HTMLElement>);
  private readonly destroyRef = inject(DestroyRef);
  private resizeObserver: ResizeObserver | null = null;

  readonly classInput = input<string>('', { alias: 'class' });
  protected readonly class = computed(() =>
    cn('block break-inside-avoid', this.classInput()),
  );

  readonly sizeChange = output<{ width: number; height: number }>();

  constructor() {
    afterNextRender(() => {
      this.observeSize();
    });
  }

  private observeSize(): void {
    if (typeof ResizeObserver === 'undefined') return;

    this.resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const { width, height } = entry.contentRect;
        this.sizeChange.emit({ width, height });
      }
    });

    this.resizeObserver.observe(this.elementRef.nativeElement);

    this.destroyRef.onDestroy(() => {
      this.resizeObserver?.disconnect();
    });
  }

  getElement(): HTMLElement {
    return this.elementRef.nativeElement;
  }

  getHeight(): number {
    return this.elementRef.nativeElement.offsetHeight;
  }
}
