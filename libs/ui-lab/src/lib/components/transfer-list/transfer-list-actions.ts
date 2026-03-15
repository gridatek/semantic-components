import {
  ChangeDetectionStrategy,
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
      aria-label="Move selected to right"
    >
      <svg siChevronRightIcon class="size-[18px]"></svg>
    </button>
    <button
      type="button"
      [class]="buttonClass()"
      [disabled]="state.selectedTargetIds().size === 0"
      (click)="state.moveToSource()"
      aria-label="Move selected to left"
    >
      <svg siChevronLeftIcon class="size-[18px]"></svg>
    </button>
    <button
      type="button"
      [class]="buttonClass()"
      [disabled]="state.sourceItems().length === 0"
      (click)="state.moveAllToTarget()"
      aria-label="Move all to right"
    >
      <svg siChevronsRightIcon class="size-[18px]"></svg>
    </button>
    <button
      type="button"
      [class]="buttonClass()"
      [disabled]="state.targetItems().length === 0"
      (click)="state.moveAllToSource()"
      aria-label="Move all to left"
    >
      <svg siChevronsLeftIcon class="size-[18px]"></svg>
    </button>
  `,
  host: {
    'data-slot': 'transfer-list-actions',
    '[class]': 'class()',
  },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ScTransferListActions {
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
