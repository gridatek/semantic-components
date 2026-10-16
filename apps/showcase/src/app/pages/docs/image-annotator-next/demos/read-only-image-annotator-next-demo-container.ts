import { Component, ViewEncapsulation } from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { ReadOnlyImageAnnotatorNextDemo } from './read-only-image-annotator-next-demo';

@Component({
  selector: 'app-read-only-image-annotator-next-demo-container',
  imports: [DemoContainer, ReadOnlyImageAnnotatorNextDemo],
  template: `
    <app-demo-container
      title="Read only"
      [code]="code"
      demoUrl="/demos/image-annotator-next/read-only-image-annotator-next-demo"
    >
      <app-read-only-image-annotator-next-demo />
    </app-demo-container>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
})
export class ReadOnlyImageAnnotatorNextDemoContainer {
  readonly code = `import { Component, ViewEncapsulation } from '@angular/core';
import {
  ScImageAnnotatorNext,
  type ScImageAnnotatorNextAnnotation,
  ScImageAnnotatorNextImage,
  type ScImageAnnotatorNextKind,
  ScImageAnnotatorNextStage,
} from '@semantic-components/ui-lab';

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

/** A review of the screenshot: what is to change. */
const REVIEW: ScImageAnnotatorNextAnnotation[] = [
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

/** Annotations shown over their image, not edited — each one still named. */
@Component({
  selector: 'app-read-only-image-annotator-next-demo',
  imports: [
    ScImageAnnotatorNext,
    ScImageAnnotatorNextStage,
    ScImageAnnotatorNextImage,
  ],
  template: \`
    <div
      scImageAnnotatorNext
      [annotations]="annotations"
      [label]="labelOf"
      [readonly]="true"
    >
      <div scImageAnnotatorNextStage aria-label="Reviewed screenshot">
        <img
          scImageAnnotatorNextImage
          src="/images/annotator-screenshot.png"
          alt="The Button page of these docs"
        />
      </div>
    </div>
  \`,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
})
export class ReadOnlyImageAnnotatorNextDemo {
  readonly annotations = REVIEW;
  readonly labelOf = labelOf;
}`;
}
