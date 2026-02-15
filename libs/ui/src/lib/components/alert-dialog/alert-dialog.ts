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

type ScAlertDialogState = 'idle' | 'open' | 'closed';

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
    '[attr.data-size]': 'size()',
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
export class ScAlertDialog {
  private readonly elementRef = inject(ElementRef<HTMLElement>);

  readonly alertDialogProvider = inject(ScAlertDialogProvider);
  readonly classInput = input<string>('', { alias: 'class' });
  readonly size = input<'default' | 'sm'>('default');
  protected readonly state = signal<ScAlertDialogState>('idle');

  readonly dialogId = inject(_IdGenerator).getId('sc-alert-dialog-');

  readonly titleId = `${this.dialogId}-title`;
  readonly descriptionId = `${this.dialogId}-description`;

  protected readonly class = computed(() =>
    cn(
      'bg-background ring-foreground/10 gap-4 rounded-xl p-4 ring-1 duration-100 outline-none',
      'data-[size=default]:max-w-xs data-[size=sm]:max-w-xs data-[size=default]:sm:max-w-sm',
      'group/alert-dialog-content',
      'fixed top-1/2 left-1/2 z-50 grid w-full -translate-x-1/2 -translate-y-1/2',
      'data-idle:opacity-0',
      'data-open:animate-in data-open:fade-in-0 data-open:zoom-in-95',
      'data-closed:animate-out data-closed:fade-out-0 data-closed:zoom-out-95',
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
      this.state.set('idle');
      this.alertDialogProvider.onDialogAnimationComplete();
    }
  }
}
