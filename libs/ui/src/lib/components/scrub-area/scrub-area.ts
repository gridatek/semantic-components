import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  HostListener,
  ViewEncapsulation,
  computed,
  inject,
  input,
  model,
  output,
} from '@angular/core';

import { cn } from '@semantic-components/utils';

@Component({
  selector: 'div[sc-scrub-area]',
  imports: [],
  template: `
    <ng-content />
  `,
  host: {
    '[class]': 'class()',
    '[style.cursor]': 'isDragging ? "ew-resize" : "ew-resize"',
    '[style.user-select]': '"none"',
  },
  styles: ``,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ScScrubArea {
  readonly classInput = input<string>('', {
    alias: 'class',
  });

  readonly value = model<number>(0);
  readonly min = input<number>(0);
  readonly max = input<number>(100);
  readonly step = input<number>(1);
  readonly sensitivity = input<number>(1);

  readonly valueChange = output<number>();

  protected readonly class = computed(() =>
    cn('inline-flex items-center justify-center select-none cursor-ew-resize', this.classInput()),
  );

  private element = inject(ElementRef);
  private isDragging = false;
  private startX = 0;
  private startValue = 0;

  @HostListener('mousedown', ['$event'])
  onMouseDown(event: MouseEvent) {
    if (event.button !== 0) return; // Only left mouse button

    event.preventDefault();
    this.isDragging = true;
    this.startX = event.clientX;
    this.startValue = this.value();

    document.addEventListener('mousemove', this.onMouseMove);
    document.addEventListener('mouseup', this.onMouseUp);
    document.body.style.cursor = 'ew-resize';
  }

  private onMouseMove = (event: MouseEvent) => {
    if (!this.isDragging) return;

    const deltaX = event.clientX - this.startX;
    const deltaValue = deltaX * this.sensitivity() * this.step();
    const newValue = Math.min(this.max(), Math.max(this.min(), this.startValue + deltaValue));

    this.value.set(newValue);
    this.valueChange.emit(newValue);
  };

  private onMouseUp = () => {
    this.isDragging = false;
    document.removeEventListener('mousemove', this.onMouseMove);
    document.removeEventListener('mouseup', this.onMouseUp);
    document.body.style.cursor = '';
  };

  @HostListener('contextmenu', ['$event'])
  onContextMenu(event: Event) {
    event.preventDefault(); // Prevent context menu during scrubbing
  }
}
