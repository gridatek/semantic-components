import {
  Directive,
  ElementRef,
  computed,
  contentChildren,
  effect,
  forwardRef,
  inject,
  input,
  model,
  untracked,
} from '@angular/core';
import { cn, elementDirection } from '../../utils';
import { ScResizablePanel } from './resizable-panel';

/** Which way its panels sit, and so the way they resize. */
export type ScResizableOrientation = 'horizontal' | 'vertical';

/** Sizes are kept to a hundredth of a percent. */
const round = (n: number) => Math.round(n * 100) / 100;

/**
 * Panels side by side (`horizontal`, the default) or stacked (`vertical`),
 * resized by the handles between them. `[(layout)]`: their sizes in %, in
 * order — to save one and restore it. As react-resizable-panels' Group
 * (shadcn's ResizablePanelGroup).
 */
@Directive({
  selector: 'div[scResizablePanelGroup]',
  host: {
    '[attr.data-orientation]': 'orientation()',
    '[class]': 'class()',
  },
})
export class ScResizablePanelGroup {
  private readonly element =
    inject<ElementRef<HTMLElement>>(ElementRef).nativeElement;
  readonly classInput = input<string>('', { alias: 'class' });
  readonly orientation = input<ScResizableOrientation>('horizontal');
  /** The panels' sizes, in %, in order. */
  readonly layout = model<readonly number[]>([]);

  /** Its own panels: its direct children (a nested group has its own). */
  readonly panels = contentChildren(forwardRef(() => ScResizablePanel));

  protected readonly class = computed(() =>
    cn(
      'flex size-full',
      // Plain classes, not data-[orientation=…]: (they'd outrank yours).
      this.orientation() === 'vertical' ? 'flex-col' : 'flex-row',
      this.classInput(),
    ),
  );

  constructor() {
    // No layout yet, or not one for these panels: their default sizes,
    // the rest shared by those without one.
    effect(() => {
      const panels = this.panels();
      const layout = untracked(this.layout);
      if (!panels.length || layout.length === panels.length) return;
      const given = panels.map((p) => p.defaultSize());
      const taken = given.reduce<number>((sum, s) => sum + (s ?? 0), 0);
      const open = given.filter((s) => s === undefined).length;
      const share = open ? Math.max(0, 100 - taken) / open : 0;
      untracked(() => this.layout.set(given.map((s) => round(s ?? share))));
    });
  }

  /** A panel's size, in %. */
  sizeOf(panel: ScResizablePanel): number {
    return this.layout()[this.panels().indexOf(panel)] ?? 0;
  }

  /** The panels on either side of a handle, by the DOM. */
  around(handle: HTMLElement): {
    before?: ScResizablePanel;
    after?: ScResizablePanel;
  } {
    const find = (el: Element | null) =>
      this.panels().find((p) => p.element === el);
    return {
      before: find(handle.previousElementSibling),
      after: find(handle.nextElementSibling),
    };
  }

  /** Its length along its axis (px). */
  length(): number {
    const r = this.element.getBoundingClientRect();
    return this.orientation() === 'vertical' ? r.height : r.width;
  }

  /** Right to left, horizontally: a drag or an arrow the other way. */
  reversed(): boolean {
    return (
      this.orientation() === 'horizontal' &&
      elementDirection(this.element) === 'rtl'
    );
  }

  /**
   * Gives `before` the size `wanted` (%), taken from or given to `after`,
   * within both panels' limits; from `start`, the layout when it began.
   */
  resize(
    before: ScResizablePanel,
    after: ScResizablePanel,
    wanted: number,
    start: readonly number[] = this.layout(),
  ): void {
    const panels = this.panels();
    const i = panels.indexOf(before);
    const j = panels.indexOf(after);
    if (i < 0 || j < 0) return;
    const pair = start[i] + start[j];
    let a = before.constrain(Math.min(pair, Math.max(0, wanted)));
    let b = after.constrain(pair - a);
    // The panel after couldn't take it: the panel before gives way.
    if (round(a + b) !== round(pair)) a = before.constrain(pair - b);
    b = pair - a;
    const next = [...start];
    next[i] = round(a);
    next[j] = round(b);
    if (next.some((s, k) => s !== this.layout()[k])) this.layout.set(next);
  }
}
