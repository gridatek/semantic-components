import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
  computed,
  inject,
  input,
} from '@angular/core';
import { cn } from '@semantic-components/ui';
import {
  SiArrowRightIcon,
  SiCircleIcon,
  SiDownloadIcon,
  SiEraserIcon,
  SiMinusIcon,
  SiPencilIcon,
  SiSquareIcon,
  SiTrash2Icon,
  SiUndo2Icon,
} from '@semantic-icons/lucide-icons';
import { ScImageAnnotatorState } from './image-annotator-state';
import type { AnnotationTool } from './image-annotator-types';

@Component({
  selector: 'div[scImageAnnotatorToolbar]',
  imports: [
    SiPencilIcon,
    SiMinusIcon,
    SiSquareIcon,
    SiCircleIcon,
    SiArrowRightIcon,
    SiEraserIcon,
    SiUndo2Icon,
    SiTrash2Icon,
    SiDownloadIcon,
  ],
  template: `
    <!-- Tool Selection -->
    <div class="flex items-center gap-1 border-r pr-2">
      @for (tool of state.tools; track tool.id) {
        <button
          type="button"
          [class]="toolButtonClass(tool.id)"
          [attr.aria-pressed]="state.currentTool() === tool.id"
          [attr.aria-label]="tool.label"
          [title]="tool.label"
          (click)="state.selectTool(tool.id)"
        >
          @switch (tool.id) {
            @case ('pen') {
              <svg siPencilIcon class="size-[18px]"></svg>
            }
            @case ('line') {
              <svg siMinusIcon class="size-[18px]"></svg>
            }
            @case ('rectangle') {
              <svg siSquareIcon class="size-[18px]"></svg>
            }
            @case ('circle') {
              <svg siCircleIcon class="size-[18px]"></svg>
            }
            @case ('arrow') {
              <svg siArrowRightIcon class="size-[18px]"></svg>
            }
            @case ('eraser') {
              <svg siEraserIcon class="size-[18px]"></svg>
            }
          }
        </button>
      }
    </div>

    <!-- Color Selection -->
    <div class="flex items-center gap-1 border-r pr-2">
      @for (color of state.colors; track color) {
        <button
          type="button"
          class="h-6 w-6 rounded border-2 transition-transform hover:scale-110"
          [class.ring-2]="state.currentColor() === color"
          [class.ring-offset-1]="state.currentColor() === color"
          [style.background-color]="color"
          [attr.aria-pressed]="state.currentColor() === color"
          [attr.aria-label]="'Color ' + color"
          (click)="state.selectColor(color)"
        ></button>
      }
    </div>

    <!-- Line Width -->
    <div class="flex items-center gap-2 border-r pr-2">
      <span class="text-muted-foreground text-xs">Width:</span>
      <input
        type="range"
        min="1"
        max="20"
        [value]="state.lineWidth()"
        class="accent-primary h-1 w-20"
        (input)="onLineWidthChange($event)"
      />
      <span class="w-4 text-xs">{{ state.lineWidth() }}</span>
    </div>

    <!-- Actions -->
    <div class="ml-auto flex items-center gap-1">
      <button
        type="button"
        class="hover:bg-muted rounded p-2 transition-colors"
        title="Undo"
        [disabled]="state.annotations().length === 0"
        (click)="state.undo()"
      >
        <svg siUndo2Icon class="size-[18px]"></svg>
      </button>
      <button
        type="button"
        class="hover:bg-muted rounded p-2 transition-colors"
        title="Clear All"
        [disabled]="state.annotations().length === 0"
        (click)="state.clearAll()"
      >
        <svg siTrash2Icon class="size-[18px]"></svg>
      </button>
      <button
        type="button"
        class="hover:bg-muted rounded p-2 transition-colors"
        title="Download"
        (click)="state.download()"
      >
        <svg siDownloadIcon class="size-[18px]"></svg>
      </button>
    </div>
  `,
  host: {
    'data-slot': 'image-annotator-toolbar',
    '[class]': 'class()',
  },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ScImageAnnotatorToolbar {
  readonly classInput = input<string>('', { alias: 'class' });

  protected readonly state = inject(ScImageAnnotatorState);

  protected readonly class = computed(() =>
    cn('bg-muted/50 flex items-center gap-2 border-b p-2', this.classInput()),
  );

  protected toolButtonClass(tool: AnnotationTool): string {
    return cn(
      'rounded p-2 transition-colors',
      this.state.currentTool() === tool
        ? 'bg-primary text-primary-foreground'
        : 'hover:bg-muted',
    );
  }

  protected onLineWidthChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.state.setLineWidth(parseInt(input.value, 10));
  }
}
