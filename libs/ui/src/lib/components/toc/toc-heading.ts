import {
  DestroyRef,
  Directive,
  ElementRef,
  HostAttributeToken,
  afterNextRender,
  computed,
  inject,
  input,
  signal,
} from '@angular/core';
import { cn } from 'cn';
import { ScTocRegistry } from './toc-registry';

/**
 * A heading listed in the table of contents: your `id`, or one from its text.
 * Its scroll margin is where it counts as reached — under a sticky header,
 * give it the header's height (`class="scroll-mt-20"`).
 */
@Directive({
  selector: '[scTocHeading]',
  host: {
    '[attr.id]': 'id()',
    '[class]': 'class()',
  },
})
export class ScTocHeading {
  private readonly registry = inject(ScTocRegistry);
  private readonly host =
    inject<ElementRef<HTMLElement>>(ElementRef).nativeElement;
  private readonly ownId = inject(new HostAttributeToken('id'), {
    optional: true,
  });

  readonly classInput = input<string>('', { alias: 'class' });

  protected readonly class = computed(() =>
    cn('scroll-mt-16', this.classInput()),
  );

  /** Yours, or from the text once it is rendered (in the browser). */
  private readonly id = signal<string | null>(this.ownId);

  constructor() {
    const destroyRef = inject(DestroyRef);
    afterNextRender(() => {
      const text = (this.host.textContent ?? '').replace(/\s+/g, ' ').trim();
      const id = this.ownId ?? this.registry.uniqueId(text);
      // At once: the next heading's id, made in the same frame, sees it.
      this.host.id = id;
      this.id.set(id);
      destroyRef.onDestroy(
        this.registry.register({
          id,
          text,
          level: this.level(),
          element: this.host,
        }),
      );
    });
  }

  private level(): number {
    const aria = Number(this.host.getAttribute('aria-level'));
    if (aria > 0) return aria;
    const tag = /^H([1-6])$/.exec(this.host.tagName);
    return tag ? Number(tag[1]) : 2;
  }
}
