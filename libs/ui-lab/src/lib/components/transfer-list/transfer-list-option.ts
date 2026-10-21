import { Option } from '@angular/aria/listbox';
import {
  Component,
  ViewEncapsulation,
  computed,
  inject,
  input,
} from '@angular/core';
import { cn, useActiveOption } from '@semantic-components/ui';
import { ScTransferListPane } from './transfer-list-pane';

/**
 * An item in a side's listbox — `[scTransferListOption]="item.id"`,
 * `[label]` for typeahead, `[disabled]`. A double-click moves it across.
 */
@Component({
  selector: '[scTransferListOption]',
  hostDirectives: [
    {
      directive: Option,
      inputs: ['value: scTransferListOption', 'label', 'disabled'],
    },
  ],
  template: `
    <span
      class="border-input group-aria-selected/option:border-primary group-aria-selected/option:bg-primary group-aria-selected/option:text-primary-foreground grid size-4 shrink-0 place-items-center rounded-[4px] border"
      aria-hidden="true"
    >
      <svg
        viewBox="0 0 24 24"
        class="hidden size-3 group-aria-selected/option:block"
        fill="none"
        stroke="currentColor"
        stroke-width="3"
      >
        <path d="M20 6 9 17l-5-5" />
      </svg>
    </span>
    <span class="min-w-0 flex-1"><ng-content /></span>
  `,
  host: {
    'data-slot': 'transfer-list-option',
    '[class]': 'class()',
    '(dblclick)': 'onDoubleClick()',
    '(pointermove)': 'onPointerMove()',
  },
  encapsulation: ViewEncapsulation.None,
})
export class ScTransferListOption {
  private readonly pane = inject(ScTransferListPane);
  private readonly option = inject<Option<string>>(Option);
  protected readonly onPointerMove = useActiveOption(this.option);

  readonly classInput = input<string>('', { alias: 'class' });

  protected readonly class = computed(() =>
    cn(
      'group/option flex cursor-pointer items-center gap-2 rounded-md px-2 py-1.5 text-sm outline-none select-none',
      'hover:bg-accent hover:text-accent-foreground focus-visible:bg-accent focus-visible:text-accent-foreground focus-visible:ring-2 focus-visible:ring-ring/50',
      'aria-disabled:pointer-events-none aria-disabled:opacity-50',
      this.classInput(),
    ),
  );

  protected onDoubleClick(): void {
    if (this.option.disabled()) return;
    const id = this.option.value();
    this.pane.list.move(
      [id],
      this.pane.side() === 'source' ? 'target' : 'source',
    );
  }
}
