import { Directive, computed, input } from '@angular/core';
import { cn } from '../../utils';

/** What the group needs of a tooltip. */
export interface ScTooltipGroupMember {
  hide(): void;
}

/**
 * Tooltips side by side — a toolbar's: once one has shown, a neighbour opens
 * at once if the pointer reaches it within `timeout`, and the one before
 * closes (Base UI's provider). One at a time.
 */
@Directive({
  selector: '[scTooltipGroup]',
  host: { '[class]': 'class()' },
})
export class ScTooltipGroup {
  readonly classInput = input<string>('', { alias: 'class' });
  /** How long after a tooltip closed the next one still opens at once (ms). */
  readonly timeout = input(400);

  private lastClosed = -Infinity;
  private current: ScTooltipGroupMember | null = null;

  protected readonly class = computed(() => cn(this.classInput()));

  /** Whether a tooltip of the group is open, or closed only just now. */
  warm(): boolean {
    return (
      this.current !== null ||
      performance.now() - this.lastClosed < this.timeout()
    );
  }

  /** A tooltip opened: the one before closes. */
  opened(member: ScTooltipGroupMember): void {
    const previous = this.current;
    this.current = member;
    if (previous && previous !== member) previous.hide();
  }

  closed(member: ScTooltipGroupMember): void {
    if (this.current === member) this.current = null;
    this.lastClosed = performance.now();
  }
}
