import { _IdGenerator } from '@angular/cdk/a11y';
import {
  type AnimationCallbackEvent,
  Component,
  DestroyRef,
  ElementRef,
  ViewEncapsulation,
  afterNextRender,
  computed,
  inject,
  input,
  viewChild,
} from '@angular/core';
import { cn } from 'cn';
import { injectStyle } from '../../config/style';
import { ScBackdrop } from '../backdrop/backdrop';
import { ScNativeDialogProvider } from './native-dialog-provider';

/**
 * A native `<dialog>`, shown as a modal (`showModal()`): the browser puts it
 * in the top layer, keeps focus in it and gives it back on close. It fills
 * the screen, transparent: the style's backdrop and, centred, the panel —
 * the Dialog's look (the style's `dialog`), your content in it, your `class`
 * on it. Both animate in and out; Escape and a click outside the panel close
 * it.
 */
@Component({
  selector: 'dialog[scNativeDialog]',
  imports: [ScBackdrop],
  template: `
    <div scBackdrop></div>
    <div
      #panel
      [class]="panelClass()"
      animate.enter="animate-in fade-in-0 zoom-in-95"
    >
      <ng-content />
    </div>
  `,
  host: {
    '[attr.aria-labelledby]': 'titleId',
    '[attr.aria-describedby]': 'descriptionId',
    // The browser's dialog box undone: the whole screen, transparent, no
    // backdrop of its own; the panel centred, the screen scrolling past it.
    // The whole attribute: your class goes on the panel, not here.
    '[attr.class]': 'shellClass',
    '(animate.leave)': 'leave($event)',
    '(cancel)': 'onCancel($event)',
    '(close)': 'provider.open.set(false)',
    '(click)': 'onClick($event)',
  },
  encapsulation: ViewEncapsulation.None,
})
export class ScNativeDialog {
  private readonly styles = injectStyle().dialog;
  private readonly provider = inject(ScNativeDialogProvider);
  private readonly element =
    inject<ElementRef<HTMLDialogElement>>(ElementRef).nativeElement;
  private readonly panel = viewChild.required<ElementRef<HTMLElement>>('panel');

  readonly classInput = input<string>('', { alias: 'class' });

  private readonly dialogId = inject(_IdGenerator).getId('sc-native-dialog-');
  readonly titleId = `${this.dialogId}-title`;
  readonly descriptionId = `${this.dialogId}-description`;

  private readonly shellClass =
    'fixed inset-0 m-0 flex size-full max-h-none max-w-none overflow-y-auto border-0 bg-transparent p-0 py-4 outline-none backdrop:bg-transparent';

  private readonly panelClass = computed(() =>
    cn(
      'relative m-auto',
      this.styles.content,
      // The ✕: a close straight in the panel, in its corner.
      this.styles.close,
      this.classInput(),
    ),
  );

  constructor() {
    afterNextRender(() => {
      if (!this.element.open) this.element.showModal();
    });
    // Gone without its leave (the page left): out of the top layer.
    inject(DestroyRef).onDestroy(() => {
      if (!this.element.isConnected && this.element.open) this.element.close();
    });
  }

  /** Escape: closed through the state, so it animates out. */
  private onCancel(event: Event): void {
    event.preventDefault();
    this.provider.open.set(false);
  }

  /** A click on the screen around the panel closes it. */
  private onClick(event: MouseEvent): void {
    if (event.target === this.element) this.provider.open.set(false);
  }

  /**
   * Closing: the panel and the backdrop fade out, then `close()` — focus is
   * still in it, so the browser gives it back to what opened it.
   */
  private leave(event: AnimationCallbackEvent): void {
    const dialog = event.target as HTMLDialogElement;
    const panel = this.panel().nativeElement;
    const backdrop = dialog.querySelector<HTMLElement>(':scope > [scBackdrop]');
    panel.classList.add('animate-out', 'fade-out-0', 'zoom-out-95');
    backdrop?.classList.add('animate-out', 'fade-out-0');
    const running = [panel, backdrop].flatMap((e) => e?.getAnimations() ?? []);
    Promise.allSettled(running.map((animation) => animation.finished)).then(
      () => {
        if (dialog.open) dialog.close();
        event.animationComplete();
      },
    );
  }
}
