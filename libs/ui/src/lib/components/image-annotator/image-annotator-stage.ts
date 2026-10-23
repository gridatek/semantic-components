import { NgTemplateOutlet } from '@angular/common';
import {
  Component,
  DestroyRef,
  ElementRef,
  Injector,
  ViewEncapsulation,
  afterNextRender,
  computed,
  inject,
  input,
  signal,
} from '@angular/core';
import { ɵwarnIfUnnamed } from '../../utils/accessible-name/accessible-name';
import { cn } from '../../utils/cn/cn';
import { ScImageAnnotator } from './image-annotator';
import {
  HIGHLIGHTER_OPACITY,
  HIGHLIGHTER_WIDTH,
  addPoint,
  arrowHead,
  bounds,
  boxOf,
  fit,
  fontSize,
  smoothPath,
  translate,
} from './image-annotator-geometry';
import type {
  ScImageAnnotatorAnnotation as Annotation,
  ScImageAnnotatorPoint as Point,
  ScImageAnnotatorKind,
} from './image-annotator-types';

type Handle = 'nw' | 'ne' | 'sw' | 'se' | 'start' | 'end';

type Gesture =
  | { kind: 'draw' }
  | { kind: 'move'; id: string; from: Point }
  | { kind: 'resize'; id: string; handle: Handle; start: Annotation }
  | { kind: 'erase' };

/**
 * Where the image is annotated: your `img[scImageAnnotatorImage]` inside,
 * and the annotations drawn over it. Name it ("Screenshot to review").
 * Focused, Enter places a shape of the current tool; each annotation is
 * focusable — arrows move it (Shift: more), Alt + arrows resize it, Delete
 * removes it, Enter edits a text, Escape leaves it.
 */
