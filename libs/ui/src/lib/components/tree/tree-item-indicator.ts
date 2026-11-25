import { Directive, ElementRef, computed, inject, input } from '@angular/core';
import { cn } from 'cn';
import { ScTreeItem } from './tree-item';

/**
 * A branch's chevron, yours inside (pointing to the end): turned down when
 * open, mirrored right to left. Pressing it opens or closes the branch, even
 * when the row doesn't. Put one in every row: unseen on a leaf, it keeps the
 * names in line.
 */
@Directive({
  selector: 'span[scTreeItemIndicator]',
  host: {
    'aria-hidden': 'true',
    '[class]': 'class()',
  },
})
export class ScTreeItemIndicator {
  private readonly item = inject(ScTreeItem);

  readonly classInput = input<string>('', { alias: 'class' });

  private readonly class = computed(() =>
    cn(
      'flex size-4 shrink-0 items-center justify-center text-muted-foreground transition-transform motion-reduce:transition-none',
      this.item.expanded() ? 'rotate-90' : 'rtl:-scale-x-100',
      !this.item.branch() && 'invisible',
      this.classInput(),
    ),
  );

  constructor() {
    this.item.indicator =
      inject<ElementRef<HTMLElement>>(ElementRef).nativeElement;
  }
}
