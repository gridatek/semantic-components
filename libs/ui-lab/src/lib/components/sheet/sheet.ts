import { _IdGenerator } from '@angular/cdk/a11y';
import {
  ChangeDetectionStrategy,
  Component,
  computed,
  effect,
  ElementRef,
  inject,
  input,
  signal,
  ViewEncapsulation,
} from '@angular/core';
import { cn } from '../../utils';
import { ScSheetProvider, SheetSide } from './sheet-provider';

type ScSheetState = 'open' | 'closed';

const sidePositionClasses: Record<SheetSide, string> = {
  top: 'inset-x-0 top-0 border-b',
  right: 'inset-y-0 right-0 h-full w-3/4 border-l sm:max-w-sm',
  bottom: 'inset-x-0 bottom-0 border-t',
  left: 'inset-y-0 left-0 h-full w-3/4 border-r sm:max-w-sm',
};

const sideAnimationClasses: Record<SheetSide, string> = {
  top: 'slide-in-from-top data-[state=closed]:slide-out-to-top',
  right: 'slide-in-from-right data-[state=closed]:slide-out-to-right',
  bottom: 'slide-in-from-bottom data-[state=closed]:slide-out-to-bottom',
  left: 'slide-in-from-left data-[state=closed]:slide-out-to-left',
};

@Component({
  selector: 'div[sc-sheet]',
  template: `
    <ng-content />
  `,
  host: {
    'data-slot': 'sheet',
    role: 'dialog',
    'aria-modal': 'true',
    '[attr.aria-labelledby]': 'titleId',
    '[attr.aria-describedby]': 'descriptionId',
    '[attr.data-state]': 'state()',
    '[class]': 'class()',
    '[tabindex]': '-1',
    '(animationend)': 'onAnimationEnd($event)',
  },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ScSheet {
  private readonly elementRef = inject(ElementRef<HTMLElement>);

  readonly sheetProvider = inject(ScSheetProvider);
  readonly classInput = input<string>('', { alias: 'class' });
  readonly state = signal<ScSheetState>('closed');

  readonly sheetId = inject(_IdGenerator).getId('sc-sheet-');
  readonly titleId = `${this.sheetId}-title`;
  readonly descriptionId = `${this.sheetId}-description`;

  protected readonly class = computed(() => {
    const side = this.sheetProvider.side();

    return cn(
      'bg-background fixed z-50 flex flex-col gap-4 p-6 shadow-lg',
      sidePositionClasses[side],
      'animate-in fade-in-0 duration-300',
      sideAnimationClasses[side],
      'data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:duration-300',
      this.classInput(),
    );
  });

  constructor() {
    // Sync state with provider's open signal
    effect(() => {
      const isOpen = this.sheetProvider.open();
      this.state.set(isOpen ? 'open' : 'closed');
    });
  }

  protected onAnimationEnd(event: AnimationEvent): void {
    // Only trigger cleanup when close animation completes
    if (
      this.state() === 'closed' &&
      event.target === this.elementRef.nativeElement
    ) {
      this.sheetProvider.onSheetAnimationComplete();
    }
  }
}
