import { createBlockScrollStrategy } from '@angular/cdk/overlay';
import { NgTemplateOutlet } from '@angular/common';
import {
  Component,
  Injector,
  ViewEncapsulation,
  computed,
  contentChild,
  effect,
  inject,
  input,
  model,
} from '@angular/core';
import { cn } from 'cn';
import { ScNativeDialogPortal } from './native-dialog-portal';

/**
 * The dialog's state (`[(open)]`): its portal is stamped in place while it is
 * open, the page behind doesn't scroll.
 */
@Component({
  selector: 'div[scNativeDialogProvider], span[scNativeDialogProvider]',
  imports: [NgTemplateOutlet],
  template: `
    <ng-content />
    @if (open()) {
      <ng-container [ngTemplateOutlet]="portal().templateRef" />
    }
  `,
  host: {
    '[class]': 'class()',
  },
  encapsulation: ViewEncapsulation.None,
})
export class ScNativeDialogProvider {
  private readonly portal = contentChild.required(ScNativeDialogPortal);

  readonly classInput = input<string>('', { alias: 'class' });

  /** Shown or not; the dialog and its backdrop animate in and out. */
  readonly open = model<boolean>(false);

  private readonly class = computed(() => cn('contents', this.classInput()));

  constructor() {
    // The page behind keeps its place, as under the Dialog.
    const blockScroll = createBlockScrollStrategy(inject(Injector));
    effect((onCleanup) => {
      if (!this.open()) return;
      blockScroll.enable();
      onCleanup(() => blockScroll.disable());
    });
  }
}
