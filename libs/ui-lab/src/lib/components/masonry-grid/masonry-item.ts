import {
  afterNextRender,
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  ElementRef,
  inject,
  input,
  output,
  ViewEncapsulation,
} from '@angular/core';

@Component({
  selector: 'sc-masonry-item',
  template: `
    <ng-content />
  `,
  styles: `
    :host {
      display: block;
      break-inside: avoid;
    }
  `,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ScMasonryItem {
  private readonly elementRef = inject(ElementRef<HTMLElement>);
  private readonly destroyRef = inject(DestroyRef);
  private resizeObserver: ResizeObserver | null = null;

  readonly class = input<string>('');

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
