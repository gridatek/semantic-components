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

type ScSheetState = 'idle' | 'open' | 'closed';

const sidePositionClasses: Record<SheetSide, string> = {
  top: 'inset-x-0 top-0 border-b',
  right: 'inset-y-0 right-0 h-full w-3/4 border-l sm:max-w-sm',
  bottom: 'inset-x-0 bottom-0 border-t',
  left: 'inset-y-0 left-0 h-full w-3/4 border-r sm:max-w-sm',
};

const sideAnimationClasses: Record<SheetSide, string> = {
  top: 'data-open:slide-in-from-top data-closed:slide-out-to-top',
  right: 'data-open:slide-in-from-right data-closed:slide-out-to-right',
  bottom: 'data-open:slide-in-from-bottom data-closed:slide-out-to-bottom',
  left: 'data-open:slide-in-from-left data-closed:slide-out-to-left',
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
    '[attr.data-idle]': 'state() === "idle" ? "" : null',
    '[attr.data-open]': 'state() === "open" ? "" : null',
    '[attr.data-closed]': 'state() === "closed" ? "" : null',
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
  protected readonly state = signal<ScSheetState>('idle');

  readonly sheetId = inject(_IdGenerator).getId('sc-sheet-');
  readonly titleId = `${this.sheetId}-title`;
  readonly descriptionId = `${this.sheetId}-description`;

  protected readonly class = computed(() => {
    const side = this.sheetProvider.side();

    return cn(
      'bg-background fixed z-50 flex flex-col gap-4 p-6 shadow-lg duration-300',
      sidePositionClasses[side],
      'data-idle:opacity-0',
      'data-open:animate-in data-open:fade-in-0',
      sideAnimationClasses[side],
      'data-closed:animate-out data-closed:fade-out-0',
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
      this.state.set('idle');
      this.sheetProvider.onSheetAnimationComplete();
    }
  }
}