@Component({
  selector: 'div[scImageAnnotatorStage]',
  imports: [NgTemplateOutlet],
  template: `
    <ng-content />
    @if (annotator.ready()) {
      <svg
        class="absolute inset-0 size-full overflow-visible"
        [attr.viewBox]="viewBox()"
      >
        @for (annotation of annotator.annotations(); track annotation.id) {
          <svg:g
            data-slot="image-annotation"
            [attr.data-annotation-id]="annotation.id"
            [attr.data-selected]="
              annotation.id === annotator.selected() || null
            "
            [attr.tabindex]="annotator.readonly() ? -1 : 0"
            role="img"
            [attr.aria-label]="labelOf(annotation)"
            class="outline-none"
            (focus)="onFocus(annotation)"
            (keydown)="onAnnotationKeydown($event, annotation)"
          >
            <ng-container
              [ngTemplateOutlet]="shape"
              [ngTemplateOutletContext]="{ $implicit: annotation, hit: true }"
            />
          </svg:g>
        }
        @if (draft(); as annotation) {
          <svg:g class="pointer-events-none">
            <ng-container
              [ngTemplateOutlet]="shape"
              [ngTemplateOutletContext]="{ $implicit: annotation, hit: false }"
            />
          </svg:g>
        }
        @if (selection(); as box) {
          <svg:rect
            class="pointer-events-none fill-none stroke-sky-500"
            [attr.x]="box.x - unit() * 4"
            [attr.y]="box.y - unit() * 4"
            [attr.width]="box.width + unit() * 8"
            [attr.height]="box.height + unit() * 8"
            stroke-dasharray="4 3"
            vector-effect="non-scaling-stroke"
          />
          @for (handle of handles(); track handle.name) {
            <svg:rect
              [attr.data-handle]="handle.name"
              [class]="'fill-white stroke-sky-500 ' + handle.cursor"
              [attr.x]="handle.x - unit() * 5"
              [attr.y]="handle.y - unit() * 5"
              [attr.width]="unit() * 10"
              [attr.height]="unit() * 10"
              vector-effect="non-scaling-stroke"
            />
          }
        }

        <ng-template #shape let-a let-hit="hit">
          @switch (a.kind) {
            @case ('pen') {
              <svg:path
                [attr.d]="path(a)"
                fill="none"
                [attr.stroke]="a.color"
                [attr.stroke-width]="a.width"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            }
            @case ('highlighter') {
              <svg:path
                [attr.d]="path(a)"
                fill="none"
                [attr.stroke]="a.color"
                [attr.stroke-width]="a.width * highlighterWidth"
                [attr.stroke-opacity]="highlighterOpacity"
                stroke-linejoin="round"
              />
            }
            @case ('text') {
              <svg:text
                [attr.x]="a.points[0].x"
                [attr.y]="a.points[0].y"
                [attr.font-size]="fontSize(a)"
                [attr.fill]="a.color"
                dominant-baseline="hanging"
                font-weight="600"
                font-family="system-ui, sans-serif"
                [class.invisible]="a.id === annotator.editing()"
              >
                {{ a.text }}
              </svg:text>
            }
            @case ('rectangle') {
              <svg:rect
                [attr.x]="box(a).x"
                [attr.y]="box(a).y"
                [attr.width]="box(a).width"
                [attr.height]="box(a).height"
                fill="none"
                [attr.stroke]="a.color"
                [attr.stroke-width]="a.width"
                stroke-linejoin="round"
              />
            }
            @case ('ellipse') {
              <svg:ellipse
                [attr.cx]="box(a).x + box(a).width / 2"
                [attr.cy]="box(a).y + box(a).height / 2"
                [attr.rx]="box(a).width / 2"
                [attr.ry]="box(a).height / 2"
                fill="none"
                [attr.stroke]="a.color"
                [attr.stroke-width]="a.width"
              />
            }
            @default {
              <svg:line
                [attr.x1]="a.points[0].x"
                [attr.y1]="a.points[0].y"
                [attr.x2]="a.points[1].x"
                [attr.y2]="a.points[1].y"
                [attr.stroke]="a.color"
                [attr.stroke-width]="a.width"
                stroke-linecap="round"
              />
              @if (a.kind === 'arrow') {
                <svg:polygon [attr.points]="head(a)" [attr.fill]="a.color" />
              }
            }
          }
          @if (hit) {
            <!-- A wider, invisible target than the stroke, for the pointer. -->
            @if (a.kind === 'text') {
              <svg:rect
                [attr.x]="bounds(a).x"
                [attr.y]="bounds(a).y"
                [attr.width]="bounds(a).width"
                [attr.height]="bounds(a).height"
                fill="transparent"
              />
            } @else if (a.kind === 'rectangle' || a.kind === 'ellipse') {
              <svg:rect
                [attr.x]="box(a).x"
                [attr.y]="box(a).y"
                [attr.width]="box(a).width"
                [attr.height]="box(a).height"
                fill="none"
                stroke="transparent"
                [attr.stroke-width]="hitWidth(a)"
              />
            } @else {
              <svg:path
                [attr.d]="path(a)"
                fill="none"
                stroke="transparent"
                [attr.stroke-width]="hitWidth(a)"
                stroke-linecap="round"
              />
            }
          }
        </ng-template>
      </svg>
    }
  `,
  host: {
    'data-slot': 'image-annotator-stage',
    role: 'group',
    tabindex: '0',
    '[class]': 'class()',
    '(pointerdown)': 'onPointerDown($event)',
    '(pointermove)': 'onPointerMove($event)',
    '(pointerup)': 'onPointerUp()',
    '(pointercancel)': 'onPointerUp()',
    '(keydown.enter)': 'onEnter($event)',
  },
  encapsulation: ViewEncapsulation.None,
})
export class ScImageAnnotatorStage {
  protected readonly annotator = inject(ScImageAnnotator);
  private readonly element =
    inject<ElementRef<HTMLElement>>(ElementRef).nativeElement;
  private readonly injector = inject(Injector);

  readonly classInput = input<string>('', { alias: 'class' });

  protected readonly highlighterWidth = HIGHLIGHTER_WIDTH;
  protected readonly highlighterOpacity = HIGHLIGHTER_OPACITY;
  protected readonly fontSize = fontSize;
  protected readonly bounds = bounds;

  /** The stage's width on screen: for handles that keep their size. */
  private readonly shown = signal(0);
  /** Image pixels per screen pixel. */
  protected readonly unit = computed(() => {
    const width = this.annotator.ɵnatural().width;
    return this.shown() ? width / this.shown() : 1;
  });

  protected readonly draft = signal<Annotation | null>(null);
  private gesture: Gesture | null = null;

  protected readonly viewBox = computed(() => {
    const { width, height } = this.annotator.ɵnatural();
    return `0 0 ${width} ${height}`;
  });

  /** The selected annotation's box, while it can be edited. */
  protected readonly selection = computed(() => {
    const annotation = this.annotator.selectedAnnotation();
    return annotation && !this.annotator.readonly() ? bounds(annotation) : null;
  });

