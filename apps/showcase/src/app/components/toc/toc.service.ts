import { Injectable, signal, DestroyRef, inject } from '@angular/core';

export interface TocItem {
  id: string;
  text: string;
  level: number;
}

@Injectable({
  providedIn: 'root',
})
export class TocService {
  private readonly destroyRef = inject(DestroyRef);
  private observer: IntersectionObserver | null = null;

  readonly items = signal<TocItem[]>([]);
  readonly activeId = signal<string>('');

  extractHeadings(container: HTMLElement): void {
    this.disconnectObserver();

    const headings = container.querySelectorAll('[data-toc]');
    const tocItems: TocItem[] = [];

    headings.forEach((heading) => {
      const element = heading as HTMLElement;
      let id = element.id;

      if (!id) {
        id = this.slugify(element.textContent || '');
        element.id = id;
      }

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
    }
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
