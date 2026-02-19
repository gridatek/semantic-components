import {
  ChangeDetectionStrategy,
  Component,
  inject,
  ViewEncapsulation,
} from '@angular/core';
import { ScButton } from '@semantic-components/ui';
import { ScToaster } from '@semantic-components/ui';

@Component({
  selector: 'app-basic-toast-demo',
  imports: [ScButton],
  template: `
    <button scButton variant="outline" (click)="showToast()">Show Toast</button>
  `,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BasicToastDemo {
  private readonly toastService = inject(ScToaster);

  showToast(): void {
    this.toastService.show({
      description: 'Your message has been sent.',
    });
  }
}