  /** A line's ends, or a box's corners (none for a text). */
  protected readonly handles = computed(() => {
    const annotation = this.annotator.selectedAnnotation();
    const box = this.selection();
    if (!annotation || !box || annotation.kind === 'text') return [];
    if (annotation.kind === 'line' || annotation.kind === 'arrow') {
      const [a, b] = annotation.points;
      return [
        { name: 'start' as Handle, x: a.x, y: a.y, cursor: 'cursor-move' },
        { name: 'end' as Handle, x: b.x, y: b.y, cursor: 'cursor-move' },
      ];
    }
    return [
      {
        name: 'nw' as Handle,
        x: box.x,
        y: box.y,
        cursor: 'cursor-nwse-resize',
      },
      {
        name: 'ne' as Handle,
        x: box.x + box.width,
        y: box.y,
        cursor: 'cursor-nesw-resize',
      },
      {
        name: 'sw' as Handle,
        x: box.x,
        y: box.y + box.height,
        cursor: 'cursor-nesw-resize',
      },
      {
        name: 'se' as Handle,
        x: box.x + box.width,
        y: box.y + box.height,
        cursor: 'cursor-nwse-resize',
      },
    ];
  });

  protected readonly class = computed(() =>
    cn(
      'relative block touch-none select-none overflow-hidden rounded-lg border outline-none',
      'focus-visible:ring-3 focus-visible:ring-ring/50',
      !this.annotator.readonly() &&
        (this.annotator.tool() === 'select'
          ? 'cursor-default'
          : this.annotator.tool() === 'text'
            ? 'cursor-text'
            : 'cursor-crosshair'),
      this.classInput(),
    ),
  );

  constructor() {
    ɵwarnIfUnnamed('scImageAnnotatorStage');
    const destroyRef = inject(DestroyRef);
    afterNextRender(() => {
      const observer = new ResizeObserver(([entry]) => {
        this.shown.set(entry.contentRect.width);
        const width = this.annotator.ɵnatural().width;
        this.annotator.ɵscale.set(width ? entry.contentRect.width / width : 1);
      });
      observer.observe(this.element);
      destroyRef.onDestroy(() => observer.disconnect());
    });
  }

  protected path(annotation: Annotation): string {
    if (annotation.kind === 'line' || annotation.kind === 'arrow') {
      const [a, b] = annotation.points;
      return `M${a.x} ${a.y} L${b.x} ${b.y}`;
    }
    return smoothPath(annotation.points);
  }

  protected box(annotation: Annotation) {
    return boxOf(
      annotation.points[0],
      annotation.points[1] ?? annotation.points[0],
    );
  }

  protected head(annotation: Annotation): string {
    return arrowHead(annotation)
      .map((p) => `${p.x},${p.y}`)
      .join(' ');
  }

  /** At least 12 screen pixels to aim at. */
  protected hitWidth(annotation: Annotation): number {
    return Math.max(annotation.width + 6 * this.unit(), 12 * this.unit());
  }

  protected labelOf(annotation: Annotation): string | null {
    return this.annotator.label()?.(annotation) ?? null;
  }

  protected onFocus(annotation: Annotation): void {
    if (!this.annotator.readonly()) this.annotator.selected.set(annotation.id);
  }

  protected onAnnotationKeydown(event: KeyboardEvent, annotation: Annotation) {
    if (this.annotator.readonly()) return;
    const { width, height } = this.annotator.ɵnatural();
    const step = (Math.max(width, height) / 100) * (event.shiftKey ? 10 : 1);
    const arrows: Record<string, [number, number]> = {
      ArrowLeft: [-step, 0],
      ArrowRight: [step, 0],
      ArrowUp: [0, -step],
      ArrowDown: [0, step],
    };
    const delta = arrows[event.key];
    if (delta) {
      event.preventDefault();
      if (event.altKey) this.annotator.resizeSelected(delta[0], delta[1]);
      else this.annotator.moveSelected(delta[0], delta[1]);
      return;
    }
    switch (event.key) {
      case 'Delete':
      case 'Backspace':
        event.preventDefault();
        this.annotator.remove(annotation.id);
        this.element.focus();
        break;
      case 'Escape':
        event.preventDefault();
        this.annotator.selected.set(null);
        this.element.focus();
        break;
      case 'Enter':
        if (annotation.kind === 'text') {
          event.preventDefault();
          event.stopPropagation();
          this.annotator.editing.set(annotation.id);
        }
        break;
    }
  }

  /** Enter on the stage: a shape of the current tool, in the middle, focused. */
  protected onEnter(event: Event): void {
    if (event.target !== this.element) return;
    event.preventDefault();
    const annotation = this.annotator.placeShape();
    if (annotation && annotation.kind !== 'text') {
      afterNextRender(() => this.focusAnnotation(annotation.id), {
        injector: this.injector,
      });
    }
  }

