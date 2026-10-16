import { Component, ViewEncapsulation } from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { EditorImageAnnotatorNextDemo } from './editor-image-annotator-next-demo';

@Component({
  selector: 'app-editor-image-annotator-next-demo-container',
  imports: [DemoContainer, EditorImageAnnotatorNextDemo],
  template: `
    <app-demo-container
      title="Editor"
      [code]="code"
      demoUrl="/demos/image-annotator-next/editor-image-annotator-next-demo"
    >
      <app-editor-image-annotator-next-demo />
    </app-demo-container>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
})
export class EditorImageAnnotatorNextDemoContainer {
  readonly code = `import { Component, ViewEncapsulation, signal } from '@angular/core';
import { ScButton, ScSlider } from '@semantic-components/ui';
import {
  ScImageAnnotatorNext,
  type ScImageAnnotatorNextAnnotation,
  ScImageAnnotatorNextClear,
  ScImageAnnotatorNextColor,
  ScImageAnnotatorNextDelete,
  ScImageAnnotatorNextImage,
  type ScImageAnnotatorNextKind,
  ScImageAnnotatorNextRedo,
  ScImageAnnotatorNextStage,
  ScImageAnnotatorNextTextInput,
  ScImageAnnotatorNextTool,
  ScImageAnnotatorNextUndo,
} from '@semantic-components/ui-lab';
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
const NAMES: Record<ScImageAnnotatorNextKind, string> = {
  pen: 'Drawing',
  highlighter: 'Highlight',
  line: 'Line',
  arrow: 'Arrow',
  rectangle: 'Box',
  ellipse: 'Circle',
  text: 'Note',
};

const labelOf = (annotation: ScImageAnnotatorNextAnnotation) =>
  annotation.kind === 'text'
    ? \`Note: \${annotation.text}\`
    : NAMES[annotation.kind];

/**
 * Every tool: draw, write, then select an annotation to move, resize,
 * restyle or delete it — with the pointer or the keyboard. Undo, and the
 * result as an image file.
 */
@Component({
  selector: 'app-editor-image-annotator-next-demo',
  imports: [
    ScImageAnnotatorNext,
    ScImageAnnotatorNextStage,
    ScImageAnnotatorNextImage,
    ScImageAnnotatorNextTextInput,
    ScImageAnnotatorNextTool,
    ScImageAnnotatorNextColor,
    ScImageAnnotatorNextUndo,
    ScImageAnnotatorNextRedo,
    ScImageAnnotatorNextDelete,
    ScImageAnnotatorNextClear,
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
      scImageAnnotatorNext
      #annotator="scImageAnnotatorNext"
      [(annotations)]="annotations"
      [(width)]="width"
      [label]="labelOf"
    >
      <div class="flex flex-wrap items-center gap-2">
        <div role="group" aria-label="Tools" class="flex gap-0.5">
          @for (tool of tools; track tool.value) {
            <button [scImageAnnotatorNextTool]="tool.value">
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
            <button [scImageAnnotatorNextColor]="color.value">
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
          <button scImageAnnotatorNextUndo>
            <svg siUndo2Icon></svg>
            <span class="sr-only">Undo</span>
          </button>
          <button scImageAnnotatorNextRedo>
            <svg siRedo2Icon></svg>
            <span class="sr-only">Redo</span>
          </button>
          <button scImageAnnotatorNextDelete>
            <svg siXIcon></svg>
            <span class="sr-only">Delete the selected annotation</span>
          </button>
          <button scImageAnnotatorNextClear>
            <svg siTrash2Icon></svg>
            <span class="sr-only">Clear all</span>
          </button>
        </div>
      </div>

      <div scImageAnnotatorNextStage aria-label="Photo to annotate">
        <img
          scImageAnnotatorNextImage
          src="/images/cropper-mountains.jpg"
          alt="Mountains at dawn above a sea of clouds"
        />
        <input scImageAnnotatorNextTextInput aria-label="Note" />
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
export class EditorImageAnnotatorNextDemo {
  readonly annotations = signal<readonly ScImageAnnotatorNextAnnotation[]>([]);
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

  async download(annotator: ScImageAnnotatorNext): Promise<void> {
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
