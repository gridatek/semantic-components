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
import { ScAlertDialogProvider } from './alert-dialog-provider';

type ScAlertDialogState = 'open' | 'closed';

@Component({
  selector: 'div[sc-alert-dialog]',
  template: `
    <ng-content />
  `,
  host: {
    'data-slot': 'alert-dialog',
    role: 'alertdialog',
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
export class ScAlertDialog {
  private readonly elementRef = inject(ElementRef<HTMLElement>);

  readonly alertDialogProvider = inject(ScAlertDialogProvider);
  readonly classInput = input<string>('', { alias: 'class' });
  readonly state = signal<ScAlertDialogState>('closed');

  readonly dialogId = inject(_IdGenerator).getId('sc-alert-dialog-');

  readonly titleId = `${this.dialogId}-title`;
  readonly descriptionId = `${this.dialogId}-description`;

  protected readonly class = computed(() =>
    cn(
      'bg-background ring-foreground/10 fixed top-1/2 left-1/2 z-50 grid w-full -translate-x-1/2 -translate-y-1/2 gap-4 rounded-xl p-4 ring-1 outline-none',
      'max-w-xs sm:max-w-sm',
      'animate-in fade-in-0 zoom-in-95 duration-300',
      'data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[state=closed]:duration-300',
      'group/alert-dialog-content',
      this.classInput(),
    ),
  );

  constructor() {
    // Sync state with provider's open signal
    effect(() => {
      const isOpen = this.alertDialogProvider.open();
      this.state.set(isOpen ? 'open' : 'closed');
    });
  }

  protected onAnimationEnd(event: AnimationEvent): void {
    // Only trigger cleanup when close animation completes
    if (
      this.state() === 'closed' &&
      event.target === this.elementRef.nativeElement
    ) {
      this.alertDialogProvider.onDialogAnimationComplete();
    }
  }
}
