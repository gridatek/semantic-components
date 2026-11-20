import { Component, ViewEncapsulation } from '@angular/core';
import { ScKbd, ScTypeset } from '@semantic-components/ui';
import { Anatomy } from '../../../components/anatomy/anatomy';
import {
  type ApiInput,
  ApiTable,
} from '../../../components/api-table/api-table';
import { ComponentBadges } from '../../../components/component-badges/component-badges';
import { PartsTable } from '../../../components/parts-table/parts-table';
import { TocHeading } from '../../../components/toc/toc-heading';
import { AspectRatioImageCropperNextDemoContainer } from './demos/aspect-ratio-image-cropper-next-demo-container';
import { ControlledImageCropperNextDemoContainer } from './demos/controlled-image-cropper-next-demo-container';
import { DisabledImageCropperNextDemoContainer } from './demos/disabled-image-cropper-next-demo-container';
import { FrameImageCropperNextDemoContainer } from './demos/frame-image-cropper-next-demo-container';
import { GridImageCropperNextDemoContainer } from './demos/grid-image-cropper-next-demo-container';
import { ImageCropperNextUsageDemoContainer } from './demos/image-cropper-next-usage-demo-container';
import { RtlImageCropperNextDemoContainer } from './demos/rtl-image-cropper-next-demo-container';

@Component({
  selector: 'app-image-cropper-next-page',
  imports: [
    ScKbd,
    ScTypeset,
    Anatomy,
    ApiTable,
    PartsTable,
    TocHeading,
    ComponentBadges,
    ImageCropperNextUsageDemoContainer,
    AspectRatioImageCropperNextDemoContainer,
    FrameImageCropperNextDemoContainer,
    GridImageCropperNextDemoContainer,
    ControlledImageCropperNextDemoContainer,
    DisabledImageCropperNextDemoContainer,
    RtlImageCropperNextDemoContainer,
  ],
  template: `
    <div class="space-y-12">
      <div class="space-y-2">
        <h1 scTypeset>Image Cropper Next</h1>
        <p class="text-muted-foreground">
          Choose the part of an image to keep: a box moved and resized over it,
          or a frame it moves under. The crop is a box in the image&apos;s own
          pixels, with a quarter turn and a flip — two-way, and a file with
          <code scTypeset>cropImage()</code>.
        </p>
        <app-component-badges path="image-cropper-next" />
      </div>

      <section class="space-y-4">
        <h2 scTypeset appToc>Usage</h2>
        <app-image-cropper-next-usage-demo-container />
      </section>

      <section class="space-y-4">
        <h2 scTypeset appToc>Anatomy</h2>
        <p>
          The viewport, the image and the selection are needed; the rest is
          yours to add. The handles sit in the viewport beside the selection —
          each a control of its own — and show in box mode only.
        </p>
        <app-anatomy [imports]="anatomy.imports" [markup]="anatomy.markup" />
      </section>

      <section class="space-y-4">
        <h2 scTypeset appToc>The crop</h2>
        <p>
          <code scTypeset>[(crop)]</code>
          is
          <code scTypeset>{{ cropType }}</code
          >, in the pixels of the image as shown — turned, then mirrored. It is
          written once the image loads: centred, at four fifths of the largest
          crop the ratio allows (all the frame in frame mode). Set it to restore
          a saved one; set it to <code scTypeset>null</code> to start again.
          Then hand it to
          <code scTypeset>cropImage(src, crop, options)</code>
          for a file.
        </p>
        <p>
          Zoom is the crop&apos;s size: 1 is the largest box at its ratio,
          <code scTypeset>maxZoom</code>
          (10) the smallest — or less, where
          <code scTypeset>minWidth</code> and
          <code scTypeset>minHeight</code>
          come first.
        </p>
      </section>

      <section class="space-y-4">
        <h2 scTypeset appToc>Accessibility</h2>
        <ul class="list-disc space-y-2 ps-6">
          <li>
            The root is a group you name. Until the image loads it is busy
            (aria-busy) and the selection hidden.
          </li>
          <li>
            The selection and each handle are sliders: the selection is one tab
            stop, then each handle. Name them, and say where the crop is with
            <code scTypeset>valueText</code>
            ("{{ '{' }}width{{ '}' }} by {{ '{' }}height{{ '}' }} pixels, at
            {{ '{' }}x{{ '}' }}, {{ '{' }}y{{ '}' }}"), its numbers written in
            the locale.
          </li>
          <li>
            <kbd scKbd>←</kbd> <kbd scKbd>→</kbd> <kbd scKbd>↑</kbd>
            <kbd scKbd>↓</kbd> move the selection, or a handle&apos;s edge (an
            edge takes only the arrows along it): one screen pixel,
            <kbd scKbd>Shift</kbd> ten. <kbd scKbd>+</kbd> and
            <kbd scKbd>−</kbd> zoom about the crop&apos;s middle;
            <kbd scKbd>R</kbd> turns the image a quarter,
            <kbd scKbd>Shift + R</kbd> back.
          </li>
          <li>
            Dragging: <kbd scKbd>Shift</kbd> on a handle keeps the ratio when it
            is free; <kbd scKbd>Escape</kbd> puts the crop back where the drag
            started. In frame mode the wheel zooms at the pointer and two
            fingers pinch.
          </li>
          <li>
            The zoom is a real slider, read as a percentage. Disabled, the
            selection and handles leave the tab order and the controls are off.
          </li>
          <li>
            The image is not mirrored right to left: a photo has no direction.
          </li>
        </ul>
      </section>

      <section class="space-y-8">
        <h2 scTypeset appToc>Examples</h2>
        <app-aspect-ratio-image-cropper-next-demo-container />
        <app-frame-image-cropper-next-demo-container />
        <app-grid-image-cropper-next-demo-container />
        <app-controlled-image-cropper-next-demo-container />
        <app-disabled-image-cropper-next-demo-container />
        <app-rtl-image-cropper-next-demo-container />
      </section>

      <section class="space-y-4">
        <h2 scTypeset appToc>API reference</h2>
        <p>
          Each part takes
          <code scTypeset>class</code>, merged over the style (cn: a later class
          wins).
        </p>
        <app-parts-table label="Image Cropper Next parts" [parts]="parts" />
        <app-api-table label="ScImageCropperNext inputs" [inputs]="inputs" />
        <app-api-table label="cropImage options" [inputs]="options" />
      </section>
    </div>
  `,
  encapsulation: ViewEncapsulation.None,
})
export default class ImageCropperNextPage {
  private readonly cropType =
    '{ x, y, width, height, rotation?, flipX?, flipY? }';

