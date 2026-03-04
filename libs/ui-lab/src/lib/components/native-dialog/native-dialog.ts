import { _IdGenerator } from '@angular/cdk/a11y';
import { NgTemplateOutlet } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  ViewEncapsulation,
  computed,
  contentChild,
  effect,
  inject,
  input,
} from '@angular/core';
import { cn } from '@semantic-components/ui';
import { ScNativeDialogContent } from './native-dialog-content';
import { ScNativeDialogProvider } from './native-dialog-provider';

@Component({
  selector: 'dialog[scNativeDialog]',
  imports: [NgTemplateOutlet],
  template: `
    @if (dialogProvider.open()) {
      <ng-container [ngTemplateOutlet]="dialogContent().templateRef" />
    }
  `,
  host: {
    'data-slot': 'native-dialog',
    '[class]': 'class()',
    '[attr.aria-labelledby]': 'titleId',
    '[attr.aria-describedby]': 'descriptionId',
    '(close)': 'onClose()',
    '(click)': 'onBackdropClick($event)',
  },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ScNativeDialog {
  private readonly elementRef = inject(ElementRef<HTMLDialogElement>);
  readonly dialogProvider = inject(ScNativeDialogProvider);

  readonly classInput = input<string>('', { alias: 'class' });

  readonly dialogContent = contentChild.required(ScNativeDialogContent);

  readonly dialogId = inject(_IdGenerator).getId('sc-native-dialog-');
  readonly titleId = `${this.dialogId}-title`;
  readonly descriptionId = `${this.dialogId}-description`;

  protected readonly class = computed(() =>
    cn(
      'bg-background text-foreground fixed inset-0 m-auto w-full max-w-sm rounded-xl border p-4 shadow-lg backdrop:bg-black/50',
      'focus:outline-none',
      this.classInput(),
    ),
  );

  constructor() {
    effect(() => {
      const dialogEl = this.elementRef.nativeElement;
      if (this.dialogProvider.open()) {
        if (!dialogEl.open) {
          dialogEl.showModal();
        }
      } else {
        if (dialogEl.open) {
          dialogEl.close();
        }
      }
    });
  }

  protected onClose(): void {
    this.dialogProvider.open.set(false);
  }

  protected onBackdropClick(event: MouseEvent): void {
    const dialogEl = this.elementRef.nativeElement;
    if (event.target === dialogEl) {
      dialogEl.close();
    }
  }
}
