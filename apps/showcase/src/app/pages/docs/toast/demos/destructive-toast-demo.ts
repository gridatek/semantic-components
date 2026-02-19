import {
  ChangeDetectionStrategy,
  Component,
  inject,
  ViewEncapsulation,
} from '@angular/core';
import { ScButton } from '@semantic-components/ui';
import { ScToaster } from '@semantic-components/ui';

@Component({
  selector: 'app-destructive-toast-demo',
  imports: [ScButton],
  template: `
    <button scButton variant="destructive" (click)="showToast()">
      Show Toast
    </button>
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
