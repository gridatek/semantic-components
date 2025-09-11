// horizontal-scroll-area.component.ts
import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, ElementRef, OnDestroy, viewChild } from '@angular/core';

@Component({
  selector: 'sc-horizontal-scroll-area',
  imports: [CommonModule],
  template: `
    <div class="relative w-full max-w-4xl">
      <!-- Horizontal scroll container -->
      <div
        class="overflow-x-scroll overflow-y-hidden overscroll-contain h-64 rounded-md outline outline-1 -outline-offset-1 outline-gray-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-blue-800 scrollbar-hide"
        #viewport
        (scroll)="onScroll()"
        (mouseenter)="isHovering = true"
        (mouseleave)="isHovering = false"
      >
        <!-- Content container -->
        <div class="flex flex-row gap-4 p-4 min-w-max">
          <!-- Cards -->
          @for (item of items; track item) {
            <div
              class="bg-white rounded-lg shadow-md w-64 h-52 shrink-0 border border-gray-200 hover:border-blue-500 transition-colors duration-200"
            >
              <div class="p-4 h-full flex flex-col">
                <h3 class="text-lg font-medium text-gray-900 mb-2">{{ item.title }}</h3>
                <p class="text-sm text-gray-600 grow">{{ item.description }}</p>
                <div class="mt-4 text-xs text-gray-500">{{ item.category }}</div>
              </div>
            </div>
          }
        </div>
      </div>

      <!-- Custom scroll bar -->
      <div
        class="absolute bottom-0 left-0 right-4 h-1 mx-2 rounded-full bg-gray-200 opacity-0 transition-opacity delay-300"
        [ngClass]="{ 'opacity-100 delay-0 duration-75': isScrolling || isHovering }"
      >
        <div
          class="absolute h-full rounded-full bg-gray-500 cursor-pointer"
          #thumb
          [style.width.%]="thumbWidth"
          [style.left.%]="thumbLeft"
          (mousedown)="startDragging($event)"
        ></div>
      </div>

      <!-- Arrow navigation -->
      <button
        class="absolute top-1/2 left-2 -translate-y-1/2 bg-white/80 hover:bg-white rounded-full shadow-md p-2 opacity-0 transition-opacity duration-200"
        [ngClass]="{ 'opacity-100': isHovering && canScrollLeft }"
        [disabled]="!canScrollLeft"
        (click)="scrollLeft()"
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
        [ngClass]="{ 'opacity-100': isHovering && canScrollRight }"
        [disabled]="!canScrollRight"
        (click)="scrollRight()"
        aria-label="Scroll right"
      >
        <svg
          class="h-5 w-5 text-gray-700"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
        </svg>
      </button>
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
export class HorizontalScrollAreaComponent implements OnDestroy, AfterViewInit {
  readonly viewportRef = viewChild.required<ElementRef<HTMLDivElement>>('viewport');
  readonly thumbRef = viewChild.required<ElementRef<HTMLDivElement>>('thumb');

  isScrolling = false;
  isHovering = false;
  isDragging = false;
  scrollTimeout: any;
  thumbWidth = 20;
  thumbLeft = 0;
  startX = 0;
  startScrollLeft = 0;
  canScrollLeft = false;
  canScrollRight = true;

  // Sample items for demonstration
  items = Array(15)
    .fill(0)
    .map((_, i) => ({
      title: `Item ${i + 1}`,
      description: `This is a description for item ${i + 1}. It contains some sample text to demonstrate the horizontal scrolling functionality.`,
      category: ['Design', 'Development', 'Marketing', 'Research'][i % 4],
    }));

  constructor() {
    // Add document-level event listeners for drag operations
    document.addEventListener('mousemove', this.onMouseMove.bind(this));
    document.addEventListener('mouseup', this.onMouseUp.bind(this));
  }

  ngOnDestroy() {
    // Clean up event listeners
    document.removeEventListener('mousemove', this.onMouseMove.bind(this));
    document.removeEventListener('mouseup', this.onMouseUp.bind(this));
  }

  ngAfterViewInit() {
    this.updateThumb();
    // Initial check for scroll buttons
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
    const scrollWidth = viewport.scrollWidth;
    const clientWidth = viewport.clientWidth;

    // Calculate thumb width as percentage of visible area
    this.thumbWidth = (clientWidth / scrollWidth) * 100;

    // Calculate thumb position
    this.thumbLeft = (viewport.scrollLeft / (scrollWidth - clientWidth)) * (100 - this.thumbWidth);
  }

  updateScrollButtonsState() {
    const viewport = this.viewportRef().nativeElement;
    this.canScrollLeft = viewport.scrollLeft > 0;
    this.canScrollRight = viewport.scrollLeft < viewport.scrollWidth - viewport.clientWidth;
  }

  startDragging(event: MouseEvent) {
    this.isDragging = true;
    this.startX = event.clientX;
    this.startScrollLeft = this.viewportRef().nativeElement.scrollLeft;
    event.preventDefault();
  }

  onMouseMove(event: MouseEvent) {
    if (!this.isDragging) return;

    const viewport = this.viewportRef().nativeElement;
    const deltaX = event.clientX - this.startX;
    const scrollbarWidth = viewport.clientWidth;
    const scrollContentWidth = viewport.scrollWidth;

    // Calculate the scroll ratio
    const scrollRatio = scrollContentWidth / scrollbarWidth;

    // Update scroll position
    viewport.scrollLeft = this.startScrollLeft + deltaX * scrollRatio;

    event.preventDefault();
  }

  onMouseUp() {
    this.isDragging = false;
  }

  scrollLeft() {
    const viewport = this.viewportRef().nativeElement;
    viewport.scrollBy({ left: -300, behavior: 'smooth' });
  }

  scrollRight() {
    const viewport = this.viewportRef().nativeElement;
    viewport.scrollBy({ left: 300, behavior: 'smooth' });
  }
}
