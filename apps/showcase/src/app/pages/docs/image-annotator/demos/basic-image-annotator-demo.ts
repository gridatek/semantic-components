import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
  signal,
} from '@angular/core';
import {
  type Annotation,
  ScImageAnnotator,
  ScImageAnnotatorAction,
  ScImageAnnotatorCanvas,
  ScImageAnnotatorColorButton,
  ScImageAnnotatorLineWidth,
  ScImageAnnotatorToolButton,
  ScImageAnnotatorToolbar,
} from '@semantic-components/ui-lab';
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

@Component({
  selector: 'app-basic-image-annotator-demo',
  imports: [
    ScImageAnnotator,
    ScImageAnnotatorToolbar,
    ScImageAnnotatorToolButton,
    ScImageAnnotatorColorButton,
    ScImageAnnotatorLineWidth,
    ScImageAnnotatorAction,
    ScImageAnnotatorCanvas,
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
    <div
      scImageAnnotator
      [src]="imageSrc()"
      [width]="700"
      [height]="450"
      (annotationsChange)="onAnnotationsChange($event)"
      (save)="onSave($event)"
    >
      <div scImageAnnotatorToolbar #toolbar="scImageAnnotatorToolbar">
        <div class="flex items-center gap-1 border-r pr-2">
          @for (tool of toolbar.tools; track tool.id) {
            <button
              scImageAnnotatorToolButton
              [tool]="tool.id"
              [attr.aria-label]="tool.label"
              [title]="tool.label"
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

        <div class="flex items-center gap-1 border-r pr-2">
          @for (color of toolbar.colors; track color) {
            <button scImageAnnotatorColorButton [color]="color"></button>
          }
        </div>

        <div class="flex items-center gap-2 border-r pr-2">
          <span class="text-muted-foreground text-xs">Width:</span>
          <input type="range" scImageAnnotatorLineWidth min="1" max="20" />
          <span class="w-4 text-xs">{{ toolbar.lineWidth() }}</span>
        </div>

        <div class="ml-auto flex items-center gap-1">
          <button scImageAnnotatorAction action="undo" title="Undo">
            <svg siUndo2Icon class="size-[18px]"></svg>
          </button>
          <button scImageAnnotatorAction action="clear" title="Clear All">
            <svg siTrash2Icon class="size-[18px]"></svg>
          </button>
          <button scImageAnnotatorAction action="download" title="Download">
            <svg siDownloadIcon class="size-[18px]"></svg>
          </button>
        </div>
      </div>

      <div scImageAnnotatorCanvas></div>
    </div>
    <p class="text-muted-foreground mt-2 text-sm">
      Annotations: {{ annotationCount() }}
    </p>
  `,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BasicImageAnnotatorDemo {
  readonly annotationCount = signal(0);
  readonly imageSrc = signal('https://picsum.photos/seed/annotate1/700/450');

  onAnnotationsChange(annotations: Annotation[]): void {
    this.annotationCount.set(annotations.length);
  }

  onSave(dataUrl: string): void {
    console.log('Image saved, data URL length:', dataUrl.length);
  }
}
