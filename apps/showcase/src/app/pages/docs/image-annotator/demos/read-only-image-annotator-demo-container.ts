import { Component, ViewEncapsulation } from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { ReadOnlyImageAnnotatorDemo } from './read-only-image-annotator-demo';

@Component({
  selector: 'app-read-only-image-annotator-demo-container',
  imports: [DemoContainer, ReadOnlyImageAnnotatorDemo],
  template: `
    <app-demo-container
      title="Read only"
      [code]="code"
      demoUrl="/demos/image-annotator/read-only-image-annotator-demo"
    >
      <app-read-only-image-annotator-demo />
    </app-demo-container>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
})
export class ReadOnlyImageAnnotatorDemoContainer {
  readonly code = `import { Component, ViewEncapsulation } from '@angular/core';
import {
  ScImageAnnotator,
  type ScImageAnnotatorAnnotation,
  ScImageAnnotatorImage,
  type ScImageAnnotatorKind,
  ScImageAnnotatorStage,
} from '@semantic-components/ui-lab';

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

/** Annotations shown over their image, not edited — each one still named. */
@Component({
  selector: 'app-read-only-image-annotator-demo',
  imports: [ScImageAnnotator, ScImageAnnotatorStage, ScImageAnnotatorImage],
  template: \`
    <div
      scImageAnnotator
      [annotations]="annotations"
      [label]="labelOf"
      [readonly]="true"
    >
      <div scImageAnnotatorStage aria-label="Reviewed screenshot">
        <img
          scImageAnnotatorImage
          src="/images/annotator-screenshot.png"
          alt="The Button page of these docs"
        />
      </div>
    </div>
  \`,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
})
export class ReadOnlyImageAnnotatorDemo {
  readonly annotations = REVIEW;
  readonly labelOf = labelOf;
}`;
}
