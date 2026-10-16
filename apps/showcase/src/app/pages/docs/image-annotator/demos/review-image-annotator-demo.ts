import { Component, ViewEncapsulation, computed, signal } from '@angular/core';
import {
  ScImageAnnotator,
  type ScImageAnnotatorAnnotation,
  ScImageAnnotatorDelete,
  ScImageAnnotatorImage,
  type ScImageAnnotatorKind,
  ScImageAnnotatorStage,
  ScImageAnnotatorTextInput,
  ScImageAnnotatorTool,
  ScImageAnnotatorUndo,
} from '@semantic-components/ui-lab';
import {
  SiMousePointer2Icon,
  SiMoveUpRightIcon,
  SiSquareIcon,
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
    ? `Note: ${annotation.text}`
    : NAMES[annotation.kind];

/** A review of the screenshot: what is to change. */
const REVIEW: ScImageAnnotatorAnnotation[] = [
  {
    id: 'box',
    kind: 'rectangle',
    points: [
      { x: 680, y: 608 },
      { x: 776, y: 658 },
    ],
    color: '#e11d48',
    width: 4,
  },
  {
    id: 'arrow',
    kind: 'arrow',
    points: [
      { x: 960, y: 690 },
      { x: 790, y: 640 },
    ],
    color: '#e11d48',
    width: 4,
  },
  {
    id: 'note',
    kind: 'text',
    points: [{ x: 900, y: 696 }],
    color: '#e11d48',
    width: 4,
    text: 'Make it larger',
  },
  {
    id: 'title',
    kind: 'ellipse',
    points: [
      { x: 266, y: 78 },
      { x: 414, y: 128 },
    ],
    color: '#2563eb',
    width: 3,
  },
];

/**
 * A few tools for a review — boxes, arrows and notes — over a screenshot,
 * the annotations kept as data (saved, sent, shown again).
 */
@Component({
  selector: 'app-review-image-annotator-demo',
  imports: [
    ScImageAnnotator,
    ScImageAnnotatorStage,
    ScImageAnnotatorImage,
    ScImageAnnotatorTextInput,
    ScImageAnnotatorTool,
    ScImageAnnotatorUndo,
    ScImageAnnotatorDelete,
    SiMousePointer2Icon,
    SiSquareIcon,
    SiMoveUpRightIcon,
    SiTypeIcon,
    SiUndo2Icon,
    SiXIcon,
  ],
  template: `
    <div
      scImageAnnotator
      [(annotations)]="annotations"
      [label]="labelOf"
      tool="arrow"
    >
      <div class="flex items-center gap-2">
        <div role="group" aria-label="Tools" class="flex gap-0.5">
          <button scImageAnnotatorTool="select">
            <svg siMousePointer2Icon></svg>
            <span class="sr-only">Select</span>
          </button>
          <button scImageAnnotatorTool="rectangle">
            <svg siSquareIcon></svg>
            <span class="sr-only">Box</span>
          </button>
          <button scImageAnnotatorTool="arrow">
            <svg siMoveUpRightIcon></svg>
            <span class="sr-only">Arrow</span>
          </button>
          <button scImageAnnotatorTool="text">
            <svg siTypeIcon></svg>
            <span class="sr-only">Note</span>
          </button>
        </div>
        <button scImageAnnotatorUndo>
          <svg siUndo2Icon></svg>
          <span class="sr-only">Undo</span>
        </button>
        <button scImageAnnotatorDelete>
          <svg siXIcon></svg>
          <span class="sr-only">Delete the selected annotation</span>
        </button>
      </div>

      <div scImageAnnotatorStage aria-label="Screenshot to review">
        <img
          scImageAnnotatorImage
          src="/images/annotator-screenshot.png"
          alt="The Button page of these docs"
        />
        <input scImageAnnotatorTextInput aria-label="Note" />
      </div>

      <details class="text-sm">
        <summary class="cursor-pointer font-medium">
          The annotations, as data ({{ annotations().length }})
        </summary>
        <pre
          class="bg-muted mt-2 max-h-60 overflow-auto rounded-md p-3 text-xs"
          >{{ json() }}</pre>
      </details>
    </div>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
})
export class ReviewImageAnnotatorDemo {
  readonly annotations = signal<readonly ScImageAnnotatorAnnotation[]>(REVIEW);
  readonly labelOf = labelOf;
  readonly json = computed(() => JSON.stringify(this.annotations(), null, 2));
}
