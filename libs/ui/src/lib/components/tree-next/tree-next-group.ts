import {
  Directive,
  afterNextRender,
  computed,
  effect,
  inject,
  input,
  linkedSignal,
  signal,
} from '@angular/core';
import { cn } from 'cn';
import { ScTreeNextItem } from './tree-next-item';

/**
 * A branch's children, as a list (`role="group"`): it opens and closes with
 * the Collapsible's animation, and is hidden closed. Its children go in a
 * `scTreeNextGroupContent` template inside it.
 */
@Directive({
  selector: 'ul[scTreeNextGroup]',
  host: {
    role: 'group',
    '[attr.hidden]': 'hidden()',
    '[class]': 'class()',
    '(animationend)': 'onAnimationEnd($event)',
  },
})
export class ScTreeNextGroup {
  private readonly item = inject(ScTreeNextItem);

  readonly classInput = input<string>('', { alias: 'class' });

  private readonly open = computed(() => this.item.expanded());

  /** After its first render: what is open or closed then doesn't animate. */
  private readonly rendered = signal(false);

  /** Just closed: on its way to no height; hidden at the end. */
  private readonly closing = linkedSignal<boolean, boolean>({
    source: () => this.open(),
    computation: (open, previous) =>
      !open && previous?.source === true && this.rendered(),
  });

  /** Just opened: on its way to its content's height. */
  private readonly opening = linkedSignal<boolean, boolean>({
    source: () => this.open(),
    computation: (open, previous) =>
      open && previous?.source === false && this.rendered(),
  });

  private readonly hidden = computed(() =>
    this.open() || this.closing() ? null : '',
  );

  private readonly class = computed(() =>
    cn(
      // Indented: each level a step further in.
      'flex flex-col gap-px ps-4',
      (this.opening() || this.closing()) && 'overflow-hidden',
      this.rendered() &&
        (this.open()
          ? 'animate-collapsible-down'
          : 'animate-collapsible-up fill-mode-forwards'),
      'motion-reduce:animate-none',
      this.classInput(),
    ),
  );

  constructor() {
    afterNextRender(() => this.rendered.set(true));
    // No animation to end it (reduced motion, yours off): done anyway.
    effect((onCleanup) => {
      if (!this.opening() && !this.closing()) return;
      const timer = setTimeout(() => {
        this.opening.set(false);
        this.closing.set(false);
      }, 400);
      onCleanup(() => clearTimeout(timer));
    });
  }

  private onAnimationEnd(event: AnimationEvent): void {
    if (event.target !== event.currentTarget) return;
    if (this.open()) this.opening.set(false);
    else this.closing.set(false);
  }
}
