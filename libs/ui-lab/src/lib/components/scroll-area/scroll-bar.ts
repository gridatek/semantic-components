import {
  ChangeDetectionStrategy,
  Component,
  computed,
  DestroyRef,
  ElementRef,
  inject,
  input,
  OnInit,
  signal,
  viewChild,
  ViewEncapsulation,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { fromEvent, merge } from 'rxjs';
import { cn } from '../../utils';
import { ScScrollArea } from './scroll-area';

export type ScrollBarOrientation = 'vertical' | 'horizontal';

@Component({
  selector: 'div[sc-scroll-bar]',
  host: {
    'data-slot': 'scroll-bar',
    '[class]': 'class()',
    '[attr.data-orientation]': 'orientation()',
    '[attr.data-state]': 'isVisible() ? "visible" : "hidden"',
    '(mousedown)': 'onTrackClick($event)',
  },
  template: `
    <div
      #thumb
      data-slot="scroll-thumb"
      [class]="thumbClass()"
      [style.transform]="thumbTransform()"
      [style.height]="orientation() === 'vertical' ? thumbSize() + '%' : null"
      [style.width]="orientation() === 'horizontal' ? thumbSize() + '%' : null"
      (mousedown)="onThumbMouseDown($event)"
    ></div>
  `,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ScScrollBar implements OnInit {
  private readonly scrollArea = inject(ScScrollArea);
  private readonly destroyRef = inject(DestroyRef);
  private readonly elementRef = inject(ElementRef<HTMLElement>);

  readonly classInput = input<string>('', { alias: 'class' });
  readonly orientation = input<ScrollBarOrientation>('vertical');

  readonly thumb = viewChild.required<ElementRef<HTMLDivElement>>('thumb');

  private readonly isDragging = signal(false);
  private dragStartPosition = 0;
  private dragStartScroll = 0;

  protected readonly isVisible = computed(() => {
    if (this.orientation() === 'vertical') {
      return this.scrollArea.scrollHeight() > this.scrollArea.clientHeight();
    }
    return this.scrollArea.scrollWidth() > this.scrollArea.clientWidth();
  });

  protected readonly thumbSize = computed(() => {
    if (this.orientation() === 'vertical') {
      const ratio =
        this.scrollArea.clientHeight() / this.scrollArea.scrollHeight();
      return Math.max(ratio * 100, 10);
    }
    const ratio = this.scrollArea.clientWidth() / this.scrollArea.scrollWidth();
    return Math.max(ratio * 100, 10);
  });

  protected readonly thumbPosition = computed(() => {
    if (this.orientation() === 'vertical') {
      const scrollableHeight =
        this.scrollArea.scrollHeight() - this.scrollArea.clientHeight();
      if (scrollableHeight <= 0) return 0;
      const trackHeight = 100 - this.thumbSize();
      return (this.scrollArea.scrollTop() / scrollableHeight) * trackHeight;
    }
    const scrollableWidth =
      this.scrollArea.scrollWidth() - this.scrollArea.clientWidth();
    if (scrollableWidth <= 0) return 0;
    const trackWidth = 100 - this.thumbSize();
    return (this.scrollArea.scrollLeft() / scrollableWidth) * trackWidth;
  });

  protected readonly thumbTransform = computed(() => {
    if (this.orientation() === 'vertical') {
      return `translateY(${this.thumbPosition()}cqh)`;
    }
    return `translateX(${this.thumbPosition()}cqw)`;
  });

  protected readonly class = computed(() => {
    const isVertical = this.orientation() === 'vertical';
    return cn(
      'flex touch-none select-none transition-colors container-size',
      isVertical && 'h-full w-2.5 border-l border-l-transparent p-px',
      !isVertical && 'h-2.5 flex-col border-t border-t-transparent p-px',
      this.classInput(),
    );
  });

  protected readonly thumbClass = computed(() =>
    cn('relative flex-1 rounded-full bg-border'),
  );

  ngOnInit(): void {
    const viewport = this.scrollArea.viewport().nativeElement;

    fromEvent(viewport, 'scroll')
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(() => {
        this.scrollArea.updateScrollState();
      });

    // Initial state
    setTimeout(() => this.scrollArea.updateScrollState(), 0);

    // Listen for resize
    if (typeof ResizeObserver !== 'undefined') {
      const resizeObserver = new ResizeObserver(() => {
        this.scrollArea.updateScrollState();
      });
      resizeObserver.observe(viewport);
      resizeObserver.observe(this.scrollArea.content().nativeElement);
      this.destroyRef.onDestroy(() => resizeObserver.disconnect());
    }

    // Global mouse events for dragging
    merge(
      fromEvent<MouseEvent>(document, 'mousemove'),
      fromEvent<MouseEvent>(document, 'mouseup'),
    )
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((event) => {
        if (event.type === 'mousemove' && this.isDragging()) {
          this.onMouseMove(event);
        } else if (event.type === 'mouseup') {
          this.isDragging.set(false);
        }
      });
  }

  protected onThumbMouseDown(event: MouseEvent): void {
    event.preventDefault();
    event.stopPropagation();
    this.isDragging.set(true);

    if (this.orientation() === 'vertical') {
      this.dragStartPosition = event.clientY;
      this.dragStartScroll = this.scrollArea.scrollTop();
    } else {
      this.dragStartPosition = event.clientX;
      this.dragStartScroll = this.scrollArea.scrollLeft();
    }
  }

  protected onTrackClick(event: MouseEvent): void {
    if (event.target === this.thumb().nativeElement) return;

    const track = this.elementRef.nativeElement;
    const rect = track.getBoundingClientRect();

    if (this.orientation() === 'vertical') {
      const clickPosition = (event.clientY - rect.top) / rect.height;
      const scrollableHeight =
        this.scrollArea.scrollHeight() - this.scrollArea.clientHeight();
      this.scrollArea.scrollTo(clickPosition * scrollableHeight);
    } else {
      const clickPosition = (event.clientX - rect.left) / rect.width;
      const scrollableWidth =
        this.scrollArea.scrollWidth() - this.scrollArea.clientWidth();
      this.scrollArea.scrollTo(
        this.scrollArea.scrollTop(),
        clickPosition * scrollableWidth,
      );
    }
  }

  private onMouseMove(event: MouseEvent): void {
    const track = this.elementRef.nativeElement;
    const rect = track.getBoundingClientRect();

    if (this.orientation() === 'vertical') {
      const delta = event.clientY - this.dragStartPosition;
      const scrollableHeight =
        this.scrollArea.scrollHeight() - this.scrollArea.clientHeight();
      const trackHeight = rect.height;
      const scrollDelta = (delta / trackHeight) * scrollableHeight;
      this.scrollArea.scrollTo(this.dragStartScroll + scrollDelta);
    } else {
      const delta = event.clientX - this.dragStartPosition;
      const scrollableWidth =
        this.scrollArea.scrollWidth() - this.scrollArea.clientWidth();
      const trackWidth = rect.width;
      const scrollDelta = (delta / trackWidth) * scrollableWidth;
      this.scrollArea.scrollTo(
        this.scrollArea.scrollTop(),
        this.dragStartScroll + scrollDelta,
      );
    }
  }
}
