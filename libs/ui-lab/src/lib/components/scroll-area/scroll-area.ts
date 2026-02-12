import {
  ChangeDetectionStrategy,
  Component,
  computed,
  contentChild,
  ElementRef,
  input,
  signal,
  viewChild,
  ViewEncapsulation,
} from '@angular/core';
import { cn } from '../../utils';
import { ScScrollBar } from './scroll-bar';

@Component({
  selector: 'div[sc-scroll-area]',
  host: {
    'data-slot': 'scroll-area',
    '[class]': 'class()',
  },
  template: `
    <div
      #viewport
      class="h-full w-full overflow-scroll scrollbar-none"
      [class]="viewportClass()"
    >
      <div #content class="min-w-full table">
        <ng-content />
      </div>
    </div>
    <ng-content select="[sc-scroll-bar]" />
  `,
  styles: `
    .scrollbar-none {
      scrollbar-width: none;
      -ms-overflow-style: none;
    }
    .scrollbar-none::-webkit-scrollbar {
      display: none;
    }
  `,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ScScrollArea {
  readonly classInput = input<string>('', { alias: 'class' });
  readonly viewportClassInput = input<string>('', { alias: 'viewportClass' });

  readonly viewport =
    viewChild.required<ElementRef<HTMLDivElement>>('viewport');
  readonly content = viewChild.required<ElementRef<HTMLDivElement>>('content');
  readonly verticalScrollbar = contentChild(ScScrollBar);

  readonly scrollTop = signal(0);
  readonly scrollLeft = signal(0);
  readonly scrollHeight = signal(0);
  readonly scrollWidth = signal(0);
  readonly clientHeight = signal(0);
  readonly clientWidth = signal(0);

  protected readonly class = computed(() =>
    cn('relative overflow-hidden', this.classInput()),
  );

  protected readonly viewportClass = computed(() =>
    cn('', this.viewportClassInput()),
  );

  updateScrollState(): void {
    const el = this.viewport().nativeElement;
    this.scrollTop.set(el.scrollTop);
    this.scrollLeft.set(el.scrollLeft);
    this.scrollHeight.set(el.scrollHeight);
    this.scrollWidth.set(el.scrollWidth);
    this.clientHeight.set(el.clientHeight);
    this.clientWidth.set(el.clientWidth);
  }

  scrollTo(top: number, left?: number): void {
    const el = this.viewport().nativeElement;
    el.scrollTop = top;
    if (left !== undefined) {
      el.scrollLeft = left;
    }
    this.updateScrollState();
  }
}
