import {
  ChangeDetectionStrategy,
  Component,
  computed,
  ElementRef,
  inject,
  input,
  ViewEncapsulation,
} from '@angular/core';
import { cn } from '../../utils';
import { ScResizablePanelGroup } from './resizable-panel-group';

@Component({
  selector: '[sc-resizable-handle]',
  host: {
    'data-slot': 'resizable-handle',
    'data-panel-resize-handle': '',
    '[class]': 'class()',
    '[attr.data-direction]': 'group.direction()',
    '(mousedown)': 'onMouseDown($event)',
    '(touchstart)': 'onTouchStart($event)',
  },
  template: `
    @if (withHandle()) {
      <div
        class="z-10 flex h-4 w-3 items-center justify-center rounded-sm border bg-border"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
          class="size-2.5"
        >
          <circle cx="12" cy="5" r="1" />
          <circle cx="12" cy="12" r="1" />
          <circle cx="12" cy="19" r="1" />
        </svg>
      </div>
    }
  `,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ScResizableHandle {
  readonly group = inject(ScResizablePanelGroup);
  private readonly elementRef = inject(ElementRef);

  readonly classInput = input<string>('', { alias: 'class' });
  readonly withHandle = input<boolean>(false);

  private dragging = false;
  private startPos = 0;
  private startSizes: number[] = [];

  protected readonly class = computed(() =>
    cn(
      'relative flex w-px items-center justify-center bg-border after:absolute after:inset-y-0 after:left-1/2 after:w-1 after:-translate-x-1/2 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring focus-visible:ring-offset-1',
      'data-[direction=vertical]:h-px data-[direction=vertical]:w-full data-[direction=vertical]:after:left-0 data-[direction=vertical]:after:h-1 data-[direction=vertical]:after:w-full data-[direction=vertical]:after:-translate-y-1/2 data-[direction=vertical]:after:translate-x-0',
      '[&[data-direction=horizontal]]:cursor-col-resize [&[data-direction=vertical]]:cursor-row-resize',
      this.classInput(),
    ),
  );

  protected onMouseDown(event: MouseEvent): void {
    event.preventDefault();
    this.startDrag(event.clientX, event.clientY);

    const onMouseMove = (e: MouseEvent) => this.onDrag(e.clientX, e.clientY);
    const onMouseUp = () => {
      this.dragging = false;
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  }

  protected onTouchStart(event: TouchEvent): void {
    if (event.touches.length !== 1) return;
    event.preventDefault();
    const touch = event.touches[0];
    this.startDrag(touch.clientX, touch.clientY);

    const onTouchMove = (e: TouchEvent) => {
      if (e.touches.length !== 1) return;
      const t = e.touches[0];
      this.onDrag(t.clientX, t.clientY);
    };
    const onTouchEnd = () => {
      this.dragging = false;
      document.removeEventListener('touchmove', onTouchMove);
      document.removeEventListener('touchend', onTouchEnd);
    };

    document.addEventListener('touchmove', onTouchMove, { passive: false });
    document.addEventListener('touchend', onTouchEnd);
  }

  private startDrag(clientX: number, clientY: number): void {
    this.dragging = true;
    const isHorizontal = this.group.direction() === 'horizontal';
    this.startPos = isHorizontal ? clientX : clientY;

    const panels = this.group.getPanels();
    this.startSizes = panels.map((p) => p.size());
  }

  private onDrag(clientX: number, clientY: number): void {
    if (!this.dragging) return;

    const isHorizontal = this.group.direction() === 'horizontal';
    const currentPos = isHorizontal ? clientX : clientY;
    const delta = currentPos - this.startPos;

    const panels = this.group.getPanels();
    const handles = this.group.getHandles();
    const handleIndex = handles.indexOf(this);

    if (handleIndex === -1 || panels.length < 2) return;

    // Get the container size
    const container = this.elementRef.nativeElement.parentElement;
    if (!container) return;

    const containerSize = isHorizontal
      ? container.offsetWidth
      : container.offsetHeight;
    const deltaPercent = (delta / containerSize) * 100;

    // Adjust the panels on either side of this handle
    const leftPanelIndex = handleIndex;
    const rightPanelIndex = handleIndex + 1;

    if (leftPanelIndex >= 0 && rightPanelIndex < panels.length) {
      const leftPanel = panels[leftPanelIndex];
      const rightPanel = panels[rightPanelIndex];

      const newLeftSize = this.startSizes[leftPanelIndex] + deltaPercent;
      const newRightSize = this.startSizes[rightPanelIndex] - deltaPercent;

      // Only apply if both panels stay within bounds
      if (
        newLeftSize >= leftPanel.minSize() &&
        newLeftSize <= leftPanel.maxSize() &&
        newRightSize >= rightPanel.minSize() &&
        newRightSize <= rightPanel.maxSize()
      ) {
        leftPanel.setSize(newLeftSize);
        rightPanel.setSize(newRightSize);
      }
    }
  }
}
