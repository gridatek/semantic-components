import {
  Component,
  ViewEncapsulation,
  computed,
  inject,
  input,
} from '@angular/core';
import { cn } from '@semantic-components/ui';
import {
  SiChevronLeftIcon,
  SiChevronRightIcon,
  SiChevronsLeftIcon,
  SiChevronsRightIcon,
} from '@semantic-icons/lucide-icons';
import { ScTransferListState } from './transfer-list-state';

@Component({
  selector: 'div[scTransferListActions]',
  imports: [
    SiChevronRightIcon,
    SiChevronLeftIcon,
    SiChevronsRightIcon,
    SiChevronsLeftIcon,
  ],
  template: `
    <button
      type="button"
      [class]="buttonClass()"
      [disabled]="state.selectedSourceIds().size === 0"
      (click)="state.moveToTarget()"
      [attr.aria-label]="moveSelectedLabel()"
    >
      <svg siChevronRightIcon class="size-[18px] rtl:rotate-180"></svg>
    </button>
    <button
      type="button"
      [class]="buttonClass()"
      [disabled]="state.selectedTargetIds().size === 0"
      (click)="state.moveToSource()"
      [attr.aria-label]="returnSelectedLabel()"
    >
      <svg siChevronLeftIcon class="size-[18px] rtl:rotate-180"></svg>
    </button>
    <button
      type="button"
      [class]="buttonClass()"
      [disabled]="state.sourceItems().length === 0"
      (click)="state.moveAllToTarget()"
      [attr.aria-label]="moveAllLabel()"
    >
      <svg siChevronsRightIcon class="size-[18px] rtl:rotate-180"></svg>
    </button>
    <button
      type="button"
      [class]="buttonClass()"
      [disabled]="state.targetItems().length === 0"
      (click)="state.moveAllToSource()"
      [attr.aria-label]="returnAllLabel()"
    >
      <svg siChevronsLeftIcon class="size-[18px] rtl:rotate-180"></svg>
    </button>
  `,
  host: {
    '[class]': 'class()',
  },
  encapsulation: ViewEncapsulation.None,
})
export class ScTransferListActions {
  /**
   * The names of its buttons — write them: move the selected items to the
   * target ("Move selected to right"), back to the source, all of them to the
   * target, all back.
   */
  readonly moveSelectedLabel = input.required<string>();
  readonly returnSelectedLabel = input.required<string>();
  readonly moveAllLabel = input.required<string>();
  readonly returnAllLabel = input.required<string>();
  readonly classInput = input<string>('', { alias: 'class' });

  protected readonly state = inject(ScTransferListState);

  protected readonly class = computed(() =>
    cn('flex flex-col items-center justify-center gap-2', this.classInput()),
  );

  protected readonly buttonClass = computed(() =>
    cn(
      'inline-flex h-9 w-9 items-center justify-center',
      'rounded-md border bg-background text-foreground',
      'hover:bg-accent hover:text-accent-foreground',
      'disabled:cursor-not-allowed disabled:opacity-50',
      'transition-colors',
    ),
  );
}
