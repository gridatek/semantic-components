import {
  ChangeDetectionStrategy,
  Component,
  inject,
  ViewEncapsulation,
} from '@angular/core';
import { ScToastStack, ScToaster } from '@semantic-components/ui-lab';

@Component({
  selector: 'app-destructive-toast-demo',
  imports: [ScToastStack],
  template: `
    <button
      class="inline-flex h-9 cursor-pointer items-center justify-center gap-2 rounded-md bg-destructive px-4 py-2 text-sm font-medium text-destructive-foreground shadow-xs transition-colors hover:bg-destructive/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
      (click)="showToast()"
    >
      Show Toast
    </button>

    <sc-toast-stack />
  `,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DestructiveToastDemo {
  private readonly toastService = inject(ScToaster);

  showToast(): void {
    this.toastService.show({
      variant: 'destructive',
      title: 'Error',
      description: 'Something went wrong. Please try again.',
    });
  }
}
