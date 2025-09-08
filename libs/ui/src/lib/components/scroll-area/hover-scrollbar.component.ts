// hover-scrollbar.component.ts
import { CommonModule } from '@angular/common';
import {
  AfterViewInit,
  Component,
  ElementRef,
  OnChanges,
  SimpleChanges,
  input,
  viewChild,
} from '@angular/core';

@Component({
  selector: 'sc-hover-scrollbar',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div
      class="relative mx-auto"
      [ngClass]="{
        'border border-gray-300': border(),
      }"
      [ngStyle]="{
        width: width() + 'px',
        height: height() + 'px',
      }"
    >
      <div
        class="w-full h-full overflow-y-auto p-3 box-border"
        #contentContainer
        [ngClass]="{ 'hover-scrollbar': isScrollable }"
      >
        <ng-content />
      </div>
    </div>
  `,
  styles: [
    `
      @reference "tailwindcss";

      /* These styles need to be included as they cannot be done with Tailwind utility classes */
      .hover-scrollbar::-webkit-scrollbar {
        width: 8px;
      }

      .hover-scrollbar::-webkit-scrollbar-thumb {
        @apply bg-transparent rounded-md transition-colors duration-300;
      }

      .hover-scrollbar:hover::-webkit-scrollbar-thumb {
        @apply bg-gray-400;
      }

      .hover-scrollbar:hover::-webkit-scrollbar-thumb:hover {
        @apply bg-gray-500;
      }

      /* Firefox */
      .hover-scrollbar {
        scrollbar-width: thin;
        scrollbar-color: transparent transparent;
        transition: scrollbar-color 0.3s ease;
      }

      .hover-scrollbar:hover {
        scrollbar-color: theme('colors.gray.400') transparent;
      }

      /* Hide scrollbar when not scrollable for WebKit */
      ::-webkit-scrollbar {
        width: 0px;
        background: transparent;
      }
    `,
  ],
})
export class HoverScrollbarComponent implements AfterViewInit, OnChanges {
  readonly width = input(300);
  readonly height = input(200);
  readonly border = input(true);

  readonly contentContainer = viewChild.required<ElementRef>('contentContainer');

  isScrollable = false;

  ngAfterViewInit() {
    this.checkIfScrollable();
  }

  ngOnChanges(changes: SimpleChanges) {
    // When inputs change that might affect scrollability, check again
    if ((changes['width'] || changes['height']) && this.contentContainer()) {
      setTimeout(() => this.checkIfScrollable(), 0);
    }
  }

  checkIfScrollable() {
    const element = this.contentContainer().nativeElement;
    this.isScrollable = element.scrollHeight > element.clientHeight;

    // Add a mutation observer to check when content changes
    const observer = new MutationObserver(() => {
      this.isScrollable = element.scrollHeight > element.clientHeight;
    });

    observer.observe(element, {
      childList: true,
      subtree: true,
      characterData: true,
    });
  }
}
