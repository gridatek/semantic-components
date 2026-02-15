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
import { ScDialogProvider } from './dialog-provider';

type ScDialogState = 'idle' | 'open' | 'closed';

@Component({
  selector: 'div[sc-dialog]',
  template: `
    <ng-content />
  `,
  host: {
    'data-slot': 'dialog',
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
export class ScDialog {
  private readonly elementRef = inject(ElementRef<HTMLElement>);

  readonly dialogProvider = inject(ScDialogProvider);
  readonly classInput = input<string>('', { alias: 'class' });
  protected readonly state = signal<ScDialogState>('idle');

  readonly dialogId = inject(_IdGenerator).getId('sc-dialog-');

  readonly titleId = `${this.dialogId}-title`;
  readonly descriptionId = `${this.dialogId}-description`;

  protected readonly class = computed(() =>
    cn(
      'relative bg-background ring-foreground/10 grid w-full max-w-[calc(100%-2rem)] gap-4 rounded-xl p-4 text-sm ring-1 duration-100 outline-none sm:max-w-sm',
      'data-idle:opacity-0',
      'data-open:animate-in data-open:fade-in-0 data-open:zoom-in-95',
      'data-closed:animate-out data-closed:fade-out-0 data-closed:zoom-out-95',
      this.classInput(),
    ),
  );

  constructor() {
    // Sync state with provider's open signal
    effect(() => {
      const isOpen = this.dialogProvider.open();
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
      this.dialogProvider.onDialogAnimationComplete();
    }
  }
}
