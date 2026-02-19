import {
  ChangeDetectionStrategy,
  Component,
  inject,
  ViewEncapsulation,
} from '@angular/core';
import { ScButton } from '@semantic-components/ui';
import { ScToaster } from '@semantic-components/ui-lab';

@Component({
  selector: 'app-title-toast-demo',
  imports: [ScButton],
  template: `
    <button scButton variant="outline" (click)="showToast()">Show Toast</button>
  `,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TitleToastDemo {
  private readonly toastService = inject(ScToaster);

  showToast(): void {
    this.toastService.show({
      title: 'Scheduled: Catch up',
      description: 'Friday, February 10, 2025 at 5:57 PM',
    });
  }
}
