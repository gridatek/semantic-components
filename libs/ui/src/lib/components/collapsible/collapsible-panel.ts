import { _IdGenerator } from '@angular/cdk/a11y';
import {
  Directive,
  afterNextRender,
  booleanAttribute,
  computed,
  effect,
  inject,
  input,
  linkedSignal,
  signal,
} from '@angular/core';
import { cn } from 'cn';
import { ScCollapsible } from './collapsible';

/**
 * The content its trigger shows and hides, written inside it. It opens and
 * closes with shadcn's animation (tw-animate's collapsible-down / -up, its
 * height to and from auto); closed, it is hidden — with `hiddenUntilFound`,
 * the browser's find-in-page still searches it, and a match opens it.
 */
@Directive({
  selector: 'div[scCollapsiblePanel]',
  host: {
    '[id]': 'id()',
    '[attr.hidden]': 'hidden()',
    '[attr.data-open]': 'collapsible.open() ? "" : null',
    '[attr.data-closed]': 'collapsible.open() ? null : ""',
    '[class]': 'class()',
    '(beforematch)': 'collapsible.open.set(true)',
    '(animationend)': 'onAnimationEnd($event)',
  },
})
export class ScCollapsiblePanel {
  protected readonly collapsible = inject(ScCollapsible);
  private readonly fallbackId = inject(_IdGenerator).getId(
    'sc-collapsible-panel-',
  );

  readonly classInput = input<string>('', { alias: 'class' });
  readonly idInput = input('', { alias: 'id' });
  /** Closed, still searched by find-in-page; a match opens it. */
  readonly hiddenUntilFound = input(false, { transform: booleanAttribute });

  protected readonly id = computed(() => this.idInput() || this.fallbackId);

  /** After its first render: what is open or closed then doesn't animate. */
  private readonly rendered = signal(false);

  /**
   * Just closed: its height on the way to nothing. The hidden attribute waits
   * for the end — it would hide it at once (display: none, or the size
   * containment of hidden="until-found").
   */
  private readonly closing = linkedSignal<boolean, boolean>({
    source: () => this.collapsible.open(),
    computation: (open, previous) =>
      !open && previous?.source === true && this.rendered(),
  });

  /**
   * Closed: the hidden attribute (Tailwind's base keeps it display: none over
   * any display class); searchable, the browser's hidden="until-found".
   */
  protected readonly hidden = computed(() => {
    if (this.collapsible.open() || this.closing()) return null;
    return this.hiddenUntilFound() ? 'until-found' : '';
  });

  protected readonly class = computed(() =>
    cn(
      'overflow-hidden',
      // shadcn's: tw-animate's keyframes, to and from height: auto (the
      // global interpolate-size: allow-keywords).
      this.rendered() &&
        'data-open:animate-collapsible-down data-closed:animate-collapsible-up motion-reduce:animate-none',
      this.classInput(),
    ),
  );

  constructor() {
    // Its id for the trigger's aria-controls.
    effect(() => this.collapsible.panelId.set(this.id()));
    afterNextRender(() => this.rendered.set(true));
    // No animation to end it (reduced motion, yours off): hidden anyway.
    effect((onCleanup) => {
      if (!this.closing()) return;
      const timer = setTimeout(() => this.closing.set(false), 400);
      onCleanup(() => clearTimeout(timer));
    });
  }

  protected onAnimationEnd(event: AnimationEvent): void {
    if (event.target === event.currentTarget && !this.collapsible.open())
      this.closing.set(false);
  }
}
