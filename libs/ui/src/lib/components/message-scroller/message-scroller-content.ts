import {
  Component,
  DestroyRef,
  ElementRef,
  ViewEncapsulation,
  afterNextRender,
  computed,
  inject,
  input,
  viewChild,
} from '@angular/core';
import { cn } from '../../utils';
import { ScMessageScrollerState } from './message-scroller-state';

/**
 * The messages, each in a `scMessageScrollerItem`: a log, so screen readers
 * hear the new ones — bind `aria-busy` while a reply streams, to hear it once
 * done. After them, the room an anchored turn needs to reach the top.
 */
@Component({
  selector: 'div[scMessageScrollerContent]',
  template: `
    <ng-content />
    <div
      #spacer
      aria-hidden="true"
      data-message-scroller-spacer=""
      hidden
    ></div>
  `,
  host: {
    'data-slot': 'message-scroller-content',
    role: 'log',
    'aria-relevant': 'additions',
    '[class]': 'class()',
  },
  encapsulation: ViewEncapsulation.None,
})
export class ScMessageScrollerContent {
  private readonly state = inject(ScMessageScrollerState);
  private readonly element = inject<ElementRef<HTMLElement>>(ElementRef);
  private readonly spacer =
    viewChild.required<ElementRef<HTMLElement>>('spacer');

  readonly classInput = input<string>('', { alias: 'class' });

  protected readonly class = computed(() =>
    cn('flex h-max min-h-full flex-col gap-6', this.classInput()),
  );

  constructor() {
    const destroyRef = inject(DestroyRef);
    afterNextRender(() => {
      const content = this.element.nativeElement;
      this.state.setContent(content, this.spacer().nativeElement);
      this.state.start();
      const rows = new MutationObserver(() => this.state.handleContentChange());
      rows.observe(content, { childList: true });
      let frame = 0;
      const sizes =
        typeof ResizeObserver === 'undefined'
          ? null
          : new ResizeObserver(() => {
              cancelAnimationFrame(frame);
              frame = requestAnimationFrame(() => this.state.handleResize());
            });
      sizes?.observe(content);
      destroyRef.onDestroy(() => {
        rows.disconnect();
        cancelAnimationFrame(frame);
        sizes?.disconnect();
        this.state.setContent(null, null);
      });
    });
  }
}
