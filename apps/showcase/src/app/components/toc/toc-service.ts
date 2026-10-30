import { DOCUMENT } from '@angular/common';
import {
  ApplicationRef,
  DestroyRef,
  Service,
  inject,
  signal,
} from '@angular/core';

export interface TocItem {
  id: string;
  text: string;
  level: number;
}

@Service()
export class TocService {
  private readonly destroyRef = inject(DestroyRef);
  private readonly document = inject(DOCUMENT);
  private readonly appRef = inject(ApplicationRef);
  private observer: IntersectionObserver | null = null;
  /** The address last scrolled to its section: once per address. */
  private scrolledTo = '';

  readonly items = signal<TocItem[]>([]);
  readonly activeId = signal<string>('');

  extractHeadings(container: HTMLElement): void {
    this.disconnectObserver();

    const headings = container.querySelectorAll('[data-toc]');
    const tocItems: TocItem[] = [];
    const used = new Set<string>();

    headings.forEach((heading) => {
      const element = heading as HTMLElement;
      let id = element.id;

      if (!id) {
        // Unique: a section and its demo can share a title ("Basic").
        const slug = this.slugify(element.textContent || '');
        id = slug;
        for (let n = 2; used.has(id) || this.document.getElementById(id); n++) {
          id = `${slug}-${n}`;
        }
        element.id = id;
      }
      used.add(id);

      if (id && element.textContent) {
        tocItems.push({
          id,
          text: element.textContent.trim(),
          level: parseInt(element.tagName[1], 10),
        });
      }
    });

    this.items.set(tocItems);

    if (tocItems.length > 0) {
      this.setupScrollSpy(container);
      this.scrollToFragment();
    }
  }

  /**
   * Loaded (or reloaded) at a section, `#id`: scrolled there. Not by the
   * router alone — the headings have no id until read here. And kept there
   * while the page settles (demos above take their size later and push it
   * down), until the reader scrolls, clicks or types — or 3 seconds.
   */
  private scrollToFragment(): void {
    const { hash, href } = this.document.location;
    if (!hash || href === this.scrolledTo) return;
    this.scrolledTo = href;
    const heading = this.document.getElementById(
      decodeURIComponent(hash.slice(1)),
    );
    const view = this.document.defaultView;
    if (!heading || !view) return;
    const pin = () => heading.scrollIntoView({ block: 'start' });
    const settling = new ResizeObserver(pin);
    const inputs = ['wheel', 'touchstart', 'pointerdown', 'keydown'];
    const stop = () => {
      settling.disconnect();
      clearTimeout(timeout);
      inputs.forEach((type) => view.removeEventListener(type, stop));
    };
    const timeout = setTimeout(stop, 3000);
    inputs.forEach((type) =>
      view.addEventListener(type, stop, { passive: true }),
    );
    this.appRef.whenStable().then(() => {
      pin();
      settling.observe(this.document.body);
    });
    this.destroyRef.onDestroy(stop);
  }

  private setupScrollSpy(container: HTMLElement): void {
    const headings = container.querySelectorAll('[data-toc][id]');
    if (headings.length === 0) return;

    this.observer = new IntersectionObserver(
      (entries) => {
        const visibleEntries = entries.filter((entry) => entry.isIntersecting);

        if (visibleEntries.length > 0) {
          const topEntry = visibleEntries.reduce((prev, curr) =>
            prev.boundingClientRect.top < curr.boundingClientRect.top
              ? prev
              : curr,
          );
          this.activeId.set(topEntry.target.id);
        }
      },
      {
        rootMargin: '-80px 0px -80% 0px',
        threshold: 0,
      },
    );

    headings.forEach((heading) => {
      this.observer?.observe(heading);
    });

    this.destroyRef.onDestroy(() => this.cleanup());
  }

  private disconnectObserver(): void {
    if (this.observer) {
      this.observer.disconnect();
      this.observer = null;
    }
  }

  cleanup(): void {
    this.disconnectObserver();
    this.items.set([]);
    this.activeId.set('');
  }

  private slugify(text: string): string {
    return text
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-');
  }
}