  protected onPointerDown(event: PointerEvent): void {
    if (
      event.button !== 0 ||
      this.annotator.readonly() ||
      !this.annotator.ready()
    ) {
      return;
    }
    const target = event.target as Element;
    if (target.closest('input, textarea')) return;
    const point = this.point(event);
    const handle = target.closest('[data-handle]')?.getAttribute('data-handle');
    const id = target
      .closest('[data-annotation-id]')
      ?.getAttribute('data-annotation-id');
    const tool = this.annotator.tool();

    this.element.setPointerCapture(event.pointerId);
    this.annotator.ɵbegin();

    const selected = this.annotator.selectedAnnotation();
    if (handle && selected) {
      this.gesture = {
        kind: 'resize',
        id: selected.id,
        handle: handle as Handle,
        start: selected,
      };
      return;
    }
    switch (tool) {
      case 'select':
        if (id) {
          this.annotator.selected.set(id);
          this.gesture = { kind: 'move', id, from: point };
        } else {
          this.annotator.selected.set(null);
        }
        return;
      case 'eraser':
        this.gesture = { kind: 'erase' };
        if (id) this.annotator.remove(id);
        return;
      case 'text': {
        const annotation = this.annotator.create('text', [point]);
        this.annotator.add(annotation);
        this.annotator.selected.set(annotation.id);
        // Its field ends the step, once it is written.
        this.annotator.editing.set(annotation.id);
        return;
      }
      default:
        this.annotator.selected.set(null);
        this.gesture = { kind: 'draw' };
        this.draft.set(
          this.annotator.create(
            tool as ScImageAnnotatorKind,
            tool === 'pen' || tool === 'highlighter' ? [point] : [point, point],
          ),
        );
    }
  }

  protected onPointerMove(event: PointerEvent): void {
    const gesture = this.gesture;
    if (!gesture) return;
    const point = this.point(event);
    switch (gesture.kind) {
      case 'draw':
        this.draft.update((draft) =>
          !draft
            ? draft
            : draft.kind === 'pen' || draft.kind === 'highlighter'
              ? { ...draft, points: addPoint(draft.points, point) }
              : { ...draft, points: [draft.points[0], point] },
        );
        break;
      case 'move':
        this.annotator.change(gesture.id, (a) =>
          translate(a, point.x - gesture.from.x, point.y - gesture.from.y),
        );
        this.gesture = { ...gesture, from: point };
        break;
      case 'resize':
        this.annotator.change(gesture.id, () =>
          this.resized(gesture.start, gesture.handle, point),
        );
        break;
      case 'erase': {
        const under = this.element.ownerDocument
          .elementFromPoint(event.clientX, event.clientY)
          ?.closest('[data-annotation-id]')
          ?.getAttribute('data-annotation-id');
        if (under) this.annotator.remove(under);
        break;
      }
    }
  }

  protected onPointerUp(): void {
    const draft = this.draft();
    if (draft && this.drawn(draft)) this.annotator.add(draft);
    this.draft.set(null);
    this.gesture = null;
    // A new text is still being written: its field ends the step.
    if (!this.annotator.editing()) this.annotator.ɵend();
  }

  /** Big enough to keep: a stroke of two points, a shape of a few pixels. */
  private drawn(annotation: Annotation): boolean {
    if (annotation.kind === 'pen' || annotation.kind === 'highlighter') {
      return annotation.points.length > 1;
    }
    const box = bounds(annotation);
    return Math.max(box.width, box.height) > 3 * this.unit();
  }

  private resized(start: Annotation, handle: Handle, point: Point): Annotation {
    if (handle === 'start')
      return { ...start, points: [point, start.points[1]] };
    if (handle === 'end') return { ...start, points: [start.points[0], point] };
    const box = bounds(start);
    const fixed = {
      x: handle.endsWith('w') ? box.x + box.width : box.x,
      y: handle.startsWith('n') ? box.y + box.height : box.y,
    };
    const to = boxOf(fixed, point);
    return fit(start, {
      ...to,
      width: Math.max(to.width, 2),
      height: Math.max(to.height, 2),
    });
  }

  private focusAnnotation(id: string): void {
    this.element
      .querySelector<SVGGElement>(`[data-annotation-id="${id}"]`)
      ?.focus();
  }

  /** The event's point, in the image's pixels. */
  private point(event: MouseEvent): Point {
    const rect = this.element.getBoundingClientRect();
    const { width, height } = this.annotator.ɵnatural();
    return {
      x: ((event.clientX - rect.left) / rect.width) * width,
      y: ((event.clientY - rect.top) / rect.height) * height,
    };
  }
}
