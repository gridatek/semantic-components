// scroll-area.component.ts
import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, ElementRef, OnDestroy, viewChild } from '@angular/core';

@Component({
  selector: 'sc-scroll-area3',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="h-34 w-96 max-w-[calc(100vw-8rem)] relative">
      <div
        class="h-full overflow-y-scroll overscroll-contain rounded-md outline outline-1 -outline-offset-1 outline-gray-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-blue-800 scrollbar-hide"
        #viewport
        (scroll)="onScroll()"
        (mouseenter)="isHovering = true"
        (mouseleave)="isHovering = false"
      >
        <div class="flex flex-col gap-4 py-3 pr-6 pl-4 text-sm leading-5.5 text-gray-900">
          <p>
            Vernacular architecture is building done outside any academic tradition, and without
            professional guidance. It is not a particular architectural movement or style, but
            rather a broad category, encompassing a wide range and variety of building types, with
            differing methods of construction, from around the world, both historical and extant and
            classical and modern. Vernacular architecture constitutes 95% of the world's built
            environment, as estimated in 1995 by Amos Rapoport, as measured against the small
            percentage of new buildings every year designed by architects and built by engineers.
          </p>
          <p>
            This type of architecture usually serves immediate, local needs, is constrained by the
            materials available in its particular region and reflects local traditions and cultural
            practices. The study of vernacular architecture does not examine formally schooled
            architects, but instead that of the design skills and tradition of local builders, who
            were rarely given any attribution for the work. More recently, vernacular architecture
            has been examined by designers and the building industry in an effort to be more energy
            conscious with contemporary design and construction—part of a broader interest in
            sustainable design.
          </p>
        </div>
      </div>
      <div
        class="absolute top-0 right-1 w-1 h-[calc(100%-0.5rem)] my-1 rounded-full bg-gray-200 opacity-0 transition-opacity delay-300"
        [ngClass]="{ 'opacity-100 delay-0 duration-75': isScrolling || isHovering }"
      >
        <div
          class="absolute w-full rounded-full bg-gray-500 cursor-pointer"
          #thumb
          [style.height.%]="thumbHeight"
          [style.top.%]="thumbTop"
          (mousedown)="startDragging($event)"
        ></div>
      </div>
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
export class ScrollAreaComponent implements OnDestroy, AfterViewInit {
  readonly viewportRef = viewChild.required<ElementRef<HTMLDivElement>>('viewport');
  readonly thumbRef = viewChild.required<ElementRef<HTMLDivElement>>('thumb');

  isScrolling = false;
  isHovering = false;
  isDragging = false;
  scrollTimeout: any;
  thumbHeight = 20;
  thumbTop = 0;
  startY = 0;
  startScrollTop = 0;

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
  }

  onScroll() {
    this.updateThumb();
    this.isScrolling = true;

    clearTimeout(this.scrollTimeout);
    this.scrollTimeout = setTimeout(() => {
      this.isScrolling = false;
    }, 300);
  }

  updateThumb() {
    const viewport = this.viewportRef().nativeElement;
    const scrollHeight = viewport.scrollHeight;
    const clientHeight = viewport.clientHeight;

    // Calculate thumb height as percentage of visible area
    this.thumbHeight = (clientHeight / scrollHeight) * 100;

    // Calculate thumb position
    this.thumbTop = (viewport.scrollTop / (scrollHeight - clientHeight)) * (100 - this.thumbHeight);
  }

  startDragging(event: MouseEvent) {
    this.isDragging = true;
    this.startY = event.clientY;
    this.startScrollTop = this.viewportRef().nativeElement.scrollTop;
    event.preventDefault();
  }

  onMouseMove(event: MouseEvent) {
    if (!this.isDragging) return;

    const viewport = this.viewportRef().nativeElement;
    const deltaY = event.clientY - this.startY;
    const scrollbarHeight = viewport.clientHeight;
    const scrollContentHeight = viewport.scrollHeight;

    // Calculate the scroll ratio
    const scrollRatio = scrollContentHeight / scrollbarHeight;

    // Update scroll position
    viewport.scrollTop = this.startScrollTop + deltaY * scrollRatio;

    event.preventDefault();
  }

  onMouseUp() {
    this.isDragging = false;
  }
}
