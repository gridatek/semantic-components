import {
  ChangeDetectionStrategy,
  Component,
  computed,
  ElementRef,
  inject,
  input,
  ViewEncapsulation,
} from '@angular/core';
import { SiGripVerticalIcon } from '@semantic-icons/lucide-icons';
import { cn } from '@semantic-components/ui';
import { ScResizablePanelGroup } from './resizable-panel-group';

@Component({
  selector: '[scResizableHandle]',
  imports: [SiGripVerticalIcon],
  host: {
    'data-slot': 'resizable-handle',
    'data-panel-resize-handle': '',
    '[class]': 'class()',
    '[attr.aria-orientation]': 'group.direction()',
    '(mousedown)': 'onMouseDown($event)',
    '(touchstart)': 'onTouchStart($event)',
  },
  template: `
    @if (withHandle()) {
      <div
        class="bg-border z-10 flex h-4 w-3 items-center justify-center rounded-sm border"
      >
        <svg siGripVerticalIcon class="size-2.5"></svg>
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
      'bg-border focus-visible:ring-ring ring-offset-background relative flex w-px items-center justify-center after:absolute after:inset-y-0 after:left-1/2 after:w-1 after:-translate-x-1/2 focus-visible:ring-1 focus-visible:outline-hidden',
      'aria-[orientation=horizontal]:h-px aria-[orientation=horizontal]:w-full aria-[orientation=horizontal]:after:left-0 aria-[orientation=horizontal]:after:h-1 aria-[orientation=horizontal]:after:w-full aria-[orientation=horizontal]:after:translate-x-0 aria-[orientation=horizontal]:after:-translate-y-1/2 [&[aria-orientation=horizontal]>div]:rotate-90',
      '[&[aria-orientation=vertical]]:cursor-col-resize [&[aria-orientation=horizontal]]:cursor-row-resize',
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

    const container = this.elementRef.nativeElement.parentElement;
    if (!container) return;

    const containerSize = isHorizontal
      ? container.offsetWidth
      : container.offsetHeight;
    const deltaPercent = (delta / containerSize) * 100;

    const leftPanelIndex = handleIndex;
    const rightPanelIndex = handleIndex + 1;

    if (leftPanelIndex >= 0 && rightPanelIndex < panels.length) {
      const leftPanel = panels[leftPanelIndex];
      const rightPanel = panels[rightPanelIndex];

      const newLeftSize = this.startSizes[leftPanelIndex] + deltaPercent;
      const newRightSize = this.startSizes[rightPanelIndex] - deltaPercent;

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
