import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
  ViewEncapsulation,
} from '@angular/core';

@Component({
  selector: '[scCropperGrid]',
  template: `
    @for (col of verticalLines(); track col) {
      <div
        class="absolute top-0 bottom-0 w-px bg-white/30"
        [style.left.%]="col"
      ></div>
    }
    @for (row of horizontalLines(); track row) {
      <div
        class="absolute right-0 left-0 h-px bg-white/30"
        [style.top.%]="row"
      ></div>
    }
  `,
  host: {
    'data-slot': 'cropper-grid',
    class: 'pointer-events-none absolute inset-0',
  },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ScCropperGrid {
  readonly columns = input<number>(3);
  readonly rows = input<number>(3);

  protected readonly verticalLines = computed(() => {
    const cols = this.columns();
    const lines: number[] = [];
    for (let i = 1; i < cols; i++) {
      lines.push((i / cols) * 100);
    }
    return lines;
  });

  protected readonly horizontalLines = computed(() => {
    const rows = this.rows();
    const lines: number[] = [];
    for (let i = 1; i < rows; i++) {
      lines.push((i / rows) * 100);
    }
    return lines;
  });
}
