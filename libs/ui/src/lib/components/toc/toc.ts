import { DOCUMENT } from '@angular/common';
import {
  DestroyRef,
  Directive,
  ElementRef,
  afterNextRender,
  afterRenderEffect,
  computed,
  inject,
  input,
  signal,
} from '@angular/core';
import { cn } from 'cn';
import { ScTocRegistry } from './toc-registry';

/** What the table of contents needs of a link. */
export interface ScTocLinkRef {
  /** The id of the section it goes to. */
  readonly target: () => string;
  readonly element: HTMLElement;
}

/**
 * The table of contents: a navigation, named by you (`aria-label`). Lists the
 * headings (`items()`), and marks the link of the section read (`activeId()`):
 * the last one whose heading has reached the top of the page — or of the box
 * that scrolls it — or the last one, scrolled to the end.
 */
@Directive({
  selector: 'nav[scToc]',
  exportAs: 'scToc',
  host: {
    '[class]': 'class()',
  },
})
export class ScToc {
  private readonly document = inject(DOCUMENT);
  private readonly host =
    inject<ElementRef<HTMLElement>>(ElementRef).nativeElement;

  readonly classInput = input<string>('', { alias: 'class' });

  private readonly class = computed(() => cn(this.classInput()));

  /** The headings (`scTocHeading`) of the page, or of its `scTocScope`. */
  readonly items = inject(ScTocRegistry).items;

  private readonly active = signal('');
  /** The id of the section read; empty on the server. */
  readonly activeId = this.active.asReadonly();

  private readonly links = signal<readonly ScTocLinkRef[]>([]);
  /** Kept as chosen until the reader scrolls: the last ones may not reach the top. */
  private chosen = false;
  private frame = 0;

  constructor() {
    const destroyRef = inject(DestroyRef);

    afterNextRender(() => {
      const view = this.document.defaultView;
      if (!view) return;
      const update = () => this.schedule();
      const release = () => {
        this.chosen = false;
      };
      const reader = ['wheel', 'touchstart', 'pointerdown', 'keydown'];
      // Captured: a box's scroll doesn't bubble.
      this.document.addEventListener('scroll', update, {
        capture: true,
        passive: true,
      });
      view.addEventListener('resize', update, { passive: true });
      reader.forEach((type) =>
        view.addEventListener(type, release, { capture: true, passive: true }),
      );
      destroyRef.onDestroy(() => {
        this.document.removeEventListener('scroll', update, { capture: true });
        view.removeEventListener('resize', update);
        reader.forEach((type) =>
          view.removeEventListener(type, release, { capture: true }),
        );
        view.cancelAnimationFrame(this.frame);
      });
    });

    // The links or the headings changed: measured again.
    afterRenderEffect(() => {
      this.links().forEach((link) => link.target());
      this.items();
      this.schedule();
    });

    // A list that scrolls keeps the active link in view.
    afterRenderEffect(() => {
      const id = this.active();
      const link = this.links().find((l) => l.target() === id)?.element;
      const nav = this.host;
      if (!link || nav.scrollHeight <= nav.clientHeight) return;
      const box = nav.getBoundingClientRect();
      const { top, bottom } = link.getBoundingClientRect();
      if (top < box.top) nav.scrollTop -= box.top - top;
      else if (bottom > box.bottom) nav.scrollTop += bottom - box.bottom;
    });
  }

  /** @internal Called by `scTocLink`; returns its removal. */
  addLink(link: ScTocLinkRef): () => void {
    this.links.update((links) => [...links, link]);
    return () => this.links.update((links) => links.filter((l) => l !== link));
  }

  /**
   * Goes to the section: scrolled to its heading (a jump, as a `#` link does),
   * focus moved there, its link marked. False if it isn't on the page.
   */
  goTo(id: string): boolean {
    const target = this.document.getElementById(id);
    if (!target) return false;
    const scroller = this.scroller(target);
    if (scroller) {
      // The box alone: the page stays where it is.
      scroller.scrollTop +=
        target.getBoundingClientRect().top -
        this.top(scroller) -
        this.margin(target);
    } else {
      target.scrollIntoView({ block: 'start' });
    }
    // Focus follows, for the keyboard and screen readers: on a heading too.
    if (target.tabIndex < 0 && !target.hasAttribute('tabindex')) {
      target.setAttribute('tabindex', '-1');
    }
    target.focus({ preventScroll: true });
    this.chosen = true;
    this.active.set(id);
    return true;
  }

  private schedule(): void {
    const view = this.document.defaultView;
    if (!view || this.frame) return;
    this.frame = view.requestAnimationFrame(() => {
      this.frame = 0;
      this.measure();
    });
  }

  private measure(): void {
    if (this.chosen) return;
    const targets = [...new Set(this.links().map((link) => link.target()))]
      .map((id) => this.document.getElementById(id))
      .filter((el): el is HTMLElement => !!el)
      .sort((a, b) =>
        a.compareDocumentPosition(b) & Node.DOCUMENT_POSITION_FOLLOWING
          ? -1
          : 1,
      );
    if (targets.length === 0) {
      this.active.set('');
      return;
    }
    const scroller = this.scroller(targets[0]);
    const top = scroller ? this.top(scroller) : 0;
    let active = targets[0];
    for (const target of targets) {
      const reached =
        target.getBoundingClientRect().top - this.margin(target) - top;
      if (reached > 1) break;
      active = target;
    }
    const box = scroller ?? this.document.scrollingElement;
    if (
      box &&
      box.scrollHeight > box.clientHeight &&
      box.scrollTop + box.clientHeight >= box.scrollHeight - 1
    ) {
      active = targets[targets.length - 1];
    }
    this.active.set(active.id);
  }

  /** Where a box's content starts, on screen: inside its border. */
  private top(box: HTMLElement): number {
    return box.getBoundingClientRect().top + box.clientTop;
  }

  /** A heading's scroll margin: where it counts as reached. */
  private margin(target: HTMLElement): number {
    return parseFloat(getComputedStyle(target).scrollMarginTop) || 0;
  }

  /** The box that scrolls the sections; none: the page. */
  private scroller(target: HTMLElement): HTMLElement | null {
    const root = this.document.documentElement;
    for (
      let el = target.parentElement;
      el && el !== root && el !== this.document.body;
      el = el.parentElement
    ) {
      const { overflowY } = getComputedStyle(el);
      if (
        /auto|scroll|overlay/.test(overflowY) &&
        el.scrollHeight > el.clientHeight
      ) {
        return el;
      }
    }
    return null;
  }
}