  private readonly anatomy = {
    imports: [
      'import {',
      '  ScImageCropperNext, ScImageCropperNextViewport, ScImageCropperNextImage,',
      '  ScImageCropperNextSelection, ScImageCropperNextGrid, ScImageCropperNextHandle,',
      '  ScImageCropperNextZoom, ScImageCropperNextRotate, ScImageCropperNextFlip,',
      '  ScImageCropperNextPreview, ScImageCropperNextPreviewImage, cropImage,',
      "} from '@semantic-components/ui';",
    ].join('\n'),
    markup: [
      '<div scImageCropperNext aria-label="Photo" [(crop)]="crop">',
      '  <div scImageCropperNextViewport class="h-80">',
      '    <img scImageCropperNextImage src="…" alt="…" />',
      '    <div scImageCropperNextSelection aria-label="Crop" valueText="…">',
      '      <div scImageCropperNextGrid></div>',
      '    </div>',
      '    <div scImageCropperNextHandle="ne" aria-label="Top right corner"></div>',
      '    …',
      '  </div>',
      '  <input scImageCropperNextZoom aria-label="Zoom" />',
      '  <button scImageCropperNextRotate>…</button>',
      '  <button scImageCropperNextFlip>…</button>',
      '  <div scImageCropperNextPreview>',
      '    <img scImageCropperNextPreviewImage alt="…" />',
      '  </div>',
      '</div>',
    ].join('\n'),
  };

