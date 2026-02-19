import {
  ChangeDetectionStrategy,
  Component,
  inject,
  ViewEncapsulation,
} from '@angular/core';
import { ScButton } from '@semantic-components/ui';
import { ScToaster } from '@semantic-components/ui';

@Component({
  selector: 'app-variants-toast-demo',
  imports: [ScButton],
  template: `
    <div class="flex flex-wrap gap-2">
      <button scButton variant="outline" (click)="showSuccess()">
        Success
      </button>
      <button scButton variant="outline" (click)="showInfo()">Info</button>
      <button scButton variant="outline" (click)="showWarning()">
        Warning
      </button>
      <button scButton variant="outline" (click)="showError()">Error</button>
      <button scButton variant="outline" (click)="showLoading()">
        Loading
      </button>
    </div>
  `,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class VariantsToastDemo {
  private readonly toastService = inject(ScToaster);

  showSuccess(): void {
    this.toastService.success({ description: 'Changes saved successfully.' });
  }

  showInfo(): void {
    this.toastService.info({ description: 'A new version is available.' });
  }

  showWarning(): void {
    this.toastService.warning({
      description: 'Your session is about to expire.',
    });
  }

  showError(): void {
    this.toastService.error({
      description: 'Something went wrong. Please try again.',
    });
  }

  showLoading(): void {
    this.toastService.loading({ description: 'Uploading file...' });
  }
}
