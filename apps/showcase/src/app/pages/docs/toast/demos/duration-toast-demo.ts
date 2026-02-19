import {
  ChangeDetectionStrategy,
  Component,
  inject,
  ViewEncapsulation,
} from '@angular/core';
import { ScButton } from '@semantic-components/ui';
import { ScToaster } from '@semantic-components/ui-lab';

@Component({
  selector: 'app-duration-toast-demo',
  imports: [ScButton],
  template: `
    <button scButton variant="outline" (click)="showToast()">Show Toast</button>
  `,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DurationToastDemo {
  private readonly toastService = inject(ScToaster);

  showToast(): void {
    this.toastService.show({
      title: 'Long toast',
      description: 'This toast will stay for 10 seconds.',
      duration: 10000,
    });
  }
}
