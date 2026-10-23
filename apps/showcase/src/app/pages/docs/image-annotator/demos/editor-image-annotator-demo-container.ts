import { Component, ViewEncapsulation } from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { EditorImageAnnotatorDemo } from './editor-image-annotator-demo';

@Component({
  selector: 'app-editor-image-annotator-demo-container',
  imports: [DemoContainer, EditorImageAnnotatorDemo],
  template: `
    <app-demo-container
      title="Editor"
      [code]="code"
      demoUrl="/demos/image-annotator/editor-image-annotator-demo"
    >
      <app-editor-image-annotator-demo />
    </app-demo-container>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
})
export class EditorImageAnnotatorDemoContainer {
  readonly code = `import { Component, ViewEncapsulation, signal } from '@angular/core';
import { ScButton, ScSlider, ScImageAnnotator, type ScImageAnnotatorAnnotation, ScImageAnnotatorClear, ScImageAnnotatorColor, ScImageAnnotatorDelete, ScImageAnnotatorImage, type ScImageAnnotatorKind, ScImageAnnotatorRedo, ScImageAnnotatorStage, ScImageAnnotatorTextInput, ScImageAnnotatorTool, ScImageAnnotatorUndo } from '@semantic-components/ui';
import {
  SiCircleIcon,
  SiEraserIcon,
  SiHighlighterIcon,
  SiMousePointer2Icon,
  SiMoveUpRightIcon,
  SiPencilIcon,
  SiRedo2Icon,
  SiSlashIcon,
  SiSquareIcon,
  SiTrash2Icon,
  SiTypeIcon,
  SiUndo2Icon,
  SiXIcon,
} from '@semantic-icons/lucide-icons';

/** Each annotation's name, for screen readers. */
const NAMES: Record<ScImageAnnotatorKind, string> = {
  pen: 'Drawing',
  highlighter: 'Highlight',
  line: 'Line',
  arrow: 'Arrow',
  rectangle: 'Box',
  ellipse: 'Circle',
  text: 'Note',
};

const labelOf = (annotation: ScImageAnnotatorAnnotation) =>
  annotation.kind === 'text'
    ? \`Note: \${annotation.text}\`
    : NAMES[annotation.kind];

/**
 * Every tool: draw, write, then select an annotation to move, resize,
 * restyle or delete it — with the pointer or the keyboard. Undo, and the
 * result as an image file.
 */
@Component({
  selector: 'app-editor-image-annotator-demo',
  imports: [
    ScImageAnnotator,
    ScImageAnnotatorStage,
    ScImageAnnotatorImage,
    ScImageAnnotatorTextInput,
    ScImageAnnotatorTool,
    ScImageAnnotatorColor,
    ScImageAnnotatorUndo,
    ScImageAnnotatorRedo,
    ScImageAnnotatorDelete,
    ScImageAnnotatorClear,
    ScButton,
    ScSlider,
    SiMousePointer2Icon,
    SiPencilIcon,
    SiHighlighterIcon,
    SiSlashIcon,
    SiMoveUpRightIcon,
    SiSquareIcon,
    SiCircleIcon,
    SiTypeIcon,
    SiEraserIcon,
    SiUndo2Icon,
    SiRedo2Icon,
    SiXIcon,
    SiTrash2Icon,
  ],
  template: \`
    <div
      scImageAnnotator
      #annotator="scImageAnnotator"
      [(annotations)]="annotations"
      [(width)]="width"
      [label]="labelOf"
    >
      <div class="flex flex-wrap items-center gap-2">
        <div role="group" aria-label="Tools" class="flex gap-0.5">
          @for (tool of tools; track tool.value) {
            <button [scImageAnnotatorTool]="tool.value">
              @switch (tool.value) {
                @case ('select') {
                  <svg siMousePointer2Icon></svg>
                }
                @case ('pen') {
                  <svg siPencilIcon></svg>
                }
                @case ('highlighter') {
                  <svg siHighlighterIcon></svg>
                }
                @case ('line') {
                  <svg siSlashIcon></svg>
                }
                @case ('arrow') {
                  <svg siMoveUpRightIcon></svg>
                }
                @case ('rectangle') {
                  <svg siSquareIcon></svg>
                }
                @case ('ellipse') {
                  <svg siCircleIcon></svg>
                }
                @case ('text') {
                  <svg siTypeIcon></svg>
                }
                @case ('eraser') {
                  <svg siEraserIcon></svg>
                }
              }
              <span class="sr-only">{{ tool.label }}</span>
            </button>
          }
        </div>
        <div role="group" aria-label="Colour" class="flex items-center gap-1.5">
          @for (color of colors; track color.value) {
            <button [scImageAnnotatorColor]="color.value">
              <span class="sr-only">{{ color.label }}</span>
            </button>
          }
        </div>
        <input
          scSlider
          aria-label="Width"
          [min]="1"
          [max]="16"
          [(value)]="width"
          class="w-24"
        />
        <div class="ms-auto flex gap-0.5">
          <button scImageAnnotatorUndo>
            <svg siUndo2Icon></svg>
            <span class="sr-only">Undo</span>
          </button>
          <button scImageAnnotatorRedo>
            <svg siRedo2Icon></svg>
            <span class="sr-only">Redo</span>
          </button>
          <button scImageAnnotatorDelete>
            <svg siXIcon></svg>
            <span class="sr-only">Delete the selected annotation</span>
          </button>
          <button scImageAnnotatorClear>
            <svg siTrash2Icon></svg>
            <span class="sr-only">Clear all</span>
          </button>
        </div>
      </div>

      <div scImageAnnotatorStage aria-label="Photo to annotate">
        <img
          scImageAnnotatorImage
          src="/images/cropper-mountains.jpg"
          alt="Mountains at dawn above a sea of clouds"
        />
        <input scImageAnnotatorTextInput aria-label="Note" />
      </div>

      <div class="flex flex-wrap items-center gap-2">
        <button scButton variant="outline" (click)="download(annotator)">
          Download the image
        </button>
        <p class="text-muted-foreground text-sm" aria-live="polite">
          {{ annotations().length }} annotations
        </p>
      </div>
    </div>
  \`,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
})
export class EditorImageAnnotatorDemo {
  readonly annotations = signal<readonly ScImageAnnotatorAnnotation[]>([]);
  readonly width = signal(4);
  readonly labelOf = labelOf;

  readonly tools = [
    { value: 'select', label: 'Select' },
    { value: 'pen', label: 'Pen' },
    { value: 'highlighter', label: 'Highlighter' },
    { value: 'line', label: 'Line' },
    { value: 'arrow', label: 'Arrow' },
    { value: 'rectangle', label: 'Box' },
    { value: 'ellipse', label: 'Circle' },
    { value: 'text', label: 'Note' },
    { value: 'eraser', label: 'Eraser' },
  ] as const;

  readonly colors = [
    { value: '#e11d48', label: 'Red' },
    { value: '#f59e0b', label: 'Amber' },
    { value: '#16a34a', label: 'Green' },
    { value: '#2563eb', label: 'Blue' },
    { value: '#ffffff', label: 'White' },
    { value: '#171717', label: 'Black' },
  ];

  async download(annotator: ScImageAnnotator): Promise<void> {
    const blob = await annotator.toBlob({ type: 'image/png' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'annotated.png';
    link.click();
    URL.revokeObjectURL(url);
  }
}`;
}
