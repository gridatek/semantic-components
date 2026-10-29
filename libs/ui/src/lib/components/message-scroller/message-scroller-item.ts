import {
  Directive,
  ElementRef,
  booleanAttribute,
  computed,
  effect,
  inject,
  input,
} from '@angular/core';
import { cn } from '../../utils';
import { ScMessageScrollerState } from './message-scroller-state';

/**
 * A row of the conversation — every child of the content is one. Its
 * `messageId` lets `scrollToMessage` find it; `scrollAnchor` starts a turn:
 * scrolled near the top when it arrives, its reply growing below.
 */
@Directive({
  selector: 'div[scMessageScrollerItem]',
  host: {
    'data-slot': 'message-scroller-item',
    '[attr.data-message-id]': 'messageId() || null',
    '[attr.data-scroll-anchor]': 'scrollAnchor() ? "true" : "false"',
    '[class]': 'class()',
  },
})
export class ScMessageScrollerItem {
  private readonly state = inject(ScMessageScrollerState);
  private readonly element = inject<ElementRef<HTMLElement>>(ElementRef);

  readonly classInput = input<string>('', { alias: 'class' });
  /** A stable id: to scroll to it, to know it's on screen. */
  readonly messageId = input<string>('');
  /** Starts a turn — usually the reader's own messages. */
  readonly scrollAnchor = input(false, { transform: booleanAttribute });

  protected readonly class = computed(() =>
    cn(
      'min-w-0 shrink-0 [contain-intrinsic-size:auto_10rem] [content-visibility:auto]',
      this.classInput(),
    ),
  );

  constructor() {
    effect((onCleanup) => {
      const id = this.messageId();
      if (!id) return;
      onCleanup(this.state.registerMessage(id, this.element.nativeElement));
    });
  }
}
