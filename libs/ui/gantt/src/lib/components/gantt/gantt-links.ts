import { _IdGenerator } from '@angular/cdk/a11y';
import {
  Component,
  ElementRef,
  ViewEncapsulation,
  afterEveryRender,
  computed,
  inject,
  input,
  signal,
} from '@angular/core';
import { cn } from '@semantic-components/ui';
import { ScGantt } from './gantt';

/** A link's path, from a bar's end to the start of the bar that follows it. */
interface ScGanttLinkPath {
  readonly key: string;
  readonly d: string;
}

/** Room for the arrow's turn, in px. */
const TURN = 8;

/**
 * The arrows between bars (finish to start): from each bar named in another's
 * `dependencies` to that bar. Drawn, not read: say the dependencies in a
 * cell. Inside `scGanttScale`, so it runs down the rows from there.
 *
 * ```html
 * <svg scGanttLinks></svg>
 * ```
 */
@Component({
  selector: 'svg[scGanttLinks]',
  template: `
    <svg:defs>
      <svg:marker
        [id]="arrowId"
        viewBox="0 0 6 6"
        refX="6"
        refY="3"
        markerWidth="6"
        markerHeight="6"
        orient="auto"
      >
        <svg:path d="M0,0 L6,3 L0,6 z" fill="currentColor" />
      </svg:marker>
    </svg:defs>
    @for (link of paths(); track link.key) {
      <svg:path
        [attr.d]="link.d"
        fill="none"
        stroke="currentColor"
        stroke-width="1.25"
        [attr.marker-end]="'url(#' + arrowId + ')'"
      />
    }
  `,
  host: {
    'data-slot': 'gantt-links',
    'aria-hidden': 'true',
    '[attr.width]': 'gantt.width()',
    '[attr.height]': 'gantt.bodyHeight()',
    '[class]': 'class()',
  },
  encapsulation: ViewEncapsulation.None,
})
export class ScGanttLinks {
  protected readonly gantt = inject(ScGantt);
  private readonly element =
    inject<ElementRef<SVGSVGElement>>(ElementRef).nativeElement;

  readonly classInput = input<string>('', { alias: 'class' });

  protected readonly arrowId = inject(_IdGenerator).getId('sc-gantt-arrow-');

  /** Each shown bar's middle, from the top of the rows (measured after each render). */
  private readonly middles = signal<ReadonlyMap<string, number>>(new Map());

  protected readonly paths = computed(() => {
    const middles = this.middles();
    const bars = new Map(
      this.gantt
        .bars()
        .filter((bar) => bar.id() !== undefined)
        .map((bar) => [bar.id() as string, bar]),
    );
    const paths: ScGanttLinkPath[] = [];
    for (const to of bars.values()) {
      const y2 = middles.get(to.id() as string);
      if (y2 === undefined) continue;
      for (const fromId of to.dependencies()) {
        const from = bars.get(fromId);
        const y1 = middles.get(fromId);
        if (!from || y1 === undefined) continue;
        // A milestone's diamond: from and to its points.
        const x1 = from.milestone()
          ? from.x() + from.width() / 2 + 6
          : from.x() + from.width();
        const x2 = to.milestone() ? to.x() + to.width() / 2 - 6 : to.x();
        paths.push({
          key: `${fromId}>${to.id()}`,
          d:
            x2 - x1 >= TURN * 2
              ? // Room: out, down, in.
                `M${x1},${y1} H${x1 + TURN} V${y2} H${x2}`
              : // No room: out, down between the rows, back, down, in.
                `M${x1},${y1} H${x1 + TURN} V${(y1 + y2) / 2} H${x2 - TURN} V${y2} H${x2}`,
        });
      }
    }
    return paths;
  });

  protected readonly class = computed(() =>
    cn(
      'text-muted-foreground pointer-events-none absolute top-full start-0 overflow-visible',
      // Its x runs with the timeline: mirrored in right-to-left.
      'rtl:-scale-x-100',
      this.classInput(),
    ),
  );

  constructor() {
    afterEveryRender({
      read: () => {
        const top = this.element.getBoundingClientRect().top;
        const middles = new Map<string, number>();
        for (const bar of this.gantt.bars()) {
          const id = bar.id();
          if (id === undefined || !bar.element.isConnected) continue;
          const rect = bar.element.getBoundingClientRect();
          if (rect.height === 0) continue;
          middles.set(id, Math.round(rect.top + rect.height / 2 - top));
        }
        const old = this.middles();
        if (
          old.size !== middles.size ||
          [...middles].some(([id, y]) => old.get(id) !== y)
        )
          this.middles.set(middles);
      },
    });
  }
}