  private readonly parts = [
    {
      name: 'ScImageCropperNext',
      selector: '[scImageCropperNext]',
      description:
        'Holds the crop (two-way) and what moves it; a group you name. data-mode, data-shape, data-loading, data-dragging, data-disabled. exportAs scImageCropperNext: zoom(), mostZoom(), loading(), dragging(), ready(), setZoom(), rotate(), flip(), focus().',
    },
    {
      name: 'ScImageCropperNextViewport',
      selector: '[scImageCropperNextViewport]',
      description:
        'The area the image shows in: give it a height. In frame mode it pans (drag), zooms (wheel, at the pointer) and pinches.',
    },
    {
      name: 'ScImageCropperNextImage',
      selector: 'img[scImageCropperNextImage]',
      description:
        'Your image, with its src and alt; placed, turned and mirrored by the crop. From another site it needs CORS to be cropped.',
    },
    {
      name: 'ScImageCropperNextSelection',
      selector: '[scImageCropperNextSelection]',
      description:
        'The crop: a slider (its value the x), one tab stop. Name it; valueText with {x}, {y}, {width}, {height}. Dragged to move in box mode; the shade around it.',
    },
    {
      name: 'ScImageCropperNextGrid',
      selector: 'div[scImageCropperNextGrid]',
      description:
        'Guide lines in the selection: columns and rows (3: thirds), faint, clearer while dragged; restyled from its class.',
    },
    {
      name: 'ScImageCropperNextHandle',
      selector: '[scImageCropperNextHandle]',
      description:
        'Resizes from an edge or corner: n, ne, e, se, s, sw, w, nw. In the viewport, box mode only. A slider (width, or height for n and s): name it; valueText.',
    },
    {
      name: 'ScImageCropperNextZoom',
      selector: 'input[scImageCropperNextZoom]',
      description:
        'The zoom as the style’s slider: 1 to mostZoom(), read as a percentage in the locale. Name it.',
    },
    {
      name: 'ScImageCropperNextRotate',
      selector: 'button[scImageCropperNextRotate]',
      description:
        'A quarter turn: direction clockwise (default) or counterclockwise. The style’s button (outline, icon); your icon and name.',
    },
    {
      name: 'ScImageCropperNextFlip',
      selector: 'button[scImageCropperNextFlip]',
      description:
        'Mirrors: direction horizontal (default) or vertical. The style’s button (outline, icon); your icon and name.',
    },
    {
      name: 'ScImageCropperNextPreview',
      selector: '[scImageCropperNextPreview]',
      description:
        'A live preview: size and shape it (size-12 rounded-full), the crop covers it.',
    },
    {
      name: 'ScImageCropperNextPreviewImage',
      selector: 'img[scImageCropperNextPreviewImage]',
      description: 'The cropper’s image in the preview; write its alt.',
    },
  ];

  private readonly inputs: ApiInput[] = [
    {
      name: 'crop',
      type: 'ScImageCropNext | null',
      default: 'null',
      description:
        'Two-way. Written when the image loads; set it to restore one, null to start again.',
    },
    {
      name: 'mode',
      type: "'box' | 'frame'",
      default: "'box'",
      description:
        'A box moved and resized over the image, or a frame the image moves under.',
    },
    {
      name: 'aspectRatio',
      type: 'number | null',
      default: 'null',
      description: 'Width / height; free when null. A change refits the crop.',
    },
    {
      name: 'shape',
      type: "'rectangle' | 'circle'",
      default: "'rectangle'",
      description: "The selection's look; pass it to cropImage too.",
    },
    {
      name: 'minWidth, minHeight',
      type: 'number',
      default: '1',
      description: 'The least crop, in image pixels.',
    },
    {
      name: 'maxZoom',
      type: 'number',
      default: '10',
      description: 'How far in: 1 is the largest crop.',
    },
    {
      name: 'disabled',
      type: 'boolean',
      default: 'false',
      description: 'Nothing moves.',
    },
  ];

  private readonly options: ApiInput[] = [
    {
      name: 'type',
      type: 'string',
      default: "'image/png'",
      description: 'image/jpeg, image/webp…: what the browser writes.',
    },
    {
      name: 'quality',
      type: 'number',
      default: '—',
      description: '0 to 1, for JPEG and WebP.',
    },
    {
      name: 'width, height',
      type: 'number',
      default: "the crop's",
      description: 'One alone: the other follows at the crop’s ratio.',
    },
    {
      name: 'shape',
      type: "'rectangle' | 'circle'",
      default: "'rectangle'",
      description: 'A circle: an ellipse, its corners transparent.',
    },
    {
      name: 'name',
      type: 'string',
      default: "'image.png'",
      description: "The file's name; a File source gives its own.",
    },
  ];
}
