import { CommonModule } from '@angular/common';
import {
  AfterViewInit,
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  input,
  linkedSignal,
  viewChild,
} from '@angular/core';

@Component({
  selector: 'sc-flexible-scroll-area',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div
      class="relative"
      [ngClass]="{
        'w-full max-w-4xl': orientation() === 'horizontal',
        'h-34 w-96 max-w-[calc(100vw-8rem)]': orientation() === 'vertical',
      }"
    >
      <!-- Main scroll container -->
      <div
        class="overscroll-contain rounded-md outline -outline-offset-1 outline-gray-200 focus-visible:outline  focus-visible:outline-blue-800 scrollbar-hide"
        #viewport
        [ngClass]="{
          'overflow-x-scroll overflow-y-hidden h-64': orientation() === 'horizontal',
          'overflow-y-scroll overflow-x-hidden h-full': orientation() === 'vertical',
        }"
        (scroll)="onScroll()"
        (mouseenter)="isHovering = true"
        (mouseleave)="isHovering = false"
      >
        <!-- Content container with proper layout based on orientation -->
        <div
          [ngClass]="{
            'flex flex-row gap-4 p-4 min-w-max': orientation() === 'horizontal',
            'flex flex-col gap-4 py-3 pr-6 pl-4 text-sm leading-5.5 text-gray-900':
              orientation() === 'vertical',
          }"
        >
          <!-- Projected content from parent component -->
          <ng-content></ng-content>
        </div>
      </div>

      <!-- Custom scrollbar for vertical orientation -->
      @if (orientation() === 'vertical') {
        <div
          class="absolute top-0 right-1 w-1 h-[calc(100%-0.5rem)] my-1 rounded-full bg-gray-200 opacity-0 transition-opacity delay-300"
          [ngClass]="{ 'opacity-100 delay-0 duration-75': isScrolling || isHovering }"
        >
          <div
            class="absolute w-full rounded-full bg-gray-500 cursor-pointer"
            #verticalThumb
            [style.height.%]="thumbSize"
            [style.top.%]="thumbPosition"
            (mousedown)="startDragging($event)"
          ></div>
        </div>
      }

      <!-- Custom scrollbar for horizontal orientation -->
      @if (orientation() === 'horizontal') {
        <div
          class="absolute bottom-0 left-0 right-4 h-1 mx-2 rounded-full bg-gray-200 opacity-0 transition-opacity delay-300"
          [ngClass]="{ 'opacity-100 delay-0 duration-75': isScrolling || isHovering }"
        >
          <div
            class="absolute h-full rounded-full bg-gray-500 cursor-pointer"
            #horizontalThumb
            [style.width.%]="thumbSize"
            [style.left.%]="thumbPosition"
            (mousedown)="startDragging($event)"
          ></div>
        </div>
      }

      <!-- Navigation buttons for horizontal scrolling -->
      @if (orientation() === 'horizontal' && showNavButtons()) {
        <button
          class="absolute top-1/2 left-2 -translate-y-1/2 bg-white/80 hover:bg-white rounded-full shadow-md p-2 opacity-0 transition-opacity duration-200"
          [ngClass]="{ 'opacity-100': isHovering && canScrollStart }"
          [disabled]="!canScrollStart"
          (click)="scrollPrev()"
          aria-label="Scroll left"
        >
          <svg
            class="h-5 w-5 text-gray-700"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M15 19l-7-7 7-7"
            />
          </svg>
        </button>
        <button
          class="absolute top-1/2 right-2 -translate-y-1/2 bg-white/80 hover:bg-white rounded-full shadow-md p-2 opacity-0 transition-opacity duration-200"
          [ngClass]="{ 'opacity-100': isHovering && canScrollEnd }"
          [disabled]="!canScrollEnd"
          (click)="scrollNext()"
          aria-label="Scroll right"
        >
          <svg
            class="h-5 w-5 text-gray-700"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M9 5l7 7-7 7"
            />
          </svg>
        </button>
      }

      <!-- Navigation buttons for vertical scrolling -->
      @if (orientation() === 'vertical' && showNavButtons()) {
        <button
          class="absolute top-2 left-1/2 -translate-x-1/2 bg-white/80 hover:bg-white rounded-full shadow-md p-2 opacity-0 transition-opacity duration-200"
          [ngClass]="{ 'opacity-100': isHovering && canScrollStart }"
          [disabled]="!canScrollStart"
          (click)="scrollPrev()"
          aria-label="Scroll up"
        >
          <svg
            class="h-5 w-5 text-gray-700"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M5 15l7-7 7 7"
            />
          </svg>
        </button>
        <button
          class="absolute bottom-2 left-1/2 -translate-x-1/2 bg-white/80 hover:bg-white rounded-full shadow-md p-2 opacity-0 transition-opacity duration-200"
          [ngClass]="{ 'opacity-100': isHovering && canScrollEnd }"
          [disabled]="!canScrollEnd"
          (click)="scrollNext()"
          aria-label="Scroll down"
        >
          <svg
            class="h-5 w-5 text-gray-700"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </button>
      }
    </div>
  `,
  styles: [
    `
      /* Hide default scrollbar for Chrome, Safari and Opera */
      .scrollbar-hide::-webkit-scrollbar {
        display: none;
      }

      /* Hide default scrollbar for IE, Edge and Firefox */
      .scrollbar-hide {
        -ms-overflow-style: none; /* IE and Edge */
        scrollbar-width: none; /* Firefox */
      }
    `,
  ],
})
export class FlexibleScrollAreaComponent implements OnInit, OnDestroy, AfterViewInit {
  readonly orientationInput = input<'vertical' | 'horizontal'>('vertical', {
    alias: 'orientation',
  });

  readonly orientation = linkedSignal<'vertical' | 'horizontal'>(() => this.orientationInput());

  readonly height = input('8.5rem');
  readonly width = input('96');
  readonly showNavButtons = input(true);

  readonly viewportRef = viewChild.required<ElementRef<HTMLDivElement>>('viewport');

  isScrolling = false;
  isHovering = false;
  isDragging = false;
  scrollTimeout: any;
  thumbSize = 20;
  thumbPosition = 0;
  startPoint = 0;
  startScrollPosition = 0;
  canScrollStart = false;
  canScrollEnd = true;

  constructor() {
    // Add document-level event listeners for drag operations
    document.addEventListener('mousemove', this.onMouseMove.bind(this));
    document.addEventListener('mouseup', this.onMouseUp.bind(this));
  }

  ngOnInit() {
    // Initial check to make sure we have a valid orientation
    const orientation = this.orientation();
    if (orientation !== 'vertical' && orientation !== 'horizontal') {
      this.orientation.set('vertical');
    }
  }

  ngOnDestroy() {
    // Clean up event listeners
    document.removeEventListener('mousemove', this.onMouseMove.bind(this));
    document.removeEventListener('mouseup', this.onMouseUp.bind(this));
  }

  ngAfterViewInit() {
    this.updateThumb();
    this.updateScrollButtonsState();
  }

  onScroll() {
    this.updateThumb();
    this.updateScrollButtonsState();
    this.isScrolling = true;

    clearTimeout(this.scrollTimeout);
    this.scrollTimeout = setTimeout(() => {
      this.isScrolling = false;
    }, 300);
  }

  updateThumb() {
    const viewport = this.viewportRef().nativeElement;

    if (this.orientation() === 'vertical') {
      const scrollHeight = viewport.scrollHeight;
      const clientHeight = viewport.clientHeight;

      // Calculate thumb height as percentage of visible area
      this.thumbSize = (clientHeight / scrollHeight) * 100;

      // Calculate thumb position
      this.thumbPosition =
        (viewport.scrollTop / (scrollHeight - clientHeight)) * (100 - this.thumbSize);
    } else {
      const scrollWidth = viewport.scrollWidth;
      const clientWidth = viewport.clientWidth;

      // Calculate thumb width as percentage of visible area
      this.thumbSize = (clientWidth / scrollWidth) * 100;

      // Calculate thumb position
      this.thumbPosition =
        (viewport.scrollLeft / (scrollWidth - clientWidth)) * (100 - this.thumbSize);
    }
  }

  updateScrollButtonsState() {
    const viewport = this.viewportRef().nativeElement;

    if (this.orientation() === 'vertical') {
      this.canScrollStart = viewport.scrollTop > 0;
      this.canScrollEnd = viewport.scrollTop < viewport.scrollHeight - viewport.clientHeight - 1; // -1 for rounding errors
    } else {
      this.canScrollStart = viewport.scrollLeft > 0;
      this.canScrollEnd = viewport.scrollLeft < viewport.scrollWidth - viewport.clientWidth - 1; // -1 for rounding errors
    }
  }

  startDragging(event: MouseEvent) {
    this.isDragging = true;

    if (this.orientation() === 'vertical') {
      this.startPoint = event.clientY;
      this.startScrollPosition = this.viewportRef().nativeElement.scrollTop;
    } else {
      this.startPoint = event.clientX;
      this.startScrollPosition = this.viewportRef().nativeElement.scrollLeft;
    }

    event.preventDefault();
  }

  onMouseMove(event: MouseEvent) {
    if (!this.isDragging) return;

    const viewport = this.viewportRef().nativeElement;

    if (this.orientation() === 'vertical') {
      const deltaY = event.clientY - this.startPoint;
      const scrollbarHeight = viewport.clientHeight;
      const scrollContentHeight = viewport.scrollHeight;

      // Calculate the scroll ratio
      const scrollRatio = scrollContentHeight / scrollbarHeight;

      // Update scroll position
      viewport.scrollTop = this.startScrollPosition + deltaY * scrollRatio;
    } else {
      const deltaX = event.clientX - this.startPoint;
      const scrollbarWidth = viewport.clientWidth;
      const scrollContentWidth = viewport.scrollWidth;

      // Calculate the scroll ratio
      const scrollRatio = scrollContentWidth / scrollbarWidth;

      // Update scroll position
      viewport.scrollLeft = this.startScrollPosition + deltaX * scrollRatio;
    }

    event.preventDefault();
  }

  onMouseUp() {
    this.isDragging = false;
  }

  scrollPrev() {
    const viewport = this.viewportRef().nativeElement;

    if (this.orientation() === 'vertical') {
      viewport.scrollBy({ top: -200, behavior: 'smooth' });
    } else {
      viewport.scrollBy({ left: -300, behavior: 'smooth' });
    }
  }

  scrollNext() {
    const viewport = this.viewportRef().nativeElement;

    if (this.orientation() === 'vertical') {
      viewport.scrollBy({ top: 200, behavior: 'smooth' });
    } else {
      viewport.scrollBy({ left: 300, behavior: 'smooth' });
    }
  }
}
