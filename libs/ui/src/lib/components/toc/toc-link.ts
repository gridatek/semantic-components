import { Location } from '@angular/common';
import {
  DestroyRef,
  Directive,
  ElementRef,
  computed,
  inject,
  input,
  numberAttribute,
  signal,
} from '@angular/core';
import { cn } from 'cn';
import { ScToc } from './toc';

/**
 * A link to a section: `scTocLink="its-id"`. Its `href` is this page at the
 * section — not `#id` alone, which `<base href="/">` makes the home page's.
 * The active one is `aria-current="location"` and `data-active`.
 */
@Directive({
  selector: 'a[scTocLink]',
  host: {
    '[attr.href]': 'href()',
    '[attr.aria-current]': 'active() ? "location" : null',
    '[attr.data-active]': 'active() || null',
    '[attr.data-depth]': 'depth()',
    '[class]': 'class()',
    '(click)': 'go($event)',
  },
})
export class ScTocLink {
  private readonly toc = inject(ScToc);
  private readonly location = inject(Location);

  /** The id of the section it goes to. */
  readonly target = input.required<string>({ alias: 'scTocLink' });

  /** How deep under the shallowest heading: 0, 1, 2… (an item's `depth`). */
  readonly depth = input(0, { transform: numberAttribute });

  readonly classInput = input<string>('', { alias: 'class' });

  private readonly path = signal(this.location.path());

  private readonly href = computed(() =>
    this.location.prepareExternalUrl(`${this.path()}#${this.target()}`),
  );

  private readonly active = computed(
    () => this.toc.activeId() === this.target(),
  );

  protected readonly class = computed(() =>
    cn(
      'text-[0.8rem] no-underline transition-colors',
      this.active()
        ? 'text-foreground'
        : 'text-muted-foreground hover:text-foreground',
      ['', 'ps-4', 'ps-8', 'ps-12'][Math.min(Math.max(this.depth(), 0), 3)],
      this.classInput(),
    ),
  );

  constructor() {
    const element = inject<ElementRef<HTMLElement>>(ElementRef).nativeElement;
    const destroyRef = inject(DestroyRef);
    destroyRef.onDestroy(this.toc.addLink({ target: this.target, element }));
    const subscription = this.location.onUrlChange(() =>
      this.path.set(this.location.path()),
    );
    destroyRef.onDestroy(subscription);
  }

  /** A plain click: there, and in the address (a new tab is the browser's). */
  private go(event: MouseEvent): void {
    if (
      event.button !== 0 ||
      event.ctrlKey ||
      event.metaKey ||
      event.shiftKey ||
      event.altKey
    ) {
      return;
    }
    const id = this.target();
    if (!this.toc.goTo(id)) return;
    event.preventDefault();
    const url = `${this.location.path()}#${id}`;
    if (this.location.path(true) === url) this.location.replaceState(url);
    else this.location.go(url);
  }
}
