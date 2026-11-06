import { _IdGenerator } from '@angular/cdk/a11y';
import {
  Directive,
  ElementRef,
  booleanAttribute,
  computed,
  forwardRef,
  inject,
  input,
} from '@angular/core';
import { cn } from '../../utils';
import { ScResizablePanelGroupNext } from './resizable-panel-group-next';

/**
 * A panel of the group, sized in %: `defaultSize` (else a share of what is
 * left), `minSize`, `maxSize`. `collapsible`: dragged below half its minimum,
 * or Enter on its handle, it shuts to `collapsedSize`. A direct child of its
 * group. As react-resizable-panels' Panel.
 */
@Directive({
  selector: 'div[scResizablePanelNext]',
  host: {
    '[id]': 'id',
    '[attr.data-collapsed]': 'collapsed() ? "" : null',
    '[style.flex]': 'flex()',
    '[class]': 'class()',
  },
})
export class ScResizablePanelNext {
  readonly element = inject<ElementRef<HTMLElement>>(ElementRef).nativeElement;
  private readonly group = inject(forwardRef(() => ScResizablePanelGroupNext));
  readonly classInput = input<string>('', { alias: 'class' });

  /** Its size at first (%); without one, it shares what the others leave. */
  readonly defaultSize = input<number | undefined>(undefined);
  readonly minSize = input(0);
  readonly maxSize = input(100);
  /** It can be shut: to `collapsedSize`, below half its minimum. */
  readonly collapsible = input(false, { transform: booleanAttribute });
  readonly collapsedSize = input(0);

  readonly id = inject(_IdGenerator).getId('sc-resizable-panel-');

  /** Its size now (%). */
  readonly size = computed(() => this.group.sizeOf(this));
  readonly collapsed = computed(
    () => this.collapsible() && this.size() <= this.collapsedSize(),
  );
  /** Its size before it was shut: opened again, it goes back to it. */
  private lastOpen: number | undefined;

  protected readonly flex = computed(() => `${this.size()} 1 0%`);

  protected readonly class = computed(() =>
    cn('overflow-hidden', this.classInput()),
  );

  /** A size it may take: within its limits, or shut. */
  constrain(size: number): number {
    if (this.collapsible() && size < this.minSize() / 2)
      return this.collapsedSize();
    return Math.min(this.maxSize(), Math.max(this.minSize(), size));
  }

  /** Shut, or open again, through the handle beside it. */
  toggle(other: ScResizablePanelNext, order: 'before' | 'after'): void {
    if (!this.collapsible()) return;
    let wanted: number;
    if (this.collapsed()) wanted = this.lastOpen ?? Math.max(this.minSize(), 1);
    else {
      this.lastOpen = this.size();
      wanted = this.collapsedSize();
    }
    if (order === 'before') this.group.resize(this, other, wanted);
    else this.group.resize(other, this, other.size() + this.size() - wanted);
  }
}
