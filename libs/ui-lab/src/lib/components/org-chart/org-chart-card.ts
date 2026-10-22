import { _IdGenerator } from '@angular/cdk/a11y';
import {
  Directive,
  ElementRef,
  computed,
  forwardRef,
  inject,
  input,
} from '@angular/core';
import { cn } from '@semantic-components/ui';
import { ScOrgChartItem } from './org-chart-item';

/**
 * A person's card: what is seen, and what names them. Not focusable — the
 * item (`li`) takes focus, clicks and keys — so a `div`, not a button.
 */
@Directive({
  selector: 'div[scOrgChartCard]',
  host: {
    'data-slot': 'org-chart-card',
    '[id]': 'id',
    '[attr.data-selected]': 'item.treeItem.selected() || null',
    '[attr.data-disabled]': 'item.treeItem.disabled() || null',
    '[class]': 'class()',
  },
})
export class ScOrgChartCard {
  protected readonly item = inject(forwardRef(() => ScOrgChartItem));
  private readonly element = inject<ElementRef<HTMLElement>>(ElementRef);

  readonly id = inject(_IdGenerator).getId('sc-org-chart-card-');
  readonly classInput = input<string>('', { alias: 'class' });

  protected readonly class = computed(() =>
    cn(
      'bg-card text-card-foreground ring-foreground/10 relative flex w-max cursor-pointer items-center gap-3 rounded-xl p-3 text-start text-sm ring-1 transition-[background-color,box-shadow] select-none',
      'hover:bg-accent/50',
      'data-selected:bg-accent data-selected:text-accent-foreground data-selected:ring-primary data-selected:ring-2',
      'data-disabled:pointer-events-none data-disabled:opacity-50',
      this.classInput(),
    ),
  );

  /** Its text, as typed to jump to it. */
  text(): string {
    return this.element.nativeElement.textContent ?? '';
  }
}
