import { DOCUMENT } from '@angular/common';
import {
  InjectionToken,
  Service,
  computed,
  inject,
  signal,
} from '@angular/core';

/** A heading in a table of contents. */
export interface ScTocItem {
  /** The heading's id: the link's target. */
  readonly id: string;
  /** The heading's text. */
  readonly text: string;
  /** Its level: 2 for an `h2`, or its `aria-level`. */
  readonly level: number;
  /** How deep under the shallowest heading listed: 0, 1, 2… */
  readonly depth: number;
}

/**
 * The ids made, page-wide — every scope's: a heading can be made before it is
 * in the document (in a tab not shown yet), where `getElementById` misses it.
 */
const SC_TOC_IDS = new InjectionToken<Set<string>>('SC_TOC_IDS', {
  providedIn: 'root',
  factory: () => new Set<string>(),
});

interface ScTocEntry {
  readonly id: string;
  readonly text: string;
  readonly level: number;
  readonly element: HTMLElement;
}

/**
 * The headings (`scTocHeading`) of the page, in document order — or of a
 * `scTocScope`, which provides its own.
 */
@Service()
export class ScTocRegistry {
  private readonly document = inject(DOCUMENT);
  private readonly made = inject(SC_TOC_IDS);
  private readonly entries = signal<readonly ScTocEntry[]>([]);

  readonly items = computed<readonly ScTocItem[]>(() => {
    const entries = this.entries();
    const top = Math.min(...entries.map((entry) => entry.level));
    return entries.map(({ id, text, level }) => ({
      id,
      text,
      level,
      depth: level - top,
    }));
  });

  /** Listed, in document order; returns its removal. */
  register(entry: ScTocEntry): () => void {
    this.entries.update((entries) =>
      [...entries, entry].sort((a, b) =>
        a.element.compareDocumentPosition(b.element) &
        Node.DOCUMENT_POSITION_FOLLOWING
          ? -1
          : 1,
      ),
    );
    return () => {
      this.made.delete(entry.id);
      this.entries.update((entries) => entries.filter((e) => e !== entry));
    };
  }

  /**
   * An id from the text, unique on the page: "Basic" twice is `basic`, then
   * `basic-2`. Letters of any script are kept (`الإعداد`), as they are.
   */
  uniqueId(text: string): string {
    const slug =
      text
        .normalize('NFC')
        .toLowerCase()
        .replace(/[^\p{L}\p{M}\p{N}\s-]/gu, '')
        .trim()
        .replace(/[\s-]+/g, '-') || 'section';
    const taken = (id: string) =>
      this.made.has(id) || !!this.document.getElementById(id);
    let id = slug;
    for (let n = 2; taken(id); n++) id = `${slug}-${n}`;
    this.made.add(id);
    return id;
  }
}
